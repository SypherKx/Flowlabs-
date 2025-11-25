import React from 'react';
import { Inbox, Plus } from 'lucide-react';

interface LeadsEmptyStateProps {
    onAddLead: () => void;
    isDarkMode?: boolean;
}

export const LeadsEmptyState: React.FC<LeadsEmptyStateProps> = ({ onAddLead, isDarkMode = false }) => {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-6">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 ${isDarkMode ? 'bg-slate-800' : 'bg-blue-50'
                }`}>
                <Inbox className={`w-12 h-12 ${isDarkMode ? 'text-slate-600' : 'text-blue-400'}`} />
            </div>

            <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                No leads yet
            </h3>

            <p className={`text-center mb-8 max-w-md ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Start by adding your first prospect. Build your pipeline and watch your business grow.
            </p>

            <button
                onClick={onAddLead}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2"
            >
                <Plus size={20} />
                Add Your First Lead
            </button>
        </div>
    );
};
