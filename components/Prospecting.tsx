import React, { useState, useEffect } from 'react';
import { Lead } from '../types';
import { db } from '../services/supabaseService';
import { triggerCampaignWebhook } from '../services/apiService';
import { generateLeadPersonalization } from '../services/geminiService';
import { Search, Filter, Wand2, Send, CheckCircle2, MoreHorizontal, Download, PlayCircle, Loader2, RefreshCw, LayoutGrid, List, DollarSign, User, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { NewLeadModal } from './NewLeadModal';
import { LeadsEmptyState } from './LeadsEmptyState';
import { Skeleton } from './Skeleton';

interface ProspectingProps {
  isDarkMode: boolean;
}

export const Prospecting: React.FC<ProspectingProps> = ({ isDarkMode }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [isCampaignStarting, setIsCampaignStarting] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'board'>('list');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await db.leads.getAll();
      setLeads(data || []);
    } catch (error) {
      console.error('Error fetching leads:', error);
      toast.error('Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePersonalization = async (id: string) => {
    const lead = leads.find(l => l.id === id);
    if (!lead) return;

    // Check if Gemini API key is configured
    const settings = JSON.parse(localStorage.getItem('autoflow_settings') || '{}');
    if (!settings.geminiApiKey) {
      toast.error('Please set your Gemini API Key in Settings first.');
      return;
    }

    setLoadingId(id);
    try {
      const line = await generateLeadPersonalization(lead.name, lead.company, lead.title);
      await db.leads.update(id, { personalizationLine: line });
      setLeads(current => current.map(l =>
        l.id === id ? { ...l, personalizationLine: line } : l
      ));
      toast.success('Generated icebreaker!');
    } catch (error) {
      console.error('Error generating personalization:', error);
      toast.error('Failed to generate icebreaker');
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;

    try {
      await db.leads.delete(id);
      setLeads(current => current.filter(l => l.id !== id));
      toast.success('Lead deleted successfully');
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete lead');
    }
  };

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
      await db.leads.update(leadId, { status: newStatus });
      setLeads(current => current.map(l =>
        l.id === leadId ? { ...l, status: newStatus as Lead['status'] } : l
      ));
      toast.success('Status updated');
    } catch (error) {
      console.error('Status update error:', error);
      toast.error('Failed to update status');
    }
  };

  const handleConvertToClient = async (leadId: string) => {
    const lead = leads.find(l => l.id === leadId);
    if (!lead) return;

    setLoadingId(leadId);
    try {
      // Create client from lead
      await db.clients.create({
        name: lead.name,
        company: lead.company,
        email: lead.email || '',
        title: lead.title,
        status: 'Onboarding',
        automationsRunning: 0,
        lastActive: 'Just now',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(lead.name)}&background=6366f1&color=fff`
      });

      // Update lead status to Closed
      await db.leads.update(leadId, { status: 'Closed' });

      // Update local state
      setLeads(current => current.map(l =>
        l.id === leadId ? { ...l, status: 'Closed' } : l
      ));

      toast.success(`${lead.name} converted to client!`);
    } catch (error) {
      console.error('Conversion error:', error);
      toast.error('Failed to convert lead to client');
    } finally {
      setLoadingId(null);
    }
  };

  const startCampaign = async () => {
    setIsCampaignStarting(true);
    try {
      const newLeads = leads.filter(l => l.status === 'New');
      if (newLeads.length === 0) {
        toast.error('No new leads to process');
        return;
      }
      const leadIds = newLeads.map(l => l.id);
      await triggerCampaignWebhook(leadIds);
      setLeads(current => current.map(l =>
        leadIds.includes(l.id) ? { ...l, status: 'Contacted' } : l
      ));
      toast.success(`Campaign triggered for ${leadIds.length} leads!`);
    } catch (e) {
      console.error('Campaign error:', e);
      toast.error("Failed to start campaign. Check settings.");
    } finally {
      setIsCampaignStarting(false);
    }
  }

  const columns = [
    { id: 'new', title: 'New Leads', statuses: ['New', 'Enriched'], color: 'bg-slate-500' },
    { id: 'contacted', title: 'Contacted', statuses: ['Contacted'], color: 'bg-blue-500' },
    { id: 'negotiation', title: 'Negotiation', statuses: ['Replied'], color: 'bg-amber-500' },
    { id: 'closed', title: 'Closed', statuses: ['Booked'], color: 'bg-emerald-500' },
  ];

  const getColumnLeads = (statuses: string[]) => {
    return leads.filter(l => statuses.includes(l.status));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 h-[calc(100vh-140px)] flex flex-col">

      {/* Action Bar */}
      <div className={`flex flex-col md:flex-row justify-between items-center p-4 rounded-xl shadow-sm border gap-4 transition-colors flex-shrink-0 ${isDarkMode ? 'bg-slate-800/50 border-slate-700 backdrop-blur-md' : 'bg-white border-slate-100'}`}>
        <div className="flex items-center gap-4 w-full md:w-auto flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search leads..."
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm transition-all ${isDarkMode ? 'bg-slate-900/50 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'}`}
            />
          </div>

          <div className={`flex items-center p-1 rounded-lg border ${isDarkMode ? 'bg-slate-900/50 border-slate-700' : 'bg-slate-100 border-slate-200'}`}>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? (isDarkMode ? 'bg-slate-700 text-white shadow-sm' : 'bg-white text-slate-800 shadow-sm') : 'text-slate-400 hover:text-slate-500'}`}
            >
              <List size={16} />
            </button>
            <button
              onClick={() => setViewMode('board')}
              className={`p-1.5 rounded-md transition-all ${viewMode === 'board' ? (isDarkMode ? 'bg-slate-700 text-white shadow-sm' : 'bg-white text-slate-800 shadow-sm') : 'text-slate-400 hover:text-slate-500'}`}
            >
              <LayoutGrid size={16} />
            </button>
          </div>

          <button onClick={fetchData} className={`p-2 rounded-lg transition-all ${isDarkMode ? 'text-slate-400 hover:text-indigo-400 hover:bg-slate-700' : 'text-slate-400 hover:text-indigo-600 hover:bg-indigo-50'}`} title="Refresh Data">
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-sm font-bold hover:shadow-xl transition-all flex items-center gap-2"
            data-testid="add-lead-btn"
          >
            <Plus size={16} />
            New Lead
          </button>
          <button
            onClick={startCampaign}
            disabled={isCampaignStarting || loading}
            className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 disabled:opacity-70 active:scale-95"
          >
            {isCampaignStarting ? <Loader2 size={16} className="animate-spin" /> : <PlayCircle size={16} />}
            {isCampaignStarting ? 'Syncing...' : 'Launch Campaign'}
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 min-h-0 overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <Skeleton className="w-full h-16 mb-4" isDarkMode={isDarkMode} />
            <Skeleton className="w-full h-16 mb-4" isDarkMode={isDarkMode} />
            <Skeleton className="w-full h-16" isDarkMode={isDarkMode} />
          </div>
        ) : leads.length === 0 ? (
          <LeadsEmptyState onAddLead={() => setIsModalOpen(true)} isDarkMode={isDarkMode} />
        ) : viewMode === 'list' ? (
          <div className={`rounded-xl shadow-sm border overflow-hidden h-full flex flex-col transition-colors ${isDarkMode ? 'bg-slate-800/50 border-slate-700 backdrop-blur-md' : 'bg-white border-slate-100'}`}>
            <div className="overflow-auto flex-1 custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 z-10">
                  <tr className={`border-b text-[11px] uppercase tracking-wider font-bold ${isDarkMode ? 'bg-slate-900/90 border-slate-700 text-slate-400 backdrop-blur-sm' : 'bg-slate-50/90 border-slate-100 text-slate-500 backdrop-blur-sm'}`}>
                    <th className="px-6 py-4">Lead Profile</th>
                    <th className="px-6 py-4">Pipeline Status</th>
                    <th className="px-6 py-4">Fit Score</th>
                    <th className="px-6 py-4">AI Icebreaker</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDarkMode ? 'divide-slate-700/50' : 'divide-slate-100'}`}>
                  {leads.map((lead) => (
                    <tr key={lead.id} className={`transition-colors group ${isDarkMode ? 'hover:bg-slate-700/30' : 'hover:bg-indigo-50/30'}`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border uppercase ${isDarkMode ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                            {lead.name ? lead.name.slice(0, 2) : '??'}
                          </div>
                          <div>
                            <div className={`font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>{lead.name}</div>
                            <div className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{lead.title} @ <span className="text-indigo-500">{lead.company}</span></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${lead.status === 'Booked' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                          lead.status === 'Replied' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                            lead.status === 'New' ? 'bg-slate-500/10 text-slate-400 border-slate-500/20' :
                              'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                          }`}>
                          <span className={`w-1.5 h-1.5 rounded-full mr-2 ${lead.status === 'Booked' ? 'bg-emerald-500' :
                            lead.status === 'Replied' ? 'bg-blue-500' :
                              lead.status === 'New' ? 'bg-slate-400' : 'bg-indigo-500'
                            }`}></span>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-24 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${lead.score > 90 ? 'bg-emerald-500' : lead.score > 70 ? 'bg-indigo-500' : 'bg-amber-500'}`}
                              style={{ width: `${lead.score}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-bold text-slate-400">{lead.score}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 max-w-sm">
                        {lead.personalizationLine ? (
                          <div className={`flex items-start gap-2 p-3 rounded-lg border ${isDarkMode ? 'bg-slate-900/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                            <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-slate-500 italic leading-relaxed">"{lead.personalizationLine}"</p>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleGeneratePersonalization(lead.id)}
                            disabled={loadingId === lead.id}
                            className="flex items-center gap-1.5 text-xs font-bold text-indigo-400 bg-indigo-500/10 px-3 py-2 rounded-lg hover:bg-indigo-500/20 transition-colors disabled:opacity-50 w-full justify-center border border-indigo-500/20"
                          >
                            {loadingId === lead.id ? (
                              <><Loader2 size={12} className="animate-spin" /> Analyzing...</>
                            ) : (
                              <>
                                <Wand2 size={12} />
                                Generate AI Icebreaker
                              </>
                            )}
                          </button>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {lead.status !== 'Closed' && (
                            <button
                              onClick={() => handleConvertToClient(lead.id)}
                              disabled={loadingId === lead.id}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${isDarkMode ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200'} disabled:opacity-50`}
                              title="Move to Fulfillment"
                            >
                              {loadingId === lead.id ? (
                                <>
                                  <Loader2 size={12} className="animate-spin" />
                                  Converting...</>
                              ) : (
                                <>
                                  <CheckCircle2 size={12} />
                                  To Fulfillment
                                </>
                              )}
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(lead.id)}
                            className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'text-slate-400 hover:text-red-400 hover:bg-red-900/20' : 'text-slate-400 hover:text-red-500 hover:bg-red-50'}`}
                            title="Delete lead"
                            data-testid="delete-lead-btn"
                          >
                            <Trash2 size={18} />
                          </button>
                          <button className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-700' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}>
                            <MoreHorizontal size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="h-full overflow-x-auto overflow-y-hidden pb-4">
            <div className="flex gap-6 h-full min-w-max px-2">
              {columns.map(column => (
                <div key={column.id} className="w-80 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4 px-1">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${column.color}`}></div>
                      <h3 className={`font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>{column.title}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-600'}`}>
                        {getColumnLeads(column.statuses).length}
                      </span>
                    </div>
                    <button className="text-slate-500 hover:text-slate-300">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>

                  <div className={`flex-1 rounded-xl p-3 overflow-y-auto custom-scrollbar border ${isDarkMode ? 'bg-slate-900/30 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="space-y-3">
                      {getColumnLeads(column.statuses).map(lead => (
                        <motion.div
                          layoutId={lead.id}
                          key={lead.id}
                          className={`p-4 rounded-lg border shadow-sm cursor-grab active:cursor-grabbing group hover:scale-[1.02] transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700 hover:border-indigo-500/50' : 'bg-white border-slate-200 hover:border-indigo-300'}`}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div className={`text-xs font-bold px-2 py-1 rounded-md ${isDarkMode ? 'bg-slate-900 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>
                              {lead.company}
                            </div>
                            <div className="text-xs font-bold text-emerald-500 flex items-center gap-1">
                              <DollarSign size={12} />
                              2.4k
                            </div>
                          </div>

                          <h4 className={`font-bold mb-1 ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{lead.name}</h4>
                          <p className={`text-xs mb-4 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{lead.title}</p>

                          <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] text-white font-bold">
                                {lead.name.charAt(0)}
                              </div>
                              <span className="text-xs text-slate-500">Owner</span>
                            </div>
                            <div className={`text-xs font-bold ${lead.score > 70 ? 'text-emerald-500' : 'text-amber-500'}`}>
                              {lead.score}% Fit
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <NewLeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLeadAdded={fetchData}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};
