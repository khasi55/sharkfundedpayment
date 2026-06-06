import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Transaction } from './types';

interface DailyStat {
    date: string;
    totalAmount: number;
    count: number;
    verifiedCount: number;
}

interface RevenueChartProps {
    dailyStats: DailyStat[];
}

export default function RevenueChart({ dailyStats }: RevenueChartProps) {
    const data = useMemo(() => {
        // Generate last 30 days
        const days = Array.from({ length: 30 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (29 - i));
            return d.toISOString().split('T')[0];
        });

        const map = new Map<string, number>();
        (dailyStats || []).forEach(s => {
            map.set(s.date, s.totalAmount);
        });

        return days.map(date => ({
            date: new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
            fullDate: date,
            amount: map.get(date) || 0
        }));
    }, [dailyStats]);

    const totalRevenue = data.reduce((sum, item) => sum + item.amount, 0);
    const trend = data.length >= 2 ?
        ((data[data.length - 1].amount - data[data.length - 2].amount) / (data[data.length - 2].amount || 1)) * 100
        : 0;

    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm h-full flex flex-col">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="font-bold text-slate-900 text-lg">Revenue Trend</h3>
                    <p className="text-slate-500 text-sm">Volume over last 30 days</p>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-bold text-slate-900">₹{totalRevenue.toLocaleString()}</div>
                    <div className={`text-xs font-bold ${trend >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {trend > 0 ? '+' : ''}{trend.toFixed(1)}% vs yesterday
                    </div>
                </div>
            </div>

            <div className="flex-1 min-h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 10 }}
                            tickMargin={10}
                            minTickGap={30}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 10 }}
                            tickFormatter={(value) => `₹${value >= 1000 ? (value / 1000).toFixed(0) + 'k' : value}`}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            formatter={(value: number | undefined) => [`₹${(value ?? 0).toLocaleString()}`, 'Revenue']}
                            labelStyle={{ color: '#64748b', marginBottom: '4px' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="amount"
                            stroke="#2563eb"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorRevenue)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
