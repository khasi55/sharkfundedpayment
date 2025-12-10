import React from 'react';
import { Settings, Shield } from 'lucide-react';

export default function MaintenancePage() {
    return (
        <div className="fixed inset-0 z-[100] bg-slate-900 flex flex-col items-center justify-center p-4 text-center font-sans">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
            </div>

            <div className="relative z-10 max-w-lg w-full bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-3xl shadow-2xl flex flex-col items-center">

                <div className="w-20 h-20 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-6 ring-1 ring-indigo-500/30">
                    <Settings className="text-indigo-400 animate-spin-slow" size={40} />
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                    Scheduled Maintenance
                </h1>

                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                    We're currently upgrading our system to provide you with a better experience. We'll be back online shortly.
                </p>

                <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700/50">
                    <Shield size={14} className="text-emerald-500" />
                    <span className="text-xs font-mono text-slate-400">System Upgrade in Progress</span>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5 w-full">
                    <img src="/shark-logo-full.png" alt="Shark Funded" className="h-8 mx-auto opacity-50 grayscale hover:grayscale-0 transition-all duration-500" />
                </div>
            </div>

            <style jsx>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 8s linear infinite;
                }
            `}</style>
        </div>
    );
}
