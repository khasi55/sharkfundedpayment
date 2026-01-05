import React from 'react';
import { Transaction } from './types';
import { Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface RecentActivityProps {
    transactions: Transaction[];
}

export default function RecentActivity({ transactions }: RecentActivityProps) {
    const recent = transactions.slice(0, 5);

    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm h-full flex flex-col">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="font-bold text-slate-900 text-lg">Recent Activity</h3>
                    <p className="text-slate-500 text-sm">Latest transactions</p>
                </div>
                <Link href="/sharkfunded2logintoadminwithpermission/transactions" className="p-2 hover:bg-slate-50 rounded-xl text-blue-600 transition-colors">
                    <ArrowRight size={20} />
                </Link>
            </div>

            <div className="flex-1 space-y-4">
                {recent.map(txn => (
                    <div key={txn.id} className="flex items-center gap-4">
                        <div className={`w-2 h-2 rounded-full shrink-0 
                            ${txn.status === 'verified' ? 'bg-emerald-500' :
                                txn.status === 'pending_manual_verification' ? 'bg-amber-500' :
                                    txn.status === 'failed' ? 'bg-orange-500' : 'bg-slate-300'
                            }`}
                        ></div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-slate-900 truncate">
                                {txn.customer_details?.name || 'Guest User'}
                            </p>
                            <p className="text-xs text-slate-500 truncate">
                                {txn.status === 'verified' ? 'Payment confirmed' :
                                    txn.status === 'pending_manual_verification' ? 'Submitted for review' :
                                        `Status: ${txn.status}`}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-bold text-slate-900">₹{txn.amount}</p>
                            <p className="text-[10px] text-slate-400">
                                {new Date(txn.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                        </div>
                    </div>
                ))}

                {recent.length === 0 && (
                    <div className="flex md:flex-col items-center justify-center h-full text-slate-400 gap-2 opacity-60">
                        <Clock size={24} />
                        <span className="text-sm">No recent activity</span>
                    </div>
                )}
            </div>
        </div>
    );
}
