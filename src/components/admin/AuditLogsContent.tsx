"use client";

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Loader2, Search, ArrowLeft, ArrowRight } from 'lucide-react';

interface AuditLog {
    id: string;
    admin_email: string;
    action: string;
    details: any;
    ip_address: string;
    created_at: string;
}

export default function AuditLogsContent() {
    const [logs, setLogs] = useState<AuditLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchLogs = async (pageNum: number) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/audit-logs?page=${pageNum}&limit=20`);
            const data = await res.json();
            if (data.success) {
                setLogs(data.data);
                setTotalPages(data.pagination?.totalPages || 1);
            }
        } catch (error) {
            console.error('Failed to fetch logs:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs(page);
    }, [page]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight text-white">Activity Logs</h2>
                <div className="text-sm text-slate-400">
                    Tracking sensitive admin actions
                </div>
            </div>

            <div className="bg-[#111C44] rounded-2xl border border-white/5 overflow-hidden">
                <div className="p-6">
                    {loading ? (
                        <div className="flex justify-center py-10">
                            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-white/5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                            <th className="pb-4 pl-4">Timestamp</th>
                                            <th className="pb-4">Admin</th>
                                            <th className="pb-4">Action</th>
                                            <th className="pb-4">IP Address</th>
                                            <th className="pb-4 pr-4">Details</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm text-slate-300">
                                        {logs.map((log) => (
                                            <tr key={log.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                                                <td className="py-4 pl-4 font-mono text-slate-400">
                                                    {format(new Date(log.created_at), 'MMM d, yyyy HH:mm:ss')}
                                                </td>
                                                <td className="py-4 font-medium text-white">
                                                    {log.admin_email}
                                                </td>
                                                <td className="py-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${log.action.includes('DELETE') ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                                                        log.action.includes('ADD') ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                                                            'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                                                        }`}>
                                                        {log.action}
                                                    </span>
                                                </td>
                                                <td className="py-4 font-mono text-xs text-slate-500">
                                                    {log.ip_address}
                                                </td>
                                                <td className="py-4 pr-4 max-w-xs">
                                                    <pre className="text-xs text-slate-400 bg-black/20 p-2 rounded overflow-x-auto whitespace-pre-wrap">
                                                        {JSON.stringify(log.details, null, 2)}
                                                    </pre>
                                                </td>
                                            </tr>
                                        ))}
                                        {logs.length === 0 && (
                                            <tr>
                                                <td colSpan={5} className="py-8 text-center text-slate-500">
                                                    No activity logs found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="mt-6 flex justify-between items-center border-t border-white/5 pt-4">
                                <div className="text-sm text-slate-400">
                                    Page {page} of {totalPages}
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setPage(p => Math.max(1, p - 1))}
                                        disabled={page === 1}
                                        className="p-2 rounded-lg hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ArrowLeft className="w-4 h-4 text-white" />
                                    </button>
                                    <button
                                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                        disabled={page === totalPages}
                                        className="p-2 rounded-lg hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ArrowRight className="w-4 h-4 text-white" />
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
