import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Loader2 } from 'lucide-react';

interface DailyStat {
    date: string;
    totalAmount: number;
    count: number;
    verifiedCount: number;
}

export default function CalendarStats() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [stats, setStats] = useState<DailyStat[]>([]);
    const [loading, setLoading] = useState(true);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 = Sunday

    const monthName = currentDate.toLocaleString('default', { month: 'long' });

    useEffect(() => {
        fetchStats();
    }, [year, month]);

    const fetchStats = async () => {
        setLoading(true);
        try {
            // Fetch for the specific month range
            const startStr = new Date(year, month, 1).toISOString();
            const endStr = new Date(year, month + 1, 0).toISOString();

            const response = await axios.post('/api/admin/daily-stats', {
                startDate: startStr,
                endDate: endStr
            });

            if (response.data.success) {
                setStats(response.data.stats);
            }
        } catch (error) {
            console.error('Failed to fetch calendar stats', error);
        } finally {
            setLoading(false);
        }
    };

    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const getDayStats = (day: number) => {
        const dateStr = new Date(year, month, day + 1).toISOString().split('T')[0]; // Adjust for timezone/UTC if needed or string match
        // Actually, let's match by local date string formatted consistently
        // our API returns YYYY-MM-DD based on created_at (UTC). 
        // We should construct the comparison key carefully. 
        // Let's rely on the string format coming from API which is YYYY-MM-DD.
        // And construct our target YYYY-MM-DD.

        // Simple formatter:
        const d = new Date(year, month, day);
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const da = String(d.getDate()).padStart(2, '0');
        const key = `${y}-${m}-${da}`;

        return stats.find(s => s.date === key);
    };

    const renderCalendarDays = () => {
        const days = [];

        // Empty slots for previous month
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="h-24 bg-slate-50/50 border border-slate-100 rounded-lg"></div>);
        }

        // Actual days
        for (let d = 1; d <= daysInMonth; d++) {
            const stat = getDayStats(d);
            const hasData = stat && stat.count > 0;
            const isToday = new Date().toDateString() === new Date(year, month, d).toDateString();

            days.push(
                <div
                    key={d}
                    className={`h-24 border rounded-xl p-2 flex flex-col justify-between transition-all hover:shadow-md ${isToday ? 'bg-blue-50 border-blue-200 ring-1 ring-blue-100' : 'bg-white border-slate-100'
                        }`}
                >
                    <div className="flex justify-between items-start">
                        <span className={`text-xs font-bold ${isToday ? 'text-blue-600' : 'text-slate-400'}`}>{d}</span>
                        {hasData && (
                            <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-bold">
                                {stat.verifiedCount}
                            </span>
                        )}
                    </div>

                    {hasData ? (
                        <div className="text-right">
                            <div className="text-[10px] text-slate-500 font-medium">{stat.count} txns</div>
                            <div className="text-xs font-bold text-slate-800">₹{stat.totalAmount.toLocaleString()}</div>
                        </div>
                    ) : (
                        <div className="flex-1 flex items-center justify-center">
                            <span className="text-slate-200 text-xs">-</span>
                        </div>
                    )}
                </div>
            );
        }

        return days;
    };

    return (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <CalendarIcon size={20} />
                    </div>
                    <h2 className="font-bold text-slate-800">Transaction Calendar</h2>
                </div>

                <div className="flex items-center gap-2 bg-slate-50 rounded-lg p-1">
                    <button onClick={prevMonth} className="p-1.5 hover:bg-white hover:shadow-sm rounded-md transition-all text-slate-500 hover:text-slate-700">
                        <ChevronLeft size={16} />
                    </button>
                    <span className="text-xs font-bold text-slate-700 w-24 text-center select-none">{monthName} {year}</span>
                    <button onClick={nextMonth} className="p-1.5 hover:bg-white hover:shadow-sm rounded-md transition-all text-slate-500 hover:text-slate-700">
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            <div className="p-6">
                {/* Weekday Headers */}
                <div className="grid grid-cols-7 gap-4 mb-4">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="text-center text-xs font-bold text-slate-400 uppercase tracking-wider">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-4">
                    {loading ? (
                        <div className="col-span-7 h-64 flex items-center justify-center text-slate-400 gap-2">
                            <Loader2 className="animate-spin" size={20} />
                            <span className="text-sm">Loading calendar...</span>
                        </div>
                    ) : (
                        renderCalendarDays()
                    )}
                </div>
            </div>
        </div>
    );
}
