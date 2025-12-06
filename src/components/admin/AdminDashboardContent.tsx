import React, { useEffect, useState, useMemo, useCallback } from 'react';
import axios from 'axios';
import { supabase } from '@/lib/supabase';
import { usePathname } from 'next/navigation';

// Import new components and types
import { Transaction, UserStat, DashboardStats } from './dashboard/types';
import StatsOverview from './dashboard/StatsOverview';
import UsersTable from './dashboard/UsersTable';
import TransactionsTable from './dashboard/TransactionsTable';
import TransactionDetailModal from './dashboard/TransactionDetailModal';

const AdminDashboardContent: React.FC = () => {
    const pathname = usePathname();
    const isDashboard = pathname === '/admin';
    const isTransactions = pathname === '/admin/transactions';
    const isUsers = pathname === '/admin/users';

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('all'); // 'all', 'today', 'week', 'month', 'custom'
    const [customDate, setCustomDate] = useState('');
    const [search, setSearch] = useState('');
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

    // Confirmation Modal State
    const [confirmModal, setConfirmModal] = useState<{
        isOpen: boolean;
        type: 'verified' | 'rejected' | null;
        id: string | null;
    }>({ isOpen: false, type: null, id: null });

    useEffect(() => {
        fetchTransactions();

        // Real-time subscription
        const subscription = supabase
            .channel('transactions_channel')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'transactions' },
                (payload) => {
                    console.log('Real-time change:', payload);

                    if (payload.eventType === 'INSERT') {
                        setTransactions(prev => [payload.new as Transaction, ...prev]);
                    } else if (payload.eventType === 'UPDATE') {
                        setTransactions(prev => prev.map(t => t.id === payload.new.id ? payload.new as Transaction : t));
                    } else if (payload.eventType === 'DELETE') {
                        setTransactions(prev => prev.filter(t => t.id !== payload.old.id));
                    }
                }
            )
            .subscribe((status) => {
                if (status === 'SUBSCRIBED') {
                    console.log('Subscribed to real-time updates');
                }
            });

        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    const fetchTransactions = async () => {
        try {
            const { data, error } = await supabase
                .from('transactions')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setTransactions(data || []);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        } finally {
            setLoading(false);
        }
    };

    const initiateStatusUpdate = (id: string, newStatus: 'verified' | 'rejected') => {
        // Directly update status without extra confirmation modal for now, as requested to match previous flow 
        // or keep standard flow. The original had a confirmation modal but implemented it via status update directly in the table
        // We will implement the update logic directly here for simplicity as the modal was internal.
        handleStatusUpdate(id, newStatus);
    };

    const handleStatusUpdate = async (id: string, type: 'verified' | 'rejected') => {
        try {
            // 1. Try API (Best for security + email)
            const response = await axios.post('/api/admin/update-status', {
                transactionId: id,
                status: type
            });

            if (response.data.success) {
                setTransactions(prev => prev.map(t => t.id === id ? { ...t, status: type } : t));
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            console.warn('API update failed, falling back to client-side update:', error);

            // 2. Fallback: Client-side update
            try {
                const { error: dbError } = await supabase
                    .from('transactions')
                    .update({ status: type })
                    .eq('id', id);

                if (dbError) throw dbError;

                // Optimistic update
                setTransactions(prev => prev.map(t => t.id === id ? { ...t, status: type } : t));

                // 3. If verified, trigger email via receipt API
                if (type === 'verified') {
                    const txn = transactions.find(t => t.id === id);
                    if (txn) {
                        axios.post('/api/send-receipt', {
                            utr: txn.utr,
                            email: txn.customer_details?.email,
                            name: txn.customer_details?.name
                        }).catch(e => console.error('Failed to trigger receipt email:', e));
                    }
                }

            } catch (fallbackError: any) {
                console.error('Fallback update failed:', fallbackError);
                alert('Failed to update status: ' + (fallbackError.message || 'Unknown error'));
            }
        }
    };

    const filteredTransactions = transactions.filter(t => {
        const matchesFilter = filter === 'all' || t.status === filter;
        const matchesSearch =
            t.utr?.toLowerCase().includes(search.toLowerCase()) ||
            t.order_id?.toLowerCase().includes(search.toLowerCase()) ||
            t.customer_details?.email?.toLowerCase().includes(search.toLowerCase());

        let matchesDate = true;
        const date = new Date(t.created_at);
        const now = new Date();

        if (dateFilter === 'today') {
            matchesDate = date.toDateString() === now.toDateString();
        } else if (dateFilter === 'week') {
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            matchesDate = date >= weekAgo;
        } else if (dateFilter === 'month') {
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            matchesDate = date >= monthAgo;
        } else if (dateFilter === 'custom' && customDate) {
            matchesDate = date.toDateString() === new Date(customDate).toDateString();
        }

        return matchesFilter && matchesSearch && matchesDate;
    });

    // Users Calculation
    const users: UserStat[] = useMemo(() => {
        const userMap = new Map<string, UserStat>();

        transactions.forEach(t => {
            const email = t.customer_details?.email;
            if (!email) return;

            if (!userMap.has(email)) {
                userMap.set(email, {
                    email,
                    name: t.customer_details?.name || 'Unknown',
                    totalSpend: 0,
                    totalOrders: 0,
                    lastActive: t.created_at,
                    status: 'active'
                });
            }

            const user = userMap.get(email)!;
            if (t.status === 'verified') {
                user.totalSpend += Number(t.amount);
            }
            user.totalOrders += 1;
            if (new Date(t.created_at) > new Date(user.lastActive)) {
                user.lastActive = t.created_at;
            }
        });

        return Array.from(userMap.values()).sort((a, b) => b.totalSpend - a.totalSpend);
    }, [transactions]);

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    const handleExport = () => {
        const escapeCsvField = (field: any) => {
            if (field === null || field === undefined) return '';
            const stringField = String(field);
            // Wrap in quotes if it contains comma, quote, or newline
            if (stringField.includes(',') || stringField.includes('"') || stringField.includes('\n')) {
                return `"${stringField.replace(/"/g, '""')}"`;
            }
            return stringField;
        };

        const csvContent = [
            ['Date', 'Order ID', 'UTR', 'Customer Name', 'Email', 'Amount', 'Status'],
            ...filteredTransactions.map(t => [
                escapeCsvField(new Date(t.created_at).toLocaleString()),
                escapeCsvField(t.order_id),
                escapeCsvField(t.utr),
                escapeCsvField(t.customer_details?.name),
                escapeCsvField(t.customer_details?.email),
                escapeCsvField(t.amount),
                escapeCsvField(t.status)
            ])
        ].map(e => e.join(",")).join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
        link.setAttribute("download", `SharkFunded_Transactions_${timestamp}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'verified': return 'bg-emerald-50 text-emerald-700 border-emerald-100 ring-1 ring-emerald-600/10';
            case 'pending_manual_verification': return 'bg-amber-50 text-amber-700 border-amber-100 ring-1 ring-amber-600/10';
            case 'rejected': return 'bg-rose-50 text-rose-700 border-rose-100 ring-1 ring-rose-600/10';
            default: return 'bg-slate-50 text-slate-700 border-slate-100 ring-1 ring-slate-600/10';
        }
    };

    const formatDate = useCallback((dateString: string) => {
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }).format(new Date(dateString));
    }, []);

    const formatTime = useCallback((dateString: string) => {
        return new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        }).format(new Date(dateString));
    }, []);

    // Stats Calculations - Memoized
    const stats: DashboardStats = useMemo(() => {
        const totalRevenue = transactions.filter(t => t.status === 'verified').reduce((sum, t) => sum + Number(t.amount), 0);
        const totalPayments = transactions.length;
        const approvedCount = transactions.filter(t => t.status === 'verified').length;
        const pendingCount = transactions.filter(t => t.status === 'pending_manual_verification').length;
        const failedRejectedCount = transactions.filter(t => t.status === 'failed' || t.status === 'rejected').length;
        const totalUsers = new Set(transactions.map(t => t.customer_details?.email)).size;

        const todayTransactions = transactions.filter(t => new Date(t.created_at).toDateString() === new Date().toDateString());
        const todayCount = todayTransactions.length;
        const todayVolume = todayTransactions.filter(t => t.status === 'verified').reduce((sum, t) => sum + Number(t.amount), 0);

        return {
            totalRevenue,
            totalPayments,
            approvedCount,
            pendingCount,
            failedRejectedCount,
            totalUsers,
            todayCount,
            todayVolume
        };
    }, [transactions]);

    return (
        <>
            <div className="space-y-8 animate-fade-in w-full">
                {/* Stats Overview - Only show on Dashboard */}
                {isDashboard && <StatsOverview stats={stats} />}

                {/* Users View */}
                {isUsers && (
                    <UsersTable
                        users={filteredUsers}
                        search={search}
                        setSearch={setSearch}
                        formatDate={formatDate}
                        formatTime={formatTime}
                    />
                )}

                {/* Main Content Area - Only show on Transactions page */}
                {isTransactions && (
                    <TransactionsTable
                        transactions={filteredTransactions}
                        loading={loading}
                        search={search}
                        setSearch={setSearch}
                        filter={filter}
                        setFilter={setFilter}
                        dateFilter={dateFilter}
                        setDateFilter={setDateFilter}
                        customDate={customDate}
                        setCustomDate={setCustomDate}
                        handleExport={handleExport}
                        formatDate={formatDate}
                        formatTime={formatTime}
                        getStatusStyle={getStatusStyle}
                        setSelectedTransaction={setSelectedTransaction}
                        initiateStatusUpdate={initiateStatusUpdate}
                    />
                )}
            </div>

            {/* Transaction Details Modal */}
            {selectedTransaction && (
                <TransactionDetailModal
                    transaction={selectedTransaction}
                    onClose={() => setSelectedTransaction(null)}
                    formatDate={formatDate}
                    formatTime={formatTime}
                    initiateStatusUpdate={initiateStatusUpdate}
                />
            )}
        </>
    );
};

export default AdminDashboardContent;
