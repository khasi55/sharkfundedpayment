import axios from 'axios';
import crypto from 'crypto';

interface WebhookPayload {
    event: 'payment.success' | 'payment.failed';
    orderId: string;
    reference_id?: string;
    utr?: string;
    amount: string | number;
    status: string;
    timestamp: string;
    signature?: string;
    [key: string]: any;
}

export const sendMerchantWebhook = async (url: string, payload: WebhookPayload) => {
    if (!url) return;

    try {
        const secret = process.env.SHARK_PAYMENT_KEY_SECRET || '';
        
        // Generate cryptographic signature
        const payloadString = JSON.stringify(payload);
        const signature = crypto
            .createHmac('sha256', secret)
            .update(payloadString)
            .digest('hex');

        // Add signature to both payload and headers
        const signedPayload = {
            ...payload,
            signature
        };

        console.log(`Sending callback (POST) to ${url}`, signedPayload);
        // 1. Try POST
        await axios.post(url, signedPayload, {
            timeout: 10000,
            headers: { 
                'Content-Type': 'application/json', 
                'User-Agent': 'SharkFunded-Callback/1.0',
                'x-shark-signature': signature
            }
        });
        console.log(`✅ Callback (POST) sent successfully to ${url}`);
        return true;
    } catch (error: any) {
        // 2. If POST fails (especially 405), Try GET
        const errorMsg = error.code === 'ECONNABORTED' ? 'Request timed out (10s)' : error.message;
        console.error(`❌ Callback (POST) failed: ${errorMsg}. Retrying with GET...`);

        try {
            const secret = process.env.SHARK_PAYMENT_KEY_SECRET || '';
            const signature = crypto
                .createHmac('sha256', secret)
                .update(JSON.stringify(payload))
                .digest('hex');

            const signedPayload = {
                ...payload,
                signature
            };

            const params = new URLSearchParams(signedPayload as any).toString();
            const getUrl = `${url}?${params}`;
            console.log(`Sending callback (GET) to ${getUrl}`);

            await axios.get(getUrl, {
                timeout: 10000,
                headers: { 
                    'User-Agent': 'SharkFunded-Callback/1.0',
                    'x-shark-signature': signature
                }
            });
            console.log(`Callback (GET) sent successfully to ${url}`);
            return true;
        } catch (getError: any) {
            console.error(`Failed to send callback (BOTH POST & GET) to ${url}:`, getError.message);
            return false;
        }
    }
};
