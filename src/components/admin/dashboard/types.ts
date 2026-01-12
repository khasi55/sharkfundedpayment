export interface Transaction {
    id: string;
    created_at: string;
    amount: number;
    utr: string;
    order_id: string;
    status: 'verified' | 'failed' | 'pending_manual_verification' | 'rejected' | 'cancelled' | 'expired' | 'pending_payment';
    screenshot_url?: string;
    customer_details: {
        name: string;
        email: string;
        failure_reason?: string;
    };
    merchant_upi_id?: string;
    approved_by?: string; // [NEW] Track who approved/rejected
}

export interface UserStat {
    email: string;
    name: string;
    totalSpend: number;
    totalOrders: number;
    verifiedOrders: number;
    lastActive: string;
    status: 'active' | 'inactive';
    isBlocked?: boolean;
}

export interface DashboardStats {
    totalRevenue: number;
    totalPayments: number;
    approvedCount: number;
    pendingCount: number;
    failedCount: number;
    rejectedCount: number;
    expiredCount: number;
    totalUsers: number;
    todayCount: number;
    todayApprovedCount: number;
    todayRejectedCount: number;
    todayVolume: number;
}
