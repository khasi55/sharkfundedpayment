import React from 'react';
import { Info, LucideIcon } from 'lucide-react';
import Sparkline from './Sparkline';

interface MetricCardProps {
    title: string;
    value: string | number;
    unit?: string;
    subLabel: string;
    subValue: string;
    data: number[];
    color: string;
    icon?: LucideIcon;
}

export default function MetricCard({ title, value, unit, subLabel, subValue, data, color, icon: Icon }: MetricCardProps) {
    return (
        <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-700">{title}</h3>
                    <Info size={14} className="text-slate-400 cursor-help" />
                </div>
                {Icon && <Icon size={16} className="text-slate-400" />}
            </div>

            <div className="flex justify-between items-end mb-4">
                <div>
                    <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">CURRENT</div>
                    <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-slate-900">{value}</span>
                        {unit && <span className="text-sm text-slate-500 font-medium">{unit}</span>}
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">{subLabel}</div>
                    <div className="flex items-baseline gap-1 justify-end">
                        <span className="text-xl font-bold text-slate-700">{subValue}</span>
                    </div>
                </div>
            </div>

            <div className="h-16 w-full mt-4">
                <Sparkline data={data} color={color} />
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">HISTORY (LAST 10 MINS)</div>
            </div>
        </div>
    );
}
