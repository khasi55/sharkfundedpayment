import React from 'react';
import { XCircle, Download, CheckCircle2 } from 'lucide-react';
import { Transaction } from './types';

interface TransactionDetailModalProps {
    transaction: Transaction;
    onClose: () => void;
    formatDate: (dateString: string) => string;
    formatTime: (dateString: string) => string;
    initiateStatusUpdate: (id: string, status: 'verified' | 'rejected') => void;
}

export default function TransactionDetailModal({
    transaction,
    onClose,
    formatDate,
    formatTime,
    initiateStatusUpdate
}: TransactionDetailModalProps) {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-4 animate-fade-in" onClick={onClose}>
            <div className="relative max-w-7xl max-h-[90vh] w-full bg-white rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/20 flex flex-col lg:flex-row" onClick={e => e.stopPropagation()}>
                <div className="absolute top-4 right-4 z-10 lg:hidden">
                    <button
                        onClick={onClose}
                        className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-md transition-all"
                    >
                        <XCircle size={24} />
                    </button>
                </div>

                {/* Left Column: Details */}
                <div className="w-full lg:w-1/3 bg-slate-50 border-r border-slate-200 flex flex-col max-h-[40vh] lg:max-h-full overflow-y-auto">
                    <div className="p-6 border-b border-slate-200 bg-white sticky top-0 z-10">
                        <h3 className="text-lg font-bold text-slate-900">Transaction Details</h3>
                        <p className="text-sm text-slate-500">Review details carefully before approving.</p>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Amount */}
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Amount</p>
                            <div className="text-2xl font-bold text-slate-900">₹{transaction.amount.toLocaleString()}</div>
                        </div>

                        {/* UTR */}
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm group relative">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">UTR Number</p>
                            <div className="flex items-center gap-2">
                                <code className="text-lg font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{transaction.utr}</code>
                                <button
                                    onClick={() => navigator.clipboard.writeText(transaction.utr)}
                                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    title="Copy UTR"
                                >
                                    <Download size={16} className="rotate-[-90deg]" />
                                </button>
                            </div>
                        </div>

                        {/* Customer */}
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Customer</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-700 font-bold text-sm border border-indigo-200">
                                        {transaction.customer_details?.name?.charAt(0) || 'U'}
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-900">{transaction.customer_details?.name}</div>
                                        <div className="text-xs text-slate-500">{transaction.customer_details?.email}</div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Order ID</p>
                                <div className="font-mono text-sm text-slate-700 bg-slate-100 px-2 py-1 rounded w-fit">{transaction.order_id}</div>
                            </div>

                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Date</p>
                                <div className="text-sm text-slate-700">{formatDate(transaction.created_at)} at {formatTime(transaction.created_at)}</div>
                            </div>
                        </div>

                        {/* Status Actions */}
                        {transaction.status === 'pending_manual_verification' && (
                            <div className="pt-4 border-t border-slate-200 grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => {
                                        initiateStatusUpdate(transaction.id, 'verified');
                                        onClose();
                                    }}
                                    className="flex items-center justify-center gap-2 p-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-500/20 transition-all font-bold text-sm"
                                >
                                    <CheckCircle2 size={18} /> Approve
                                </button>
                                <button
                                    onClick={() => {
                                        initiateStatusUpdate(transaction.id, 'rejected');
                                        onClose();
                                    }}
                                    className="flex items-center justify-center gap-2 p-3 bg-white text-rose-600 border border-rose-200 rounded-xl hover:bg-rose-50 hover:border-rose-300 transition-all font-bold text-sm"
                                >
                                    <XCircle size={18} /> Reject
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Image */}
                <div className="flex-1 bg-slate-900 overflow-auto relative flex flex-col h-[60vh] lg:h-auto">
                    <div className="absolute top-4 right-4 z-10 hidden lg:block">
                        <button
                            onClick={onClose}
                            className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-md transition-all"
                        >
                            <XCircle size={24} />
                        </button>
                    </div>

                    {transaction.screenshot_url ? (
                        <div className="flex-1 flex items-center justify-center p-4 min-h-full">
                            <img
                                src={transaction.screenshot_url}
                                alt="Payment Proof"
                                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                            />
                        </div>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-slate-500">
                            <p>No screenshot available</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
