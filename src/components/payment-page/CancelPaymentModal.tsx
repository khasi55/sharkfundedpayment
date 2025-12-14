import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';

interface CancelPaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (reason: string) => void;
}

export default function CancelPaymentModal({ isOpen, onClose, onConfirm }: CancelPaymentModalProps) {
    const [reason, setReason] = useState('');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleConfirm = () => {
        if (!reason) {
            setError('Please selecting a reason for cancellation.');
            return;
        }
        onConfirm(reason);
        // Reset state
        setReason('');
        setError('');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-scale-in">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <h3 className="text-lg font-bold text-slate-900">Cancel Payment?</h3>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4">
                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex gap-3">
                        <AlertCircle className="text-amber-600 shrink-0" size={20} />
                        <p className="text-sm text-amber-800 font-medium">
                            Are you sure you want to cancel? This will expire the current session.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Reason for cancellation</label>
                        <select
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all cursor-pointer"
                            onChange={(e) => {
                                setReason(e.target.value);
                                setError('');
                            }}
                            value={reason}
                        >
                            <option value="" disabled>Select a reason...</option>
                            <option value="changed_mind">Changed my mind</option>
                            <option value="payment_failed_app-issue">UPI App-related Issue</option>
                            <option value="amount_incorrect">Incorrect Amount Displayed</option>
                            <option value="technical_issue">Technical Error</option>
                            <option value="other">Other Reason</option>
                        </select>
                        {error && <p className="text-xs text-rose-500 font-bold ml-1">{error}</p>}
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all"
                    >
                        Close
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="px-5 py-2.5 text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 active:translate-y-0.5 rounded-xl shadow-lg shadow-rose-200 transition-all"
                    >
                        Confirm Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
