import React from 'react';
import { Info, CheckCircle2, AlertCircle } from 'lucide-react';

export interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    is_read: boolean;
    created_at: string;
    link?: string;
}

interface NotificationItemProps {
    notification: Notification;
    onClick: (notification: Notification) => void;
}

export default function NotificationItem({ notification, onClick }: NotificationItemProps) {
    const getIcon = (type: string) => {
        switch (type) {
            case 'success': return <CheckCircle2 size={16} className="text-emerald-500" />;
            case 'error': return <AlertCircle size={16} className="text-rose-500" />;
            case 'warning': return <AlertCircle size={16} className="text-amber-500" />;
            default: return <Info size={16} className="text-blue-500" />;
        }
    };

    return (
        <div
            onClick={() => onClick(notification)}
            className={`p-4 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3 ${!notification.is_read ? 'bg-blue-50/30' : ''}`}
        >
            <div className="mt-0.5 shrink-0">
                {getIcon(notification.type)}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                    <p className={`text-sm font-medium truncate ${!notification.is_read ? 'text-slate-900' : 'text-slate-600'}`}>
                        {notification.title}
                    </p>
                    <span className="text-[10px] text-slate-400 whitespace-nowrap">
                        {new Date(notification.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                    {notification.message}
                </p>
            </div>
            {!notification.is_read && (
                <div className="shrink-0 self-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
            )}
        </div>
    );
}
