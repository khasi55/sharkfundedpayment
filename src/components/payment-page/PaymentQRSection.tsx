import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Clock, CheckCircle2, Copy, AlertCircle, Lock, ArrowDown } from 'lucide-react';
import { PaymentState } from './types';
import { formatTime } from './utils';
import CancelPaymentModal from './CancelPaymentModal';

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
    handleToggleUpi?: () => void; // Optional to not break old usages immediately
    handleCancel: (reason: string) => void;
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
    copied,
    handleToggleUpi,
    handleCancel
}: PaymentQRSectionProps) {
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header & Timer */}
            <div className="text-center space-y-3">
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">Scan QR to Pay</h2>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border transition-all duration-500 shadow-sm ${timeLeft < 60 ? 'bg-rose-50 text-rose-600 border-rose-100 animate-pulse' : 'bg-indigo-50 text-indigo-700 border-indigo-100'}`}>
                    <Clock size={12} className={timeLeft < 60 ? 'animate-bounce' : ''} />
                    <span>Expires in <span className="font-mono">{formatTime(timeLeft)}</span></span>
                </div>
            </div>

            <div className="flex flex-col items-center">
                {/* Merchant Info */}
                <div className="mb-4 text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Paying to Merchant</p>
                    <p className="text-base font-bold text-slate-900 flex items-center gap-1.5 justify-center">
                        {merchantName}
                        <CheckCircle2 size={14} className="text-emerald-500" />
                    </p>
                </div>

                {/* Mobile Scroll Hint - High Priority Visibility */}
                <div className="mb-4 md:hidden flex justify-center animate-bounce">
                    <div className="flex items-center gap-2 bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100">
                        <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wide">Scroll Down to Enter UTR</span>
                        <ArrowDown size={14} className="text-indigo-600" />
                    </div>
                </div>

                {/* QR Code Card - Compacted */}
                <div
                    className="p-4 bg-white rounded-2xl border border-slate-100 shadow-lg shadow-indigo-100/50 mb-5 cursor-pointer hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-0.5 transition-all duration-300 relative group"
                    onClick={() => copyToClipboard(upiId)}
                >
                    {/* Corner Accents */}
                    <div className="absolute top-3 left-3 w-3 h-3 border-l-2 border-t-2 border-[#635BFF] rounded-tl-lg"></div>
                    <div className="absolute top-3 right-3 w-3 h-3 border-r-2 border-t-2 border-[#635BFF] rounded-tr-lg"></div>
                    <div className="absolute bottom-3 left-3 w-3 h-3 border-l-2 border-b-2 border-[#635BFF] rounded-bl-lg"></div>
                    <div className="absolute bottom-3 right-3 w-3 h-3 border-r-2 border-b-2 border-[#635BFF] rounded-br-lg"></div>

                    <div className="p-1.5 bg-white rounded-lg">
                        <QRCodeSVG value={upiUrl} size={160} level="L" className="rounded-md" />
                    </div>

                    {copied && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/95 rounded-2xl backdrop-blur-md animate-fade-in">
                            <div className="flex flex-col items-center gap-1.5">
                                <CheckCircle2 size={24} className="text-[#635BFF] animate-bounce" />
                                <span className="text-xs font-bold text-slate-900">Link Copied!</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* UPI ID Pill - Compacted + Change Button */}
                <div className="flex items-center gap-2">
                    <div
                        className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 px-4 py-2 rounded-lg border border-transparent hover:border-indigo-100 hover:bg-white hover:shadow-sm transition-all cursor-pointer group"
                        onClick={() => copyToClipboard(upiId)}
                    >
                        <span className="font-mono font-semibold group-hover:text-[#635BFF] transition-colors">{upiId}</span>
                        <Copy size={12} className="text-slate-400 group-hover:text-[#635BFF] transition-colors" />
                    </div>

                    {handleToggleUpi && (
                        <button
                            onClick={handleToggleUpi}
                            className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-2 rounded-lg hover:bg-indigo-100 hover:text-indigo-700 transition-colors"
                        >
                            Change
                        </button>
                    )}
                </div>

                {/* Amount Display - Compacted */}
                <div
                    className="mt-2 flex items-center gap-2 text-xs text-slate-600 bg-slate-50 px-4 py-2 rounded-lg border border-transparent hover:border-indigo-100 hover:bg-white hover:shadow-sm transition-all cursor-pointer group"
                    onClick={() => copyToClipboard(state.amount || '')}
                >
                    <span className="text-slate-400 font-medium">Amount:</span>
                    <span className="font-mono font-bold text-slate-900 group-hover:text-[#635BFF] transition-colors">₹{state.amount}</span>
                    <Copy size={12} className="text-slate-400 group-hover:text-[#635BFF] transition-colors" />
                </div>

                {/* Exact Amount Warning */}
                <div className="mt-3 px-4 py-2 bg-rose-50 border border-rose-100 rounded-lg flex items-center gap-2 max-w-[300px] animate-pulse">
                    <AlertCircle size={14} className="text-rose-600 shrink-0" />
                    <p className="text-[11px] font-bold text-rose-700 leading-tight text-center">
                        Pay EXACT amount (including decimals) or payment WILL FAIL.
                    </p>
                </div>


                {/* Payment Apps Grid - Fixed Sizes */}
                <div className="mt-6 flex flex-col items-center gap-3">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Supported Apps</p>
                    <div className="flex items-center gap-5">
                        <img src="https://static.cdnlogo.com/logos/p/6/paytm.svg" alt="Paytm" className="h-5 object-contain" />
                        <div className="w-px h-4 bg-slate-200"></div>
                        <img src="https://static.cdnlogo.com/logos/p/25/phonepe.svg" alt="PhonePe" className="h-20 object-contain" />
                        <div className="w-px h-4 bg-slate-200"></div>
                        <img src="https://static.cdnlogo.com/logos/g/80/google-pay.png" alt="Google Pay" className="h-20 object-contain" />
                    </div>
                </div>

            </div>

            {/* Cancellation Section */}
            <div className="pt-4 border-t border-slate-100">
                <div className="flex flex-col items-center gap-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Having trouble?</p>

                    <button
                        onClick={() => setIsCancelModalOpen(true)}
                        className="text-xs font-bold text-rose-500 hover:text-rose-600 hover:bg-rose-50 px-4 py-2 rounded-lg transition-all"
                    >
                        Cancel Payment
                    </button>
                </div>
            </div>

            <CancelPaymentModal
                isOpen={isCancelModalOpen}
                onClose={() => setIsCancelModalOpen(false)}
                onConfirm={(reason) => {
                    handleCancel(reason);
                    setIsCancelModalOpen(false);
                }}
            />


            {/* UTR Input Section - Compacted */}
            <div className="pt-6 border-t border-slate-100">
                <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-2">Reference Number (UTR)</label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        className="flex-1 px-3 py-2.5 bg-slate-50 border border-slate-100 rounded-lg focus:bg-white focus:border-[#635BFF] focus:ring-4 focus:ring-[#635BFF]/10 transition-all duration-300 outline-none text-slate-900 font-mono text-sm font-medium placeholder:text-slate-400 shadow-sm"
                        placeholder="Enter 12-digit UTR"
                        value={state.utr}
                        onChange={e => setState({ ...state, utr: e.target.value })}
                        maxLength={12}
                    />
                    <button
                        onClick={handleVerify}
                        className="px-6 bg-gradient-to-r from-[#635BFF] to-indigo-600 text-white rounded-lg font-bold text-xs hover:shadow-md hover:shadow-indigo-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
                    >
                        Verify
                    </button>
                </div>

                {state.error && (
                    <div className="mt-3 p-3 bg-rose-50 text-rose-600 text-xs rounded-lg flex items-center gap-2 border border-rose-100 animate-shake shadow-sm">
                        <AlertCircle size={14} className="shrink-0" />
                        <span className="font-semibold">{state.error}</span>
                    </div>
                )}
            </div>

            {/* Security Footer */}
            <div className="mt-4 flex items-center justify-center gap-1.5 text-slate-400 opacity-80 hover:opacity-100 transition-opacity">
                <Lock size={10} className="text-emerald-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">256-bit SSL Encrypted</span>
            </div>
        </div>
    );
}
