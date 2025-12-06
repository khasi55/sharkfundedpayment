import React, { useState, useEffect } from 'react';
import { Activity, RefreshCw, CheckCircle2, Clock } from 'lucide-react';
import MetricCard from './system-status/MetricCard';
import ActiveIncident from './system-status/ActiveIncident';

const SystemStatusContent = () => {
    const [status, setStatus] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Real Data Accumulators
    const [latencyHistory, setLatencyHistory] = useState<number[]>(Array(20).fill(0));
    const [successRateHistory, setSuccessRateHistory] = useState<number[]>(Array(20).fill(100));

    const checkStatus = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/system-status');
            const data = await res.json();
            setStatus(data);

            // Update Latency History
            const latency = data.checks?.database?.latency ? parseInt(data.checks.database.latency) : 0;
            setLatencyHistory(prev => [...prev.slice(1), latency]);

            // Update Success Rate History
            const rate = data.checks?.metrics?.success_rate ? parseFloat(data.checks.metrics.success_rate) : 0;
            setSuccessRateHistory(prev => [...prev.slice(1), rate]);

        } catch (err: any) {
            console.error("System Status Check Failed:", err);
            setStatus({
                status: 'down',
                message: err.message || 'Failed to fetch system status',
                location: 'Frontend Client (SystemStatusContent.tsx)',
                stack: err.stack || String(err),
                timestamp: new Date().toISOString()
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkStatus();
        const interval = setInterval(checkStatus, 30000);
        return () => clearInterval(interval);
    }, []);

    // Helper to calculate time ago
    const getTimeAgo = (dateString: string) => {
        if (!dateString || dateString === 'Never') return 'Never';
        const diff = Math.floor((Date.now() - new Date(dateString).getTime()) / 60000);
        if (diff < 1) return 'Just now';
        return `${diff} min ago`;
    };

    const dbLatency = status?.checks?.database?.latency ? parseInt(status.checks.database.latency) : 0;
    const successRate = status?.checks?.metrics?.success_rate || '0.0';
    const lastTxnTime = getTimeAgo(status?.checks?.payments?.last_transaction);
    const lastWebhookTime = getTimeAgo(status?.checks?.payments?.last_webhook);

    const [lastUpdated, setLastUpdated] = useState<string>('');

    useEffect(() => {
        setLastUpdated(new Date().toLocaleTimeString());
    }, [status]); // Update timestamp whenever status updates

    return (
        <div className="min-h-screen bg-slate-50/50 font-sans text-slate-900">
            {/* Simple Header */}
            <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-2">
                    <Activity size={24} className="text-blue-600" />
                    <h1 className="text-xl font-bold text-slate-800">System Status</h1>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 font-medium">
                        Last updated: {lastUpdated}
                    </span>
                    <button onClick={checkStatus} className="p-2 text-slate-400 hover:text-blue-600 transition-colors bg-slate-50 rounded-lg border border-slate-200 hover:border-blue-200">
                        <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                    </button>
                </div>
            </div>

            {/* Active Incidents / Logs */}
            {status?.status === 'down' && <ActiveIncident status={status} />}

            {/* Main Content */}
            <div className="p-6 space-y-6 max-w-7xl mx-auto">
                <h2 className="text-lg font-semibold text-slate-700">Real-time Metrics</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* 1. Database Response Time (Real) */}
                    <MetricCard
                        title="Database Latency"
                        value={dbLatency}
                        unit="ms"
                        subLabel="STATUS"
                        subValue={status?.checks?.database?.status === 'connected' ? 'Connected' : 'Issue'}
                        data={latencyHistory}
                        color="#d946ef" // Fuchsia-500
                        icon={Activity}
                    />

                    {/* 2. Success Rate (Real) */}
                    <MetricCard
                        title="Success Rate"
                        value={successRate}
                        unit="%"
                        subLabel="LAST 50 TXNS"
                        subValue={successRate + '%'}
                        data={successRateHistory}
                        color="#10b981" // Emerald-500
                        icon={CheckCircle2}
                    />

                    {/* 3. Payment Pulse (Real) */}
                    <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                                <h3 className="text-sm font-bold text-slate-700">Payment Pulse</h3>
                            </div>
                            <Clock size={16} className="text-slate-400" />
                        </div>

                        <div className="space-y-6 mt-2">
                            <div>
                                <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">LAST TRANSACTION</div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-bold text-slate-900">{lastTxnTime}</span>
                                </div>
                                <div className="text-xs text-slate-400 mt-1">
                                    {status?.checks?.payments?.last_transaction ? new Date(status.checks.payments.last_transaction).toLocaleString() : '-'}
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-100">
                                <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">LAST WEBHOOK</div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-bold text-slate-700">{lastWebhookTime}</span>
                                </div>
                                <div className="text-xs text-slate-400 mt-1">
                                    {status?.checks?.payments?.last_webhook ? new Date(status.checks.payments.last_webhook).toLocaleString() : '-'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SystemStatusContent;
