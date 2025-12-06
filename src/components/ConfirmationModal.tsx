import React from 'react';
import { X, AlertTriangle, CheckCircle, Info, AlertCircle } from 'lucide-react';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    type?: 'danger' | 'success' | 'warning' | 'info';
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    type = 'info'
}) => {
    if (!isOpen) return null;

    const getTypeStyles = () => {
        switch (type) {
            case 'danger':
                return {
                    icon: <AlertTriangle size={24} className="text-rose-600" />,
                    iconBg: 'bg-rose-100',
                    confirmBtn: 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/20 hover:shadow-rose-600/30'
                };
            case 'success':
                return {
                    icon: <CheckCircle size={24} className="text-emerald-600" />,
                    iconBg: 'bg-emerald-100',
                    confirmBtn: 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20 hover:shadow-emerald-600/30'
                };
            case 'warning':
                return {
                    icon: <AlertCircle size={24} className="text-amber-600" />,
                    iconBg: 'bg-amber-100',
                    confirmBtn: 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/20 hover:shadow-amber-600/30'
                };
            default:
                return {
                    icon: <Info size={24} className="text-blue-600" />,
                    iconBg: 'bg-blue-100',
                    confirmBtn: 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20 hover:shadow-blue-600/30'
                };
        }
    };

    const styles = getTypeStyles();

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-fade-in">
            <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-scale-in">
                <div className="p-6">
                    <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${styles.iconBg} shrink-0`}>
                            {styles.icon}
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">{message}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-slate-400 hover:text-slate-600 transition-colors shrink-0"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>
                <div className="bg-slate-50 px-6 py-4 flex gap-3 justify-end border-t border-slate-100">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 hover:border-slate-300 transition-all text-sm"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={handleConfirm}
                        className={`px-5 py-2.5 text-white rounded-xl font-bold shadow-lg transition-all transform hover:-translate-y-0.5 text-sm ${styles.confirmBtn}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
