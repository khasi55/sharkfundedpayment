import React from 'react';
import { Banknote, Users, Clock, RefreshCcw, CheckCircle2, AlertCircle } from 'lucide-react';
import { DashboardStats } from './types';

interface StatsOverviewProps {
    stats: DashboardStats;
}

export default function StatsOverview({ stats }: StatsOverviewProps) {
    return (
        <div className="space-y-8 animate-fade-in w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Revenue */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2.5 bg-blue-50 rounded-xl">
                            <Banknote className="text-blue-600" size={20} />
                        </div>
                    </div>
                    <div>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Revenue</p>
                        <h3 className="text-2xl font-bold text-slate-900 mt-1">₹{stats.totalRevenue.toLocaleString()}</h3>
                    </div>
                </div>

                {/* Total Users */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2.5 bg-indigo-50 rounded-xl">
                            <Users className="text-indigo-600" size={20} />
                        </div>
                    </div>
                    <div>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Users</p>
                        <h3 className="text-2xl font-bold text-slate-900 mt-1">{stats.totalUsers}</h3>
                    </div>
                </div>

                {/* Today's Stats */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2.5 bg-purple-50 rounded-xl">
                            <Clock className="text-purple-600" size={20} />
                        </div>
                    </div>
                    <div>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Today's Volume</p>
                        <h3 className="text-2xl font-bold text-slate-900 mt-1">₹{stats.todayVolume.toLocaleString()}</h3>
                        <p className="text-xs text-slate-400 mt-1">{stats.todayCount} transactions today</p>
                    </div>
                </div>

                {/* Pending Actions */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2.5 bg-amber-50 rounded-xl">
                            <RefreshCcw className="text-amber-600" size={20} />
                        </div>
                        {stats.pendingCount > 0 && (
                            <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100 animate-pulse">
                                Action Needed
                            </span>
                        )}
                    </div>
                    <div>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Pending Review</p>
                        <h3 className="text-2xl font-bold text-slate-900 mt-1">{stats.pendingCount}</h3>
                    </div>
                </div>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Total Payments */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
                    <div>
                        <p className="text-slate-500 text-xs font-bold uppercase">Total Payments</p>
                        <h4 className="text-xl font-bold text-slate-900 mt-1">{stats.totalPayments}</h4>
                    </div>
                    <div className="h-8 w-1 bg-slate-200 rounded-full"></div>
                </div>

                {/* Approved */}
                <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 flex items-center justify-between">
                    <div>
                        <p className="text-emerald-600 text-xs font-bold uppercase">Approved</p>
                        <h4 className="text-xl font-bold text-emerald-900 mt-1">{stats.approvedCount}</h4>
                    </div>
                    <div className="p-1.5 bg-emerald-100 rounded-lg">
                        <CheckCircle2 size={16} className="text-emerald-600" />
                    </div>
                </div>

                {/* Failed/Rejected */}
                <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-100 flex items-center justify-between">
                    <div>
                        <p className="text-rose-600 text-xs font-bold uppercase">Failed / Rejected</p>
                        <h4 className="text-xl font-bold text-rose-900 mt-1">{stats.failedRejectedCount}</h4>
                    </div>
                    <div className="p-1.5 bg-rose-100 rounded-lg">
                        <AlertCircle size={16} className="text-rose-600" />
                    </div>
                </div>
            </div>
        </div>
    );
}
