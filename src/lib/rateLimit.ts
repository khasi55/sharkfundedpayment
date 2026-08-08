import { query } from '@/lib/db';

interface RateLimitResult {
    success: boolean;
    limit: number;
    remaining: number;
    reset: number; // Unix timestamp
}

export async function checkRateLimit(ip: string, action: string, limit: number, windowSeconds: number = 60): Promise<RateLimitResult> {
    const key = `${action}:${ip}`;
    const now = new Date();
    const windowStart = new Date(now.getTime() - windowSeconds * 1000);

    try {
        // 1. Get current usage
        const result = await query('SELECT key, count, last_request FROM rate_limits WHERE key = $1 LIMIT 1', [key]);
        const usage = result.rows[0];

        // 2. If no record, create one
        if (!usage) {
            await query(
                'INSERT INTO rate_limits (key, count, last_request) VALUES ($1, $2, $3) ON CONFLICT (key) DO UPDATE SET count = EXCLUDED.count, last_request = EXCLUDED.last_request',
                [key, 1, now.toISOString()]
            );

            return { success: true, limit, remaining: limit - 1, reset: now.getTime() + windowSeconds * 1000 };
        }

        // 3. Check if window has passed
        const lastRequest = new Date(usage.last_request);
        if (lastRequest < windowStart) {
            // Reset window
            await query(
                'UPDATE rate_limits SET count = 1, last_request = $1 WHERE key = $2',
                [now.toISOString(), key]
            );

            return { success: true, limit, remaining: limit - 1, reset: now.getTime() + windowSeconds * 1000 };
        }

        // 4. Increment count if within window
        if (usage.count >= limit) {
            return { success: false, limit, remaining: 0, reset: lastRequest.getTime() + windowSeconds * 1000 };
        }

        await query(
            'UPDATE rate_limits SET count = count + 1, last_request = $1 WHERE key = $2',
            [now.toISOString(), key]
        );

        return { success: true, limit, remaining: limit - (usage.count + 1), reset: lastRequest.getTime() + windowSeconds * 1000 };

    } catch (err) {
        console.error('Rate limit unhandled error:', err);
        return { success: true, limit, remaining: 1, reset: 0 };
    }
}
