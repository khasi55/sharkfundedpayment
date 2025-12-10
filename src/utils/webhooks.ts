import axios from 'axios';

interface WebhookPayload {
    event: 'payment.success' | 'payment.failed';
    orderId: string;
    reference_id?: string;
    utr?: string;
    amount: string | number;
    status: string;
    timestamp: string;
}

export const sendMerchantWebhook = async (url: string, payload: WebhookPayload) => {
    if (!url) return;

    try {
        console.log(`Sending callback (POST) to ${url}`, payload);
        // 1. Try POST
        await axios.post(url, payload, {
            timeout: 10000,
            headers: { 'Content-Type': 'application/json', 'User-Agent': 'SharkFunded-Callback/1.0' }
        });
        console.log(`Callback (POST) sent successfully to ${url}`);
        return true;
    } catch (error: any) {
        // 2. If POST fails (especially 405), Try GET
        console.warn(`Callback (POST) failed: ${error.message}. Retrying with GET...`);

        try {
            const params = new URLSearchParams(payload as any).toString();
            const getUrl = `${url}?${params}`;
            console.log(`Sending callback (GET) to ${getUrl}`);

            await axios.get(getUrl, {
                timeout: 10000,
                headers: { 'User-Agent': 'SharkFunded-Callback/1.0' }
            });
            console.log(`Callback (GET) sent successfully to ${url}`);
            return true;
        } catch (getError: any) {
            console.error(`Failed to send callback (BOTH POST & GET) to ${url}:`, getError.message);
            return false;
        }
    }
};
