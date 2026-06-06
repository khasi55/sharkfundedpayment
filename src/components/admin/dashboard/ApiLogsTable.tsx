import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Search, RefreshCw, FileJson, Calendar, Database, Eye } from 'lucide-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface ApiLog {
    id: string;
    created_at: string;
    endpoint: string;
    request_payload: any;
    metadata: any;
    ip_address: string;
}

const ApiLogsTable = () => {
    const [logs, setLogs] = useState<ApiLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedLog, setSelectedLog] = useState<ApiLog | null>(null);

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/admin/api-logs');
            const result = await response.json();

            if (result.success) {
                setLogs(result.data || []);
            } else {
                console.error('Failed to fetch logs:', result.message);
            }
        } catch (error) {
            console.error('Error fetching logs:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    const filteredLogs = logs.filter(log => {
        const payloadStr = JSON.stringify(log.request_payload).toLowerCase();
        const searchLower = search.toLowerCase();
        return payloadStr.includes(searchLower) ||
            log.endpoint.includes(searchLower) ||
            (log.metadata?.order_id && log.metadata.order_id.toLowerCase().includes(searchLower));
    });

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h3 className="text-lg font-bold text-slate-800">API Payload Logs</h3>
                    <p className="text-sm text-slate-500">View incoming raw data from merchants</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search payloads..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-full md:w-64"
                        />
                    </div>
                    <button
                        onClick={fetchLogs}
                        className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Refresh Logs"
                    >
                        <RefreshCw size={18} />
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                            <th className="px-6 py-4">Time</th>
                            <th className="px-6 py-4">Endpoint</th>
                            <th className="px-6 py-4">Name / Email</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4">Callback URL</th>
                            <th className="px-6 py-4">Ref ID</th>
                            <th className="px-6 py-4 text-right">Raw</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <tr key={i} className="animate-pulse">
                                    <td className="px-6 py-4"><div className="h-4 bg-slate-100 rounded w-24"></div></td>
                                    <td className="px-6 py-4"><div className="h-4 bg-slate-100 rounded w-32"></div></td>
                                    <td className="px-6 py-4"><div className="h-4 bg-slate-100 rounded w-40"></div></td>
                                    <td className="px-6 py-4"><div className="h-4 bg-slate-100 rounded w-16"></div></td>
                                    <td className="px-6 py-4"><div className="h-4 bg-slate-100 rounded w-32"></div></td>
                                    <td className="px-6 py-4"><div className="h-4 bg-slate-100 rounded w-20"></div></td>
                                    <td className="px-6 py-4"><div className="h-4 bg-slate-100 rounded w-8 ml-auto"></div></td>
                                </tr>
                            ))
                        ) : filteredLogs.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                                    <Database size={32} className="mx-auto mb-3 opacity-20" />
                                    <p>No logs found</p>
                                </td>
                            </tr>
                        ) : (
                            filteredLogs.map((log) => {
                                const payload = log.request_payload || {};
                                const name = payload.name || 'N/A';
                                const email = payload.email || 'N/A';
                                const amount = payload.amount;
                                const callbackUrl = payload.callback_url || payload.callbackUrl || '-';
                                const refId = payload.reference_id || payload.referenceId || '-';

                                return (
                                    <tr key={log.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-slate-700">
                                                    {dayjs(log.created_at).format('MMM D, HH:mm')}
                                                </span>
                                                <span className="text-xs text-slate-400">
                                                    {dayjs(log.created_at).fromNow()}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                                {log.endpoint}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-slate-900">{name}</span>
                                                <span className="text-xs text-slate-500">{email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-mono text-sm text-slate-600">
                                            {amount ? `₹${amount}` : '-'}
                                        </td>
                                        <td className="px-6 py-4 max-w-xs truncate text-xs text-slate-500" title={callbackUrl}>
                                            {callbackUrl}
                                        </td>
                                        <td className="px-6 py-4 font-mono text-xs text-slate-600">
                                            {refId}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => setSelectedLog(log)}
                                                className="text-slate-400 hover:text-blue-600 p-1.5 hover:bg-blue-50 rounded-lg transition-colors"
                                            >
                                                <Eye size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Detailed JSON Modal */}
            {selectedLog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden">
                        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                                <FileJson size={20} className="text-blue-500" />
                                Payload Details
                            </h3>
                            <button onClick={() => setSelectedLog(null)} className="text-slate-400 hover:text-slate-600">
                                Close
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto font-mono text-sm bg-slate-900 text-slate-300">
                            <pre className="whitespace-pre-wrap break-all">
                                {JSON.stringify(selectedLog.request_payload, null, 2)}
                            </pre>
                            <div className="mt-4 pt-4 border-t border-slate-700">
                                <p className="text-xs text-slate-500 mb-1">METADATA</p>
                                <pre className="text-xs text-slate-400">
                                    {JSON.stringify(selectedLog.metadata, null, 2)}
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApiLogsTable;
