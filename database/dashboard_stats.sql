-- SQL Migration: Server-Side Aggregations for Admin Dashboard

-- 1. Create a function to fetch dashboard stats in a single fast query
CREATE OR REPLACE FUNCTION public.get_dashboard_stats()
RETURNS json AS $$
DECLARE
  result json;
  today_start timestamp with time zone;
BEGIN
  -- Set today_start to the beginning of today in UTC
  today_start := date_trunc('day', now() AT TIME ZONE 'UTC');

  SELECT json_build_object(
    'totalRevenue', COALESCE(SUM(CASE WHEN status = 'verified' THEN amount ELSE 0 END), 0),
    'totalPayments', COUNT(*),
    'approvedCount', COALESCE(SUM(CASE WHEN status = 'verified' THEN 1 ELSE 0 END), 0),
    'pendingCount', COALESCE(SUM(CASE WHEN status = 'pending_manual_verification' THEN 1 ELSE 0 END), 0),
    'failedCount', COALESCE(SUM(CASE WHEN status = 'failed' THEN 1 ELSE 0 END), 0),
    'rejectedCount', COALESCE(SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END), 0),
    'expiredCount', COALESCE(SUM(CASE WHEN status = 'expired' THEN 1 ELSE 0 END), 0),
    'totalUsers', COUNT(DISTINCT customer_details->>'email'),
    
    'todayCount', COALESCE(SUM(CASE WHEN created_at >= today_start THEN 1 ELSE 0 END), 0),
    'todayApprovedCount', COALESCE(SUM(CASE WHEN created_at >= today_start AND status = 'verified' THEN 1 ELSE 0 END), 0),
    'todayRejectedCount', COALESCE(SUM(CASE WHEN created_at >= today_start AND status IN ('failed', 'rejected') THEN 1 ELSE 0 END), 0),
    'todayVolume', COALESCE(SUM(CASE WHEN created_at >= today_start AND status = 'verified' THEN amount ELSE 0 END), 0)
  ) INTO result
  FROM public.transactions;

  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Create a view to aggregate user statistics from transaction records
CREATE OR REPLACE VIEW public.user_stats_view AS
SELECT 
  t.customer_details->>'email' as email,
  COALESCE(NULLIF(MAX(t.customer_details->>'name'), ''), 'Unknown') as name,
  COALESCE(SUM(CASE WHEN t.status = 'verified' THEN t.amount ELSE 0 END), 0) as total_spend,
  COUNT(*) as total_orders,
  COALESCE(SUM(CASE WHEN t.status = 'verified' THEN 1 ELSE 0 END), 0) as verified_orders,
  MAX(t.created_at) as last_active,
  (CASE WHEN bu.email IS NOT NULL THEN true ELSE false END) as is_blocked
FROM transactions t
LEFT JOIN blocked_users bu ON bu.email = t.customer_details->>'email'
WHERE t.customer_details->>'email' IS NOT NULL
GROUP BY t.customer_details->>'email', bu.email;
