import React, { useState } from 'react';
import { X, Plus, DollarSign } from 'lucide-react';
import { db } from '../services/supabaseService';
import { auth } from '../services/supabaseService';
import toast from 'react-hot-toast';

interface NewLeadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLeadAdded: () => void;
    isDarkMode?: boolean;
}

export const NewLeadModal: React.FC<NewLeadModalProps> = ({ isOpen, onClose, onLeadAdded, isDarkMode = false }) => {
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        title: '',
        value: '',
        status: 'New' as const
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.email) {
            toast.error('Name and Email are required');
            return;
        }

        setLoading(true);
        try {
            const user = await auth.getCurrentUser();

            // Enhanced validation
            if (!user) {
                console.error('Authentication error: No user found');
                toast.error('You must be logged in to add leads');
                setLoading(false);
                return;
            }

            if (!user.id) {
                console.error('Authentication error: User ID is missing');
                toast.error('Authentication error. Please try logging out and back in.');
                setLoading(false);
                return;
            }

            // Log payload for debugging (remove in production)
            const leadPayload = {
                user_id: user.id,
                name: formData.name,
                company: formData.company || null,
                email: formData.email,
                title: formData.title || null,
                status: formData.status,
                score: Math.floor(Math.random() * 40) + 60,
                value: formData.value ? parseFloat(formData.value) : 0
            };

            console.log('Creating lead with payload:', { ...leadPayload, user_id: '***' });

            await db.leads.create(leadPayload);

            toast.success('Lead added successfully!');
            setFormData({ name: '', company: '', email: '', title: '', value: '', status: 'New' });
            onLeadAdded();
            onClose();
        } catch (error: any) {
            console.error('Error adding lead:', error);

            // Enhanced error messages
            if (error.message?.includes('policy')) {
                toast.error('Permission denied. Please check your account permissions.');
            } else if (error.message?.includes('user_id')) {
                toast.error('Authentication error. Please try logging out and back in.');
            } else {
                toast.error(`Failed to add lead: ${error.message || 'Unknown error'}`);
            }
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                className={`w-full max-w-md rounded-2xl shadow-2xl border transform transition-all ${isDarkMode
                    ? 'bg-slate-900 border-slate-700'
                    : 'bg-white border-slate-200'
                    }`}
                onClick={(e) => e.stopPropagation()}
                data-testid="modal-content"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
                    <div>
                        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            Add New Lead
                        </h2>
                        <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                            Add a new prospect to your pipeline
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        data-testid="modal-close"
                        className={`p-2 rounded-lg transition-colors ${isDarkMode
                            ? 'hover:bg-slate-800 text-slate-400'
                            : 'hover:bg-slate-100 text-slate-500'
                            }`}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="John Doe"
                            className={`w-full px-4 py-2.5 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${isDarkMode
                                ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
                                : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                                }`}
                        />
                    </div>

                    <div>
                        <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                            Company
                        </label>
                        <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            placeholder="Acme Corp"
                            className={`w-full px-4 py-2.5 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${isDarkMode
                                ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
                                : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                                }`}
                        />
                    </div>

                    <div>
                        <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="john@acme.com"
                            className={`w-full px-4 py-2.5 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${isDarkMode
                                ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
                                : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                                }`}
                        />
                    </div>

                    <div>
                        <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                            Title
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="CEO"
                            className={`w-full px-4 py-2.5 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${isDarkMode
                                ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
                                : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                                }`}
                        />
                    </div>

                    <div>
                        <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                            Deal Value ($)
                        </label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="number"
                                step="0.01"
                                value={formData.value}
                                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                                placeholder="5000"
                                className={`w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${isDarkMode
                                    ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
                                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                                    }`}
                            />
                        </div>
                    </div>

                    <div>
                        <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                            Status
                        </label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                            className={`w-full px-4 py-2.5 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${isDarkMode
                                ? 'bg-slate-800 border-slate-700 text-white'
                                : 'bg-slate-50 border-slate-200 text-slate-900'
                                }`}
                        >
                            <option value="New">New</option>
                            <option value="Enriched">Enriched</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Replied">Replied</option>
                            <option value="Booked">Closed Won</option>
                        </select>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className={`flex-1 px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode
                                ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                }`}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            data-testid="save-lead-btn"
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Adding...
                                </>
                            ) : (
                                <>
                                    <Plus size={18} />
                                    Add Lead
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
