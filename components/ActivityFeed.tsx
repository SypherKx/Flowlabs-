import React, { useState, useEffect } from 'react';
import { UserPlus, AlertCircle, Inbox } from 'lucide-react';
import { db } from '../services/supabaseService';
import { formatDistanceToNow } from 'date-fns';

interface ActivityItem {
    id: string;
    type: 'lead';
    title: string;
    description: string;
    time: string;
}

export const ActivityFeed: React.FC = () => {
    const [activities, setActivities] = useState<ActivityItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecentLeads = async () => {
            try {
                const leads = await db.leads.getAll();

                // Get the 5 most recent leads
                const recentLeads = (leads || [])
                    .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                    .slice(0, 5)
                    .map((lead: any) => ({
                        id: lead.id,
                        type: 'lead' as const,
                        title: 'New Lead Added',
                        description: `${lead.name}${lead.company ? ` from ${lead.company}` : ''}`,
                        time: formatDistanceToNow(new Date(lead.created_at), { addSuffix: true })
                    }));

                setActivities(recentLeads);
            } catch (error) {
                console.error('Error fetching recent activity:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecentLeads();
    }, []);

    const getIcon = () => <UserPlus size={14} className="text-blue-400" />;
    const getBgColor = () => 'bg-blue-500/10 border-blue-500/20';

    if (loading) {
        return (
            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden flex flex-col h-full">
                <div className="p-5 border-b border-white/10">
                    <h3 className="font-bold text-white">Recent Activity</h3>
                </div>
                <div className="flex-1 flex items-center justify-center p-8">
                    <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden flex flex-col h-full">
            <div className="p-5 border-b border-white/10 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    {activities.length > 0 && (
                        <div className="relative">
                            <span className="absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </div>
                    )}
                    <h3 className="font-bold text-white">Recent Activity</h3>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {activities.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center py-12">
                        <Inbox size={40} className="text-slate-600 mb-3" />
                        <p className="text-sm font-medium text-slate-400">No activity yet</p>
                        <p className="text-xs text-slate-500 mt-1">Add leads to see activity here</p>
                    </div>
                ) : (
                    activities.map((activity, index) => (
                        <div key={activity.id} className="group flex gap-3">
                            <div className="flex flex-col items-center">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${getBgColor()}`}>
                                    {getIcon()}
                                </div>
                                <div className={`w-px h-full bg-white/5 my-2 ${index === activities.length - 1 ? 'hidden' : ''}`}></div>
                            </div>
                            <div className="pb-4">
                                <p className="text-sm font-medium text-slate-200">{activity.title}</p>
                                <p className="text-xs text-slate-400 mt-0.5">{activity.description}</p>
                                <p className="text-[10px] text-slate-500 mt-1 font-mono">{activity.time}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
