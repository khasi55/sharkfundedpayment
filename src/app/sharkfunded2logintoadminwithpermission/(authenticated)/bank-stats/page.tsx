'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Landmark, Wallet, Loader2 } from 'lucide-react';

interface BankStat {
    upiId: string;
    totalAmount: number;
    count: number;
}

export default function BankStatsPage() {
    const [stats, setStats] = useState<BankStat[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await axios.post('/api/admin/bank-stats');
            if (response.data.success) {
                setStats(response.data.stats);
            } else {
                setError(response.data.message || 'Failed to fetch stats');
            }
        } catch (err: any) {
            setError(err.message || 'Error fetching stats');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="animate-spin text-blue-600" size={32} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 text-center">
                <p className="text-red-500 font-medium">Error: {error}</p>
                <button
                    onClick={fetchStats}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Retry
                </button>
            </div>
        );
    }

    const totalVolume = stats.reduce((sum, s) => sum + s.totalAmount, 0);
    const totalTxns = stats.reduce((sum, s) => sum + s.count, 0);

    return (
        <div className="space-y-8 animate-fade-in w-full max-w-7xl mx-auto">
            {/* Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-6">
                    <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <Wallet size={28} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Total Volume</p>
                        <h3 className="text-2xl font-bold text-slate-900 mt-1">
                            ₹{totalVolume.toLocaleString()}
                        </h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-6">
                    <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <ActivityIcon size={28} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Total Transactions</p>
                        <h3 className="text-2xl font-bold text-slate-900 mt-1">
                            {totalTxns.toLocaleString()}
                        </h3>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-6">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <Landmark size={20} className="text-blue-600" />
                            Bank / UPI Performance
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-xs">Merchant UPI ID</th>
                                    <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-xs text-right">Transactions</th>
                                    <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-xs text-right">Total Volume</th>
                                    <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-xs text-right">Share of Vol</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {stats.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                                            No data available
                                        </td>
                                    </tr>
                                ) : (
                                    stats.sort((a, b) => b.totalAmount - a.totalAmount).map((stat) => (
                                        <tr key={stat.upiId} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-slate-700">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs uppercase">
                                                        {stat.upiId.charAt(0)}
                                                    </div>
                                                    <span className="font-mono">{stat.upiId}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-600 text-right font-medium">
                                                {stat.count.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 text-slate-900 font-bold text-right">
                                                ₹{stat.totalAmount.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <span className="text-xs font-medium text-slate-500">
                                                        {totalVolume > 0 ? ((stat.totalAmount / totalVolume) * 100).toFixed(1) : 0}%
                                                    </span>
                                                    <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-blue-500 rounded-full"
                                                            style={{ width: `${totalVolume > 0 ? (stat.totalAmount / totalVolume) * 100 : 0}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

const ActivityIcon = ({ size }: { size: number }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
);
