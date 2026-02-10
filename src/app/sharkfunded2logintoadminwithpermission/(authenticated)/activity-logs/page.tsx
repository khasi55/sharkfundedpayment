import { Metadata } from 'next';
import AuditLogsContent from '@/components/admin/AuditLogsContent';

export const metadata: Metadata = {
    title: 'Activity Logs | Admin Panel',
    description: 'View sensitive admin activity logs',
};

export default function ActivityLogsPage() {
    return (
        <div className="p-6">
            <AuditLogsContent />
        </div>
    );
}
