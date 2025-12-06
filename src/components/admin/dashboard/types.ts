export interface Transaction {
    id: string;
    created_at: string;
    amount: number;
    utr: string;
    order_id: string;
    status: 'verified' | 'failed' | 'pending_manual_verification' | 'rejected';
    screenshot_url?: string;
    customer_details: {
        name: string;
        email: string;
    };
}

export interface UserStat {
    email: string;
    name: string;
    totalSpend: number;
    totalOrders: number;
    lastActive: string;
    status: 'active' | 'inactive';
}

export interface DashboardStats {
    totalRevenue: number;
    totalPayments: number;
    approvedCount: number;
    pendingCount: number;
    failedRejectedCount: number;
    totalUsers: number;
    todayCount: number;
    todayVolume: number;
}
