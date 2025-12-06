(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/supabase.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/module/index.js [app-client] (ecmascript) <locals>");
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://abtcxdaddnfozgekkrsw.supabase.co");
const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFidGN4ZGFkZG5mb3pnZWtrcnN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxMDMyMjAsImV4cCI6MjA2MTY3OTIyMH0.B9usHQY_oQea53fqa02_FEmadEBnC8GJeViRsJEOcPE");
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl || 'https://placeholder.supabase.co', supabaseAnonKey || 'placeholder-key');
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/config/upiConfig.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UPI_CONFIGS",
    ()=>UPI_CONFIGS,
    "getUpiConfigForTransaction",
    ()=>getUpiConfigForTransaction,
    "getUpiIdForTransaction",
    ()=>getUpiIdForTransaction
]);
const UPI_CONFIGS = [
    {
        vpa: '9515358045@ybl',
        merchantName: 'Shark Funded'
    }
];
const getUpiConfigForTransaction = (sessionId)=>{
    if (!sessionId) return UPI_CONFIGS[0];
    // Simple hash function to get a deterministic index from the UUID
    let hash = 0;
    for(let i = 0; i < sessionId.length; i++){
        hash = sessionId.charCodeAt(i) + ((hash << 5) - hash);
    }
    // Ensure positive index
    const index = Math.abs(hash) % UPI_CONFIGS.length;
    return UPI_CONFIGS[index];
};
const getUpiIdForTransaction = (sessionId)=>{
    return getUpiConfigForTransaction(sessionId).vpa;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/PropFirmCheckout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PropFirmCheckout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$qrcode$2e$react$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/qrcode.react/lib/esm/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$upiConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/upiConfig.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-client] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bitcoin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bitcoin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bitcoin.js [app-client] (ecmascript) <export default as Bitcoin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$university$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__University$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/university.js [app-client] (ecmascript) <export default as University>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
function PropFirmCheckout() {
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const urlSessionId = params?.orderId;
    const queryAmount = searchParams.get('amount');
    const queryName = searchParams.get('name');
    const queryEmail = searchParams.get('email');
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        step: 'billing',
        amount: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        country: 'India',
        utr: '',
        error: '',
        paymentMethod: 'upi' // Default to UPI
    });
    const [sessionId, setSessionId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(urlSessionId || '');
    const [officialOrderId, setOfficialOrderId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [timeLeft, setTimeLeft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(15 * 60);
    const { vpa: UPI_ID, merchantName: MERCHANT_NAME } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$upiConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUpiConfigForTransaction"])(sessionId);
    const CHALLENGE_PLANS = [
        {
            id: '5k',
            name: '5K Challenge',
            price: 2499,
            label: '$5,000 Account'
        },
        {
            id: '10k',
            name: '10K Challenge',
            price: 4499,
            label: '$10,000 Account'
        },
        {
            id: '20k',
            name: '20K Challenge',
            price: 8499,
            label: '$20,000 Account'
        },
        {
            id: '100k',
            name: '100K Challenge',
            price: 29999,
            label: '$100,000 Account'
        }
    ];
    const [selectedPlan, setSelectedPlan] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // Pre-select plan based on amount if possible, or default
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PropFirmCheckout.useEffect": ()=>{
            if (state.amount && !selectedPlan) {
                // Try to find matching plan
                const match = CHALLENGE_PLANS.find({
                    "PropFirmCheckout.useEffect.match": (p)=>p.price.toString() === state.amount
                }["PropFirmCheckout.useEffect.match"]);
                if (match) setSelectedPlan(match.id);
            }
        }
    }["PropFirmCheckout.useEffect"], [
        state.amount
    ]);
    const handlePlanChange = (planId)=>{
        const plan = CHALLENGE_PLANS.find((p)=>p.id === planId);
        if (plan) {
            setSelectedPlan(planId);
            setState((prev)=>({
                    ...prev,
                    amount: plan.price.toString()
                }));
        }
    };
    // Initial Data Fetch
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PropFirmCheckout.useEffect": ()=>{
            if (queryAmount && queryName && queryEmail) {
                const names = queryName.split(' ');
                setState({
                    "PropFirmCheckout.useEffect": (prev)=>({
                            ...prev,
                            amount: queryAmount,
                            firstName: names[0] || '',
                            lastName: names.slice(1).join(' ') || '',
                            email: queryEmail
                        })
                }["PropFirmCheckout.useEffect"]);
            } else if (urlSessionId) {
                const fetchOrderDetails = {
                    "PropFirmCheckout.useEffect.fetchOrderDetails": async ()=>{
                        try {
                            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('transactions').select('*').or(`id.eq.${urlSessionId},session_id.eq.${urlSessionId}`).single();
                            if (data) {
                                const names = (data.customer_details?.name || '').split(' ');
                                setState({
                                    "PropFirmCheckout.useEffect.fetchOrderDetails": (prev)=>({
                                            ...prev,
                                            amount: data.amount.toString(),
                                            firstName: names[0] || '',
                                            lastName: names.slice(1).join(' ') || '',
                                            email: data.customer_details?.email || '',
                                            step: data.status === 'verified' ? 'verified' : data.status === 'pending_payment' ? 'payment' : 'billing'
                                        })
                                }["PropFirmCheckout.useEffect.fetchOrderDetails"]);
                                if (data.order_id) setOfficialOrderId(data.order_id);
                            }
                        } catch (err) {
                            console.error("Error fetching order:", err);
                        }
                    }
                }["PropFirmCheckout.useEffect.fetchOrderDetails"];
                fetchOrderDetails();
                setSessionId(urlSessionId);
            }
        }
    }["PropFirmCheckout.useEffect"], [
        queryAmount,
        queryName,
        queryEmail,
        urlSessionId
    ]);
    // Timer Logic
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PropFirmCheckout.useEffect": ()=>{
            let timer;
            if (state.step === 'payment' && timeLeft > 0) {
                timer = setInterval({
                    "PropFirmCheckout.useEffect": ()=>setTimeLeft({
                            "PropFirmCheckout.useEffect": (prev)=>prev - 1
                        }["PropFirmCheckout.useEffect"])
                }["PropFirmCheckout.useEffect"], 1000);
            } else if (timeLeft === 0 && state.step === 'payment') {
                setState({
                    "PropFirmCheckout.useEffect": (prev)=>({
                            ...prev,
                            step: 'expired'
                        })
                }["PropFirmCheckout.useEffect"]);
            }
            return ({
                "PropFirmCheckout.useEffect": ()=>clearInterval(timer)
            })["PropFirmCheckout.useEffect"];
        }
    }["PropFirmCheckout.useEffect"], [
        state.step,
        timeLeft
    ]);
    const formatTime = (seconds)=>{
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };
    // Real-time Supabase Subscription
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PropFirmCheckout.useEffect": ()=>{
            if (!sessionId) return;
            const subscription = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].channel(`transaction_${sessionId}`).on('postgres_changes', {
                event: 'UPDATE',
                schema: 'public',
                table: 'transactions',
                filter: `session_id=eq.${sessionId}`
            }, {
                "PropFirmCheckout.useEffect.subscription": (payload)=>{
                    const newStatus = payload.new.status;
                    const newOrderId = payload.new.order_id;
                    if (newStatus === 'verified') {
                        if (newOrderId) setOfficialOrderId(newOrderId);
                        setState({
                            "PropFirmCheckout.useEffect.subscription": (prev)=>({
                                    ...prev,
                                    step: 'verified'
                                })
                        }["PropFirmCheckout.useEffect.subscription"]);
                        // Trigger Receipt Email
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/api/send-receipt', {
                            utr: state.utr,
                            email: state.email,
                            name: `${state.firstName} ${state.lastName}`
                        }).catch({
                            "PropFirmCheckout.useEffect.subscription": (err)=>console.error('Error sending receipt:', err)
                        }["PropFirmCheckout.useEffect.subscription"]);
                    } else if (newStatus === 'rejected') {
                        setState({
                            "PropFirmCheckout.useEffect.subscription": (prev)=>({
                                    ...prev,
                                    step: 'failed',
                                    error: 'Payment verification rejected by admin.'
                                })
                        }["PropFirmCheckout.useEffect.subscription"]);
                    }
                }
            }["PropFirmCheckout.useEffect.subscription"]).subscribe();
            return ({
                "PropFirmCheckout.useEffect": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].removeChannel(subscription);
                }
            })["PropFirmCheckout.useEffect"];
        }
    }["PropFirmCheckout.useEffect"], [
        sessionId
    ]);
    const [termsAccepted, setTermsAccepted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handlePlaceOrder = (e)=>{
        e.preventDefault();
        if (!state.firstName || !state.email || !state.address || !state.city || !state.zip) {
            setState((prev)=>({
                    ...prev,
                    error: 'Please fill in all required fields marked with *'
                }));
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(state.email)) {
            setState((prev)=>({
                    ...prev,
                    error: 'Please enter a valid email address'
                }));
            return;
        }
        if (!termsAccepted) {
            setState((prev)=>({
                    ...prev,
                    error: 'You must accept the terms and conditions to proceed.'
                }));
            return;
        }
        setState((prev)=>({
                ...prev,
                step: 'payment',
                error: ''
            }));
        setTimeLeft(15 * 60);
    };
    const handleVerify = async ()=>{
        if (!state.utr || state.utr.length !== 12) {
            setState((prev)=>({
                    ...prev,
                    error: 'UTR number must be exactly 12 digits'
                }));
            return;
        }
        setState((prev)=>({
                ...prev,
                step: 'verifying',
                error: ''
            }));
        // 1. Check local unique UTR
        try {
            const { data: existingTxn, error: checkError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('transactions').select('*').eq('utr', state.utr).eq('status', 'verified').single();
            if (checkError && checkError.code !== 'PGRST116') {
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
        // 2. Poll Backend
        let attempts = 0;
        const maxAttempts = 24; // 2 minutes approx (5s interval)
        const pollInterval = 5000;
        const checkPayment = async ()=>{
            try {
                attempts++;
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/api/verify-payment', {
                    utr: state.utr,
                    amount: state.amount,
                    orderId: sessionId,
                    email: state.email,
                    name: `${state.firstName} ${state.lastName}`
                });
                if (response.data.success) {
                    setState((prev)=>({
                            ...prev,
                            step: 'success'
                        }));
                    return true;
                }
                // If not success, check attempts
                if (attempts >= maxAttempts) {
                    setState((prev)=>({
                            ...prev,
                            step: 'manual_upload',
                            error: ''
                        }));
                    return true;
                }
                return false;
            } catch (err) {
                console.error('Verification error:', err);
                if (attempts >= maxAttempts) {
                    setState((prev)=>({
                            ...prev,
                            step: 'failed',
                            error: 'Server unavailable. Please try again or contact support.'
                        }));
                    return true;
                }
                return false;
            }
        };
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
    const upiUrl = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(MERCHANT_NAME)}&am=${state.amount}&cu=INR`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-[#F4F6F8] font-sans text-slate-900",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white border-b border-slate-200 sticky top-0 z-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: "/shark-logo-full.png",
                            alt: "Shark Funded",
                            className: "h-8 object-contain"
                        }, void 0, false, {
                            fileName: "[project]/src/components/PropFirmCheckout.tsx",
                            lineNumber: 300,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 text-slate-500 text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                    size: 14
                                }, void 0, false, {
                                    fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                    lineNumber: 302,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "hidden sm:inline",
                                    children: "Secure Checkout"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                    lineNumber: 303,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/PropFirmCheckout.tsx",
                            lineNumber: 301,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/PropFirmCheckout.tsx",
                    lineNumber: 299,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                lineNumber: 298,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container mx-auto px-4 lg:px-8 py-8 lg:py-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "lg:col-span-7 space-y-8",
                            children: state.step === 'billing' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                onSubmit: handlePlaceOrder,
                                className: "bg-white p-6 lg:p-8 rounded-xl shadow-sm border border-slate-100",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-xl font-bold mb-6 text-slate-800 flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center",
                                                children: "1"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                lineNumber: 316,
                                                columnNumber: 37
                                            }, this),
                                            "Billing Details"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                        lineNumber: 315,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 md:grid-cols-2 gap-5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm font-medium text-slate-700 mb-1.5",
                                                        children: [
                                                            "First Name ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-red-500",
                                                                children: "*"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                                lineNumber: 322,
                                                                columnNumber: 119
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                        lineNumber: 322,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        required: true,
                                                        className: "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none",
                                                        value: state.firstName,
                                                        onChange: (e)=>setState({
                                                                ...state,
                                                                firstName: e.target.value
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                        lineNumber: 323,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                lineNumber: 321,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm font-medium text-slate-700 mb-1.5",
                                                        children: "Last Name"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                        lineNumber: 332,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        className: "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none",
                                                        value: state.lastName,
                                                        onChange: (e)=>setState({
                                                                ...state,
                                                                lastName: e.target.value
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                        lineNumber: 333,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                lineNumber: 331,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "md:col-span-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm font-medium text-slate-700 mb-1.5",
                                                        children: [
                                                            "Country / Region ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-red-500",
                                                                children: "*"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                                lineNumber: 341,
                                                                columnNumber: 125
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                        lineNumber: 341,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        className: "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none",
                                                        value: state.country,
                                                        onChange: (e)=>setState({
                                                                ...state,
                                                                country: e.target.value
                                                            }),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "India",
                                                                children: "India"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                                lineNumber: 347,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "United States",
                                                                children: "United States"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                                lineNumber: 348,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "United Kingdom",
                                                                children: "United Kingdom"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                                lineNumber: 349,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "Canada",
                                                                children: "Canada"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                                lineNumber: 350,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "Australia",
                                                                children: "Australia"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                                lineNumber: 351,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                        lineNumber: 342,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                lineNumber: 340,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "md:col-span-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm font-medium text-slate-700 mb-1.5",
                                                        children: [
                                                            "Street Address ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-red-500",
                                                                children: "*"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                                lineNumber: 356,
                                                                columnNumber: 123
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                        lineNumber: 356,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        required: true,
                                                        placeholder: "House number and street name",
                                                        className: "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none mb-3",
                                                        value: state.address,
                                                        onChange: (e)=>setState({
                                                                ...state,
                                                                address: e.target.value
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                        lineNumber: 357,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                lineNumber: 355,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm font-medium text-slate-700 mb-1.5",
                                                        children: [
                                                            "Town / City ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-red-500",
                                                                children: "*"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                                lineNumber: 367,
                                                                columnNumber: 120
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                        lineNumber: 367,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        required: true,
                                                        className: "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none",
                                                        value: state.city,
                                                        onChange: (e)=>setState({
                                                                ...state,
                                                                city: e.target.value
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                        lineNumber: 368,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                lineNumber: 366,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm font-medium text-slate-700 mb-1.5",
                                                        children: [
                                                            "Postcode / ZIP ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-red-500",
                                                                children: "*"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                                lineNumber: 377,
                                                                columnNumber: 123
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                        lineNumber: 377,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        required: true,
                                                        className: "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none",
                                                        value: state.zip,
                                                        onChange: (e)=>setState({
                                                                ...state,
                                                                zip: e.target.value
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                        lineNumber: 378,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                lineNumber: 376,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm font-medium text-slate-700 mb-1.5",
                                                        children: [
                                                            "Phone ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-red-500",
                                                                children: "*"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                                lineNumber: 387,
                                                                columnNumber: 114
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                        lineNumber: 387,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "tel",
                                                        required: true,
                                                        className: "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none",
                                                        value: state.phone,
                                                        onChange: (e)=>setState({
                                                                ...state,
                                                                phone: e.target.value
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                        lineNumber: 388,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                lineNumber: 386,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm font-medium text-slate-700 mb-1.5",
                                                        children: [
                                                            "Email address ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-red-500",
                                                                children: "*"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                                lineNumber: 397,
                                                                columnNumber: 122
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                        lineNumber: 397,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "email",
                                                        required: true,
                                                        className: "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none",
                                                        value: state.email,
                                                        onChange: (e)=>setState({
                                                                ...state,
                                                                email: e.target.value
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                        lineNumber: 398,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                lineNumber: 396,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                        lineNumber: 320,
                                        columnNumber: 33
                                    }, this),
                                    state.error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-6 p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2 border border-red-100 text-sm font-medium",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                lineNumber: 410,
                                                columnNumber: 41
                                            }, this),
                                            state.error
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                        lineNumber: 409,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                lineNumber: 314,
                                columnNumber: 29
                            }, this) : state.step === 'success' || state.step === 'verified' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white p-12 rounded-xl shadow-sm border border-emerald-100 text-center flex flex-col items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 text-emerald-600",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                            size: 40
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                            lineNumber: 418,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                        lineNumber: 417,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-2xl font-bold text-slate-900 mb-2",
                                        children: "Payment Successful!"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                        lineNumber: 420,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-slate-500 mb-8 max-w-md",
                                        children: "Your order has been verified successfully. You will receive an email confirmation shortly."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                        lineNumber: 421,
                                        columnNumber: 33
                                    }, this),
                                    officialOrderId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-emerald-50 px-6 py-4 rounded-lg border border-emerald-200 mb-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-emerald-700 font-medium opacity-80 mb-1",
                                                children: "Order ID"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                lineNumber: 426,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xl font-bold text-emerald-800 font-mono tracking-wide",
                                                children: officialOrderId
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                lineNumber: 427,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                        lineNumber: 425,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "px-8 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-all",
                                        children: "Return to Home"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                        lineNumber: 430,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                lineNumber: 416,
                                columnNumber: 29
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white p-6 lg:p-8 rounded-xl shadow-sm border border-slate-100",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between mb-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: "text-xl font-bold text-slate-900 mb-1",
                                                        children: "Complete Your Payment"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                        lineNumber: 439,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-slate-500 text-sm",
                                                        children: "Scan the QR code below using any UPI app"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                        lineNumber: 440,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                lineNumber: 438,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-bold border border-amber-100",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                        size: 12,
                                                        className: "animate-pulse"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                        lineNumber: 443,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: formatTime(timeLeft)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                        lineNumber: 444,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                lineNumber: 442,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                        lineNumber: 437,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col items-center justify-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-4 bg-white rounded-2xl shadow-lg border border-slate-100 mb-6 relative group cursor-pointer",
                                                onClick: ()=>copyToClipboard(upiUrl),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$qrcode$2e$react$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QRCodeSVG"], {
                                                        value: upiUrl,
                                                        size: 220,
                                                        level: "L"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                        lineNumber: 450,
                                                        columnNumber: 41
                                                    }, this),
                                                    copied && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute inset-0 bg-white/90 flex items-center justify-center rounded-xl backdrop-blur-sm",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2 text-emerald-600 font-bold bg-emerald-50 px-4 py-2 rounded-full shadow-sm",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                                    size: 16
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                                    lineNumber: 454,
                                                                    columnNumber: 53
                                                                }, this),
                                                                " Copied"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                            lineNumber: 453,
                                                            columnNumber: 49
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                        lineNumber: 452,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                lineNumber: 449,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 mb-8 w-full max-w-xs",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1 bg-slate-100 px-4 py-2.5 rounded-lg text-sm font-mono text-slate-700 text-center truncate border border-slate-200",
                                                        children: UPI_ID
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                        lineNumber: 461,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>copyToClipboard(UPI_ID),
                                                        className: "bg-indigo-50 text-indigo-600 hover:bg-indigo-100 p-2.5 rounded-lg transition-colors border border-indigo-100",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                                            size: 18
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                            lineNumber: 465,
                                                            columnNumber: 45
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                        lineNumber: 464,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                lineNumber: 460,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-full max-w-md bg-slate-50 p-6 rounded-xl border border-slate-200",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm font-bold text-slate-700 mb-2",
                                                        children: "Enter UTR Reference Number"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                        lineNumber: 470,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                className: "flex-1 px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none font-mono text-lg placeholder:text-slate-300",
                                                                placeholder: "XXXXXXXXXXXX",
                                                                value: state.utr,
                                                                onChange: (e)=>setState({
                                                                        ...state,
                                                                        utr: e.target.value
                                                                    }),
                                                                maxLength: 12
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                                lineNumber: 472,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: handleVerify,
                                                                disabled: state.step === 'verifying',
                                                                className: "px-6 py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-indigo-200 min-w-[100px]",
                                                                children: state.step === 'verifying' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                                    lineNumber: 485,
                                                                    columnNumber: 79
                                                                }, this) : 'Verify'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                                lineNumber: 480,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                        lineNumber: 471,
                                                        columnNumber: 41
                                                    }, this),
                                                    state.error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-3 text-red-600 text-sm flex items-center gap-1.5 bg-red-50 p-2 rounded border border-red-100",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                                size: 14
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                                lineNumber: 490,
                                                                columnNumber: 49
                                                            }, this),
                                                            " ",
                                                            state.error
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                        lineNumber: 489,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                lineNumber: 469,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-8",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-4",
                                                        children: "Accepted Payment Apps"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                        lineNumber: 496,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-300",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                src: "https://static.cdnlogo.com/logos/p/6/paytm.svg",
                                                                alt: "Paytm",
                                                                className: "h-5 object-contain"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                                lineNumber: 498,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                src: "https://static.cdnlogo.com/logos/p/25/phonepe.svg",
                                                                alt: "PhonePe",
                                                                className: "h-6 object-contain"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                                lineNumber: 499,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                src: "https://static.cdnlogo.com/logos/g/80/google-pay.png",
                                                                alt: "Google Pay",
                                                                className: "h-6 object-contain"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                                lineNumber: 500,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                        lineNumber: 497,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                lineNumber: 495,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                        lineNumber: 448,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                lineNumber: 435,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/PropFirmCheckout.tsx",
                            lineNumber: 312,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "lg:col-span-5 space-y-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white p-6 rounded-xl shadow-sm border border-slate-100 sticky top-24",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-xl font-bold mb-6 text-slate-800 flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-6 h-6 rounded-full bg-slate-200 text-slate-600 text-xs flex items-center justify-center",
                                                children: "2"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                lineNumber: 512,
                                                columnNumber: 33
                                            }, this),
                                            "Your Order"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                        lineNumber: 511,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4 mb-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between items-center text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-slate-600 font-medium",
                                                        children: "Product"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                        lineNumber: 518,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-slate-600 font-medium",
                                                        children: "Subtotal"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                        lineNumber: 519,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                lineNumber: 517,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "border-t border-slate-100 my-2"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                lineNumber: 521,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between items-start gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            value: selectedPlan,
                                                            onChange: (e)=>handlePlanChange(e.target.value),
                                                            className: "w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500",
                                                            disabled: state.step !== 'billing',
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "",
                                                                    disabled: true,
                                                                    children: "Select Plan"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                                    lineNumber: 530,
                                                                    columnNumber: 45
                                                                }, this),
                                                                CHALLENGE_PLANS.map((plan)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: plan.id,
                                                                        children: [
                                                                            plan.label,
                                                                            " - ₹",
                                                                            plan.price.toLocaleString()
                                                                        ]
                                                                    }, plan.id, true, {
                                                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                                        lineNumber: 532,
                                                                        columnNumber: 49
                                                                    }, this)),
                                                                !CHALLENGE_PLANS.find((p)=>p.id === selectedPlan) && state.amount && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "custom",
                                                                    children: [
                                                                        "Custom Amount - ₹",
                                                                        Number(state.amount).toLocaleString()
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                                    lineNumber: 537,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                            lineNumber: 524,
                                                            columnNumber: 41
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                        lineNumber: 523,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-slate-800 font-bold whitespace-nowrap mt-2",
                                                        children: [
                                                            "₹",
                                                            Number(state.amount).toLocaleString()
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                        lineNumber: 541,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                lineNumber: 522,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "border-t border-slate-100 my-2"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                lineNumber: 543,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between items-center text-lg font-bold",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-slate-900",
                                                        children: "Total"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                        lineNumber: 545,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-indigo-600",
                                                        children: [
                                                            "₹",
                                                            Number(state.amount).toLocaleString()
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                        lineNumber: 546,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                lineNumber: 544,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                        lineNumber: 516,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4 mb-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-medium text-slate-700 mb-2",
                                                children: "Select Payment Method"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                lineNumber: 552,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: `flex items-center p-4 border rounded-lg cursor-pointer transition-all ${state.paymentMethod === 'upi' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200 hover:border-slate-300'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "radio",
                                                        name: "payment",
                                                        className: "w-4 h-4 text-indigo-600 accent-indigo-600",
                                                        checked: state.paymentMethod === 'upi',
                                                        onChange: ()=>setState({
                                                                ...state,
                                                                paymentMethod: 'upi'
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                        lineNumber: 555,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-3 flex-1 font-medium text-slate-900",
                                                        children: "UPI / QR Code"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                        lineNumber: 562,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$university$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__University$3e$__["University"], {
                                                        className: "w-5 h-5 text-slate-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                        lineNumber: 563,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                lineNumber: 554,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: `flex items-center p-4 border rounded-lg cursor-pointer transition-all ${state.paymentMethod === 'card' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200 hover:border-slate-300'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "radio",
                                                        name: "payment",
                                                        className: "w-4 h-4 text-indigo-600 accent-indigo-600",
                                                        checked: state.paymentMethod === 'card',
                                                        onChange: ()=>setState({
                                                                ...state,
                                                                paymentMethod: 'card'
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                        lineNumber: 567,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-3 flex-1 font-medium text-slate-900",
                                                        children: "Credit Card"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                        lineNumber: 574,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"], {
                                                        className: "w-5 h-5 text-slate-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                        lineNumber: 575,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                lineNumber: 566,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: `flex items-center p-4 border rounded-lg cursor-pointer transition-all ${state.paymentMethod === 'crypto' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200 hover:border-slate-300'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "radio",
                                                        name: "payment",
                                                        className: "w-4 h-4 text-indigo-600 accent-indigo-600",
                                                        checked: state.paymentMethod === 'crypto',
                                                        onChange: ()=>setState({
                                                                ...state,
                                                                paymentMethod: 'crypto'
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                        lineNumber: 579,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-3 flex-1 font-medium text-slate-900",
                                                        children: "Crypto (USDT/BTC)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                        lineNumber: 586,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bitcoin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bitcoin$3e$__["Bitcoin"], {
                                                        className: "w-5 h-5 text-slate-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                        lineNumber: 587,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                lineNumber: 578,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                        lineNumber: 551,
                                        columnNumber: 29
                                    }, this),
                                    state.paymentMethod !== 'upi' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-4 p-3 bg-amber-50 text-amber-700 text-xs rounded border border-amber-100 flex gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                size: 14,
                                                className: "shrink-0 mt-0.5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                lineNumber: 593,
                                                columnNumber: 37
                                            }, this),
                                            "This payment method is currently unavailable. Please use UPI."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                        lineNumber: 592,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start gap-3 mb-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                id: "terms",
                                                className: "mt-1 w-4 h-4 text-indigo-600 rounded border-gray-300 accent-indigo-600",
                                                checked: termsAccepted,
                                                onChange: (e)=>setTermsAccepted(e.target.checked)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                lineNumber: 599,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "terms",
                                                className: "text-xs text-slate-500",
                                                children: [
                                                    "I have read and agree to the website ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "#",
                                                        className: "text-indigo-600 hover:underline",
                                                        children: "terms and conditions"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                        lineNumber: 607,
                                                        columnNumber: 74
                                                    }, this),
                                                    "."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                lineNumber: 606,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                        lineNumber: 598,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handlePlaceOrder,
                                        disabled: state.step !== 'billing' && state.step !== 'payment',
                                        className: `w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2
                                    ${state.step === 'success' ? 'bg-emerald-500' : 'bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed'}
                                `,
                                        children: state.step === 'success' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                "Order Verified ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                    size: 18
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                    lineNumber: 619,
                                                    columnNumber: 54
                                                }, this)
                                            ]
                                        }, void 0, true) : state.step === 'payment' || state.step === 'verifying' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: "Awaiting Payment..."
                                        }, void 0, false) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                "Place Order ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                    size: 18
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                    lineNumber: 623,
                                                    columnNumber: 51
                                                }, this)
                                            ]
                                        }, void 0, true)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                        lineNumber: 611,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-6 flex items-center justify-center gap-2 text-slate-400",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                lineNumber: 628,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] uppercase font-bold tracking-wider",
                                                children: "Secure SSL Encrypted Platform"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                                lineNumber: 629,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                        lineNumber: 627,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                                lineNumber: 510,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/PropFirmCheckout.tsx",
                            lineNumber: 509,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/PropFirmCheckout.tsx",
                    lineNumber: 309,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/PropFirmCheckout.tsx",
                lineNumber: 308,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/PropFirmCheckout.tsx",
        lineNumber: 296,
        columnNumber: 9
    }, this);
}
_s(PropFirmCheckout, "fwCfRhTCFZQBLs4BRJNh4VEXomw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = PropFirmCheckout;
var _c;
__turbopack_context__.k.register(_c, "PropFirmCheckout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/secure-checkout/[orderId]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PaymentPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PropFirmCheckout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/PropFirmCheckout.tsx [app-client] (ecmascript)");
'use client';
;
;
function PaymentPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PropFirmCheckout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
        fileName: "[project]/src/app/secure-checkout/[orderId]/page.tsx",
        lineNumber: 6,
        columnNumber: 12
    }, this);
}
_c = PaymentPage;
var _c;
__turbopack_context__.k.register(_c, "PaymentPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_e5791264._.js.map