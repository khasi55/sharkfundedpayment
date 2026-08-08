import React from 'react';
import { Bell, CheckCheck } from 'lucide-react';
import NotificationItem, { Notification } from './NotificationItem';

interface NotificationListProps {
    notifications: Notification[];
    loading: boolean;
    onMarkAsRead?: (id: string) => Promise<void>;
    onMarkAllAsRead?: () => Promise<void>;
    onNotificationClick: (notification: Notification) => void;
}

export default function NotificationList({
    notifications,
    loading,
    onMarkAsRead,
    onMarkAllAsRead,
    onNotificationClick,
}: NotificationListProps) {
    const unreadCount = notifications.filter((n) => !n.is_read).length;

    return (
        <div className="flex flex-col max-h-[400px]">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h3 className="font-semibold text-slate-800 text-sm">Notifications</h3>
                {onMarkAllAsRead && unreadCount > 0 && (
                    <button
                        onClick={onMarkAllAsRead}
                        className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
                    >
                        <CheckCheck size={14} />
                        Mark all as read
                    </button>
                )}
            </div>
            <div className="overflow-y-auto">
                {loading ? (
                    <div className="p-8 text-center text-slate-400 text-sm">Loading...</div>
                ) : notifications.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 text-sm flex flex-col items-center gap-2">
                        <Bell size={24} className="opacity-20" />
                        <p>No notifications yet</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-50">
                        {notifications.map((notification) => (
                            <NotificationItem
                                key={notification.id}
                                notification={notification}
                                onClick={onNotificationClick}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
