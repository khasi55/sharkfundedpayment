import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Clock, CheckCircle2, Copy, AlertCircle, Lock } from 'lucide-react';
import { PaymentState } from './types';
import { formatTime } from './utils';

interface PaymentQRSectionProps {
    state: PaymentState;
    setState: React.Dispatch<React.SetStateAction<PaymentState>>;
    upiUrl: string;
    timeLeft: number;
    handleVerify: () => void;
    merchantName: string;
    upiId: string;
    copyToClipboard: (text: string) => void;
    copied: boolean;
}

export default function PaymentQRSection({
    state,
    setState,
    upiUrl,
    timeLeft,
    handleVerify,
    merchantName,
    upiId,
    copyToClipboard,
    copied
}: PaymentQRSectionProps) {
    return (
        <div className="space-y-8 animate-fade-in">
            <div className="text-center">
                <h2 className="text-xl font-bold text-slate-900 mb-2">Scan QR to Pay</h2>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-bold border border-amber-100">
                    <Clock size={12} className="animate-pulse" />
                    Expires in {formatTime(timeLeft)}
                </div>
            </div>

            <div className="flex flex-col items-center">
                <div className="mb-4 text-center">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Paying to</p>
                    <p className="text-lg font-bold text-slate-900">{merchantName}</p>
                </div>

                <div className="p-1 bg-white rounded-xl border border-slate-200 shadow-sm mb-4 cursor-pointer hover:shadow-md transition-all" onClick={() => copyToClipboard(upiUrl)}>
                    <QRCodeSVG value={upiUrl} size={180} level="L" className="rounded-lg" />
                    {copied && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/90 rounded-xl backdrop-blur-sm">
                            <span className="text-xs font-bold text-slate-900 flex items-center gap-1"><CheckCircle2 size={14} className="text-emerald-500" /> Copied</span>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-1.5 rounded-md border border-slate-200 cursor-pointer hover:bg-slate-100" onClick={() => copyToClipboard(upiId)}>
                    <span className="font-mono font-medium">{upiId}</span>
                    <Copy size={14} className="text-slate-400" />
                </div>

                <div className="mt-6 flex flex-col items-center gap-3">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Accepted Payment Apps</p>
                    <div className="flex items-center gap-6">
                        <img src="https://static.cdnlogo.com/logos/p/6/paytm.svg" alt="Paytm" className="h-6 object-contain" />
                        <img src="https://static.cdnlogo.com/logos/p/25/phonepe.svg" alt="PhonePe" className="h-20 object-contain" />
                        <img src="https://static.cdnlogo.com/logos/g/80/google-pay.png" alt="Google Pay" className="h-20 object-contain" />
                    </div>
                </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
                <label className="block text-sm font-medium text-slate-700 mb-2">Enter UTR / Reference Number</label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-slate-900 font-mono font-medium placeholder:text-slate-400 shadow-sm"
                        placeholder="12-digit UTR"
                        value={state.utr}
                        onChange={e => setState({ ...state, utr: e.target.value })}
                    />
                    <button
                        onClick={handleVerify}
                        className="px-6 bg-[#635BFF] text-white rounded-lg font-bold text-sm hover:bg-[#5851E3] transition-all shadow-md hover:shadow-lg hover:shadow-blue-500/20"
                    >
                        Verify
                    </button>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                    Required to confirm your payment instantly.
                </p>
                {state.error && (
                    <div className="mt-3 p-3 bg-rose-50 text-rose-600 text-sm rounded-lg flex items-center gap-2 border border-rose-100 animate-shake">
                        <AlertCircle size={16} />
                        <span className="font-medium">{state.error}</span>
                    </div>
                )}
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-slate-400">
                <Lock size={12} />
                <span className="text-[10px] font-medium uppercase tracking-wider">256-bit SSL Encrypted</span>
            </div>
        </div>
    );
}
