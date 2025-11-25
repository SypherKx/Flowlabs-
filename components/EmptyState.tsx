import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
    icon: LucideIcon;
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
    isDarkMode?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    icon: Icon,
    title,
    description,
    actionLabel,
    onAction,
    isDarkMode = true,
}) => {
    return (
        <div className={`flex flex-col items-center justify-center py-16 px-4 text-center rounded-xl border border-dashed ${isDarkMode ? 'border-slate-700 bg-slate-900/30' : 'border-slate-200 bg-slate-50/50'}`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-400'}`}>
                <Icon size={32} />
            </div>
            <h3 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{title}</h3>
            <p className={`text-sm max-w-sm mb-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{description}</p>

            {actionLabel && onAction && (
                <button
                    onClick={onAction}
                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
                >
                    {actionLabel}
                </button>
            )}
        </div>
    );
};
