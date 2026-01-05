import React from 'react';
import { DashboardStats } from './types';
import { Target, TrendingUp, AlertTriangle } from 'lucide-react';

interface SuccessRateProps {
    stats: DashboardStats;
}

export default function SuccessRate({ stats }: SuccessRateProps) {
    const totalProcessed = stats.approvedCount + stats.rejectedCount + stats.failedCount;
    const rate = totalProcessed > 0 ? (stats.approvedCount / totalProcessed) * 100 : 0;

    // Determine color based on health
    const getColor = (r: number) => {
        if (r >= 90) return 'text-emerald-500';
        if (r >= 70) return 'text-blue-500';
        if (r >= 50) return 'text-amber-500';
        return 'text-rose-500';
    };

    const colorClass = getColor(rate);
    const strokeDasharray = `${rate}, 100`;

    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between h-full">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-bold text-slate-900 text-lg">Success Rate</h3>
                    <p className="text-slate-500 text-sm">Conversion health</p>
                </div>
                <div className="p-2 bg-slate-50 rounded-xl">
                    <Target size={20} className="text-slate-500" />
                </div>
            </div>

            <div className="flex items-center gap-6 mt-2">
                <div className="relative w-24 h-24 flex items-center justify-center">
                    <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                        {/* Background Circle */}
                        <path
                            className="text-slate-100"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3.5"
                        />
                        {/* Progress Circle */}
                        <path
                            className={colorClass}
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3.5"
                            strokeDasharray={strokeDasharray}
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-xl font-bold text-slate-900">{rate.toFixed(1)}%</span>
                    </div>
                </div>

                <div className="space-y-2 flex-1">
                    <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-500">Approved</span>
                        <span className="text-slate-900">{stats.approvedCount}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5">
                        <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${(stats.approvedCount / (totalProcessed || 1)) * 100}%` }}></div>
                    </div>

                    <div className="flex justify-between text-xs font-medium mt-1">
                        <span className="text-slate-500">Failed/Rejected</span>
                        <span className="text-slate-900">{stats.failedCount + stats.rejectedCount}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5">
                        <div className="bg-rose-500 h-1.5 rounded-full" style={{ width: `${((stats.failedCount + stats.rejectedCount) / (totalProcessed || 1)) * 100}%` }}></div>
                    </div>
                </div>
            </div>

            {rate < 70 && totalProcessed > 10 && (
                <div className="mt-4 flex items-center gap-2 text-xs font-medium text-amber-600 bg-amber-50 px-3 py-2 rounded-xl">
                    <AlertTriangle size={14} />
                    <span>Success rate is lower than average.</span>
                </div>
            )}
        </div>
    );
}
