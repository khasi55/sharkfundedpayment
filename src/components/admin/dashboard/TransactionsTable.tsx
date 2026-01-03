import React, { useState } from 'react';
import { Search, Calendar, ChevronDown, Download, Eye, CheckCircle2, XCircle, MoreHorizontal } from 'lucide-react';
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
}

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
    initiateStatusUpdate
}: TransactionsTableProps) {
    const [showDateFilter, setShowDateFilter] = useState(false);

    return (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            {/* Toolbar */}
            <div className="p-6 border-b border-slate-100 flex flex-col lg:flex-row gap-4 items-center justify-between bg-slate-50/30">
                <div className="flex items-center gap-4 w-full lg:w-auto">
                    <div className="relative w-full lg:w-96 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search by Order ID, UTR, or Email..."
                            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-sm font-medium transition-all shadow-sm placeholder:text-slate-400"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="relative flex items-center gap-2">
                        {dateFilter === 'custom' && (
                            <input
                                type="date"
                                value={customDate}
                                onChange={(e) => setCustomDate(e.target.value)}
                                className="px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none shadow-sm animate-fade-in"
                            />
                        )}

                        <div className="relative">
                            <button
                                onClick={() => setShowDateFilter(!showDateFilter)}
                                className="p-3 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-all shadow-sm flex items-center gap-2"
                            >
                                <Calendar size={18} />
                                <span className="text-sm font-medium hidden sm:inline">
                                    {dateFilter === 'all' ? 'All Time' : dateFilter === 'today' ? 'Today' : dateFilter === 'week' ? 'Last 7 Days' : dateFilter === 'month' ? 'Last 30 Days' : 'Specific Date'}
                                </span>
                                <ChevronDown size={14} />
                            </button>

                            {showDateFilter && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setShowDateFilter(false)}></div>
                                    <div className="absolute top-full mt-2 left-0 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-20 animate-scale-in">
                                        {[
                                            { label: 'All Time', value: 'all' },
                                            { label: 'Today', value: 'today' },
                                            { label: 'Last 7 Days', value: 'week' },
                                            { label: 'Last 30 Days', value: 'month' },
                                            { label: 'Specific Date', value: 'custom' }
                                        ].map((option) => (
                                            <button
                                                key={option.value}
                                                onClick={() => {
                                                    setDateFilter(option.value);
                                                    if (option.value === 'custom' && !customDate) {
                                                        setCustomDate(new Date().toISOString().split('T')[0]);
                                                    }
                                                    setShowDateFilter(false);
                                                }}
                                                className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors ${dateFilter === option.value ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={handleExport}
                        className="p-3 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-all shadow-sm flex items-center gap-2"
                        title="Export to CSV"
                    >
                        <Download size={18} />
                        <span className="text-sm font-medium hidden sm:inline">Export</span>
                    </button>
                </div>

                <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
                    {['all', 'verified', 'pending_manual_verification', 'rejected', 'cancelled', 'expired'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${filter === f
                                ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/20 transform scale-105'
                                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                                }`}
                        >
                            {f === 'pending_manual_verification' ? 'Pending Review' : f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto w-full">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-[11px] w-[15%]">Date & Time</th>
                            <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-[11px] w-[15%]">Order ID</th>
                            <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-[11px] w-[15%]">UTR</th>
                            <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-[11px] w-[15%]">Bank / UPI</th>
                            <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-[11px] w-[15%]">Customer</th>
                            <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-[11px] w-[10%]">Amount</th>
                            <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-[11px] w-[10%]">Status</th>
                            <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-[11px] w-[10%]">Proof</th>
                            <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-[11px] text-right w-[5%]">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {loading ? (
                            <tr>
                                <td colSpan={9} className="px-6 py-24 text-center">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                        <p className="text-slate-500 font-medium">Loading transactions...</p>
                                    </div>
                                </td>
                            </tr>
                        ) : transactions.length === 0 ? (
                            <tr>
                                <td colSpan={9} className="px-6 py-24 text-center">
                                    <div className="flex flex-col items-center gap-3 opacity-50">
                                        <Search size={48} className="text-slate-300" />
                                        <p className="text-slate-500 font-medium">No transactions found</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            transactions.map((txn) => (
                                <tr key={txn.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-bold text-slate-700">{formatDate(txn.created_at)}</div>
                                        <div className="text-xs text-slate-400 font-medium mt-0.5">{formatTime(txn.created_at)}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded border border-slate-200 w-fit block truncate max-w-[120px]" title={txn.order_id}>
                                            {txn.order_id}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-mono text-xs text-slate-600 block truncate max-w-[120px]" title={txn.utr}>
                                            {txn.utr}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs font-medium text-slate-600 block truncate max-w-[150px]" title={txn.merchant_upi_id}>
                                            {txn.merchant_upi_id || '-'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-700 font-bold text-xs border border-blue-200 shadow-sm flex-shrink-0">
                                                {txn.customer_details?.name?.charAt(0) || 'U'}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="font-bold text-slate-900 text-sm truncate">{txn.customer_details?.name}</div>
                                                <div className="text-slate-500 text-xs truncate">{txn.customer_details?.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-bold text-slate-900 text-sm">₹{txn.amount.toLocaleString()}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col items-start gap-1">
                                            <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm whitespace-nowrap ${getStatusStyle(txn.status)}`}>
                                                {txn.status === 'pending_manual_verification' ? 'Pending Review' :
                                                    txn.status === 'pending_payment' ? (txn.utr && !txn.utr.startsWith('ORDER-') ? `Checking UTR: ${txn.utr}` : 'Pending Payment') :
                                                        txn.status}
                                            </span>

                                            {/* Visible Failure/Cancellation Reason */}
                                            {(txn.status === 'failed' || txn.status === 'cancelled' || txn.status === 'rejected' || txn.status === 'expired') && txn.customer_details?.failure_reason && (
                                                <div className="mt-1 px-1">
                                                    <p className="text-[10px] font-bold text-slate-500 leading-tight flex items-center gap-1">
                                                        <span className="w-1 h-1 rounded-full bg-slate-400 shrink-0"></span>
                                                        {txn.customer_details.failure_reason}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {txn.screenshot_url ? (
                                            <button
                                                onClick={() => setSelectedTransaction(txn)}
                                                className="group/btn flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
                                            >
                                                <Eye size={14} className="text-slate-400 group-hover/btn:text-blue-600 transition-colors" />
                                                <span className="text-xs font-medium text-slate-600 group-hover/btn:text-blue-700">View</span>
                                            </button>
                                        ) : (
                                            <span className="text-slate-300 text-xs italic">No proof</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {txn.status === 'pending_manual_verification' ? (
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => initiateStatusUpdate(txn.id, 'verified')}
                                                    className="p-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-500 hover:text-white hover:shadow-lg hover:shadow-emerald-500/20 border border-emerald-200 hover:border-emerald-500 transition-all duration-200"
                                                    title="Approve"
                                                >
                                                    <CheckCircle2 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => initiateStatusUpdate(txn.id, 'rejected')}
                                                    className="p-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-500 hover:text-white hover:shadow-lg hover:shadow-rose-500/20 border border-rose-200 hover:border-rose-500 transition-all duration-200"
                                                    title="Reject"
                                                >
                                                    <XCircle size={18} />
                                                </button>
                                            </div>
                                        ) : (
                                            <button className="p-2 text-slate-300 hover:text-slate-500 transition-colors">
                                                <MoreHorizontal size={18} />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
