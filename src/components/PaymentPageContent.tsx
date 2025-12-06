import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { supabase } from '@/lib/supabase';
import { getUpiConfigForTransaction } from '@/config/upiConfig';
import { Check, ShieldCheck, Lock, CreditCard, Shield, Search, ArrowLeft } from 'lucide-react';
import { useParams, useSearchParams } from 'next/navigation';
import { generateInvoice } from '@/utils/invoiceGenerator';
import PaymentDetailsForm from './payment-page/PaymentDetailsForm';
import PaymentQRSection from './payment-page/PaymentQRSection';
import PaymentVerification from './payment-page/PaymentVerification';
import PaymentManualUpload from './payment-page/PaymentManualUpload';
import PaymentStatus from './payment-page/PaymentStatus';
import { PaymentState } from './payment-page/types';

export default function PaymentPageContent() {
    const params = useParams();
    const searchParams = useSearchParams();
    const urlSessionId = params?.orderId as string; // This is the UUID from URL (Session ID)

    // Get query params for auto-fill
    const queryAmount = searchParams.get('amount');
    const queryName = searchParams.get('name');
    const queryEmail = searchParams.get('email');

    const [state, setState] = useState<PaymentState>({
        step: 'details',
        amount: '',
        name: '',
        email: '',
        utr: '',
        error: '',
    });

    const [sessionId, setSessionId] = useState<string>(urlSessionId || '');
    const [officialOrderId, setOfficialOrderId] = useState<string>(''); // This will be the SF-2025-X ID
    const [callbackUrl, setCallbackUrl] = useState<string>(''); // [NEW] callback url from DB
    const [copied, setCopied] = useState(false);
    const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
    const [verificationStatus, setVerificationStatus] = useState('Connecting to bank...');

    // Dynamic UPI Config based on session
    const { vpa: UPI_ID, merchantName: MERCHANT_NAME } = getUpiConfigForTransaction(sessionId);

    // Effect to handle Order Fetching (Secure) or Auto-fill (Legacy)
    useEffect(() => {
        const initializePayment = async () => {
            let orderFound = false;

            // 1. Priority: Fetch from DB using Session ID (API Created Order - Secure)
            if (urlSessionId) {
                try {
                    const { data, error } = await supabase
                        .from('transactions')
                        .select('*')
                        .or(`id.eq.${urlSessionId},session_id.eq.${urlSessionId}`)
                        .maybeSingle();

                    if (data) {
                        orderFound = true;
                        if (data.status === 'verified') {
                            // Already paid
                            setState(prev => ({
                                ...prev,
                                amount: data.amount.toString(),
                                name: data.customer_details?.name || '',
                                email: data.customer_details?.email || '',
                                step: 'verified'
                            }));
                        } else {
                            // Pending payment
                            setState(prev => ({
                                ...prev,
                                amount: data.amount.toString(),
                                name: data.customer_details?.name || '',
                                email: data.customer_details?.email || '',
                                step: 'payment' // Force step 2 directly
                            }));
                        }
                        if (data.order_id) setOfficialOrderId(data.order_id);
                        if (data.customer_details?.callback_url) setCallbackUrl(data.customer_details.callback_url);
                    }
                } catch (err) {
                    console.error("Error fetching order:", err);
                }
            }

            // 2. Fallback: URL Query Params (Legacy/Direct Link - Insecure/Editable)
            // Only use if no strict order was found in DB
            if (!orderFound && queryAmount && queryName && queryEmail) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailRegex.test(queryEmail)) {
                    setState(prev => ({
                        ...prev,
                        amount: queryAmount,
                        name: queryName,
                        email: queryEmail,
                        step: 'payment'
                    }));
                } else {
                    setState(prev => ({
                        ...prev,
                        amount: queryAmount,
                        name: queryName,
                        email: queryEmail
                    }));
                }
            }

            setSessionId(urlSessionId || '');
        };

        initializePayment();
    }, [queryAmount, queryName, queryEmail, urlSessionId]);

    useEffect(() => {
        let timer: ReturnType<typeof setInterval>;
        if (state.step === 'verifying') {
            const messages = [
                'Connecting to bank...',
                'Checking UTR validity...',
                'Verifying amount...',
                'Confirming with merchant...',
                'Finalizing transaction...'
            ];
            let i = 0;
            const interval = setInterval(() => {
                i = (i + 1) % messages.length;
                setVerificationStatus(messages[i]);
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [state.step]);

    useEffect(() => {
        if (urlSessionId) {
            setSessionId(urlSessionId);
        }
    }, [urlSessionId]);

    useEffect(() => {
        let timer: ReturnType<typeof setInterval>;
        if (state.step === 'payment' && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && state.step === 'payment') {
            setState(prev => ({ ...prev, step: 'expired' }));
        }
        return () => clearInterval(timer);
    }, [state.step, timeLeft]);

    const handleDetailsSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!state.amount || !state.name || !state.email) {
            setState(prev => ({ ...prev, error: 'Please fill in all fields' }));
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(state.email)) {
            setState(prev => ({ ...prev, error: 'Please enter a valid email address' }));
            return;
        }

        setTimeLeft(15 * 60); // Reset timer
        setState(prev => ({ ...prev, step: 'payment', error: '' }));
    };

    const handleVerify = async () => {
        if (!state.utr || state.utr.length !== 12) {
            setState(prev => ({ ...prev, error: 'UTR number must be exactly 12 digits' }));
            return;
        }

        setState(prev => ({ ...prev, step: 'verifying', error: '' }));

        // 1. Check if UTR is already used
        try {
            const { data: existingTxn, error: checkError } = await supabase
                .from('transactions')
                .select('*')
                .eq('utr', state.utr)
                .eq('status', 'verified')
                .single();

            if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "Row not found"
                console.error('Error checking UTR:', checkError);
                setState(prev => ({ ...prev, step: 'failed', error: 'Error checking transaction status' }));
                return;
            }

            if (existingTxn) {
                setState(prev => ({ ...prev, step: 'failed', error: 'This UTR has already been used for a verified payment.' }));
                return;
            }
        } catch (err) {
            console.error('Unexpected error checking UTR:', err);
        }

        //  Check every 5 seconds for up to 2 minutes (24 attempts)
        let attempts = 0;
        const maxAttempts = 1;
        const pollInterval = 5000; // 5 seconds

        const checkPayment = async () => {
            try {
                attempts++;


                const response = await axios.post('/api/verify-payment', {
                    utr: state.utr,
                    amount: state.amount,
                    orderId: sessionId, // Pass Session ID to backend for tracking
                    email: state.email,
                    name: state.name
                });

                if (response.data.success) {
                    // Success! Record in Supabase
                    // The DB Trigger will automatically generate the 'order_id' (SF-2025-X) because status is verified

                    const { data: insertedData, error: dbError } = await supabase
                        .from('transactions')
                        .insert([
                            {
                                amount: state.amount,
                                utr: state.utr,
                                session_id: sessionId, // Store UUID in session_id
                                status: 'verified',
                                customer_details: { name: state.name, email: state.email },
                            },
                        ])
                        .select()
                        .single();

                    let finalData = insertedData;

                    if (dbError) {
                        console.error('Supabase error:', dbError);
                        // If duplicate UTR, fetch the existing one
                        if (dbError.code === '23505') {
                            const { data: existingData } = await supabase
                                .from('transactions')
                                .select()
                                .eq('utr', state.utr)
                                .single();
                            finalData = existingData;
                        }
                    }

                    if (finalData && finalData.order_id) {
                        setOfficialOrderId(finalData.order_id);
                    }

                    setState(prev => ({ ...prev, step: 'verified' }));
                    return true; // Stop polling
                } else {
                    // Not found yet
                    if (attempts >= maxAttempts) {
                        // Switch to manual upload instead of failed
                        setState(prev => ({ ...prev, step: 'manual_upload', error: '' }));
                        return true; // Stop polling
                    }
                    return false; // Continue polling
                }
            } catch (err: any) {
                console.error('Verification error:', err);
                // If it's a network error, we might want to keep retrying, but for now let's fail after max attempts
                if (attempts >= maxAttempts) {
                    setState(prev => ({ ...prev, step: 'failed', error: err.response?.data?.message || 'Server error during verification' }));
                    return true;
                }
                return false;
            }
        };

        // Start polling loop
        const poll = async () => {
            const stop = await checkPayment();
            if (!stop) {
                setTimeout(poll, pollInterval);
            }
        };

        poll();
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Generate UPI Intent Link
    const upiUrl = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(MERCHANT_NAME)}&am=${state.amount}&cu=INR`;

    const [uploading, setUploading] = useState(false);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            // 1. Insert transaction FIRST to get the Order ID (if generated) or at least the Transaction ID
            const { data: insertedData, error: insertError } = await supabase
                .from('transactions')
                .insert({
                    utr: state.utr || `MANUAL-${Date.now()}`, // Fallback if no UTR entered
                    amount: state.amount,
                    session_id: sessionId, // Store UUID in session_id
                    status: 'pending_manual_verification',
                    customer_details: { name: state.name, email: state.email }
                    // screenshot_url is initially null
                })
                .select()
                .single();

            if (insertError) throw insertError;

            // 2. Determine filename using Order ID (preferred) or Session ID
            const fileExt = file.name.split('.').pop();
            // If order_id exists (e.g. SF-2025-1001), use it. Otherwise fallback to sessionId.
            const baseName = insertedData?.order_id || sessionId;
            const fileName = `${baseName}.${fileExt}`;
            const filePath = `${fileName}`;

            // 3. Upload the file
            const { error: uploadError } = await supabase.storage
                .from('payment_proofs')
                .upload(filePath, file, {
                    upsert: true // Overwrite if exists
                });

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('payment_proofs')
                .getPublicUrl(filePath);

            // 4. Update the transaction with the screenshot URL
            const { error: updateError } = await supabase
                .from('transactions')
                .update({ screenshot_url: publicUrl })
                .eq('id', insertedData.id);

            if (updateError) throw updateError;

            // Update local state
            if (insertedData && insertedData.order_id) {
                setOfficialOrderId(insertedData.order_id);
            }

            setState(prev => ({ ...prev, step: 'review_pending', screenshot_url: publicUrl }));
        } catch (error: any) {
            console.error('Error uploading:', error);
            if (error.code === '23505' || error.message?.includes('duplicate key')) {
                setState(prev => ({ ...prev, error: 'This UTR has already been submitted. Please check your status.' }));
            } else {
                setState(prev => ({ ...prev, error: error.message || 'Error uploading screenshot' }));
            }
        } finally {
            setUploading(false);
        }
    };

    // Listen for status updates (e.g. Admin approval)
    useEffect(() => {
        if (!sessionId) return;



        const subscription = supabase
            .channel(`transaction_${sessionId}`)
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'transactions',
                    filter: `session_id=eq.${sessionId}` // Listen specifically for this session UUID
                },
                (payload) => {

                    const newStatus = payload.new.status;
                    const newOrderId = payload.new.order_id;

                    if (newStatus === 'verified') {
                        if (newOrderId) {
                            setOfficialOrderId(newOrderId);
                        }
                        setState(prev => ({ ...prev, step: 'verified' }));

                        // Trigger email receipt
                        // axios.post('/api/send-receipt', { ... }) - Handled by verify-payment API
                        console.log('Payment verified, receipt handled by API');

                    } else if (newStatus === 'rejected') {
                        setState(prev => ({ ...prev, step: 'failed', error: 'Payment verification rejected by admin.' }));
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, [sessionId]);

    // [NEW] Polling fallback for 'review_pending' state
    // In case Realtime is flaky or behind a firewall, we poll every 10 seconds
    useEffect(() => {
        let pollTimer: NodeJS.Timeout;

        if (state.step === 'review_pending' && sessionId) {
            const pollFn = async () => {
                try {
                    const { data, error } = await supabase
                        .from('transactions')
                        .select('status, order_id')
                        .eq('session_id', sessionId) // Always query by stable session ID
                        .single();

                    if (data) {
                        if (data.status === 'verified') {
                            if (data.order_id) setOfficialOrderId(data.order_id);
                            setState(prev => ({ ...prev, step: 'verified' }));
                        } else if (data.status === 'rejected') {
                            setState(prev => ({ ...prev, step: 'failed', error: 'Payment verification rejected by admin.' }));
                        }
                    }
                } catch (err) {
                    console.error('Polling error:', err);
                }
            };

            // Poll immediately then every 10s
            pollFn();
            pollTimer = setInterval(pollFn, 10000);
        }

        return () => {
            if (pollTimer) clearInterval(pollTimer);
        };
    }, [state.step, sessionId]);

    const checkStatus = async () => {
        // If we have an official order ID, check by that.
        // If not, check by session_id or UTR.
        if (!officialOrderId && !sessionId && !state.utr) return;

        try {
            let query = supabase.from('transactions').select('status, order_id');

            if (officialOrderId) {
                query = query.eq('order_id', officialOrderId);
            } else if (sessionId) {
                query = query.eq('session_id', sessionId);
            } else {
                query = query.eq('utr', state.utr);
            }

            const { data, error } = await query.maybeSingle();

            if (error) throw error;

            if (!data) {
                alert('Transaction not found. Please ensure you have submitted the details.');
                return;
            }

            if (data.status === 'verified') {
                if (data.order_id) setOfficialOrderId(data.order_id);
                // Also update the state orderId if needed so it propagates immediately
                setState(prev => ({ ...prev, step: 'verified' }));
            } else if (data.status === 'rejected') {
                setState(prev => ({ ...prev, step: 'failed', error: 'Payment verification rejected by admin.' }));
            } else if (data.status === 'pending_manual_verification') {
                setState(prev => ({ ...prev, step: 'review_pending' }));
            } else {
                alert('Payment status: ' + (data.status || 'pending'));
            }
        } catch (err: any) {
            console.error('Error checking status:', err);
            alert('Error checking status: ' + (err.message || 'Unknown error'));
        }
    };

    const [loading, setLoading] = useState(true);
    const [loadingStep, setLoadingStep] = useState(0);

    useEffect(() => {
        // Step 0: Initial (0ms)
        // Step 1: Securing (500ms)
        // Step 2: Verifying (1200ms)
        // Step 3: Finalizing (2000ms)
        // Finish: (2500ms)

        const timers = [
            setTimeout(() => setLoadingStep(1), 500),
            setTimeout(() => setLoadingStep(2), 1200),
            setTimeout(() => setLoadingStep(3), 2000),
            setTimeout(() => setLoading(false), 2500),
        ];

        return () => timers.forEach(clearTimeout);
    }, []);

    if (loading) {
        const steps = [
            "Initializing secure environment...",
            "Encrypting connection...",
            "Verifying merchant details...",
            "Preparing payment gateway..."
        ];

        const icons = [
            <Shield size={24} className="text-[#635BFF]" />,
            <Lock size={24} className="text-[#635BFF]" />,
            <Search size={24} className="text-[#635BFF]" />,
            <CreditCard size={24} className="text-[#635BFF]" />
        ];

        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
                {/* Tech Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,#C9EBFF,transparent)]"></div>

                <div className="relative z-10 flex flex-col items-center w-full max-w-sm">
                    {/* Logo */}
                    <div className="mb-8 animate-fade-in relative group">
                        <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>
                        <img
                            src="/shark-logo-full.png"
                            alt="Shark Funded"
                            className="h-14 object-contain animate-float relative z-10"
                        />
                        {/* Shimmer Overlay */}
                        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-lg">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-logo-shimmer"></div>
                        </div>
                    </div>

                    {/* Dynamic Icon Container */}
                    <div className="mb-8 w-16 h-16 bg-white rounded-2xl shadow-lg shadow-indigo-100 border border-indigo-50 flex items-center justify-center relative overflow-hidden">
                        {icons.map((icon, index) => (
                            <div
                                key={index}
                                className={`absolute transition-all duration-500 transform ${index === loadingStep
                                    ? 'opacity-100 scale-100 rotate-0'
                                    : 'opacity-0 scale-50 rotate-12'
                                    }`}
                            >
                                {icon}
                            </div>
                        ))}
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mb-6 relative">
                        <div
                            className="absolute top-0 left-0 h-full bg-[#635BFF] transition-all duration-700 ease-out rounded-full"
                            style={{ width: `${((loadingStep + 1) / 4) * 100}%` }}
                        ></div>
                        {/* Shimmer Effect on Bar */}
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }}></div>
                    </div>

                    {/* Status Text */}
                    <div className="h-6 flex items-center justify-center overflow-hidden relative w-full">
                        {steps.map((text, index) => (
                            <p
                                key={index}
                                className={`absolute text-sm font-medium text-slate-600 transition-all duration-500 transform ${index === loadingStep
                                    ? 'opacity-100 translate-y-0'
                                    : index < loadingStep
                                        ? 'opacity-0 -translate-y-4'
                                        : 'opacity-0 translate-y-4'
                                    }`}
                            >
                                {text}
                            </p>
                        ))}
                    </div>

                    {/* Security Badge (Appears at Step 2) */}
                    <div className={`mt-12 transition-all duration-700 ${loadingStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full border border-slate-200 shadow-sm">
                            <ShieldCheck size={14} className="text-emerald-500" />
                            <span className="text-xs font-semibold text-slate-600">Bank-Grade Security</span>
                        </div>
                    </div>
                </div>

                <style jsx>{`
                    @keyframes float {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-8px); }
                    }
                    @keyframes logo-shimmer {
                        0% { transform: translateX(-150%) skewX(-15deg); }
                        100% { transform: translateX(150%) skewX(-15deg); }
                    }
                    @keyframes shimmer {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(100%); }
                    }
                    @keyframes breath {
                        0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0px rgba(99, 91, 255, 0)); }
                        50% { transform: scale(1.05); filter: drop-shadow(0 0 10px rgba(99, 91, 255, 0.2)); }
                    }
                    .animate-float {
                        animation: float 4s ease-in-out infinite;
                    }
                    .animate-logo-shimmer {
                        animation: logo-shimmer 2.5s infinite;
                    }
                    .animate-shimmer {
                        animation: shimmer 1.5s infinite;
                    }
                    .animate-breath {
                        animation: breath 3s ease-in-out infinite;
                    }
                `}</style>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F0F2F5] flex items-center justify-center p-4 font-sans selection:bg-slate-900 selection:text-white">

            <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] animate-slide-up">

                {/* Left Sidebar (Razorpay Style) */}
                <div className="md:w-[350px] bg-[#F9FAFB] border-r border-slate-100 p-8 flex flex-col justify-between relative">
                    <div>
                        <div className="flex flex-col items-start gap-4 mb-8">
                            <div className="w-48 h-auto">
                                <img src="/shark-logo-full.png" alt="Shark Funded" className="w-full h-full object-contain" />
                            </div>
                            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                                <ShieldCheck size={12} className="text-emerald-500" />
                                <span>Trusted Merchant</span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Amount to Pay</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-bold text-slate-900">₹{state.amount ? Number(state.amount).toLocaleString() : '0.00'}</span>
                                    <span className="text-slate-500 text-sm font-medium">INR</span>
                                </div>
                            </div>

                            {/* Official Order ID (Only on Success) */}
                            {officialOrderId && (
                                <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100 shadow-sm animate-fade-in">
                                    <p className="text-xs text-emerald-600 mb-1 font-bold">Order ID</p>
                                    <p className="font-mono text-sm font-bold text-emerald-800 break-all">{officialOrderId}</p>
                                </div>
                            )}

                            <div className="space-y-3 pt-6 border-t border-slate-200">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                        <Lock size={14} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-700">Secure Payment</p>
                                        <p className="text-[10px] text-slate-500">256-bit SSL Encrypted</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                                        <Check size={14} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-700">Instant Verification</p>
                                        <p className="text-[10px] text-slate-500">Automated confirmation</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 md:mt-0 pt-6 border-t border-slate-200 md:border-0 md:pt-0">
                        <div className="flex items-center gap-2 opacity-60">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Powered by</span>
                            <span className="text-xs font-bold text-slate-600">Shark Payments</span>
                        </div>
                    </div>
                </div>

                {/* Right Content (Stripe Style) */}
                <div className="flex-1 p-8 md:p-12 flex flex-col justify-center relative">



                    <div className="max-w-md mx-auto w-full">

                        {state.step === 'details' && (
                            <PaymentDetailsForm
                                state={state}
                                setState={setState}
                                handleDetailsSubmit={handleDetailsSubmit}
                            />
                        )}

                        {state.step === 'payment' && (
                            <PaymentQRSection
                                state={state}
                                setState={setState}
                                upiUrl={upiUrl}
                                timeLeft={timeLeft}
                                handleVerify={handleVerify}
                                merchantName={MERCHANT_NAME}
                                upiId={UPI_ID}
                                copyToClipboard={copyToClipboard}
                                copied={copied}
                            />
                        )}

                        {state.step === 'verifying' && (
                            <PaymentVerification
                                verificationStatus={verificationStatus}
                                state={state}
                            />
                        )}

                        {state.step === 'success' || state.step === 'verified' || state.step === 'review_pending' ? (
                            <div className="md:col-span-12 lg:col-span-8 bg-white p-8 md:p-12 flex items-center justify-center min-h-[600px]">
                                <PaymentStatus
                                    step={state.step}
                                    amount={state.amount}
                                    orderId={officialOrderId || sessionId}
                                    callbackUrl={callbackUrl || searchParams.get('callback_url')}
                                />
                            </div>
                        ) : (state.step === 'manual_upload' && (
                            <PaymentManualUpload
                                state={state}
                                handleFileUpload={handleFileUpload}
                                uploading={uploading}
                            />
                        ))}

                    </div>
                </div>
            </div>
        </div>
    );
}

