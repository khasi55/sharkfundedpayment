import React, { useState, useMemo } from 'react';
import { Search, Calendar, ChevronDown, Download, Eye, CheckCircle2, XCircle, MoreHorizontal, ChevronLeft, ChevronRight, Filter, ArrowUpRight } from 'lucide-react';
import { Transaction } from './types';

interface TransactionsTableProps {
    transactions: Transaction[];
    loading: boolean;
    search: string;
    setSearch: (value: string) => void;
    filter: string;
    setFilter: (value: string) => void;
    dateFilter: string;
    setDateFilter: (value: string) => void;
    customDate: string;
    setCustomDate: (value: string) => void;
    handleExport: () => void;
    formatDate: (dateString: string) => string;
    formatTime: (dateString: string) => string;
    getStatusStyle: (status: string) => string;
    setSelectedTransaction: (transaction: Transaction) => void;
    initiateStatusUpdate: (id: string, status: 'verified' | 'rejected') => void;
    onCreateLink?: () => void;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalTransactionsCount: number;
}

const ITEMS_PER_PAGE = 50;

export default function TransactionsTable({
    transactions,
    loading,
    search,
    setSearch,
    filter,
    setFilter,
    dateFilter,
    setDateFilter,
    customDate,
    setCustomDate,
    handleExport,
    formatDate,
    formatTime,
    getStatusStyle,
    setSelectedTransaction,
    initiateStatusUpdate,
    onCreateLink,
    currentPage,
    setCurrentPage,
    totalTransactionsCount
}: TransactionsTableProps) {
    const [showDateFilter, setShowDateFilter] = useState(false);

    // Pagination Logic
    const totalPages = Math.ceil(totalTransactionsCount / ITEMS_PER_PAGE);
    const paginatedTransactions = transactions;

    // Helper for improved status badge
    const StatusBadge = ({ status }: { status: string }) => {
        const style = getStatusStyle(status);
        const label = status === 'pending_manual_verification' ? 'Review Needed' :
            status === 'pending_payment' ? 'Pending' :
                status.charAt(0).toUpperCase() + status.slice(1);

        return (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border shadow-sm ${style}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60"></span>
                {label}
            </span>
        );
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Toolbar - Stacked on mobile, Row on Desktop */}
            <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col xl:flex-row gap-4 justify-between items-start xl:items-center">

                {/* Search & Date */}
                <div className="flex flex-col md:flex-row gap-3 w-full xl:w-auto">
                    <div className="relative w-full md:w-80 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Order ID, UTR, Email..."
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-sm font-medium transition-all"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Date Filter Dropdown */}
                        <div className="relative z-20">
                            <button
                                onClick={() => setShowDateFilter(!showDateFilter)}
                                className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 hover:bg-white hover:border-blue-400 transition-all flex items-center gap-2 min-w-[140px] justify-between"
                            >
                                <div className="flex items-center gap-2">
                                    <Calendar size={18} className="text-slate-400" />
                                    <span className="text-sm font-medium">
                                        {dateFilter === 'all' ? 'All Dates' : dateFilter === 'today' ? 'Today' : dateFilter === 'week' ? 'This Week' : 'Custom'}
                                    </span>
                                </div>
                                <ChevronDown size={14} />
                            </button>
                            {showDateFilter && (
                                <>
                                    <div className="fixed inset-0" onClick={() => setShowDateFilter(false)}></div>
                                    <div className="absolute top-full mt-2 left-0 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 animate-in fade-in zoom-in-95 duration-100">
                                        {['all', 'today', 'week', 'month', 'custom'].map((opt) => (
                                            <button
                                                key={opt}
                                                onClick={() => {
                                                    setDateFilter(opt);
                                                    if (opt === 'custom' && !customDate) setCustomDate(new Date().toISOString().split('T')[0]);
                                                    setShowDateFilter(false);
                                                }}
                                                className={`w-full text-left px-4 py-2.5 text-sm font-medium hover:bg-slate-50 ${dateFilter === opt ? 'text-blue-600 bg-blue-50' : 'text-slate-600'}`}
                                            >
                                                {opt === 'all' ? 'All Time' : opt.charAt(0).toUpperCase() + opt.slice(1)}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                        {dateFilter === 'custom' && (
                            <input
                                type="date"
                                value={customDate}
                                onChange={(e) => setCustomDate(e.target.value)}
                                className="px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium outline-none focus:border-blue-500"
                            />
                        )}
                    </div>
                </div>

                {/* Filters, Export & Action */}
                <div className="flex flex-col md:flex-row gap-3 w-full xl:w-auto overflow-x-auto pb-2 md:pb-0">
                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                        {['all', 'verified', 'pending_manual_verification'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filter === f
                                    ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200'
                                    : 'text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                {f === 'pending_manual_verification' ? 'Pending' : f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 ml-auto md:ml-0">
                        <button
                            onClick={handleExport}
                            className="p-3 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-all"
                            title="Export CSV"
                        >
                            <Download size={18} />
                        </button>
                        {onCreateLink && (
                            <button
                                onClick={onCreateLink}
                                className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-600/20 flex items-center gap-2 transition-all font-bold text-sm whitespace-nowrap"
                            >
                                <ArrowUpRight size={18} />
                                Create Link
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Content: Mobile Cards + Desktop Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                {/* Desktop View with Horizontal Scroll */}
                <div className="overflow-x-auto">
                    {/* Desktop Header */}
                    <div className="hidden md:grid grid-cols-[repeat(14,minmax(0,1fr))] gap-4 bg-slate-50 px-6 py-4 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider min-w-[1600px]">
                        <div className="col-span-1">Date</div>
                        <div className="col-span-2">Order ID</div>
                        <div className="col-span-3">Customer</div>
                        <div className="col-span-2">Payment Info</div>
                        <div className="col-span-1">Amount</div>
                        <div className="col-span-1">UTR</div>
                        <div className="col-span-2">Status</div>
                        <div className="col-span-2 text-right">Actions</div>
                    </div>

                    {loading ? (
                        <div className="p-12 text-center min-w-[1600px]">
                            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-slate-500">Loading transactions...</p>
                        </div>
                    ) : paginatedTransactions.length === 0 ? (
                        <div className="p-16 text-center flex flex-col items-center opacity-60 min-w-[1600px]">
                            <Search size={48} className="text-slate-300 mb-4" />
                            <h3 className="text-lg font-bold text-slate-900">No transactions found</h3>
                            <p className="text-slate-500">Try adjusting your filters or search terms.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {paginatedTransactions.map((txn) => (
                                <React.Fragment key={txn.id}>
                                    {/* Mobile Card View (remains visible only on small screens) */}
                                    <div className="md:hidden p-5 flex flex-col gap-4 hover:bg-slate-50 transition-colors">
                                        <div className="flex justify-between items-start">
                                            <div className="flex gap-3">
                                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-sm shrink-0">
                                                    {txn.customer_details?.name ? txn.customer_details.name.charAt(0).toUpperCase() : 'U'}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-900">{txn.customer_details?.name || 'Unknown'}</div>
                                                    <div className="text-xs text-slate-500 mb-1">{formatDate(txn.created_at)} • {formatTime(txn.created_at)}</div>
                                                    <StatusBadge status={txn.status} />
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-lg text-slate-900">₹{txn.amount.toLocaleString()}</div>
                                                <div className="text-xs font-mono text-slate-600 bg-slate-100 px-2 py-1 rounded inline-block mt-1">{txn.order_id}</div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2 text-sm bg-slate-50 p-3 rounded-xl border border-slate-100">
                                            <div>
                                                <p className="text-[10px] text-slate-400 uppercase font-bold">UTR</p>
                                                <p className="font-mono text-slate-700 break-all">{txn.utr || '-'}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-slate-400 uppercase font-bold">Email</p>
                                                <p className="text-slate-700 truncate">{txn.customer_details?.email || '-'}</p>
                                            </div>
                                            <div className="col-span-2 border-t border-slate-100 pt-2 mt-1">
                                                <p className="text-[10px] text-slate-400 uppercase font-bold">Payment To</p>
                                                <p className="text-slate-700 font-medium truncate">{txn.merchant_upi_id || 'Shark Funded'}</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-3 mt-1">
                                            {txn.screenshot_url && (
                                                <button
                                                    onClick={() => setSelectedTransaction(txn)}
                                                    className="flex-1 py-2.5 border border-slate-200 rounded-xl text-slate-600 font-bold text-sm hover:bg-slate-50 flex items-center justify-center gap-2 whitespace-nowrap"
                                                >
                                                    <Eye size={16} /> View Proof
                                                </button>
                                            )}
                                            {(txn.status === 'pending_manual_verification' || txn.status === 'pending_payment' || txn.status === 'expired') && (
                                                <div className="flex gap-2 flex-1">
                                                    <button
                                                        onClick={() => initiateStatusUpdate(txn.id, 'verified')}
                                                        className="flex-1 py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/20"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => initiateStatusUpdate(txn.id, 'rejected')}
                                                        className="flex-1 py-2.5 bg-white border border-rose-200 text-rose-600 rounded-xl font-bold text-sm"
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Desktop Table Row */}
                                    <div className="hidden md:grid grid-cols-[repeat(14,minmax(0,1fr))] gap-4 px-6 py-4 items-center hover:bg-slate-50/80 transition-all group min-w-[1600px]">
                                        <div className="col-span-1">
                                            <div className="font-bold text-slate-700 text-sm">{formatDate(txn.created_at)}</div>
                                            <div className="text-xs text-slate-400">{formatTime(txn.created_at)}</div>
                                        </div>
                                        <div className="col-span-2">
                                            <div className="font-mono text-[10px] font-medium text-slate-700 bg-slate-100 border border-slate-200 px-2 py-1 rounded-lg w-fit truncate max-w-full" title={txn.order_id}>
                                                {txn.order_id}
                                            </div>
                                        </div>
                                        <div className="col-span-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-blue-600 font-bold text-xs border border-blue-100/50 shrink-0">
                                                    {txn.customer_details?.name ? txn.customer_details.name.charAt(0).toUpperCase() : 'U'}
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="font-bold text-slate-900 text-sm truncate">{txn.customer_details?.name || 'Unknown'}</div>
                                                    <div className="text-xs text-slate-500 break-words">{txn.customer_details?.email}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-2">
                                            <div className="text-sm font-medium text-slate-700 truncate" title={txn.merchant_upi_id}>
                                                {txn.merchant_upi_id || '-'}
                                            </div>
                                            <div className="text-[10px] text-slate-400">Merchant VPA</div>
                                        </div>
                                        <div className="col-span-1">
                                            <div className="font-bold text-slate-900">₹{txn.amount.toLocaleString()}</div>
                                            <div className="text-[10px] text-slate-400 font-medium">INR</div>
                                        </div>
                                        <div className="col-span-1">
                                            <div className="font-mono text-xs text-slate-600 bg-white border border-slate-200 px-2 py-1 rounded w-fit break-all">
                                                {txn.utr || '-'}
                                            </div>
                                        </div>
                                        <div className="col-span-2">
                                            <StatusBadge status={txn.status} />
                                            {(txn.status === 'failed' || txn.status === 'rejected' || txn.status === 'cancelled') && txn.customer_details?.failure_reason && (
                                                <div className="text-[10px] text-rose-500 mt-1 font-medium truncate" title={txn.customer_details.failure_reason}>
                                                    {txn.customer_details.failure_reason}
                                                </div>
                                            )}
                                            {/* [NEW] Show Approver */}
                                            {txn.approved_by && (txn.status === 'verified' || txn.status === 'rejected') && (
                                                <div className="text-[10px] text-slate-400 mt-0.5 font-medium truncate flex items-center gap-1">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                                                    By: {txn.approved_by}
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-span-2 text-right flex items-center justify-end gap-2 whitespace-nowrap">
                                            {txn.screenshot_url && (
                                                <button
                                                    onClick={() => setSelectedTransaction(txn)}
                                                    className="px-3 py-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5"
                                                    title="View Proof"
                                                >
                                                    <Eye size={14} />
                                                    View
                                                </button>
                                            )}
                                            {(txn.status === 'pending_manual_verification' || txn.status === 'pending_payment' || txn.status === 'expired') ? (
                                                <div className="flex gap-1">
                                                    <button
                                                        onClick={() => initiateStatusUpdate(txn.id, 'verified')}
                                                        className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                                                        title="Approve"
                                                    >
                                                        <CheckCircle2 size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => initiateStatusUpdate(txn.id, 'rejected')}
                                                        className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                                                        title="Reject"
                                                    >
                                                        <XCircle size={18} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                                                    <MoreHorizontal size={18} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    )}
                </div>

                {/* Pagination Footer */}
                {totalPages > 1 && (
                    <div className="p-4 border-t border-slate-200 flex items-center justify-between bg-slate-50/50">
                        <div className="text-xs text-slate-500 font-medium">
                            Showing <span className="text-slate-900 font-bold">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="text-slate-900 font-bold">{Math.min(currentPage * ITEMS_PER_PAGE, totalTransactionsCount)}</span> of <span className="text-slate-900 font-bold">{totalTransactionsCount}</span>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <button
                                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                                className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
