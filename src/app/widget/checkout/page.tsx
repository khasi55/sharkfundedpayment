'use client';

import PaymentPageContent from '@/components/PaymentPageContent';
import React from 'react';

export default function WidgetCheckoutPage() {
    return (
        <div className="w-full h-screen bg-transparent">
            {/* The PaymentPageContent handles the logic. 
                We might want to ensure it fits well in an iframe. 
                For now, we just simple render it. */}
            <PaymentPageContent />
        </div>
    );
}
