export interface PaymentState {
    step: 'details' | 'payment' | 'verifying' | 'success' | 'failed' | 'expired' | 'manual_upload' | 'verified' | 'review_pending';
    amount: string;
    name: string;
    email: string;
    utr: string;
    error: string;
    screenshot_url?: string;
}

export interface PaymentDetailsFormProps {
    state: PaymentState;
    setState: React.Dispatch<React.SetStateAction<PaymentState>>;
    handleDetailsSubmit: (e: React.FormEvent) => void;
}

export interface PaymentManualUploadProps {
    state: PaymentState;
    handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    uploading: boolean;
}

export interface PaymentStatusProps {
    state: PaymentState;
    setState: React.Dispatch<React.SetStateAction<PaymentState>>;
    officialOrderId: string;
    checkStatus: () => Promise<void>;
    generateInvoice: (details: any) => void;
    callbackUrl?: string | null;
}
