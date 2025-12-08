import { supabase } from '@/lib/supabase';

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
        const { data: usage, error } = await supabase
            .from('rate_limits')
            .select('*')
            .eq('key', key)
            .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found
            console.error('Rate limit fetch error:', error);
            // Fail open (allow request) if DB error to prevent blocking legit users during outage
            return { success: true, limit, remaining: 1, reset: 0 };
        }

        // 2. If no record, create one
        if (!usage) {
            const { error: insertError } = await supabase
                .from('rate_limits')
                .insert([{ key, count: 1, last_request: now.toISOString() }]);

            if (insertError) console.error('Rate limit insert error:', insertError);

            return { success: true, limit, remaining: limit - 1, reset: now.getTime() + windowSeconds * 1000 };
        }

        // 3. Check if window has passed
        const lastRequest = new Date(usage.last_request);
        if (lastRequest < windowStart) {
            // Reset window
            await supabase
                .from('rate_limits')
                .update({ count: 1, last_request: now.toISOString() })
                .eq('key', key);

            return { success: true, limit, remaining: limit - 1, reset: now.getTime() + windowSeconds * 1000 };
        }

        // 4. Increment count if within window
        if (usage.count >= limit) {
            return { success: false, limit, remaining: 0, reset: lastRequest.getTime() + windowSeconds * 1000 };
        }

        await supabase
            .from('rate_limits')
            .update({ count: usage.count + 1, last_request: now.toISOString() })
            .eq('key', key);

        return { success: true, limit, remaining: limit - (usage.count + 1), reset: lastRequest.getTime() + windowSeconds * 1000 };

    } catch (err) {
        console.error('Rate limit unhandled error:', err);
        return { success: true, limit, remaining: 1, reset: 0 };
    }
}
