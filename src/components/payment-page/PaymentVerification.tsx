import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { PaymentState } from './types';

interface PaymentVerificationProps {
    verificationStatus: string;
    state: PaymentState;
}

export default function PaymentVerification({ verificationStatus, state }: PaymentVerificationProps) {
    return (
        <div className="text-center py-12 space-y-8 animate-fade-in relative overflow-hidden">
            {/* Background Pulse Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-50 rounded-full animate-ping opacity-20"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-100 rounded-full animate-ping opacity-30 delay-75"></div>

            <div className="relative z-10">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-xl border-4 border-indigo-50 relative">
                    <div className="absolute inset-0 border-4 border-[#635BFF] border-t-transparent rounded-full animate-spin"></div>
                    <ShieldCheck size={32} className="text-[#635BFF] animate-pulse" />
                </div>
            </div>

            <div className="space-y-2 relative z-10">
                <h3 className="text-xl font-bold text-slate-900">Verifying Payment</h3>
                <div className="h-6 overflow-hidden relative">
                    <p className="text-slate-500 text-sm font-medium animate-slide-up-fade">
                        {verificationStatus}
                    </p>
                </div>
            </div>

            <div className="max-w-xs mx-auto bg-slate-50 rounded-lg p-3 border border-slate-100">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-slate-200 shadow-sm">
                        <span className="font-mono text-xs font-bold text-slate-700">UTR</span>
                    </div>
                    <div className="flex-1 text-left">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Reference ID</p>
                        <p className="text-sm font-mono font-bold text-slate-900">{state.utr}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
