export interface UpiConfig {
    vpa: string;
    merchantName: string;
}

export const UPI_CONFIGS: UpiConfig[] = [
    { vpa: 'jaspprosolutions@idbi', merchantName: 'Shark Funded' },
];

export const getUpiConfigForTransaction = (sessionId: string): UpiConfig => {
    if (!sessionId) return UPI_CONFIGS[0];

    // Simple hash function to get a deterministic index from the UUID
    let hash = 0;
    for (let i = 0; i < sessionId.length; i++) {
        hash = sessionId.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Ensure positive index
    const index = Math.abs(hash) % UPI_CONFIGS.length;
    return UPI_CONFIGS[index];
};

// Keep this for backward compatibility if needed, or deprecate
export const getUpiIdForTransaction = (sessionId: string): string => {
    return getUpiConfigForTransaction(sessionId).vpa;
};
