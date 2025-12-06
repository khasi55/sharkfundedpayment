import React from 'react';
import { Activity } from 'lucide-react';

interface ActiveIncidentProps {
    status: {
        message?: string;
        location?: string;
        stack?: string;
        timestamp?: string;
    };
}

export default function ActiveIncident({ status }: ActiveIncidentProps) {
    return (
        <div className="px-6 pt-6 max-w-7xl mx-auto animate-fade-in">
            <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 flex items-start gap-4 shadow-sm">
                <div className="p-2 bg-rose-100 rounded-full shrink-0">
                    <Activity size={20} className="text-rose-600" />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-rose-900 font-bold text-sm uppercase tracking-wide mb-1">Critical System Alert</h3>
                    <p className="text-rose-800 font-bold mb-2">{status.message || 'Unknown System Error'}</p>

                    {status.location && (
                        <div className="flex items-center gap-2 text-xs text-rose-700 mb-2">
                            <span className="font-bold">Location:</span>
                            <span className="font-mono bg-rose-100 px-1.5 py-0.5 rounded">{status.location}</span>
                        </div>
                    )}

                    {status.stack && (
                        <div className="mt-3 bg-rose-950/5 rounded-lg p-3 overflow-x-auto">
                            <p className="text-[10px] font-bold text-rose-900 uppercase mb-1">Stack Trace</p>
                            <pre className="text-[10px] text-rose-800 font-mono whitespace-pre-wrap break-all">
                                {status.stack}
                            </pre>
                        </div>
                    )}

                    <div className="mt-2 text-xs text-rose-600 font-mono">
                        Timestamp: {status.timestamp ? new Date(status.timestamp).toLocaleString() : new Date().toLocaleString()}
                    </div>
                </div>
            </div>
        </div>
    );
}
