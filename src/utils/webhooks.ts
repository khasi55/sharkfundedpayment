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

    console.log(`Sending callback output (JSON) to ${url}`, payload);

    try {
        // Send webhook with a timeout of 10 seconds
        const response = await axios.post(url, payload, {
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'SharkFunded-Callback/1.0'
            }
        });

        console.log(`Callback sent successfully to ${url}. Status: ${response.status}`);
        return true;
    } catch (error: any) {
        console.error(`Failed to send callback to ${url}:`, error.message);
        // We don't throw here to prevent disrupting the main flow
        return false;
    }
};
