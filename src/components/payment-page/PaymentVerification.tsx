import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { PaymentState } from './types';

interface PaymentVerificationProps {
    verificationStatus: string;
    state: PaymentState;
}

export default function PaymentVerification({ verificationStatus, state }: PaymentVerificationProps) {
    return (
        <div className="relative py-12 flex flex-col items-center justify-center animate-fade-in z-0">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-200/20 rounded-full blur-3xl animate-pulse"></div>

            {/* Glass Card Container */}
            <div className="relative z-10 w-full max-w-sm bg-white/60 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl p-8 flex flex-col items-center gap-6 overflow-hidden">
                {/* Decorative Top Line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#635BFF] to-transparent opacity-50"></div>

                {/* Spinner & Icon */}
                <div className="relative">
                    {/* Ring Animations */}
                    <div className="absolute inset-0 rounded-full border-4 border-[#635BFF]/10"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-[#635BFF] border-t-transparent animate-spin"></div>
                    <div className="absolute -inset-4 rounded-full border border-indigo-200 animate-ping opacity-20"></div>

                    {/* Center Icon */}
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/10 relative z-10">
                        <ShieldCheck size={32} className="text-[#635BFF] animate-pulse" />
                    </div>
                </div>

                {/* Status Text */}
                <div className="text-center space-y-2">
                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Verifying Payment</h3>
                    <div className="h-6 overflow-hidden relative w-full flex justify-center">
                        <p className="text-slate-500 text-sm font-medium animate-slide-up-fade absolute">
                            {verificationStatus}
                        </p>
                    </div>
                </div>

                {/* Progress Steps (Visual Only) */}
                <div className="flex items-center gap-2 w-full justify-center opacity-60">
                    <div className="h-1 w-8 rounded-full bg-[#635BFF]"></div>
                    <div className="h-1 w-8 rounded-full bg-[#635BFF] animate-pulse"></div>
                    <div className="h-1 w-8 rounded-full bg-slate-200"></div>
                </div>

                {/* UTR Receipt Ticket */}
                <div className="w-full mt-4 bg-slate-50 border border-slate-200 rounded-xl p-4 relative group hover:border-indigo-200 transition-colors">
                    <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-white border-r border-slate-200 rounded-full"></div>
                    <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-white border-l border-slate-200 rounded-full"></div>

                    <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-400 uppercase tracking-wider">Reference ID</span>
                        <div className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-[10px] font-bold uppercase">Processing</div>
                    </div>
                    <div className="mt-2 font-mono text-lg font-bold text-slate-900 tracking-wide text-center group-hover:text-[#635BFF] transition-colors">
                        {state.utr}
                    </div>
                    <div className="mt-2 border-t border-dashed border-slate-200"></div>
                    <div className="mt-2 text-[10px] text-center text-slate-400 font-medium">Do not close this window</div>
                </div>
            </div>

            {/* Bottom Security Note */}
            <div className="mt-8 text-slate-400 text-xs font-medium flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                Secure Connection Established
            </div>
        </div>
    );
}
