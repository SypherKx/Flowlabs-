import React, { useState, useEffect } from 'react';
import { Save, Key, Database, Globe, CheckCircle2, AlertCircle, RefreshCw, User, CreditCard, LogOut } from 'lucide-react';
import { AppSettings } from '../types';
import { getSettings, saveSettings } from '../services/apiService';
import { auth, db } from '../services/supabaseService';
import toast from 'react-hot-toast';

export const Settings: React.FC = () => {
    const [settings, setSettings] = useState<AppSettings>({
        geminiApiKey: '',
        airtableApiKey: '',
        airtableBaseId: '',
        makeWebhookUrl: '',
        tableNameLeads: 'Leads',
        tableNameClients: 'Clients',
        tableNameLogs: 'Logs'
    });

    const [saved, setSaved] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [userSettings, setUserSettings] = useState<any>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const currentUser = await auth.getCurrentUser();
                setUser(currentUser);

                if (currentUser) {
                    const dbSettings = await db.settings.get(currentUser.id);
                    setUserSettings(dbSettings);
                }
            } catch (error) {
                console.error('Error loading user data:', error);
            }
        };

        // Load settings from localStorage
        const savedSettings = getSettings();
        setSettings(savedSettings);

        fetchUserData();
    }, []);



    const handleChange = (field: keyof AppSettings, value: string) => {
        setSettings(prev => ({ ...prev, [field]: value }));
        setSaved(false);
    };

    const handleSave = () => {
        saveSettings(settings);
        setSaved(true);
        toast.success('Settings saved successfully!');
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">

            <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10 flex justify-between items-end">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Integration Hub</h2>
                        <p className="text-indigo-200 max-w-2xl">
                            Connect your No-Code stack. This dashboard acts as the "Headless" control panel for your Airtable backend and Make.com engine.
                        </p>
                    </div>
                    {saved && (
                        <div className="bg-green-500/20 text-green-300 px-4 py-2 rounded-lg border border-green-500/30 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
                            <CheckCircle2 size={18} />
                            <span className="font-semibold text-sm">Configuration Active</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8">
                {/* Profile Section */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:border-blue-300 transition-colors">
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                            <User size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">Profile</h3>
                            <p className="text-sm text-slate-500">Your account information</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs uppercase tracking-wider font-bold text-slate-500 mb-2">Email</label>
                            <input
                                type="email"
                                value={user?.email || ''}
                                disabled
                                className="w-full bg-slate-100 border border-slate-200 rounded-lg px-4 py-3 text-slate-500 cursor-not-allowed text-sm"
                            />
                            <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                                <AlertCircle size={12} />
                                Email cannot be changed
                            </p>
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-wider font-bold text-slate-500 mb-2">User ID</label>
                            <input
                                type="text"
                                value={user?.id || ''}
                                disabled
                                className="w-full bg-slate-100 border border-slate-200 rounded-lg px-4 py-3 text-slate-500 cursor-not-allowed text-xs font-mono"
                            />
                        </div>
                    </div>
                </div>

                {/* Billing Section */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:border-emerald-300 transition-colors">
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                        <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 shadow-sm">
                            <CreditCard size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">Billing & Subscription</h3>
                            <p className="text-sm text-slate-500">Manage your subscription</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl">
                            <div>
                                <p className="text-sm font-semibold text-slate-600 mb-1">Current Plan</p>
                                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent capitalize">
                                    {userSettings?.subscription_tier || 'free'}
                                </p>
                            </div>
                            <button
                                onClick={() => window.location.href = '/dashboard'}
                                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
                            >
                                Upgrade Plan
                            </button>
                        </div>
                        {userSettings?.subscription_tier !== 'free' && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <p className="text-sm font-semibold text-green-800 mb-2">✨ Premium Features Active</p>
                                <ul className="text-xs text-green-700 space-y-1">
                                    <li>✓ Unlimited leads and clients</li>
                                    <li>✓ Advanced AI personalization</li>
                                    <li>✓ Priority support</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* Integration Sections */}
                {/* Gemini Config */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-300 transition-colors">
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                            <Key size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">AI Intelligence</h3>
                            <p className="text-sm text-slate-500">Google Gemini API Configuration</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs uppercase tracking-wider font-bold text-slate-500 mb-2">Gemini API Key</label>
                            <input
                                type="text"
                                value={settings.geminiApiKey}
                                onChange={(e) => handleChange('geminiApiKey', e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-mono"
                                placeholder="AIzaSy..."
                            />
                            <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                                <AlertCircle size={12} />
                                Required for personalization and chat.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Airtable Config */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:border-amber-300 transition-colors">
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                        <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 shadow-sm">
                            <Database size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">Data Source (CRM)</h3>
                            <p className="text-sm text-slate-500">Airtable Base Connection</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-xs uppercase tracking-wider font-bold text-slate-500 mb-2">Personal Access Token (PAT)</label>
                            <input
                                type="password"
                                value={settings.airtableApiKey}
                                onChange={(e) => handleChange('airtableApiKey', e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-sm font-mono"
                                placeholder="pat_..."
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-wider font-bold text-slate-500 mb-2">Base ID</label>
                            <input
                                type="text"
                                value={settings.airtableBaseId}
                                onChange={(e) => handleChange('airtableBaseId', e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-sm font-mono"
                                placeholder="app..."
                            />
                        </div>
                    </div>

                    {/* Table Name Mapping */}
                    <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                        <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                            <RefreshCw size={14} />
                            Table Mapping
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Leads Table Name</label>
                                <input
                                    type="text"
                                    value={settings.tableNameLeads}
                                    onChange={(e) => handleChange('tableNameLeads', e.target.value)}
                                    className="w-full bg-white border border-slate-200 rounded-md px-3 py-2 text-xs focus:border-amber-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Clients Table Name</label>
                                <input
                                    type="text"
                                    value={settings.tableNameClients}
                                    onChange={(e) => handleChange('tableNameClients', e.target.value)}
                                    className="w-full bg-white border border-slate-200 rounded-md px-3 py-2 text-xs focus:border-amber-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Logs Table Name</label>
                                <input
                                    type="text"
                                    value={settings.tableNameLogs}
                                    onChange={(e) => handleChange('tableNameLogs', e.target.value)}
                                    className="w-full bg-white border border-slate-200 rounded-md px-3 py-2 text-xs focus:border-amber-500 outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Make.com Config */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:border-purple-300 transition-colors">
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                        <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 shadow-sm">
                            <Globe size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">Automation Engine</h3>
                            <p className="text-sm text-slate-500">Make.com (Integromat) Webhooks</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs uppercase tracking-wider font-bold text-slate-500 mb-2">Campaign Trigger Webhook URL</label>
                            <input
                                type="text"
                                value={settings.makeWebhookUrl}
                                onChange={(e) => handleChange('makeWebhookUrl', e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-sm font-mono"
                                placeholder="https://hook.us1.make.com/..."
                            />
                            <p className="text-xs text-slate-400 mt-2">
                                This URL is called when you click "Launch Campaign". Payload includes Lead IDs.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sign Out Button */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <button
                    onClick={async () => {
                        try {
                            await auth.signOut();
                            toast.success('Signed out successfully');
                            setTimeout(() => window.location.href = '/login', 500);
                        } catch (error) {
                            console.error('Sign out error:', error);
                            toast.error('Failed to sign out');
                        }
                    }}
                    className="w-full px-6 py-4 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:scale-[1.02]"
                >
                    <LogOut size={20} />
                    Sign Out
                </button>
            </div>

            <div className="sticky bottom-6 flex justify-end z-20">
                <div className="bg-white/80 backdrop-blur-md p-2 rounded-2xl shadow-lg border border-slate-200">
                    <button
                        onClick={handleSave}
                        className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white shadow-xl transition-all transform active:scale-95 ${saved ? 'bg-green-500 hover:bg-green-600' : 'bg-slate-900 hover:bg-slate-800 hover:shadow-slate-900/20'
                            }`}
                    >
                        {saved ? <CheckCircle2 size={20} /> : <Save size={20} />}
                        {saved ? 'Configurations Saved' : 'Save System Settings'}
                    </button>
                </div>
            </div>
        </div>
    );
};
