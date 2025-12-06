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
"[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sharkfunded/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sharkfunded/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sharkfunded/src/lib/supabase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/Downloads/sharkfunded/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/Downloads/sharkfunded/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/Downloads/sharkfunded/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/Downloads/sharkfunded/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/Downloads/sharkfunded/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCcw$3e$__ = __turbopack_context__.i("[project]/Downloads/sharkfunded/node_modules/lucide-react/dist/esm/icons/refresh-ccw.js [app-client] (ecmascript) <export default as RefreshCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreHorizontal$3e$__ = __turbopack_context__.i("[project]/Downloads/sharkfunded/node_modules/lucide-react/dist/esm/icons/ellipsis.js [app-client] (ecmascript) <export default as MoreHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/Downloads/sharkfunded/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/Downloads/sharkfunded/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/Downloads/sharkfunded/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/Downloads/sharkfunded/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/Downloads/sharkfunded/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$banknote$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Banknote$3e$__ = __turbopack_context__.i("[project]/Downloads/sharkfunded/node_modules/lucide-react/dist/esm/icons/banknote.js [app-client] (ecmascript) <export default as Banknote>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/Downloads/sharkfunded/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sharkfunded/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$src$2f$components$2f$ConfirmationModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sharkfunded/src/components/ConfirmationModal.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
const AdminDashboardContent = ()=>{
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const isDashboard = pathname === '/admin';
    const isTransactions = pathname === '/admin/transactions';
    const isUsers = pathname === '/admin/users';
    const [transactions, setTransactions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [filter, setFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [dateFilter, setDateFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all'); // 'all', 'today', 'week', 'month', 'custom'
    const [customDate, setCustomDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedImage, setSelectedImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showDateFilter, setShowDateFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Confirmation Modal State
    const [confirmModal, setConfirmModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        isOpen: false,
        type: null,
        id: null
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminDashboardContent.useEffect": ()=>{
            fetchTransactions();
            // Real-time subscription
            const subscription = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].channel('transactions_channel').on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'transactions'
            }, {
                "AdminDashboardContent.useEffect.subscription": (payload)=>{
                    console.log('Real-time change:', payload);
                    if (payload.eventType === 'INSERT') {
                        setTransactions({
                            "AdminDashboardContent.useEffect.subscription": (prev)=>[
                                    payload.new,
                                    ...prev
                                ]
                        }["AdminDashboardContent.useEffect.subscription"]);
                    } else if (payload.eventType === 'UPDATE') {
                        setTransactions({
                            "AdminDashboardContent.useEffect.subscription": (prev)=>prev.map({
                                    "AdminDashboardContent.useEffect.subscription": (t)=>t.id === payload.new.id ? payload.new : t
                                }["AdminDashboardContent.useEffect.subscription"])
                        }["AdminDashboardContent.useEffect.subscription"]);
                    } else if (payload.eventType === 'DELETE') {
                        setTransactions({
                            "AdminDashboardContent.useEffect.subscription": (prev)=>prev.filter({
                                    "AdminDashboardContent.useEffect.subscription": (t)=>t.id !== payload.old.id
                                }["AdminDashboardContent.useEffect.subscription"])
                        }["AdminDashboardContent.useEffect.subscription"]);
                    }
                }
            }["AdminDashboardContent.useEffect.subscription"]).subscribe({
                "AdminDashboardContent.useEffect.subscription": (status)=>{
                    if (status === 'SUBSCRIBED') {
                        console.log('Subscribed to real-time updates');
                    }
                }
            }["AdminDashboardContent.useEffect.subscription"]);
            return ({
                "AdminDashboardContent.useEffect": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].removeChannel(subscription);
                }
            })["AdminDashboardContent.useEffect"];
        }
    }["AdminDashboardContent.useEffect"], []);
    const fetchTransactions = async ()=>{
        try {
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('transactions').select('*').order('created_at', {
                ascending: false
            });
            if (error) throw error;
            setTransactions(data || []);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        } finally{
            setLoading(false);
        }
    };
    const initiateStatusUpdate = (id, newStatus)=>{
        setConfirmModal({
            isOpen: true,
            type: newStatus,
            id
        });
    };
    const confirmStatusUpdate = async ()=>{
        const { id, type } = confirmModal;
        if (!id || !type) return;
        try {
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('transactions').update({
                status: type
            }).eq('id', id);
            if (error) throw error;
            // Optimistic update
            setTransactions((prev)=>prev.map((t)=>t.id === id ? {
                        ...t,
                        status: type
                    } : t));
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status');
        } finally{
            setConfirmModal({
                isOpen: false,
                type: null,
                id: null
            });
        }
    };
    const filteredTransactions = transactions.filter((t)=>{
        const matchesFilter = filter === 'all' || t.status === filter;
        const matchesSearch = t.utr?.toLowerCase().includes(search.toLowerCase()) || t.order_id?.toLowerCase().includes(search.toLowerCase()) || t.customer_details?.email?.toLowerCase().includes(search.toLowerCase());
        let matchesDate = true;
        const date = new Date(t.created_at);
        const now = new Date();
        if (dateFilter === 'today') {
            matchesDate = date.toDateString() === now.toDateString();
        } else if (dateFilter === 'week') {
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            matchesDate = date >= weekAgo;
        } else if (dateFilter === 'month') {
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            matchesDate = date >= monthAgo;
        } else if (dateFilter === 'custom' && customDate) {
            matchesDate = date.toDateString() === new Date(customDate).toDateString();
        }
        return matchesFilter && matchesSearch && matchesDate;
    });
    // Users Calculation
    const users = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "AdminDashboardContent.useMemo[users]": ()=>{
            const userMap = new Map();
            transactions.forEach({
                "AdminDashboardContent.useMemo[users]": (t)=>{
                    const email = t.customer_details?.email;
                    if (!email) return;
                    if (!userMap.has(email)) {
                        userMap.set(email, {
                            email,
                            name: t.customer_details?.name || 'Unknown',
                            totalSpend: 0,
                            totalOrders: 0,
                            lastActive: t.created_at,
                            status: 'active'
                        });
                    }
                    const user = userMap.get(email);
                    if (t.status === 'verified') {
                        user.totalSpend += Number(t.amount);
                    }
                    user.totalOrders += 1;
                    if (new Date(t.created_at) > new Date(user.lastActive)) {
                        user.lastActive = t.created_at;
                    }
                }
            }["AdminDashboardContent.useMemo[users]"]);
            return Array.from(userMap.values()).sort({
                "AdminDashboardContent.useMemo[users]": (a, b)=>b.totalSpend - a.totalSpend
            }["AdminDashboardContent.useMemo[users]"]);
        }
    }["AdminDashboardContent.useMemo[users]"], [
        transactions
    ]);
    const filteredUsers = users.filter((u)=>u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));
    const handleExport = ()=>{
        const escapeCsvField = (field)=>{
            if (field === null || field === undefined) return '';
            const stringField = String(field);
            // Wrap in quotes if it contains comma, quote, or newline
            if (stringField.includes(',') || stringField.includes('"') || stringField.includes('\n')) {
                return `"${stringField.replace(/"/g, '""')}"`;
            }
            return stringField;
        };
        const csvContent = [
            [
                'Date',
                'Order ID',
                'UTR',
                'Customer Name',
                'Email',
                'Amount',
                'Status'
            ],
            ...filteredTransactions.map((t)=>[
                    escapeCsvField(new Date(t.created_at).toLocaleString()),
                    escapeCsvField(t.order_id),
                    escapeCsvField(t.utr),
                    escapeCsvField(t.customer_details?.name),
                    escapeCsvField(t.customer_details?.email),
                    escapeCsvField(t.amount),
                    escapeCsvField(t.status)
                ])
        ].map((e)=>e.join(",")).join("\n");
        const blob = new Blob([
            csvContent
        ], {
            type: 'text/csv;charset=utf-8;'
        });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
        link.setAttribute("download", `SharkFunded_Transactions_${timestamp}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const getStatusStyle = (status)=>{
        switch(status){
            case 'verified':
                return 'bg-emerald-50 text-emerald-700 border-emerald-100 ring-1 ring-emerald-600/10';
            case 'pending_manual_verification':
                return 'bg-amber-50 text-amber-700 border-amber-100 ring-1 ring-amber-600/10';
            case 'rejected':
                return 'bg-rose-50 text-rose-700 border-rose-100 ring-1 ring-rose-600/10';
            default:
                return 'bg-slate-50 text-slate-700 border-slate-100 ring-1 ring-slate-600/10';
        }
    };
    const formatDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AdminDashboardContent.useCallback[formatDate]": (dateString)=>{
            return new Intl.DateTimeFormat('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            }).format(new Date(dateString));
        }
    }["AdminDashboardContent.useCallback[formatDate]"], []);
    const formatTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AdminDashboardContent.useCallback[formatTime]": (dateString)=>{
            return new Intl.DateTimeFormat('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            }).format(new Date(dateString));
        }
    }["AdminDashboardContent.useCallback[formatTime]"], []);
    // Stats Calculations - Memoized
    const stats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AdminDashboardContent.useMemo[stats]": ()=>{
            const totalRevenue = transactions.filter({
                "AdminDashboardContent.useMemo[stats].totalRevenue": (t)=>t.status === 'verified'
            }["AdminDashboardContent.useMemo[stats].totalRevenue"]).reduce({
                "AdminDashboardContent.useMemo[stats].totalRevenue": (sum, t)=>sum + Number(t.amount)
            }["AdminDashboardContent.useMemo[stats].totalRevenue"], 0);
            const totalPayments = transactions.length;
            const approvedCount = transactions.filter({
                "AdminDashboardContent.useMemo[stats]": (t)=>t.status === 'verified'
            }["AdminDashboardContent.useMemo[stats]"]).length;
            const pendingCount = transactions.filter({
                "AdminDashboardContent.useMemo[stats]": (t)=>t.status === 'pending_manual_verification'
            }["AdminDashboardContent.useMemo[stats]"]).length;
            const failedRejectedCount = transactions.filter({
                "AdminDashboardContent.useMemo[stats]": (t)=>t.status === 'failed' || t.status === 'rejected'
            }["AdminDashboardContent.useMemo[stats]"]).length;
            const totalUsers = new Set(transactions.map({
                "AdminDashboardContent.useMemo[stats]": (t)=>t.customer_details?.email
            }["AdminDashboardContent.useMemo[stats]"])).size;
            const todayTransactions = transactions.filter({
                "AdminDashboardContent.useMemo[stats].todayTransactions": (t)=>new Date(t.created_at).toDateString() === new Date().toDateString()
            }["AdminDashboardContent.useMemo[stats].todayTransactions"]);
            const todayCount = todayTransactions.length;
            const todayVolume = todayTransactions.filter({
                "AdminDashboardContent.useMemo[stats].todayVolume": (t)=>t.status === 'verified'
            }["AdminDashboardContent.useMemo[stats].todayVolume"]).reduce({
                "AdminDashboardContent.useMemo[stats].todayVolume": (sum, t)=>sum + Number(t.amount)
            }["AdminDashboardContent.useMemo[stats].todayVolume"], 0);
            return {
                totalRevenue,
                totalPayments,
                approvedCount,
                pendingCount,
                failedRejectedCount,
                totalUsers,
                todayCount,
                todayVolume
            };
        }
    }["AdminDashboardContent.useMemo[stats]"], [
        transactions
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-8 animate-fade-in w-full",
                children: [
                    isDashboard && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between items-start mb-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-2.5 bg-blue-50 rounded-xl",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$banknote$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Banknote$3e$__["Banknote"], {
                                                        className: "text-blue-600",
                                                        size: 20
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                        lineNumber: 286,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                    lineNumber: 285,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                lineNumber: 284,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-slate-500 text-xs font-bold uppercase tracking-wider",
                                                        children: "Total Revenue"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                        lineNumber: 290,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-2xl font-bold text-slate-900 mt-1",
                                                        children: [
                                                            "₹",
                                                            stats.totalRevenue.toLocaleString()
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                        lineNumber: 291,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                lineNumber: 289,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                        lineNumber: 283,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between items-start mb-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-2.5 bg-indigo-50 rounded-xl",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                        className: "text-indigo-600",
                                                        size: 20
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                        lineNumber: 299,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                    lineNumber: 298,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                lineNumber: 297,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-slate-500 text-xs font-bold uppercase tracking-wider",
                                                        children: "Total Users"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                        lineNumber: 303,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-2xl font-bold text-slate-900 mt-1",
                                                        children: stats.totalUsers
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                        lineNumber: 304,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                lineNumber: 302,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                        lineNumber: 296,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between items-start mb-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-2.5 bg-purple-50 rounded-xl",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                        className: "text-purple-600",
                                                        size: 20
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                        lineNumber: 312,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                    lineNumber: 311,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                lineNumber: 310,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-slate-500 text-xs font-bold uppercase tracking-wider",
                                                        children: "Today's Volume"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                        lineNumber: 316,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-2xl font-bold text-slate-900 mt-1",
                                                        children: [
                                                            "₹",
                                                            stats.todayVolume.toLocaleString()
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                        lineNumber: 317,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-slate-400 mt-1",
                                                        children: [
                                                            stats.todayCount,
                                                            " transactions today"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                        lineNumber: 318,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                lineNumber: 315,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                        lineNumber: 309,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between items-start mb-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-2.5 bg-amber-50 rounded-xl",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCcw$3e$__["RefreshCcw"], {
                                                            className: "text-amber-600",
                                                            size: 20
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                            lineNumber: 326,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                        lineNumber: 325,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    stats.pendingCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100 animate-pulse",
                                                        children: "Action Needed"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                        lineNumber: 329,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                lineNumber: 324,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-slate-500 text-xs font-bold uppercase tracking-wider",
                                                        children: "Pending Review"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                        lineNumber: 335,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-2xl font-bold text-slate-900 mt-1",
                                                        children: stats.pendingCount
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                        lineNumber: 336,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                lineNumber: 334,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                        lineNumber: 323,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                lineNumber: 281,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-slate-500 text-xs font-bold uppercase",
                                                        children: "Total Payments"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                        lineNumber: 345,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "text-xl font-bold text-slate-900 mt-1",
                                                        children: stats.totalPayments
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                        lineNumber: 346,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                lineNumber: 344,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-8 w-1 bg-slate-200 rounded-full"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                lineNumber: 348,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                        lineNumber: 343,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-emerald-600 text-xs font-bold uppercase",
                                                        children: "Approved"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                        lineNumber: 354,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "text-xl font-bold text-emerald-900 mt-1",
                                                        children: stats.approvedCount
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                        lineNumber: 355,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                lineNumber: 353,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-1.5 bg-emerald-100 rounded-lg",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                    size: 16,
                                                    className: "text-emerald-600"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                    lineNumber: 358,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                lineNumber: 357,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                        lineNumber: 352,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-rose-50/50 p-4 rounded-xl border border-rose-100 flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-rose-600 text-xs font-bold uppercase",
                                                        children: "Failed / Rejected"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                        lineNumber: 365,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "text-xl font-bold text-rose-900 mt-1",
                                                        children: stats.failedRejectedCount
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                        lineNumber: 366,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                lineNumber: 364,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-1.5 bg-rose-100 rounded-lg",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                    size: 16,
                                                    className: "text-rose-600"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                    lineNumber: 369,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                lineNumber: 368,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                        lineNumber: 363,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                lineNumber: 341,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true),
                    isUsers && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-6 border-b border-slate-100 flex flex-col lg:flex-row gap-4 items-center justify-between bg-slate-50/30",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-4 w-full",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative w-full lg:w-96 group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors",
                                                size: 18
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                lineNumber: 382,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                placeholder: "Search users by name or email...",
                                                className: "w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-sm font-medium transition-all shadow-sm placeholder:text-slate-400",
                                                value: search,
                                                onChange: (e)=>setSearch(e.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                lineNumber: 383,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                        lineNumber: 381,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                    lineNumber: 380,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                lineNumber: 379,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "overflow-x-auto w-full",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    className: "w-full text-left text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            className: "bg-slate-50 border-b border-slate-200",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-[11px] w-[30%]",
                                                        children: "User"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                        lineNumber: 398,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-[11px] w-[20%]",
                                                        children: "Total Spend"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                        lineNumber: 399,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-[11px] w-[15%]",
                                                        children: "Orders"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                        lineNumber: 400,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-[11px] w-[20%]",
                                                        children: "Last Active"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                        lineNumber: 401,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-[11px] w-[15%]",
                                                        children: "Status"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                        lineNumber: 402,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                lineNumber: 397,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                            lineNumber: 396,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            className: "divide-y divide-slate-100 bg-white",
                                            children: filteredUsers.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    colSpan: 5,
                                                    className: "px-6 py-24 text-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-col items-center gap-3 opacity-50",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                                size: 48,
                                                                className: "text-slate-300"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                                lineNumber: 410,
                                                                columnNumber: 53
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-slate-500 font-medium",
                                                                children: "No users found"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                                lineNumber: 411,
                                                                columnNumber: 53
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                        lineNumber: 409,
                                                        columnNumber: 49
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                    lineNumber: 408,
                                                    columnNumber: 45
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                lineNumber: 407,
                                                columnNumber: 41
                                            }, ("TURBOPACK compile-time value", void 0)) : filteredUsers.map((user)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: "hover:bg-slate-50/50 transition-colors group",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-6 py-4",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-700 font-bold text-sm border border-indigo-200 shadow-sm flex-shrink-0",
                                                                        children: user.name.charAt(0)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                                        lineNumber: 420,
                                                                        columnNumber: 57
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "font-bold text-slate-900",
                                                                                children: user.name
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                                                lineNumber: 424,
                                                                                columnNumber: 61
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "text-xs text-slate-500",
                                                                                children: user.email
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                                                lineNumber: 425,
                                                                                columnNumber: 61
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                                        lineNumber: 423,
                                                                        columnNumber: 57
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                                lineNumber: 419,
                                                                columnNumber: 53
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                            lineNumber: 418,
                                                            columnNumber: 49
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-6 py-4",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-bold text-slate-900",
                                                                children: [
                                                                    "₹",
                                                                    user.totalSpend.toLocaleString()
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                                lineNumber: 430,
                                                                columnNumber: 53
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                            lineNumber: 429,
                                                            columnNumber: 49
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-6 py-4",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium text-slate-700",
                                                                        children: user.totalOrders
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                                        lineNumber: 434,
                                                                        columnNumber: 57
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs text-slate-400",
                                                                        children: "orders"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                                        lineNumber: 435,
                                                                        columnNumber: 57
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                                lineNumber: 433,
                                                                columnNumber: 53
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                            lineNumber: 432,
                                                            columnNumber: 49
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-6 py-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-sm text-slate-600",
                                                                    children: formatDate(user.lastActive)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                                    lineNumber: 439,
                                                                    columnNumber: 53
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-xs text-slate-400",
                                                                    children: formatTime(user.lastActive)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                                    lineNumber: 440,
                                                                    columnNumber: 53
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                            lineNumber: 438,
                                                            columnNumber: 49
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-6 py-4",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-100",
                                                                children: "Active"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                                lineNumber: 443,
                                                                columnNumber: 53
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                            lineNumber: 442,
                                                            columnNumber: 49
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, user.email, true, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                    lineNumber: 417,
                                                    columnNumber: 45
                                                }, ("TURBOPACK compile-time value", void 0)))
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                            lineNumber: 405,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                    lineNumber: 395,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                lineNumber: 394,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                        lineNumber: 378,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    isTransactions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-6 border-b border-slate-100 flex flex-col lg:flex-row gap-4 items-center justify-between bg-slate-50/30",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-4 w-full lg:w-auto",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative w-full lg:w-96 group",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                        className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors",
                                                        size: 18
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                        lineNumber: 463,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        placeholder: "Search by Order ID, UTR, or Email...",
                                                        className: "w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-sm font-medium transition-all shadow-sm placeholder:text-slate-400",
                                                        value: search,
                                                        onChange: (e)=>setSearch(e.target.value)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                        lineNumber: 464,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                lineNumber: 462,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative flex items-center gap-2",
                                                children: [
                                                    dateFilter === 'custom' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "date",
                                                        value: customDate,
                                                        onChange: (e)=>setCustomDate(e.target.value),
                                                        className: "px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none shadow-sm animate-fade-in"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                        lineNumber: 475,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>setShowDateFilter(!showDateFilter),
                                                                className: "p-3 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-all shadow-sm flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                                        size: 18
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                                        lineNumber: 488,
                                                                        columnNumber: 45
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-sm font-medium hidden sm:inline",
                                                                        children: dateFilter === 'all' ? 'All Time' : dateFilter === 'today' ? 'Today' : dateFilter === 'week' ? 'Last 7 Days' : dateFilter === 'month' ? 'Last 30 Days' : 'Specific Date'
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                                        lineNumber: 489,
                                                                        columnNumber: 45
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                                        size: 14
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                                        lineNumber: 492,
                                                                        columnNumber: 45
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                                lineNumber: 484,
                                                                columnNumber: 41
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            showDateFilter && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "fixed inset-0 z-10",
                                                                        onClick: ()=>setShowDateFilter(false)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                                        lineNumber: 497,
                                                                        columnNumber: 49
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "absolute top-full mt-2 left-0 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-20 animate-scale-in",
                                                                        children: [
                                                                            {
                                                                                label: 'All Time',
                                                                                value: 'all'
                                                                            },
                                                                            {
                                                                                label: 'Today',
                                                                                value: 'today'
                                                                            },
                                                                            {
                                                                                label: 'Last 7 Days',
                                                                                value: 'week'
                                                                            },
                                                                            {
                                                                                label: 'Last 30 Days',
                                                                                value: 'month'
                                                                            },
                                                                            {
                                                                                label: 'Specific Date',
                                                                                value: 'custom'
                                                                            }
                                                                        ].map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                onClick: ()=>{
                                                                                    setDateFilter(option.value);
                                                                                    if (option.value === 'custom' && !customDate) {
                                                                                        setCustomDate(new Date().toISOString().split('T')[0]);
                                                                                    }
                                                                                    setShowDateFilter(false);
                                                                                },
                                                                                className: `w-full text-left px-4 py-2.5 text-sm font-medium transition-colors ${dateFilter === option.value ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`,
                                                                                children: option.label
                                                                            }, option.value, false, {
                                                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                                                lineNumber: 506,
                                                                                columnNumber: 57
                                                                            }, ("TURBOPACK compile-time value", void 0)))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                                        lineNumber: 498,
                                                                        columnNumber: 49
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                        lineNumber: 483,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                lineNumber: 473,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleExport,
                                                className: "p-3 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-all shadow-sm flex items-center gap-2",
                                                title: "Export to CSV",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                        size: 18
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                        lineNumber: 531,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm font-medium hidden sm:inline",
                                                        children: "Export"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                        lineNumber: 532,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                lineNumber: 526,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                        lineNumber: 461,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 no-scrollbar",
                                        children: [
                                            'all',
                                            'verified',
                                            'pending_manual_verification',
                                            'rejected'
                                        ].map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setFilter(f),
                                                className: `px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${filter === f ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/20 transform scale-105' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'}`,
                                                children: f === 'pending_manual_verification' ? 'Pending Review' : f
                                            }, f, false, {
                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                lineNumber: 538,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0)))
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                        lineNumber: 536,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                lineNumber: 460,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "overflow-x-auto w-full",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    className: "w-full text-left text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            className: "bg-slate-50 border-b border-slate-200",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-[11px] w-[15%]",
                                                        children: "Date & Time"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                        lineNumber: 557,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-[11px] w-[15%]",
                                                        children: "Order ID"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                        lineNumber: 558,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-[11px] w-[15%]",
                                                        children: "UTR"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                        lineNumber: 559,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-[11px] w-[20%]",
                                                        children: "Customer"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                        lineNumber: 560,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-[11px] w-[10%]",
                                                        children: "Amount"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                        lineNumber: 561,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-[11px] w-[10%]",
                                                        children: "Status"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                        lineNumber: 562,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-[11px] w-[10%]",
                                                        children: "Proof"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                        lineNumber: 563,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-[11px] text-right w-[5%]",
                                                        children: "Actions"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                        lineNumber: 564,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                lineNumber: 556,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                            lineNumber: 555,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            className: "divide-y divide-slate-100 bg-white",
                                            children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    colSpan: 8,
                                                    className: "px-6 py-24 text-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-col items-center gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                                lineNumber: 572,
                                                                columnNumber: 53
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-slate-500 font-medium",
                                                                children: "Loading transactions..."
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                                lineNumber: 573,
                                                                columnNumber: 53
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                        lineNumber: 571,
                                                        columnNumber: 49
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                    lineNumber: 570,
                                                    columnNumber: 45
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                lineNumber: 569,
                                                columnNumber: 41
                                            }, ("TURBOPACK compile-time value", void 0)) : filteredTransactions.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    colSpan: 8,
                                                    className: "px-6 py-24 text-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-col items-center gap-3 opacity-50",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                                size: 48,
                                                                className: "text-slate-300"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                                lineNumber: 581,
                                                                columnNumber: 53
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-slate-500 font-medium",
                                                                children: "No transactions found"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                                lineNumber: 582,
                                                                columnNumber: 53
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                        lineNumber: 580,
                                                        columnNumber: 49
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                    lineNumber: 579,
                                                    columnNumber: 45
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                lineNumber: 578,
                                                columnNumber: 41
                                            }, ("TURBOPACK compile-time value", void 0)) : filteredTransactions.map((txn)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: "hover:bg-slate-50/50 transition-colors group",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-6 py-4 whitespace-nowrap",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "font-bold text-slate-700",
                                                                    children: formatDate(txn.created_at)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                                    lineNumber: 590,
                                                                    columnNumber: 53
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-xs text-slate-400 font-medium mt-0.5",
                                                                    children: formatTime(txn.created_at)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                                    lineNumber: 591,
                                                                    columnNumber: 53
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                            lineNumber: 589,
                                                            columnNumber: 49
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-6 py-4",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded border border-slate-200 w-fit block truncate max-w-[120px]",
                                                                title: txn.order_id,
                                                                children: txn.order_id
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                                lineNumber: 594,
                                                                columnNumber: 53
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                            lineNumber: 593,
                                                            columnNumber: 49
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-6 py-4",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-mono text-xs text-slate-600 block truncate max-w-[120px]",
                                                                title: txn.utr,
                                                                children: txn.utr
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                                lineNumber: 599,
                                                                columnNumber: 53
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                            lineNumber: 598,
                                                            columnNumber: 49
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-6 py-4",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "w-9 h-9 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-700 font-bold text-xs border border-blue-200 shadow-sm flex-shrink-0",
                                                                        children: txn.customer_details?.name?.charAt(0) || 'U'
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                                        lineNumber: 605,
                                                                        columnNumber: 57
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "min-w-0",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "font-bold text-slate-900 text-sm truncate",
                                                                                children: txn.customer_details?.name
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                                                lineNumber: 609,
                                                                                columnNumber: 61
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "text-slate-500 text-xs truncate",
                                                                                children: txn.customer_details?.email
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                                                lineNumber: 610,
                                                                                columnNumber: 61
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                                        lineNumber: 608,
                                                                        columnNumber: 57
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                                lineNumber: 604,
                                                                columnNumber: 53
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                            lineNumber: 603,
                                                            columnNumber: 49
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-6 py-4",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-bold text-slate-900 text-sm",
                                                                children: [
                                                                    "₹",
                                                                    txn.amount.toLocaleString()
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                                lineNumber: 615,
                                                                columnNumber: 53
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                            lineNumber: 614,
                                                            columnNumber: 49
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-6 py-4",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm whitespace-nowrap ${getStatusStyle(txn.status)}`,
                                                                children: txn.status === 'pending_manual_verification' ? 'Pending Review' : txn.status
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                                lineNumber: 618,
                                                                columnNumber: 53
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                            lineNumber: 617,
                                                            columnNumber: 49
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-6 py-4",
                                                            children: txn.screenshot_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>setSelectedImage(txn.screenshot_url),
                                                                className: "group/btn flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                                        size: 14,
                                                                        className: "text-slate-400 group-hover/btn:text-blue-600 transition-colors"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                                        lineNumber: 628,
                                                                        columnNumber: 61
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs font-medium text-slate-600 group-hover/btn:text-blue-700",
                                                                        children: "View"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                                        lineNumber: 629,
                                                                        columnNumber: 61
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                                lineNumber: 624,
                                                                columnNumber: 57
                                                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-slate-300 text-xs italic",
                                                                children: "No proof"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                                lineNumber: 632,
                                                                columnNumber: 57
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                            lineNumber: 622,
                                                            columnNumber: 49
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-6 py-4 text-right",
                                                            children: txn.status === 'pending_manual_verification' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>initiateStatusUpdate(txn.id, 'verified'),
                                                                        className: "p-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-500 hover:text-white hover:shadow-lg hover:shadow-emerald-500/20 border border-emerald-200 hover:border-emerald-500 transition-all duration-200",
                                                                        title: "Approve",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                                            size: 18
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                                            lineNumber: 643,
                                                                            columnNumber: 65
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                                        lineNumber: 638,
                                                                        columnNumber: 61
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>initiateStatusUpdate(txn.id, 'rejected'),
                                                                        className: "p-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-500 hover:text-white hover:shadow-lg hover:shadow-rose-500/20 border border-rose-200 hover:border-rose-500 transition-all duration-200",
                                                                        title: "Reject",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                                                            size: 18
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                                            lineNumber: 650,
                                                                            columnNumber: 65
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                                        lineNumber: 645,
                                                                        columnNumber: 61
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                                lineNumber: 637,
                                                                columnNumber: 57
                                                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: "p-2 text-slate-300 hover:text-slate-500 transition-colors",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreHorizontal$3e$__["MoreHorizontal"], {
                                                                    size: 18
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                                    lineNumber: 655,
                                                                    columnNumber: 61
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                                lineNumber: 654,
                                                                columnNumber: 57
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                            lineNumber: 635,
                                                            columnNumber: 49
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, txn.id, true, {
                                                    fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                                    lineNumber: 588,
                                                    columnNumber: 45
                                                }, ("TURBOPACK compile-time value", void 0)))
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                            lineNumber: 567,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                    lineNumber: 554,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                lineNumber: 553,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                        lineNumber: 458,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                lineNumber: 277,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            selectedImage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-4 animate-fade-in",
                onClick: ()=>setSelectedImage(null),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative max-w-5xl max-h-[90vh] w-full bg-white rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/20 flex flex-col",
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute top-4 right-4 z-10",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSelectedImage(null),
                                className: "p-2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-md transition-all transform hover:scale-110",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                    size: 24
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                    lineNumber: 678,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                lineNumber: 674,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                            lineNumber: 673,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 bg-slate-900 flex items-center justify-center p-4 min-h-[300px] overflow-auto",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: selectedImage,
                                alt: "Payment Proof",
                                className: "max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                lineNumber: 682,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                            lineNumber: 681,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-6 bg-white border-t border-slate-100 flex justify-between items-center shrink-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "font-bold text-slate-900",
                                            children: "Payment Screenshot"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                            lineNumber: 686,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-slate-500 text-xs mt-0.5",
                                            children: "Verify the UTR and Amount carefully"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                            lineNumber: 687,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                    lineNumber: 685,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: selectedImage,
                                    target: "_blank",
                                    rel: "noreferrer",
                                    className: "flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5 transition-all",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                            lineNumber: 695,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        " Open Original"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                                    lineNumber: 689,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                            lineNumber: 684,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                    lineNumber: 672,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                lineNumber: 671,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$src$2f$components$2f$ConfirmationModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isOpen: confirmModal.isOpen,
                onClose: ()=>setConfirmModal({
                        ...confirmModal,
                        isOpen: false
                    }),
                onConfirm: confirmStatusUpdate,
                title: confirmModal.type === 'verified' ? 'Approve Transaction' : 'Reject Transaction',
                message: confirmModal.type === 'verified' ? 'Are you sure you want to approve this transaction? This will mark it as verified.' : 'Are you sure you want to reject this transaction? This action cannot be undone.',
                confirmText: confirmModal.type === 'verified' ? 'Approve' : 'Reject',
                type: confirmModal.type === 'verified' ? 'success' : 'danger'
            }, void 0, false, {
                fileName: "[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx",
                lineNumber: 703,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
_s(AdminDashboardContent, "VM1KNZNT9EsVH/wbfjwzE3rr0fw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = AdminDashboardContent;
const __TURBOPACK__default__export__ = AdminDashboardContent;
var _c;
__turbopack_context__.k.register(_c, "AdminDashboardContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/sharkfunded/src/app/admin/(authenticated)/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminDashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sharkfunded/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$src$2f$components$2f$admin$2f$AdminDashboardContent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sharkfunded/src/components/admin/AdminDashboardContent.tsx [app-client] (ecmascript)");
'use client';
;
;
function AdminDashboardPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sharkfunded$2f$src$2f$components$2f$admin$2f$AdminDashboardContent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
        fileName: "[project]/Downloads/sharkfunded/src/app/admin/(authenticated)/page.tsx",
        lineNumber: 6,
        columnNumber: 12
    }, this);
}
_c = AdminDashboardPage;
var _c;
__turbopack_context__.k.register(_c, "AdminDashboardPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Downloads_sharkfunded_src_c15cc43e._.js.map