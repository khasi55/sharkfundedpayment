import React from 'react';
import { Bell } from 'lucide-react';
import NotificationItem, { Notification } from './NotificationItem';

interface NotificationListProps {
    notifications: Notification[];
    loading: boolean;
    onNotificationClick: (notification: Notification) => void;
}

export default function NotificationList({ notifications, loading, onNotificationClick }: NotificationListProps) {
    return (
        <div className="max-h-[400px] overflow-y-auto">
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
    );
}
