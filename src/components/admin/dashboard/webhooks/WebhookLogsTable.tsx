import React from 'react';
import { Search } from 'lucide-react';

interface WebhookLog {
    id: string;
    created_at: string;
    utr: string;
    amount: number;
    sender: string;
    raw_text: string;
}

interface WebhookLogsTableProps {
    logs: WebhookLog[];
    loading: boolean;
    search: string;
    setSearch: (value: string) => void;
    formatDate: (dateString: string) => string;
    formatTime: (dateString: string) => string;
}

const WebhookLogsTable: React.FC<WebhookLogsTableProps> = ({
    logs,
    loading,
    search,
    setSearch,
    formatDate,
    formatTime,
}) => {
    // Filter logs based on search
    const filteredLogs = logs.filter(log =>
        log.utr?.toLowerCase().includes(search.toLowerCase()) ||
        log.raw_text?.toLowerCase().includes(search.toLowerCase()) ||
        log.sender?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            {/* Toolbar */}
            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50/30">
                <div className="relative w-full sm:w-96 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search by UTR, Sender, or Raw Text..."
                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-sm font-medium transition-all shadow-sm placeholder:text-slate-400"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto w-full">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-[11px]">Date & Time</th>
                            <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-[11px]">UTR</th>
                            <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-[11px]">Amount</th>
                            <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-[11px]">Sender</th>
                            <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-[11px]">Raw Text</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {loading ? (
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
                                <td colSpan={5} className="px-6 py-24 text-center">
                                    <div className="flex flex-col items-center gap-3 opacity-50">
                                        <Search size={48} className="text-slate-300" />
                                        <p className="text-slate-500 font-medium">No logs found</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            filteredLogs.map((log) => (
                                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-bold text-slate-700">{formatDate(log.created_at)}</div>
                                        <div className="text-xs text-slate-400 font-medium mt-0.5">{formatTime(log.created_at)}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded border border-slate-200 block w-fit">
                                            {log.utr}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-bold text-slate-900 text-sm">₹{log.amount.toLocaleString()}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-slate-600 font-medium">{log.sender}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="group/code relative">
                                            <div className="font-mono text-[10px] text-slate-500 bg-slate-50 border border-slate-100 p-2 rounded-lg max-w-xs truncate cursor-help" title={log.raw_text}>
                                                {log.raw_text}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WebhookLogsTable;
