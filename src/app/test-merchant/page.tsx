'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingCart, CheckCircle, XCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function TestMerchantPage() {
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<string | null>(null);
    const [orderDetails, setOrderDetails] = useState<any>(null);

    // Check for callback params on mount
    useEffect(() => {
        const statusParam = searchParams.get('status');
        if (statusParam) {
            setStatus(statusParam);
            setOrderDetails({
                orderId: searchParams.get('orderId'),
                utr: searchParams.get('utr'),
                amount: searchParams.get('amount'),
            });
        }
    }, [searchParams]);

    const handleBuyNow = () => {
        // 1. Merchant Data
        const amount = "5000";
        const name = "Test User";
        const email = "test@merchant.com";
        const orderId = `TEST-${Date.now()}`; // Merchant's internal ID

        // 2. Construct Gateway URL
        // In real life, this would be https://gateway.sharkfunded.com
        const gatewayBaseUrl = window.location.origin;

        // 3. Callback URL (Current Page)
        const callbackUrl = window.location.href.split('?')[0];

        // 4. Build Full URL
        const params = new URLSearchParams({
            amount,
            name,
            email,
            callback_url: callbackUrl
        });

        // 5. Redirect
        // mimicking external redirect
        window.location.href = `${gatewayBaseUrl}/secure-checkout/${orderId}?${params.toString()}`;
    };

    if (status === 'success') {
        return (
            <div className="min-h-screen bg-emerald-50 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center space-y-4">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle size={40} />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800">Order Confirmed!</h1>
                    <p className="text-slate-500">Your payment was successful.</p>

                    <div className="bg-slate-50 p-4 rounded-xl text-left text-sm space-y-2 mt-4 border border-slate-100">
                        <div className="flex justify-between">
                            <span className="text-slate-500">Order ID:</span>
                            <span className="font-mono font-bold text-slate-900">{orderDetails?.orderId}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">UTR:</span>
                            <span className="font-mono font-bold text-slate-900">{orderDetails?.utr}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">Amount:</span>
                            <span className="font-bold text-slate-900 text-emerald-600">₹{orderDetails?.amount}</span>
                        </div>
                    </div>

                    <button
                        onClick={() => window.location.href = '/test-merchant'}
                        className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition mt-4"
                    >
                        Buy Another
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
            <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full border border-slate-100">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                        M
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900">Merchant Store</h1>
                        <p className="text-xs text-slate-400">Dummy e-commerce site</p>
                    </div>
                </div>

                <div className="group relative aspect-square bg-slate-100 rounded-2xl mb-6 overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1611974765270-ca12586343bb?w=800&auto=format&fit=crop&q=60"
                        alt="Product"
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-sm">
                        Best Seller
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">Trading Challenge</h2>
                            <p className="text-slate-500 text-sm">Professional Account • $5k</p>
                        </div>
                        <p className="text-2xl font-bold text-indigo-600">₹5,000</p>
                    </div>

                    <p className="text-slate-400 text-sm leading-relaxed">
                        Instant access to a $5,000 trading account with 80% profit split and scaling plan.
                    </p>

                    <button
                        onClick={handleBuyNow}
                        className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-600 hover:shadow-xl hover:shadow-indigo-200 transition-all duration-300 flex items-center justify-center gap-2 group"
                    >
                        <span>Buy Now</span>
                        <ShoppingCart size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>

                    <p className="text-xs text-center text-slate-400">
                        Redirects to SharkFunded Gateway for payment logic.
                    </p>
                </div>
            </div>
        </div>
    );
}
