(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Downloads/sharkfunded/src/lib/supabase.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/sharkfunded/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/sharkfunded/node_modules/@supabase/supabase-js/dist/module/index.js [app-client] (ecmascript) <locals>");
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://abtcxdaddnfozgekkrsw.supabase.co");
const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFidGN4ZGFkZG5mb3pnZWtrcnN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxMDMyMjAsImV4cCI6MjA2MTY3OTIyMH0.B9usHQY_oQea53fqa02_FEmadEBnC8GJeViRsJEOcPE");
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl || 'https://placeholder.supabase.co', supabaseAnonKey || 'placeholder-key');
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sharkfunded/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sharkfunded/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$qrcode$2e$react$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sharkfunded/node_modules/qrcode.react/lib/esm/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sharkfunded/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sharkfunded/src/lib/supabase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/Downloads/sharkfunded/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/Downloads/sharkfunded/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/Downloads/sharkfunded/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/Downloads/sharkfunded/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/Downloads/sharkfunded/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/Downloads/sharkfunded/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/Downloads/sharkfunded/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-client] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/Downloads/sharkfunded/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/Downloads/sharkfunded/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/Downloads/sharkfunded/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/Downloads/sharkfunded/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sharkfunded/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
const PaymentPage = ()=>{
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const urlSessionId = params?.orderId; // This is the UUID from URL (Session ID)
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        step: 'details',
        amount: '',
        name: '',
        email: '',
        utr: '',
        error: ''
    });
    const [sessionId, setSessionId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(urlSessionId || '');
    const [officialOrderId, setOfficialOrderId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(''); // This will be the SF-2025-X ID
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [timeLeft, setTimeLeft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(15 * 60); // 15 minutes in seconds
    const UPI_ID = '9515358045@ybl';
    const MERCHANT_NAME = 'Shark Funded';
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PaymentPage.useEffect": ()=>{
            if (urlSessionId) {
                setSessionId(urlSessionId);
            }
        }
    }["PaymentPage.useEffect"], [
        urlSessionId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PaymentPage.useEffect": ()=>{
            let timer;
            if (state.step === 'payment' && timeLeft > 0) {
                timer = setInterval({
                    "PaymentPage.useEffect": ()=>{
                        setTimeLeft({
                            "PaymentPage.useEffect": (prev)=>prev - 1
                        }["PaymentPage.useEffect"]);
                    }
                }["PaymentPage.useEffect"], 1000);
            } else if (timeLeft === 0 && state.step === 'payment') {
                setState({
                    "PaymentPage.useEffect": (prev)=>({
                            ...prev,
                            step: 'expired'
                        })
                }["PaymentPage.useEffect"]);
            }
            return ({
                "PaymentPage.useEffect": ()=>clearInterval(timer)
            })["PaymentPage.useEffect"];
        }
    }["PaymentPage.useEffect"], [
        state.step,
        timeLeft
    ]);
    const formatTime = (seconds)=>{
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };
    const handleDetailsSubmit = (e)=>{
        e.preventDefault();
        if (!state.amount || !state.name || !state.email) {
            setState((prev)=>({
                    ...prev,
                    error: 'Please fill in all fields'
                }));
            return;
        }
        setTimeLeft(15 * 60); // Reset timer
        setState((prev)=>({
                ...prev,
                step: 'payment',
                error: ''
            }));
    };
    const handleVerify = async ()=>{
        if (!state.utr) {
            setState((prev)=>({
                    ...prev,
                    error: 'Please enter UTR number'
                }));
            return;
        }
        setState((prev)=>({
                ...prev,
                step: 'verifying',
                error: ''
            }));
        // 1. Check if UTR is already used
        try {
            const { data: existingTxn, error: checkError } = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('transactions').select('*').eq('utr', state.utr).eq('status', 'verified').single();
            if (checkError && checkError.code !== 'PGRST116') {
                console.error('Error checking UTR:', checkError);
                setState((prev)=>({
                        ...prev,
                        step: 'failed',
                        error: 'Error checking transaction status'
                    }));
                return;
            }
            if (existingTxn) {
                setState((prev)=>({
                        ...prev,
                        step: 'failed',
                        error: 'This UTR has already been used for a verified payment.'
                    }));
                return;
            }
        } catch (err) {
            console.error('Unexpected error checking UTR:', err);
        }
        // Polling logic: Check every 5 seconds for up to 2 minutes (24 attempts)
        let attempts = 0;
        const maxAttempts = 24;
        const pollInterval = 5000; // 5 seconds
        const checkPayment = async ()=>{
            try {
                attempts++;
                console.log(`Verification attempt ${attempts}/${maxAttempts}`);
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/api/verify-payment', {
                    utr: state.utr,
                    amount: state.amount,
                    orderId: sessionId
                });
                if (response.data.success) {
                    // Success! Record in Supabase
                    // The DB Trigger will automatically generate the 'order_id' (SF-2025-X) because status is verified
                    const { data: insertedData, error: dbError } = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('transactions').insert([
                        {
                            amount: state.amount,
                            utr: state.utr,
                            session_id: sessionId,
                            status: 'verified',
                            customer_details: {
                                name: state.name,
                                email: state.email
                            }
                        }
                    ]).select().single();
                    if (dbError) console.error('Supabase error:', dbError);
                    if (insertedData && insertedData.order_id) {
                        setOfficialOrderId(insertedData.order_id);
                    }
                    setState((prev)=>({
                            ...prev,
                            step: 'success'
                        }));
                    return true; // Stop polling
                } else {
                    // Not found yet
                    if (attempts >= maxAttempts) {
                        // Switch to manual upload instead of failed
                        setState((prev)=>({
                                ...prev,
                                step: 'manual_upload',
                                error: ''
                            }));
                        return true; // Stop polling
                    }
                    return false; // Continue polling
                }
            } catch (err) {
                console.error('Verification error:', err);
                // If it's a network error, we might want to keep retrying, but for now let's fail after max attempts
                if (attempts >= maxAttempts) {
                    setState((prev)=>({
                            ...prev,
                            step: 'failed',
                            error: err.response?.data?.message || 'Server error during verification'
                        }));
                    return true;
                }
                return false;
            }
        };
        // Start polling loop
        const poll = async ()=>{
            const stop = await checkPayment();
            if (!stop) {
                setTimeout(poll, pollInterval);
            }
        };
        poll();
    };
    const copyToClipboard = (text)=>{
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(()=>setCopied(false), 2000);
    };
    // Generate UPI Intent Link
    const upiUrl = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(MERCHANT_NAME)}&am=${state.amount}&cu=INR`;
    const [uploading, setUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleFileUpload = async (e)=>{
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${sessionId}.${fileExt}`; // Use Session ID for filename
            const filePath = `${fileName}`;
            const { error: uploadError } = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].storage.from('payment_proofs').upload(filePath, file);
            if (uploadError) throw uploadError;
            const { data: { publicUrl } } = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].storage.from('payment_proofs').getPublicUrl(filePath);
            // Update transaction with screenshot URL and status
            // Note: Since we haven't inserted the transaction yet (because auto-verify failed),
            // we insert it now. The trigger will NOT generate Order ID yet because status is pending_manual_verification.
            const { data: insertedData, error: updateError } = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('transactions').insert({
                utr: state.utr || `MANUAL-${Date.now()}`,
                amount: state.amount,
                session_id: sessionId,
                status: 'pending_manual_verification',
                screenshot_url: publicUrl,
                customer_details: {
                    name: state.name,
                    email: state.email
                }
            }).select().single();
            if (updateError) throw updateError;
            // No official order ID yet for manual upload
            if (insertedData && insertedData.order_id) {
                setOfficialOrderId(insertedData.order_id);
            }
            setState((prev)=>({
                    ...prev,
                    step: 'success',
                    screenshot_url: publicUrl
                })); // Update local state to show pending UI
        } catch (error) {
            console.error('Error uploading:', error);
            setState((prev)=>({
                    ...prev,
                    error: error.message || 'Error uploading screenshot'
                }));
        } finally{
            setUploading(false);
        }
    };
    // Listen for status updates (e.g. Admin approval)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PaymentPage.useEffect": ()=>{
            if (!sessionId) return;
            console.log('Setting up realtime subscription for session:', sessionId);
            const subscription = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].channel(`transaction_${sessionId}`).on('postgres_changes', {
                event: 'UPDATE',
                schema: 'public',
                table: 'transactions',
                filter: `session_id=eq.${sessionId}` // Listen specifically for this session UUID
            }, {
                "PaymentPage.useEffect.subscription": (payload)=>{
                    console.log('Transaction updated:', payload);
                    const newStatus = payload.new.status;
                    const newOrderId = payload.new.order_id;
                    if (newStatus === 'verified') {
                        if (newOrderId) {
                            setOfficialOrderId(newOrderId);
                        }
                        setState({
                            "PaymentPage.useEffect.subscription": (prev)=>({
                                    ...prev,
                                    step: 'verified'
                                })
                        }["PaymentPage.useEffect.subscription"]);
                    } else if (newStatus === 'rejected') {
                        setState({
                            "PaymentPage.useEffect.subscription": (prev)=>({
                                    ...prev,
                                    step: 'failed',
                                    error: 'Payment verification rejected by admin.'
                                })
                        }["PaymentPage.useEffect.subscription"]);
                    }
                }
            }["PaymentPage.useEffect.subscription"]).subscribe();
            return ({
                "PaymentPage.useEffect": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].removeChannel(subscription);
                }
            })["PaymentPage.useEffect"];
        }
    }["PaymentPage.useEffect"], [
        sessionId
    ]);
    const checkStatus = async ()=>{
        // If we have an official order ID, check by that.
        // If not, check by session_id or UTR.
        if (!officialOrderId && !sessionId && !state.utr) return;
        try {
            let query = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('transactions').select('status, order_id');
            if (officialOrderId) {
                query = query.eq('order_id', officialOrderId);
            } else if (sessionId) {
                query = query.eq('session_id', sessionId);
            } else {
                query = query.eq('utr', state.utr);
            }
            const { data, error } = await query.single();
            if (error) throw error;
            if (data?.status === 'verified') {
                if (data.order_id) setOfficialOrderId(data.order_id);
                setState((prev)=>({
                        ...prev,
                        step: 'verified'
                    }));
            } else if (data?.status === 'rejected') {
                setState((prev)=>({
                        ...prev,
                        step: 'failed',
                        error: 'Payment verification rejected by admin.'
                    }));
            } else if (data?.status === 'pending_manual_verification') {
                alert('Your payment is still under review. We will notify you once approved.');
            } else {
                alert('Payment status: ' + (data?.status || 'pending'));
            }
        } catch (err) {
            console.error('Error checking status:', err);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-[#F0F2F5] flex items-center justify-center p-4 font-sans selection:bg-slate-900 selection:text-white",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] animate-slide-up",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "md:w-[350px] bg-[#F9FAFB] border-r border-slate-100 p-8 flex flex-col justify-between relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 mb-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-10 h-10 bg-white rounded-lg shadow-sm border border-slate-200 flex items-center justify-center p-1",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: "/shark-logo-full.png",
                                                alt: "Shark Funded",
                                                className: "w-full h-full object-contain"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                lineNumber: 327,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                            lineNumber: 326,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-bold text-slate-900 text-sm",
                                                    children: "Shark Funded"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                    lineNumber: 330,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-1 text-xs text-slate-500",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                                            size: 10,
                                                            className: "text-emerald-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                            lineNumber: 332,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Trusted Merchant"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                            lineNumber: 333,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                    lineNumber: 331,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                            lineNumber: 329,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                    lineNumber: 325,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs font-bold text-slate-400 uppercase tracking-wider mb-1",
                                                    children: "Amount to Pay"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                    lineNumber: 340,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-baseline gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-3xl font-bold text-slate-900",
                                                            children: [
                                                                "₹",
                                                                state.amount ? Number(state.amount).toLocaleString() : '0.00'
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                            lineNumber: 342,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-slate-500 text-sm font-medium",
                                                            children: "INR"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                            lineNumber: 343,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                    lineNumber: 341,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                            lineNumber: 339,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        officialOrderId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-emerald-50 p-3 rounded-lg border border-emerald-100 shadow-sm animate-fade-in",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-emerald-600 mb-1 font-bold",
                                                    children: "Order ID"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                    lineNumber: 350,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-mono text-sm font-bold text-emerald-800 break-all",
                                                    children: officialOrderId
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                    lineNumber: 351,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                            lineNumber: 349,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-3 pt-6 border-t border-slate-200",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                                                size: 14
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                                lineNumber: 358,
                                                                columnNumber: 41
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                            lineNumber: 357,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs font-bold text-slate-700",
                                                                    children: "Secure Payment"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                                    lineNumber: 361,
                                                                    columnNumber: 41
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-[10px] text-slate-500",
                                                                    children: "256-bit SSL Encrypted"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                                    lineNumber: 362,
                                                                    columnNumber: 41
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                            lineNumber: 360,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                    lineNumber: 356,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                size: 14
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                                lineNumber: 367,
                                                                columnNumber: 41
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                            lineNumber: 366,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs font-bold text-slate-700",
                                                                    children: "Instant Verification"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                                    lineNumber: 370,
                                                                    columnNumber: 41
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-[10px] text-slate-500",
                                                                    children: "Automated confirmation"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                                    lineNumber: 371,
                                                                    columnNumber: 41
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                            lineNumber: 369,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                    lineNumber: 365,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                            lineNumber: 355,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                    lineNumber: 338,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                            lineNumber: 324,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-8 md:mt-0 pt-6 border-t border-slate-200 md:border-0 md:pt-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 opacity-60",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] font-bold text-slate-400 uppercase tracking-wider",
                                        children: "Powered by"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                        lineNumber: 380,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-bold text-slate-600",
                                        children: "Shark Payments"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                        lineNumber: 381,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                lineNumber: 379,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                            lineNumber: 378,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                    lineNumber: 323,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 p-8 md:p-12 flex flex-col justify-center relative",
                    children: [
                        state.step === 'payment' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setState((prev)=>({
                                        ...prev,
                                        step: 'details'
                                    })),
                            className: "absolute top-8 left-8 text-slate-400 hover:text-slate-700 transition-colors flex items-center gap-1 text-sm font-medium",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                    lineNumber: 395,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)),
                                " Back"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                            lineNumber: 391,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-md mx-auto w-full",
                            children: [
                                state.step === 'details' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                    onSubmit: handleDetailsSubmit,
                                    className: "space-y-6 animate-fade-in",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-8",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-xl font-bold text-slate-900 mb-2",
                                                    children: "Contact Information"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                    lineNumber: 404,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-slate-500 text-sm",
                                                    children: "Enter your details to proceed with the payment."
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                    lineNumber: 405,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                            lineNumber: 403,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-sm font-medium text-slate-700 mb-1.5",
                                                            children: "Email Address"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                            lineNumber: 410,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "email",
                                                            required: true,
                                                            className: "w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-slate-900 placeholder:text-slate-400 shadow-sm",
                                                            value: state.email,
                                                            onChange: (e)=>setState({
                                                                    ...state,
                                                                    email: e.target.value
                                                                }),
                                                            placeholder: "name@example.com"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                            lineNumber: 411,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                    lineNumber: 409,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-sm font-medium text-slate-700 mb-1.5",
                                                            children: "Full Name"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                            lineNumber: 421,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            required: true,
                                                            className: "w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-slate-900 placeholder:text-slate-400 shadow-sm",
                                                            value: state.name,
                                                            onChange: (e)=>setState({
                                                                    ...state,
                                                                    name: e.target.value
                                                                }),
                                                            placeholder: "John Doe"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                            lineNumber: 422,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                    lineNumber: 420,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-sm font-medium text-slate-700 mb-1.5",
                                                            children: "Amount"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                            lineNumber: 432,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "relative",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium",
                                                                    children: "₹"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                                    lineNumber: 434,
                                                                    columnNumber: 45
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "number",
                                                                    required: true,
                                                                    min: "1",
                                                                    className: "w-full pl-8 pr-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-slate-900 font-medium placeholder:text-slate-400 shadow-sm",
                                                                    value: state.amount,
                                                                    onChange: (e)=>setState({
                                                                            ...state,
                                                                            amount: e.target.value
                                                                        }),
                                                                    placeholder: "0.00"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                                    lineNumber: 435,
                                                                    columnNumber: 45
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                            lineNumber: 433,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                    lineNumber: 431,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                            lineNumber: 408,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        state.error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-3 bg-rose-50 text-rose-600 text-sm rounded-lg flex items-center gap-2 border border-rose-100",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                    size: 16
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                    lineNumber: 450,
                                                    columnNumber: 41
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium",
                                                    children: state.error
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                    lineNumber: 451,
                                                    columnNumber: 41
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                            lineNumber: 449,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            className: "w-full bg-[#635BFF] text-white py-3.5 rounded-lg font-bold text-sm hover:bg-[#5851E3] hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200 flex items-center justify-center gap-2 mt-4",
                                            children: [
                                                "Pay ₹",
                                                state.amount ? Number(state.amount).toLocaleString() : '0.00',
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                    size: 16
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                    lineNumber: 460,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                            lineNumber: 455,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                    lineNumber: 402,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)),
                                state.step === 'payment' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-8 animate-fade-in",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-xl font-bold text-slate-900 mb-2",
                                                    children: "Scan QR to Pay"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                    lineNumber: 468,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-bold border border-amber-100",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                            size: 12,
                                                            className: "animate-pulse"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                            lineNumber: 470,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        "Expires in ",
                                                        formatTime(timeLeft)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                    lineNumber: 469,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                            lineNumber: 467,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-1 bg-white rounded-xl border border-slate-200 shadow-sm mb-4 cursor-pointer hover:shadow-md transition-all",
                                                    onClick: ()=>copyToClipboard(upiUrl),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$qrcode$2e$react$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QRCodeSVG"], {
                                                            value: upiUrl,
                                                            size: 180,
                                                            level: "L",
                                                            className: "rounded-lg"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                            lineNumber: 477,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        copied && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute inset-0 flex items-center justify-center bg-white/90 rounded-xl backdrop-blur-sm",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs font-bold text-slate-900 flex items-center gap-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                                        size: 14,
                                                                        className: "text-emerald-500"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                                        lineNumber: 480,
                                                                        columnNumber: 124
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    " Copied"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                                lineNumber: 480,
                                                                columnNumber: 49
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                            lineNumber: 479,
                                                            columnNumber: 45
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                    lineNumber: 476,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-1.5 rounded-md border border-slate-200 cursor-pointer hover:bg-slate-100",
                                                    onClick: ()=>copyToClipboard(UPI_ID),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-mono font-medium",
                                                            children: UPI_ID
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                            lineNumber: 486,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                                            size: 14,
                                                            className: "text-slate-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                            lineNumber: 487,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                    lineNumber: 485,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                            lineNumber: 475,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "pt-6 border-t border-slate-100",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-medium text-slate-700 mb-2",
                                                    children: "Enter UTR / Reference Number"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                    lineNumber: 492,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            className: "flex-1 px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-slate-900 font-mono font-medium placeholder:text-slate-400 shadow-sm",
                                                            placeholder: "12-digit UTR",
                                                            value: state.utr,
                                                            onChange: (e)=>setState({
                                                                    ...state,
                                                                    utr: e.target.value
                                                                })
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                            lineNumber: 494,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: handleVerify,
                                                            className: "px-6 bg-slate-900 text-white rounded-lg font-bold text-sm hover:bg-slate-800 transition-all shadow-md",
                                                            children: "Verify"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                            lineNumber: 501,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                    lineNumber: 493,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-slate-400 mt-2",
                                                    children: "Required to confirm your payment instantly."
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                    lineNumber: 508,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                            lineNumber: 491,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                    lineNumber: 466,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)),
                                state.step === 'verifying' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center py-12 space-y-6 animate-fade-in",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-16 h-16 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin mx-auto"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                            lineNumber: 517,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-lg font-bold text-slate-900",
                                                    children: "Verifying Payment"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                    lineNumber: 519,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-slate-500 text-sm mt-1",
                                                    children: "Confirming with the bank..."
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                    lineNumber: 520,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                            lineNumber: 518,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                    lineNumber: 516,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)),
                                (state.step === 'success' || state.step === 'verified') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center py-8 space-y-6 animate-scale-in",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `w-16 h-16 ${state.step === 'verified' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'} rounded-full flex items-center justify-center mx-auto`,
                                            children: state.step === 'verified' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                size: 32
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                lineNumber: 528,
                                                columnNumber: 66
                                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                size: 32
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                lineNumber: 528,
                                                columnNumber: 95
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                            lineNumber: 527,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-2xl font-bold text-slate-900",
                                                    children: state.step === 'verified' ? 'Payment Verified' : state.screenshot_url ? 'Submitted for Review' : 'Payment Successful'
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                    lineNumber: 531,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-slate-500 text-sm mt-1",
                                                    children: state.step === 'verified' ? 'Your transaction has been confirmed.' : state.screenshot_url ? 'We will notify you once approved.' : 'Thank you for your payment.'
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                    lineNumber: 534,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                            lineNumber: 530,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-slate-50 p-4 rounded-xl border border-slate-200 text-left space-y-2 text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-slate-500",
                                                            children: "Amount Paid"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                            lineNumber: 541,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-bold text-slate-900",
                                                            children: [
                                                                "₹",
                                                                Number(state.amount).toLocaleString()
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                            lineNumber: 542,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                    lineNumber: 540,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-slate-500",
                                                            children: "Order ID"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                            lineNumber: 545,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-mono font-bold text-slate-900 break-all",
                                                            children: officialOrderId || 'Generating...'
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                            lineNumber: 546,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                    lineNumber: 544,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-slate-500",
                                                            children: "Reference/UTR"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                            lineNumber: 549,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-mono font-bold text-slate-900",
                                                            children: state.utr
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                            lineNumber: 550,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                    lineNumber: 548,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                            lineNumber: 539,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-3 pt-4",
                                            children: [
                                                state.screenshot_url && state.step !== 'verified' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: checkStatus,
                                                    className: "w-full bg-white text-slate-700 border border-slate-200 py-3 rounded-lg font-bold text-sm hover:bg-slate-50 transition-all",
                                                    children: "Check Status"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                    lineNumber: 556,
                                                    columnNumber: 41
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>window.location.reload(),
                                                    className: "w-full bg-slate-900 text-white py-3 rounded-lg font-bold text-sm hover:bg-slate-800 transition-all",
                                                    children: "Done"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                    lineNumber: 563,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                            lineNumber: 554,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                    lineNumber: 526,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)),
                                state.step === 'failed' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center py-12 space-y-6 animate-scale-in",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                size: 32
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                lineNumber: 576,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                            lineNumber: 575,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-xl font-bold text-slate-900",
                                                    children: "Payment Failed"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                    lineNumber: 579,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-rose-600 font-medium text-sm mt-2 bg-rose-50 px-3 py-1 rounded-full inline-block",
                                                    children: state.error
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                    lineNumber: 580,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                            lineNumber: 578,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setState((prev)=>({
                                                        ...prev,
                                                        step: 'payment',
                                                        error: ''
                                                    })),
                                            className: "w-full bg-slate-900 text-white py-3 rounded-lg font-bold text-sm hover:bg-slate-800 transition-all",
                                            children: "Try Again"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                            lineNumber: 582,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                    lineNumber: 574,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)),
                                state.step === 'manual_upload' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center py-8 space-y-6 animate-fade-in",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                size: 32
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                lineNumber: 594,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                            lineNumber: 593,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-xl font-bold text-slate-900",
                                                    children: "Manual Verification"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                    lineNumber: 597,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-slate-500 text-sm mt-1",
                                                    children: "Please upload a screenshot of your payment."
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                    lineNumber: 598,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                            lineNumber: 596,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative group max-w-xs mx-auto",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "file",
                                                    accept: "image/*",
                                                    onChange: handleFileUpload,
                                                    className: "hidden",
                                                    id: "file-upload",
                                                    disabled: uploading
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                    lineNumber: 602,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "file-upload",
                                                    className: `w-full flex flex-col items-center justify-center gap-2 px-4 py-6 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-slate-900 hover:bg-slate-50 transition-all ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`,
                                                    children: [
                                                        uploading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                            className: "animate-spin text-slate-900",
                                                            size: 24
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                            lineNumber: 615,
                                                            columnNumber: 45
                                                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"], {
                                                            size: 24,
                                                            className: "text-slate-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                            lineNumber: 617,
                                                            columnNumber: 45
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-bold text-sm text-slate-700",
                                                            children: uploading ? 'Uploading...' : 'Upload Proof'
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                            lineNumber: 619,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                    lineNumber: 610,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                            lineNumber: 601,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        state.error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-rose-500 text-xs font-bold",
                                            children: state.error
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                            lineNumber: 622,
                                            columnNumber: 49
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                    lineNumber: 592,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)),
                                state.step === 'expired' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center py-12 space-y-6 animate-scale-in",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-16 h-16 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center mx-auto",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                size: 32
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                lineNumber: 629,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                            lineNumber: 628,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-xl font-bold text-slate-900",
                                                    children: "Session Expired"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                    lineNumber: 632,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-slate-500 text-sm mt-1",
                                                    children: "Please start over."
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                                    lineNumber: 633,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                            lineNumber: 631,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setState((prev)=>({
                                                        ...prev,
                                                        step: 'details',
                                                        error: ''
                                                    })),
                                            className: "w-full bg-slate-900 text-white py-3 rounded-lg font-bold text-sm hover:bg-slate-800 transition-all",
                                            children: "Start Over"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                            lineNumber: 635,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                                    lineNumber: 627,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                            lineNumber: 399,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
                    lineNumber: 387,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
            lineNumber: 320,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/Downloads/sharkfunded/src/app/secure-checkout/[orderId]/page.tsx",
        lineNumber: 318,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(PaymentPage, "zaZ/DFXJKdW1I7NUBOmCzS/DGTA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"]
    ];
});
_c = PaymentPage;
const __TURBOPACK__default__export__ = PaymentPage;
var _c;
__turbopack_context__.k.register(_c, "PaymentPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Downloads_sharkfunded_src_ba903083._.js.map