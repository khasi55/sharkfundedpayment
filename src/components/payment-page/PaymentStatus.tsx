import React from 'react';
import { CheckCircle2, Clock, Download, AlertCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { PaymentStatusProps } from './types';

export default function PaymentStatus({ step, amount, orderId, callbackUrl, state, setState, checkStatus, generateInvoice, officialOrderId }: PaymentStatusProps) {

    const [autoRedirectTimer, setAutoRedirectTimer] = React.useState(5);

    // Normalize props
    const currentStep = step || state?.step;
    const currentAmount = amount || state?.amount || '0';
    // officialOrderId is passed as prop usually, or we might use orderId prop
    const currentOrderId = officialOrderId || orderId || 'N/A';

    const handleReturnToMerchant = React.useCallback(() => {
        if (callbackUrl) {
            const url = new URL(callbackUrl);

            let statusParam = 'pending';
            if (currentStep === 'verified') statusParam = 'success';
            else if (currentStep === 'failed') statusParam = 'failed';

            url.searchParams.set('status', statusParam);
            url.searchParams.set('orderId', currentOrderId);
            // utr might be in state
            if (state?.utr) url.searchParams.set('utr', state.utr);
            window.location.href = url.toString();
        } else {
            window.location.reload();
        }
    }, [callbackUrl, currentStep, currentOrderId, state]);

    // Auto-redirect effect
    React.useEffect(() => {
        if ((currentStep === 'verified' || currentStep === 'failed') && callbackUrl) {
            const timer = setInterval(() => {
                setAutoRedirectTimer((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        handleReturnToMerchant();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [currentStep, callbackUrl, handleReturnToMerchant]);

    const StatusCard = ({ children, glowColor = "indigo" }: { children: React.ReactNode, glowColor?: "indigo" | "rose" | "amber" | "emerald" }) => (
        <div className="relative py-12 flex flex-col items-center justify-center animate-scale-in z-0">
            {/* Ambient Glow */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 animate-pulse 
                ${glowColor === 'indigo' ? 'bg-indigo-200' :
                    glowColor === 'rose' ? 'bg-rose-200' :
                        glowColor === 'amber' ? 'bg-amber-200' :
                            'bg-emerald-200'}`}
            ></div>

            {/* Glass Card */}
            <div className="relative z-10 w-full max-w-sm bg-white/60 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl p-8 flex flex-col items-center gap-6 overflow-hidden">
                {/* Decorative Top Line */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-${glowColor === 'indigo' ? '[#635BFF]' : glowColor === 'emerald' ? 'emerald-500' : glowColor}-500 to-transparent opacity-50`}></div>
                {children}
            </div>
        </div>
    );

    if (currentStep === 'success' || currentStep === 'verified') {
        return (
            <StatusCard glowColor={currentStep === 'verified' ? 'emerald' : 'indigo'}>
                {/* Icon */}
                <div className="relative">
                    <div className={`absolute inset-0 rounded-full blur-xl opacity-40 ${currentStep === 'verified' ? 'bg-emerald-300' : 'bg-indigo-300'}`}></div>
                    <div className={`w-20 h-20 ${currentStep === 'verified' ? 'bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-600' : 'bg-gradient-to-br from-indigo-50 to-indigo-100 text-[#635BFF]'} rounded-full flex items-center justify-center relative z-10 shadow-lg border border-white`}>
                        {currentStep === 'verified' ? <CheckCircle2 size={40} className="animate-bounce-short" /> : <Clock size={40} />}
                    </div>
                </div>

                {/* Text */}
                <div className="text-center space-y-1">
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                        {currentStep === 'verified' ? 'Payment Verified' : 'Payment Successful'}
                    </h2>
                    <p className="text-slate-500 text-sm font-medium">
                        {currentStep === 'verified' ? 'Transaction confirmed successfully.' : 'Thank you for your payment.'}
                    </p>
                </div>

                {/* Receipt */}
                <div className="w-full bg-slate-50/80 rounded-xl border border-slate-200 p-4 space-y-3 relative overflow-hidden group hover:border-indigo-200 transition-colors">
                    {/* Ticket notches */}
                    <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border border-slate-200 rounded-full"></div>
                    <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border border-slate-200 rounded-full"></div>

                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500 font-medium">Amount Paid</span>
                        <span className="font-bold text-slate-900">₹{Number(currentAmount).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500 font-medium">Order ID</span>
                        <span className="font-mono font-bold text-slate-900 text-xs">{currentOrderId}</span>
                    </div>
                    {state?.utr && (
                        <div className="flex justify-between items-center text-sm pt-2 border-t border-dashed border-slate-200">
                            <span className="text-slate-500 font-medium">UTR</span>
                            <span className="font-mono font-bold text-slate-700 text-xs">{state.utr}</span>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="w-full space-y-3">
                    {/* Check Status Button (Only if state exists and we have a screenshot but not verified yet) */}
                    {state?.screenshot_url && currentStep !== 'verified' && checkStatus && (
                        <button
                            onClick={checkStatus}
                            className="w-full bg-white text-slate-700 border border-slate-200 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
                        >
                            Check Status
                        </button>
                    )}

                    {generateInvoice && (
                        <button
                            onClick={() => generateInvoice({
                                orderId: currentOrderId,
                                date: new Date().toLocaleDateString(),
                                amount: currentAmount,
                                name: state?.name || 'Customer',
                                email: state?.email || '',
                                utr: state?.utr || ''
                            })}
                            className="w-full bg-white text-slate-700 border border-slate-200 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm flex items-center justify-center gap-2 group"
                        >
                            <Download size={16} className="group-hover:scale-110 transition-transform" />
                            Download Invoice
                        </button>
                    )}

                    {callbackUrl && (
                        <p className="text-xs text-slate-400 text-center animate-pulse pt-2">
                            Redirecting in {autoRedirectTimer}s...
                        </p>
                    )}

                    <button
                        onClick={handleReturnToMerchant}
                        className="w-full bg-[#635BFF] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#5851E3] transition-all hover:shadow-lg hover:shadow-indigo-500/20 active:scale-[0.98]"
                    >
                        {callbackUrl ? 'Return to Merchant Now' : 'Done'}
                    </button>
                </div>
            </StatusCard>
        );
    }

    if (currentStep === 'failed') {
        return (
            <StatusCard glowColor="rose">
                <div className="relative">
                    <div className="absolute inset-0 bg-rose-200/50 rounded-full blur-xl opacity-0 animate-pulse-slow"></div>
                    <div className="w-20 h-20 bg-gradient-to-br from-rose-50 to-rose-100 text-rose-500 rounded-full flex items-center justify-center relative z-10 shadow-lg border border-white">
                        <AlertCircle size={40} />
                    </div>
                </div>

                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                        {state?.error?.includes('rejected') ? 'Verification Rejected' : 'Payment Failed'}
                    </h2>
                    <p className="text-slate-500 text-sm max-w-xs mx-auto">
                        {state?.error || 'We could not verify your payment. Please check your details and try again.'}
                    </p>
                </div>

                <div className="w-full space-y-3">
                    {setState && !state?.error?.includes('rejected') && (
                        <button
                            onClick={() => setState(prev => ({ ...prev, step: 'payment', error: '' }))}
                            className="w-full bg-[#635BFF] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#5851E3] transition-all hover:shadow-lg hover:shadow-indigo-500/20 flex items-center justify-center gap-2"
                        >
                            <ArrowLeft size={16} />
                            Try Again
                        </button>
                    )}
                    <button
                        onClick={() => window.open('mailto:support@sharkfunded.com', '_blank')}
                        className="w-full bg-white text-slate-600 border border-slate-200 py-3.5 rounded-xl font-bold text-sm hover:bg-slate-50 hover:text-slate-900 transition-all font-medium"
                    >
                        Contact Support
                    </button>

                    {callbackUrl && (
                        <p className="text-xs text-rose-400 text-center animate-pulse pt-2">
                            Redirecting in {autoRedirectTimer}s...
                        </p>
                    )}
                </div>
            </StatusCard>
        );
    }

    if (currentStep === 'review_pending') {
        return (
            <StatusCard glowColor="amber">
                <div className="relative">
                    <div className="absolute inset-0 bg-amber-200/40 rounded-full blur-xl animate-pulse"></div>
                    <div className="w-20 h-20 bg-gradient-to-br from-amber-50 to-amber-100 text-amber-600 rounded-full flex items-center justify-center relative z-10 shadow-lg border border-white">
                        <Clock size={40} className="animate-spin-slow" />
                    </div>
                </div>

                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Payment Under Review</h2>
                    <p className="text-slate-500 text-sm max-w-xs mx-auto">
                        Your payment is being reviewed. We will notify you once it's approved.
                    </p>
                </div>

                <div className="w-full bg-slate-50/80 rounded-xl border border-slate-200 p-4 space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-slate-200 shadow-sm shrink-0">
                            <span className="font-mono text-xs font-bold text-slate-600">ID</span>
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Order ID</p>
                            <p className="text-sm font-mono font-bold text-slate-900 truncate">
                                {officialOrderId || 'Pending Assignment'}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-medium text-slate-400 justify-center pt-3 border-t border-slate-200">
                        <Loader2 size={14} className="animate-spin text-amber-500" />
                        <span>Checking status automatically...</span>
                    </div>
                </div>
            </StatusCard>
        );
    }

    if (currentStep === 'expired') {
        return (
            <StatusCard glowColor="amber">
                <div className="relative">
                    <div className="absolute inset-0 bg-amber-200/50 rounded-full blur-xl opacity-0 animate-pulse-slow"></div>
                    <div className="w-20 h-20 bg-gradient-to-br from-amber-50 to-amber-100 text-amber-500 rounded-full flex items-center justify-center relative z-10 shadow-lg border border-white">
                        <Clock size={40} />
                    </div>
                </div>

                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Session Expired</h2>
                    <p className="text-slate-500 text-sm max-w-xs mx-auto">
                        Your payment session has timed out. Please start over to secure your order.
                    </p>
                </div>

                <div className="w-full space-y-3">
                    {setState && (
                        <button
                            onClick={() => {
                                setState(prev => ({ ...prev, step: 'details', error: '', amount: prev.amount, name: prev.name, email: prev.email }));
                                setAutoRedirectTimer(5); // Reset any timers if needed
                            }}
                            className="w-full bg-[#635BFF] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#5851E3] transition-all hover:shadow-lg hover:shadow-indigo-500/20 active:scale-[0.98]"
                        >
                            Start Over
                        </button>
                    )}
                </div>
            </StatusCard>
        );
    }

    return null;
}
