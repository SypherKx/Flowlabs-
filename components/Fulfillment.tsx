import React, { useEffect, useState } from 'react';
import { Client, AutomationLog } from '../types';
import { db } from '../services/supabaseService';
import { FolderGit2, AlertCircle, Clock, Loader2, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

export const Fulfillment: React.FC = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [logs, setLogs] = useState<AutomationLog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [c, l] = await Promise.all([
                    db.clients.getAll(),
                    db.logs.getAll()
                ]);
                setClients(c || []);
                setLogs(l || []);
            } catch (error) {
                console.error('Error fetching fulfillment data:', error);
                toast.error('Failed to load projects');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDeleteClient = async (id: string) => {
        if (!confirm('Are you sure you want to remove this client?')) return;

        try {
            await db.clients.delete(id);
            setClients(current => current.filter(c => c.id !== id));
            toast.success('Client removed successfully');
        } catch (error) {
            console.error('Error deleting client:', error);
            toast.error('Failed to remove client');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full min-h-[400px]">
                <Loader2 className="animate-spin text-indigo-600" size={40} />
            </div>
        )
    }

    if (clients.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center px-6">
                <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                    <FolderGit2 className="text-indigo-600" size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">No Active Clients Yet</h3>
                <p className="text-slate-500 mb-6 max-w-md">
                    Start converting your qualified leads into active clients to see them here.
                </p>
                <p className="text-sm text-slate-400">
                    Tip: Use the "To Fulfillment" button in the Prospecting page to convert leads.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 animate-in fade-in duration-500">

            {/* Active Clients Column */}
            <div className="xl:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <FolderGit2 className="text-indigo-600" size={20} />
                        Active Client Projects
                    </h2>
                    <button className="text-slate-400 hover:text-indigo-600"><RefreshCw size={14} /></button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {clients.map((client) => (
                        <div key={client.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:border-indigo-200 transition-all group cursor-pointer">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <img src={client.avatar} alt={client.name} className="w-10 h-10 rounded-lg bg-slate-100 object-cover" />
                                    <div>
                                        <h3 className="font-bold text-slate-800">{client.company}</h3>
                                        <p className="text-xs text-slate-500">{client.name}</p>
                                    </div>
                                </div>
                                <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide ${client.status === 'Active' ? 'bg-green-100 text-green-700' :
                                    client.status === 'Onboarding' ? 'bg-amber-100 text-amber-700' :
                                        'bg-slate-100 text-slate-600'
                                    }`}>
                                    {client.status}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-2 mb-4">
                                <div className="bg-slate-50 p-2 rounded-lg text-center">
                                    <div className="text-xl font-bold text-indigo-600">{client.automationsRunning}</div>
                                    <div className="text-[10px] uppercase font-semibold text-slate-400">Active Workflows</div>
                                </div>
                                <div className="bg-slate-50 p-2 rounded-lg text-center">
                                    <div className="text-lg font-bold text-slate-700">98%</div>
                                    <div className="text-[10px] uppercase font-semibold text-slate-400">Uptime</div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                                <span className="text-xs text-slate-400 flex items-center gap-1">
                                    <Clock size={12} />
                                    Active {client.lastActive}
                                </span>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleDeleteClient(client.id)}
                                        className="text-xs font-semibold text-red-600 opacity-0 group-hover:opacity-100 transition-opacity hover:underline"
                                    >
                                        Remove
                                    </button>
                                    <button
                                        onClick={() => toast('Project management view coming soon!')}
                                        className="text-xs font-semibold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        Manage Project →
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Add New Client Card */}
                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-5 flex flex-col items-center justify-center text-slate-400 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all cursor-pointer min-h-[200px]">
                        <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-3">
                            <span className="text-2xl font-light text-slate-300">+</span>
                        </div>
                        <span className="font-medium text-sm">Onboard New Client</span>
                    </div>
                </div>
            </div>

            {/* System Health / Logs Column */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 h-fit sticky top-24">
                <h3 className="font-bold text-slate-800 mb-4">Recent Automation Executions</h3>
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    {logs.map((log) => (
                        <div key={log.id} className="relative pl-6 pb-4 border-l-2 border-slate-100 last:border-0 last:pb-0">
                            <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white shadow-sm ${log.status === 'Success' ? 'bg-green-500' :
                                log.status === 'Error' ? 'bg-red-500' : 'bg-blue-500 animate-pulse'
                                }`} />
                            <div className="flex justify-between items-start">
                                <span className="text-sm font-semibold text-slate-700">{log.workflow}</span>
                                <span className="text-[10px] text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded">{log.timestamp}</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5 mb-1">{log.details}</p>
                            {log.status === 'Error' && (
                                <button className="text-xs text-red-600 font-medium hover:underline flex items-center gap-1">
                                    <AlertCircle size={10} />
                                    Debug with AI
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Resource Usage</h4>
                    <div className="space-y-3">
                        <div>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-slate-600">Make.com Operations</span>
                                <span className="font-medium text-slate-800">8,432 / 10,000</span>
                            </div>
                            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-indigo-500 h-full rounded-full" style={{ width: '84%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-slate-600">OpenAI Tokens</span>
                                <span className="font-medium text-slate-800">1.2M / 2M</span>
                            </div>
                            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '60%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
