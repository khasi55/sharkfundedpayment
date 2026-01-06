import React from 'react';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    type: 'approve' | 'reject' | 'delete' | null;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    type
}) => {
    if (!isOpen) return null;

    const isApprove = type === 'approve';
    const isReject = type === 'reject';
    const isDelete = type === 'delete';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-6">
                    <div className="flex gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${isApprove ? 'bg-emerald-100 text-emerald-600' :
                                isReject ? 'bg-rose-100 text-rose-600' :
                                    'bg-amber-100 text-amber-600'
                            }`}>
                            {isApprove ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                        </div>

                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-slate-900 mb-1">{title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">{message}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50 px-6 py-4 flex justify-end gap-3 border-t border-slate-100">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-200/50 rounded-xl transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`px-4 py-2 text-sm font-bold text-white rounded-xl shadow-lg transition-all ${isApprove ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20' :
                                isReject ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/20' :
                                    'bg-amber-600 hover:bg-amber-700 shadow-amber-600/20'
                            }`}
                    >
                        {isApprove ? 'Approve' : isReject ? 'Reject' : 'Confirm'}
                    </button>
                </div>

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
                >
                    <X size={20} />
                </button>
            </div>
        </div>
    );
};

export default ConfirmationModal;
