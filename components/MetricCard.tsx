import React from 'react';
import { ArrowUpRight, ArrowDownRight, LucideIcon } from 'lucide-react';

interface MetricCardProps {
    label: string;
    value: string;
    trend: string;
    trendValue: string;
    trendDirection: 'up' | 'down' | 'neutral';
    icon: LucideIcon;
    color: 'indigo' | 'blue' | 'amber' | 'emerald' | 'purple';
    'data-testid'?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
    label,
    value,
    trend,
    trendValue,
    trendDirection,
    icon: Icon,
    color,
    'data-testid': testId,
}) => {
    const colorStyles = {
        indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
        blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    };

    return (
        <div
            className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6 transition-all hover:scale-[1.02] hover:bg-white/10 shadow-xl"
            data-testid={testId}
        >
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-400">{label}</p>
                    <h3 className="mt-2 text-3xl font-bold text-white tracking-tight">{value}</h3>
                </div>
                <div className={`rounded-lg p-2.5 ${colorStyles[color]} border`}>
                    <Icon size={20} />
                </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
                <span
                    className={`flex items-center text-xs font-bold px-2 py-0.5 rounded-full ${trendDirection === 'up'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : trendDirection === 'down'
                            ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                            : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                        }`}
                >
                    {trendDirection === 'up' ? (
                        <ArrowUpRight size={12} className="mr-1" />
                    ) : trendDirection === 'down' ? (
                        <ArrowDownRight size={12} className="mr-1" />
                    ) : null}
                    {trendValue}
                </span>
                <span className="text-xs text-slate-500">{trend}</span>
            </div>
        </div>
    );
};
