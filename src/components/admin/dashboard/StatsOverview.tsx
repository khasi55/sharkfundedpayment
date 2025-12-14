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
                        <div className="flex items-center gap-3 mt-2 text-xs font-medium">
                            <span className="text-slate-400">{stats.todayCount} total</span>
                            <span className="text-slate-300">|</span>
                            <span className="text-emerald-600">{stats.todayApprovedCount} approved</span>
                            <span className="text-slate-300">|</span>
                            <span className="text-rose-600">{stats.todayRejectedCount} rejected</span>
                        </div>
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

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {/* Approved */}
                <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 flex flex-col justify-between h-24">
                    <div className="flex justify-between items-start">
                        <p className="text-emerald-600 text-xs font-bold uppercase tracking-wider">Approved</p>
                        <CheckCircle2 size={16} className="text-emerald-500" />
                    </div>
                    <h4 className="text-2xl font-bold text-emerald-900">{stats.approvedCount}</h4>
                </div>

                {/* Pending */}
                <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100 flex flex-col justify-between h-24">
                    <div className="flex justify-between items-start">
                        <p className="text-amber-600 text-xs font-bold uppercase tracking-wider">Pending</p>
                        <RefreshCcw size={16} className="text-amber-500" />
                    </div>
                    <h4 className="text-2xl font-bold text-amber-900">{stats.pendingCount}</h4>
                </div>

                {/* Rejected */}
                <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-100 flex flex-col justify-between h-24">
                    <div className="flex justify-between items-start">
                        <p className="text-rose-600 text-xs font-bold uppercase tracking-wider">Rejected</p>
                        <AlertCircle size={16} className="text-rose-500" />
                    </div>
                    <h4 className="text-2xl font-bold text-rose-900">{stats.rejectedCount}</h4>
                </div>

                {/* Failed */}
                <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100 flex flex-col justify-between h-24">
                    <div className="flex justify-between items-start">
                        <p className="text-orange-600 text-xs font-bold uppercase tracking-wider">Failed</p>
                        <AlertCircle size={16} className="text-orange-500" />
                    </div>
                    <h4 className="text-2xl font-bold text-orange-900">{stats.failedCount}</h4>
                </div>

                {/* Expired */}
                <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between h-24">
                    <div className="flex justify-between items-start">
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Expired</p>
                        <Clock size={16} className="text-slate-400" />
                    </div>
                    <h4 className="text-2xl font-bold text-slate-700">{stats.expiredCount}</h4>
                </div>
            </div>
        </div>
    );
}
