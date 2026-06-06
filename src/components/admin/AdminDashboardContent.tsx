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
import ApiLogsTable from './dashboard/ApiLogsTable';
import CalendarStats from './dashboard/CalendarStats';
import CreatePaymentLinkModal from './dashboard/CreatePaymentLinkModal';
import RevenueChart from './dashboard/RevenueChart';
import SuccessRate from './dashboard/SuccessRate';
import RecentActivity from './dashboard/RecentActivity';
import ConfirmationModal from './dashboard/ConfirmationModal';

const AdminDashboardContent: React.FC = () => {
    const pathname = usePathname();
    const isDashboard = pathname === '/sharkfunded2logintoadminwithpermission';
    const isTransactions = pathname === '/sharkfunded2logintoadminwithpermission/transactions';
    const isUsers = pathname === '/sharkfunded2logintoadminwithpermission/users';
    const isApiLogs = pathname === '/sharkfunded2logintoadminwithpermission/api-logs';

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [blockedEmails, setBlockedEmails] = useState<string[]>([]); // [NEW] Track blocked users
    const [filter, setFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('all'); // 'all', 'today', 'week', 'month', 'custom'
    const [customDate, setCustomDate] = useState('');
    const [search, setSearch] = useState('');
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [showCreateLinkModal, setShowCreateLinkModal] = useState(false);

    // Dashboard-specific States
    const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
    const [recentActivity, setRecentActivity] = useState<Transaction[]>([]);
    const [dailyTrendStats, setDailyTrendStats] = useState<any[]>([]);
    const [statsLoading, setStatsLoading] = useState(true);

    // Transactions Pagination States
    const [totalTransactions, setTotalTransactions] = useState(0);
    const [txnPage, setTxnPage] = useState(1);

    // Users States
    const [users, setUsers] = useState<UserStat[]>([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [userPage, setUserPage] = useState(1);
    const [userFilter, setUserFilter] = useState('all'); // 'all', 'verified'
    const [usersLoading, setUsersLoading] = useState(false);

    // Confirmation Modal State
    const [confirmModal, setConfirmModal] = useState<{
        isOpen: boolean;
        type: 'verified' | 'rejected' | null;
        id: string | null;
    }>({ isOpen: false, type: null, id: null });

    // Fetch dashboard data (aggregates and chart)
    const fetchDashboardData = useCallback(async () => {
        setStatsLoading(true);
        try {
            const [statsRes, dailyStatsRes] = await Promise.all([
                axios.get('/api/admin/dashboard-stats'),
                axios.post('/api/admin/daily-stats', {
                    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
                })
            ]);
            if (statsRes.data.success) {
                setDashboardStats(statsRes.data.stats);
                setRecentActivity(statsRes.data.recentTransactions || []);
            }
            if (dailyStatsRes.data.success) {
                setDailyTrendStats(dailyStatsRes.data.stats || []);
            }
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
        } finally {
            setStatsLoading(false);
        }
    }, []);

    // Fetch transactions with server-side pagination
    const fetchTransactions = useCallback(async () => {
        setLoading(true);
        try {
            const { data: result } = await axios.get('/api/admin/transactions', {
                params: {
                    search,
                    status: filter,
                    dateFilter,
                    customDate,
                    page: txnPage,
                    limit: 50
                }
            });
            if (result.success) {
                const data = result.data;
                // [Auto-Expire Logic]
                const now = Date.now();
                const twentyMinsInMs = 20 * 60 * 1000;
                const ordersToExpire = (data || []).filter((t: any) => {
                    if (t.status === 'pending_payment') {
                        const createdAt = new Date(t.created_at).getTime();
                        return (now - createdAt) > twentyMinsInMs;
                    }
                    return false;
                });

                if (ordersToExpire.length > 0) {
                    console.log(`Found ${ordersToExpire.length} expired orders. Updating...`);
                    const idsToExpire = ordersToExpire.map((t: any) => t.id);

                    // Update status via API (more secure than client logic)
                    await axios.post('/api/admin/expire-sessions', { ids: idsToExpire });

                    // Update Local Data
                    const updatedData = (data || []).map((t: any) => {
                        if (idsToExpire.includes(t.id)) {
                            return { ...t, status: 'expired' };
                        }
                        return t;
                    });
                    setTransactions(updatedData as Transaction[]);
                } else {
                    setTransactions(data as Transaction[] || []);
                }
                setTotalTransactions(result.total || 0);
            }
        } catch (error) {
            console.error('Error fetching transactions:', error);
        } finally {
            setLoading(false);
        }
    }, [search, filter, dateFilter, customDate, txnPage]);

    // Fetch users with server-side pagination
    const fetchUsers = useCallback(async () => {
        setUsersLoading(true);
        try {
            const { data: result } = await axios.get('/api/admin/users', {
                params: {
                    search,
                    filter: userFilter,
                    page: userPage,
                    limit: 50
                }
            });
            if (result.success) {
                setUsers(result.users || []);
                setTotalUsers(result.total || 0);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setUsersLoading(false);
        }
    }, [search, userFilter, userPage]);

    // Ref to handle Postgres subscription callbacks without stale closures
    const latestRef = React.useRef({ isDashboard, isTransactions, isUsers, fetchDashboardData, fetchTransactions, fetchUsers });
    useEffect(() => {
        latestRef.current = { isDashboard, isTransactions, isUsers, fetchDashboardData, fetchTransactions, fetchUsers };
    });

    useEffect(() => {
        fetchBlockedUsers();

        // Trigger lazy cleanup of abandoned sessions
        axios.post('/api/admin/expire-sessions').catch(err => console.warn('Background cleanup failed:', err));

        // Real-time subscription
        const subscription = supabase
            .channel('transactions_channel')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'transactions' },
                (payload: any) => {
                    console.log('Real-time change:', payload);
                    const current = latestRef.current;
                    if (current.isDashboard) {
                        current.fetchDashboardData();
                    } else if (current.isTransactions) {
                        current.fetchTransactions();
                    } else if (current.isUsers) {
                        current.fetchUsers();
                    }
                }
            )
            .subscribe((status: string) => {
                if (status === 'SUBSCRIBED') {
                    console.log('Subscribed to real-time updates');
                }
            });

        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    // Load data based on active tab
    useEffect(() => {
        if (isDashboard) {
            fetchDashboardData();
        }
    }, [isDashboard, fetchDashboardData]);

    useEffect(() => {
        if (isTransactions) {
            const timer = setTimeout(() => {
                fetchTransactions();
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isTransactions, fetchTransactions]);

    useEffect(() => {
        if (isUsers) {
            const timer = setTimeout(() => {
                fetchUsers();
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isUsers, fetchUsers]);

    // Reset pagination when search or filters change
    useEffect(() => {
        setTxnPage(1);
    }, [search, filter, dateFilter, customDate]);

    useEffect(() => {
        setUserPage(1);
    }, [search, userFilter]);

    // [NEW] Fetch blocked users
    const fetchBlockedUsers = async () => {
        try {
            const { data } = await axios.get('/api/admin/block-user');
            if (data.success) {
                setBlockedEmails(data.blockedUsers.map((u: any) => u.email));
            }
        } catch (error) {
            console.error('Error fetching blocked users:', error);
        }
    };

    // [NEW] Block/Unblock Handlers
    const handleBlockUser = async (email: string) => {
        if (!confirm(`Are you sure you want to block ${email}? They will not be able to create new orders.`)) return;
        try {
            const { data } = await axios.post('/api/admin/block-user', { email });
            if (data.success) {
                setBlockedEmails(prev => [...prev, email]);
                // alert('User blocked successfully');
            }
        } catch (error) {
            alert('Failed to block user');
        }
    };

    const handleUnblockUser = async (email: string) => {
        if (!confirm(`Are you sure you want to unblock ${email}?`)) return;
        try {
            const { data } = await axios.delete(`/api/admin/block-user?email=${email}`);
            if (data.success) {
                setBlockedEmails(prev => prev.filter(e => e !== email));
                // alert('User unblocked successfully');
            }
        } catch (error) {
            alert('Failed to unblock user');
        }
    };

    const initiateStatusUpdate = (id: string, newStatus: 'verified' | 'rejected') => {
        setConfirmModal({
            isOpen: true,
            type: newStatus,
            id: id
        });
    };

    const handleConfirmAction = () => {
        if (confirmModal.id && confirmModal.type) {
            handleStatusUpdate(confirmModal.id, confirmModal.type);
            setConfirmModal({ isOpen: false, type: null, id: null });
        }
    };

    const handleStatusUpdate = async (id: string, type: 'verified' | 'rejected') => {
        try {
            // [NEW] Get current admin email from LocalStorage (since we use custom RPC login)
            let adminEmail = 'Unknown Admin';
            if (typeof window !== 'undefined') {
                const storedUser = localStorage.getItem('admin_user');
                if (storedUser) {
                    try {
                        const userObj = JSON.parse(storedUser);
                        adminEmail = userObj.email || userObj.user_email || 'Unknown Admin';
                    } catch (e) {
                        console.error('Error parsing admin user:', e);
                    }
                }
            }

            // 1. Try API (Best for security + email)
            const response = await axios.post('/api/admin/update-status', {
                transactionId: id,
                status: type,
                approvedBy: adminEmail // [NEW]
            });

            if (response.data.success) {
                setTransactions(prev => prev.map(t => t.id === id ? { ...t, status: type, approved_by: adminEmail } : t));
            } else {
                throw new Error(response.data.message);
            }

            // 2. No fallback needed if API succeeds. 
            // If API fails, we catch below. We should NOT try client-side update as fallback 
            // because we want to enforce the API logic (email sending, logging, etc).
            // But if the user insisted on previous fallback logic, I will keep it consistent 
            // with previous implementation if API fails? 
            // Actually, the previous code had specific fallback logic in the catch block. 
            // To be safe and minimal, I will retain the structure but ensure approvedBy is used.

        } catch (error: any) {
            console.error('API update failed:', error);
            alert('Failed to update status: ' + (error.response?.data?.message || error.message || 'Unknown error'));
        }
    };

    const filteredTransactions = transactions;
    const filteredUsers = users;

    const handleExport = async () => {
        try {
            const { data: result } = await axios.get('/api/admin/transactions', {
                params: {
                    search,
                    status: filter,
                    dateFilter,
                    customDate,
                    limit: 'all'
                }
            });

            if (!result.success) {
                alert('Failed to fetch transactions for export');
                return;
            }

            const exportData = result.data || [];

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
                ...exportData.map((t: any) => [
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
        } catch (error) {
            console.error('Export error:', error);
            alert('Export failed due to a network error.');
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'verified': return 'bg-emerald-50 text-emerald-700 border-emerald-100 ring-1 ring-emerald-600/10';
            case 'pending_payment': return 'bg-blue-50 text-blue-700 border-blue-100 ring-1 ring-blue-600/10 animate-pulse';
            case 'pending_manual_verification': return 'bg-amber-50 text-amber-700 border-amber-100 ring-1 ring-amber-600/10';
            case 'rejected': return 'bg-rose-50 text-rose-700 border-rose-100 ring-1 ring-rose-600/10';
            case 'cancelled': return 'bg-orange-50 text-orange-700 border-orange-100 ring-1 ring-orange-600/10';
            case 'expired': return 'bg-slate-100 text-slate-600 border-slate-200 ring-1 ring-slate-600/10';
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

    // Stats Calculations - Memoized from server stats
    const stats: DashboardStats = useMemo(() => {
        const defaultStats: DashboardStats = {
            totalRevenue: 0,
            totalPayments: 0,
            approvedCount: 0,
            pendingCount: 0,
            failedCount: 0,
            rejectedCount: 0,
            expiredCount: 0,
            totalUsers: 0,
            todayCount: 0,
            todayApprovedCount: 0,
            todayRejectedCount: 0,
            todayVolume: 0
        };
        return dashboardStats || defaultStats;
    }, [dashboardStats]);

    return (
        <>
            <div className="space-y-8 animate-fade-in w-full">
                {/* Stats Overview - Only show on Dashboard */}
                {isDashboard && (
                    <div className="space-y-6">
                        <StatsOverview stats={stats} />

                        {/* New Bento Grid Layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            {/* Revenue Chart (8 cols) */}
                            <div className="lg:col-span-8 min-h-[350px]">
                                <RevenueChart dailyStats={dailyTrendStats} />
                            </div>

                            {/* Right Column (4 cols) - Stacked vertically */}
                            <div className="lg:col-span-4 flex flex-col gap-6">
                                <div className="flex-1 min-h-[180px]">
                                    <SuccessRate stats={stats} />
                                </div>
                                <div className="flex-[2] min-h-[300px]">
                                    <RecentActivity transactions={recentActivity} />
                                </div>
                            </div>
                        </div>

                        <div className="mt-2">
                            <CalendarStats />
                        </div>
                    </div>
                )}

                {/* Users View */}
                {isUsers && (
                    <UsersTable
                        users={filteredUsers}
                        search={search}
                        setSearch={setSearch}
                        filter={userFilter}
                        setFilter={setUserFilter}
                        formatDate={formatDate}
                        formatTime={formatTime}
                        onBlock={handleBlockUser} // [NEW]
                        onUnblock={handleUnblockUser} // [NEW]
                        currentPage={userPage}
                        setCurrentPage={setUserPage}
                        totalUsersCount={totalUsers}
                        loading={usersLoading}
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
                        onCreateLink={() => setShowCreateLinkModal(true)}
                        currentPage={txnPage}
                        setCurrentPage={setTxnPage}
                        totalTransactionsCount={totalTransactions}
                    />
                )}

                {/* API Logs View */}
                {isApiLogs && (
                    <ApiLogsTable />
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

            {/* Create Link Modal */}
            {showCreateLinkModal && (
                <CreatePaymentLinkModal
                    onClose={() => setShowCreateLinkModal(false)}
                    onSuccess={() => {
                        // Refresh transactions list to show the new pending payment
                        fetchTransactions();
                        // Ideally we keep the modal open to show the link, but the modal handles its own "success state" with the link.
                        // We don't close it automatically on success so user can copy link.
                        // We just trigger data refresh.
                    }}
                />
            )}
            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={confirmModal.isOpen}
                onClose={() => setConfirmModal({ isOpen: false, type: null, id: null })}
                onConfirm={handleConfirmAction}
                title={confirmModal.type === 'verified' ? 'Approve Transaction' : 'Reject Transaction'}
                message={(() => {
                    const txn = transactions.find(t => t.id === confirmModal.id);
                    if (confirmModal.type === 'verified') {
                        if (!txn?.screenshot_url || txn.status === 'expired' || txn.status === 'pending_payment') {
                            return '⚠️ Warning: No payment proof attached. Please verify with your bank statement before approving. Are you sure you want to approve?';
                        }
                        return 'Are you sure you want to approve this transaction? This will mark it as success and notify the user.';
                    }
                    return 'Are you sure you want to reject this transaction? This action cannot be undone.';
                })()}
                type={confirmModal.type === 'verified' ? 'approve' : 'reject'}
            />
        </>
    );
};

export default AdminDashboardContent;
