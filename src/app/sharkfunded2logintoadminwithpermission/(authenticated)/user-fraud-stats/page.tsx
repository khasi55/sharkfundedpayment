'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, AlertTriangle, CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface UserFraudStat {
    email: string;
    name: string;
    totalAmount: number;
    verifiedCount: number;
    rejectedCount: number;
    totalCount: number;
    rejectionRate: number;
    isFraudulent: boolean;
}

export default function UserFraudStatsPage() {
    const [stats, setStats] = useState<UserFraudStat[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState<'all' | 'fraud' | 'normal'>('all');

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await axios.post('/api/admin/user-fraud-stats');
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

    // Apply filter
    const filteredStats = stats.filter(stat => {
        if (filter === 'fraud') return stat.isFraudulent;
        if (filter === 'normal') return !stat.isFraudulent;
        return true; // 'all'
    });

    const totalVerified = filteredStats.reduce((sum, s) => sum + s.verifiedCount, 0);
    const totalRejected = filteredStats.reduce((sum, s) => sum + s.rejectedCount, 0);
    const totalTransactions = totalVerified + totalRejected;
    const overallRejectionRate = totalTransactions > 0 ? (totalRejected / totalTransactions) * 100 : 0;
    const fraudulentUsers = filteredStats.filter(s => s.isFraudulent).length;

    return (
        <div className="space-y-8 animate-fade-in w-full max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                        <AlertTriangle size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">User Fraud Detection</h1>
                        <p className="text-slate-500 text-sm">Monitor suspicious user behavior and high rejection rates</p>
                    </div>
                </div>

                {/* Filter Buttons */}
                <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'all'
                            ? 'bg-white text-slate-900 shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                            }`}
                    >
                        All Users ({stats.length})
                    </button>
                    <button
                        onClick={() => setFilter('fraud')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'fraud'
                            ? 'bg-red-600 text-white shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                            }`}
                    >
                        Fraud Alerts ({stats.filter(s => s.isFraudulent).length})
                    </button>
                    <button
                        onClick={() => setFilter('normal')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'normal'
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                            }`}
                    >
                        Normal Users ({stats.filter(s => !s.isFraudulent).length})
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-6">
                    <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <CheckCircle size={28} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Verified Txns</p>
                        <h3 className="text-2xl font-bold text-slate-900 mt-1">
                            {totalVerified.toLocaleString()}
                        </h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-6">
                    <div className="w-14 h-14 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                        <XCircle size={28} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Rejected Txns</p>
                        <h3 className="text-2xl font-bold text-slate-900 mt-1">
                            {totalRejected.toLocaleString()}
                        </h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-6">
                    <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <Users size={28} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Rejection Rate</p>
                        <h3 className="text-2xl font-bold text-slate-900 mt-1">
                            {overallRejectionRate.toFixed(1)}%
                        </h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-red-200 shadow-sm flex items-center gap-6">
                    <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                        <AlertTriangle size={28} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Fraud Alerts</p>
                        <h3 className="text-2xl font-bold text-red-600 mt-1">
                            {fraudulentUsers}
                        </h3>
                    </div>
                </div>
            </div>

            {/* User Fraud Table */}
            <div className="grid grid-cols-1 gap-6">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <Users size={20} className="text-blue-600" />
                            User Statistics & Fraud Alerts
                        </h2>
                        <span className="text-sm text-slate-500">
                            {filteredStats.length} {filter === 'all' ? 'total' : filter === 'fraud' ? 'fraudulent' : 'normal'} users
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-xs">User</th>
                                    <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-xs text-right">Verified</th>
                                    <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-xs text-right">Rejected</th>
                                    <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-xs text-right">Rejection %</th>
                                    <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-xs text-right">Total Volume</th>
                                    <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-xs text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredStats.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                                            No {filter === 'fraud' ? 'fraudulent' : filter === 'normal' ? 'normal' : ''} users found
                                        </td>
                                    </tr>
                                ) : (
                                    filteredStats
                                        .sort((a, b) => b.rejectionRate - a.rejectionRate)
                                        .map((stat) => (
                                            <tr
                                                key={stat.email}
                                                className={`hover:bg-slate-50/50 transition-colors ${stat.isFraudulent ? 'bg-red-50/30' : ''
                                                    }`}
                                            >
                                                <td className="px-6 py-4 font-medium text-slate-700">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs uppercase ${stat.isFraudulent
                                                            ? 'bg-red-50 text-red-600'
                                                            : 'bg-blue-50 text-blue-600'
                                                            }`}>
                                                            {stat.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-slate-900">{stat.name}</div>
                                                            <div className="text-xs text-slate-500 font-mono">{stat.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-emerald-600 text-right font-medium">
                                                    {stat.verifiedCount.toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4 text-right font-medium">
                                                    <span className={stat.rejectedCount > 0 ? 'text-orange-600' : 'text-slate-400'}>
                                                        {stat.rejectedCount.toLocaleString()}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <span className={`font-bold text-base ${stat.rejectionRate > 50 ? 'text-red-600' :
                                                        stat.rejectionRate > 25 ? 'text-orange-600' :
                                                            'text-emerald-600'
                                                        }`}>
                                                        {stat.rejectionRate.toFixed(1)}%
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-slate-900 font-bold text-right">
                                                    ₹{stat.totalAmount.toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    {stat.isFraudulent ? (
                                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                                                            <AlertTriangle size={14} />
                                                            FRAUD ALERT
                                                        </span>
                                                    ) : stat.rejectionRate > 25 ? (
                                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">
                                                            WARNING
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                                                            <CheckCircle size={14} />
                                                            NORMAL
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Fraud Detection Info */}
            {fraudulentUsers > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                    <div className="flex items-start gap-4">
                        <AlertTriangle className="text-red-600 shrink-0 mt-0.5" size={24} />
                        <div>
                            <h3 className="font-bold text-red-900 mb-2">Fraud Detection Criteria</h3>
                            <p className="text-red-700 text-sm leading-relaxed">
                                Users are flagged as fraudulent if they have a <strong>rejection rate &gt; 50%</strong> with at least 5 transactions,
                                or have <strong>more than 10 rejected transactions</strong>. These users may be attempting fraudulent payments
                                or experiencing repeated payment failures.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
