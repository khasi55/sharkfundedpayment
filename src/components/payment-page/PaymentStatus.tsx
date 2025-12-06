import React from 'react';
import { CheckCircle2, Clock, Download, AlertCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { PaymentStatusProps } from './types';

// Simplified props for Success/Verified state
interface PaymentStatusProps {
    step: 'success' | 'verified' | 'failed' | 'review_pending' | 'expired';
    amount: string;
    orderId: string;
    callbackUrl?: string | null;
    // Legacy props (optional/unused for success view but kept for compatibility if needed elsewhere)
    state?: any;
    setState?: any;
    checkStatus?: any;
    generateInvoice?: any;
}

export default function PaymentStatus({ step, amount, orderId, callbackUrl, state, setState, checkStatus, generateInvoice }: PaymentStatusProps) {

    const [autoRedirectTimer, setAutoRedirectTimer] = React.useState(5);

    // If "state" prop exists (legacy usage), use it. otherwise use direct props.
    // Actually, let's normalize.
    const currentStep = step || state?.step;
    const currentAmount = amount || state?.amount;
    const currentOrderId = orderId || state?.orderId;
    // ... logic continues ...

    const handleReturnToMerchant = React.useCallback(() => {
        if (callbackUrl) {
            const url = new URL(callbackUrl);
            url.searchParams.set('status', currentStep === 'verified' ? 'success' : 'pending');
            url.searchParams.set('orderId', currentOrderId);
            // url.searchParams.set('utr', state?.utr || ''); // logic needs state for UTR if available
            window.location.href = url.toString();
        } else {
            window.location.reload();
        }
    }, [callbackUrl, currentStep, currentOrderId]);

    // Auto-redirect effect
    React.useEffect(() => {
        if (currentStep === 'verified' && callbackUrl) {
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

    if (currentStep === 'success' || currentStep === 'verified') {
        return (
            <div className="text-center py-8 space-y-6 animate-scale-in">
                <div className={`w-16 h-16 ${currentStep === 'verified' ? 'bg-emerald-100 text-emerald-600' : 'bg-indigo-100 text-[#635BFF]'} rounded-full flex items-center justify-center mx-auto`}>
                    {currentStep === 'verified' ? <CheckCircle2 size={32} /> : <Clock size={32} />}
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                        {currentStep === 'verified' ? 'Payment Verified' : 'Payment Successful'}
                    </h2>
                    <p className="text-slate-500 text-sm mt-1">
                        {currentStep === 'verified' ? 'Your transaction has been confirmed.' : 'Thank you for your payment.'}
                    </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-slate-500">Amount Paid</span>
                        <span className="font-bold text-slate-900">₹{Number(currentAmount).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-500">Order ID</span>
                        <span className="font-mono font-bold text-slate-900 break-all">{currentOrderId || 'Generating...'}</span>
                    </div>
                </div>

                <div className="space-y-3 pt-4">
                    {callbackUrl && (
                        <p className="text-xs text-slate-400 text-center animate-pulse">
                            Redirecting in {autoRedirectTimer}s...
                        </p>
                    )}
                    <button
                        onClick={handleReturnToMerchant}
                        className="w-full bg-[#635BFF] text-white py-3 rounded-lg font-bold text-sm hover:bg-[#5851E3] transition-all hover:shadow-lg hover:shadow-blue-500/20"
                    >
                        {callbackUrl ? 'Return to Merchant Now' : 'Done'}
                    </button>

                    {/* Invoice Button (Only if generateInvoice function is passed) */}
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
                            className="w-full bg-white text-slate-700 border border-slate-200 py-3 rounded-lg font-bold text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                        >
                            <Download size={16} />
                            Download Invoice
                        </button>
                    )}
                </div>
            </div>
        );
    }

    if (state.step === 'failed') {
        return (
            <div className="text-center py-12 space-y-8 animate-scale-in relative overflow-hidden">
                {/* Background Pulse Effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-rose-50 rounded-full animate-ping opacity-20"></div>

                <div className="relative z-10">
                    <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mx-auto shadow-sm border border-rose-100 mb-6">
                        <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center shadow-inner">
                            <AlertCircle size={32} />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-2xl font-bold text-slate-900">
                            {state.error.includes('rejected') ? 'Verification Rejected' : 'Payment Failed'}
                        </h2>
                        <p className="text-slate-500 text-sm max-w-xs mx-auto leading-relaxed">
                            {state.error || 'We could not verify your payment. Please check your details and try again.'}
                        </p>
                    </div>
                </div>

                <div className="space-y-3 max-w-xs mx-auto relative z-10">
                    <button
                        onClick={() => setState(prev => ({ ...prev, step: 'payment', error: '' }))}
                        className="w-full bg-[#635BFF] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#5851E3] transition-all hover:shadow-lg hover:shadow-blue-500/20 flex items-center justify-center gap-2"
                    >
                        <ArrowLeft size={16} />
                        Try Again
                    </button>

                    <button
                        onClick={() => window.open('mailto:support@sharkfunded.com', '_blank')}
                        className="w-full bg-white text-slate-600 border border-slate-200 py-3.5 rounded-xl font-bold text-sm hover:bg-slate-50 hover:text-slate-900 transition-all"
                    >
                        Contact Support
                    </button>
                </div>
            </div>
        );
    }

    if (state.step === 'review_pending') {
        return (
            <div className="text-center py-12 space-y-6 animate-fade-in">
                <div className="w-20 h-20 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto shadow-sm border border-amber-100">
                    <Clock size={40} className="animate-pulse" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-xl font-bold text-slate-900">Payment Under Review</h2>
                    <p className="text-slate-500 text-sm max-w-xs mx-auto leading-relaxed">
                        Your payment is currently being reviewed by our team. We will notify you once it's approved.
                    </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 max-w-xs mx-auto">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-slate-200 shadow-sm">
                            <span className="font-mono text-xs font-bold text-slate-700">ID</span>
                        </div>
                        <div className="flex-1 text-left">
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Order ID</p>
                            <p className="text-sm font-mono font-bold text-slate-900">{officialOrderId || 'Pending...'}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 justify-center mt-3 pt-3 border-t border-slate-200">
                        <Loader2 size={12} className="animate-spin" />
                        <span>Checking status automatically...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (state.step === 'expired') {
        return (
            <div className="text-center py-12 space-y-6 animate-scale-in">
                <div className="w-16 h-16 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center mx-auto">
                    <Clock size={32} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Session Expired</h2>
                    <p className="text-slate-500 text-sm mt-1">Please start over.</p>
                </div>
                <button
                    onClick={() => setState(prev => ({ ...prev, step: 'details', error: '' }))}
                    className="w-full bg-[#635BFF] text-white py-3 rounded-lg font-bold text-sm hover:bg-[#5851E3] transition-all hover:shadow-lg hover:shadow-blue-500/20"
                >
                    Start Over
                </button>
            </div>
        );
    }

    return null;
}
