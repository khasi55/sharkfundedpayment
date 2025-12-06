import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Search, RefreshCw, MessageSquare } from 'lucide-react';
import WebhookLogsTable from '@/components/admin/dashboard/webhooks/WebhookLogsTable';

interface WebhookLog {
    id: string;
    created_at: string;
    utr: string;
    amount: number;
    sender: string;
    raw_text: string;
}

const WebhookLogsContent: React.FC = () => {
    const [logs, setLogs] = useState<WebhookLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchLogs();

        const subscription = supabase
            .channel('webhook_logs_channel')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'webhook_logs' },
                (payload) => {
                    setLogs(prev => [payload.new as WebhookLog, ...prev]);
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
                .order('created_at', { ascending: false })
                .limit(100);

            if (error) throw error;
            setLogs(data || []);
        } catch (error) {
            console.error('Error fetching logs:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }).format(new Date(dateString));
    };

    const formatTime = (dateString: string) => {
        return new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        }).format(new Date(dateString));
    };

    const filteredLogs = logs.filter(log =>
        log.utr?.toLowerCase().includes(search.toLowerCase()) ||
        log.raw_text?.toLowerCase().includes(search.toLowerCase()) ||
        log.sender?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-slate-900">Received Confirmations</h1>
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50 border border-emerald-100 rounded-full">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Live</span>
                        </div>
                    </div>

                </div>
                <button
                    onClick={fetchLogs}
                    className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-all shadow-sm"
                    title="Refresh"
                >
                    <RefreshCw size={18} />
                </button>
            </div>

            <WebhookLogsTable
                logs={logs}
                loading={loading}
                search={search}
                setSearch={setSearch}
                formatDate={formatDate}
                formatTime={formatTime}
            />
        </div>
    );
};

export default WebhookLogsContent;
