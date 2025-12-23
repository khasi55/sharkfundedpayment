'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Search, RefreshCw, Key, MessageSquare, Clock, User } from 'lucide-react';

interface OtpLog {
    id: string;
    created_at: string;
    sender: string;
    raw_text: string;
    otp_code: string;
    otp_name: string;
}

const OtpsContent: React.FC = () => {
    const [logs, setLogs] = useState<OtpLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchLogs();

        const subscription = supabase
            .channel('otp_logs_channel')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'webhook_logs',
                    filter: 'is_otp=eq.true'
                },
                (payload) => {
                    setLogs(prev => [payload.new as OtpLog, ...prev]);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('webhook_logs')
                .select('*')
                .eq('is_otp', true)
                .order('created_at', { ascending: false })
                .limit(100);

            if (error) throw error;
            setLogs(data || []);
        } catch (error) {
            console.error('Error fetching OTP logs:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredLogs = logs.filter(log =>
        log.otp_code?.toLowerCase().includes(search.toLowerCase()) ||
        log.otp_name?.toLowerCase().includes(search.toLowerCase()) ||
        log.raw_text?.toLowerCase().includes(search.toLowerCase()) ||
        log.sender?.toLowerCase().includes(search.toLowerCase())
    );

    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).format(new Date(dateString));
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-slate-900">OTP Logs</h1>
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-blue-50 border border-blue-100 rounded-full">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">Live Updates</span>
                        </div>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">Monitor and search received OTP codes</p>
                </div>
                <button
                    onClick={fetchLogs}
                    className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-all shadow-sm flex items-center gap-2 text-sm font-medium"
                >
                    <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                    Refresh
                </button>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div className="p-6 border-b border-slate-100 bg-slate-50/30">
                    <div className="relative w-full sm:w-96 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search code, name, message..."
                            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-sm font-medium transition-all shadow-sm placeholder:text-slate-400"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-[11px]">Time Received</th>
                                <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-[11px]">OTP Code</th>
                                <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-[11px]">Associated Name</th>
                                <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-[11px]">Sender</th>
                                <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-[11px]">Full Message</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading && logs.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-24 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                            <p className="text-slate-500 font-medium">Loading logs...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredLogs.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-24 text-center text-slate-400 italic">
                                        No OTP logs found matching your search.
                                    </td>
                                </tr>
                            ) : (
                                filteredLogs.map((log) => (
                                    <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2 text-slate-600 font-medium">
                                                <Clock size={14} className="text-slate-400" />
                                                {formatDate(log.created_at)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Key size={16} className="text-blue-500" />
                                                <span className="font-mono text-lg font-black text-slate-900 tracking-widest bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">
                                                    {log.otp_code}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {log.otp_name ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                                    <span className="font-bold text-slate-800 uppercase text-xs tracking-wider">{log.otp_name}</span>
                                                </div>
                                            ) : (
                                                <span className="text-slate-400 italic text-xs">No name detected</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <User size={14} className="text-slate-400" />
                                                <span className="font-medium">{log.sender}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 max-w-xs">
                                            <div className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 group/msg relative">
                                                <MessageSquare size={14} className="text-slate-400 shrink-0 mt-0.5" />
                                                <p className="text-[11px] text-slate-500 leading-relaxed font-mono break-all line-clamp-2" title={log.raw_text}>
                                                    {log.raw_text}
                                                </p>
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
    );
};

export default OtpsContent;
