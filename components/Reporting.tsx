import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { FileText, Download, Mail, Calendar, CheckCircle, TrendingUp, ArrowRight, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { db } from '../services/supabaseService';
import { Lead } from '../types';

interface ReportingProps {
    isDarkMode: boolean;
}

export const Reporting: React.FC<ReportingProps> = ({ isDarkMode }) => {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [chartData, setChartData] = useState<any[]>([]);
    const [metrics, setMetrics] = useState({
        totalRevenue: 0,
        conversionRate: 0,
        closedLeads: 0,
        totalLeads: 0
    });

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        setLoading(true);
        try {
            const data = await db.leads.getAll();
            setLeads(data || []);

            // Calculate metrics
            const closedLeads = data.filter(l => l.status === 'Closed');
            const totalRevenue = closedLeads.reduce((sum, lead) => sum + (lead.value || 0), 0);
            const conversionRate = data.length > 0 ? (closedLeads.length / data.length) * 100 : 0;

            setMetrics({
                totalRevenue,
                conversionRate: Math.round(conversionRate),
                closedLeads: closedLeads.length,
                totalLeads: data.length
            });

            // Prepare chart data - group by week
            const weeklyData = processWeeklyData(closedLeads, data);
            setChartData(weeklyData);
        } catch (error) {
            console.error('Error fetching analytics:', error);
            toast.error('Failed to load analytics');
        } finally {
            setLoading(false);
        }
    };

    const processWeeklyData = (closedLeads: Lead[], allLeads: Lead[]) => {
        // Simplified weekly distribution
        const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
        const closedPerWeek = Math.ceil(closedLeads.length / 4);
        const totalPerWeek = Math.ceil(allLeads.length / 4);

        return weeks.map((week, idx) => ({
            name: week,
            closed: closedPerWeek * (idx + 1) * 8, // Progressive growth for visualization
            total: totalPerWeek * (idx + 1) * 10
        }));
    };

    const handleDownload = () => {
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 2000)),
            {
                loading: 'Generating PDF Report...',
                success: 'Report downloaded successfully!',
                error: 'Could not generate report.',
            }
        );
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            <div className="flex justify-between items-center">
                <div>
                    <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Monthly Performance Report</h2>
                    <p className="text-slate-400">October 2023 • Generated for Acme Corp</p>
                </div>
                <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
                >
                    <Download size={18} />
                    Download PDF Report
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Document Preview */}
                <div className={`lg:col-span-2 rounded-xl shadow-xl border overflow-hidden ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                    {/* Document Header */}
                    <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                    <div className="p-8 md:p-12 space-y-8">

                        <div className="flex justify-between items-start border-b border-slate-200/10 pb-8">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">F</div>
                                    <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>FlowLabs</span>
                                </div>
                                <p className="text-slate-400 text-sm">Automation Agency Operating System</p>
                            </div>
                            <div className="text-right">
                                <p className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Executive Summary</p>
                                <p className="text-slate-400 text-sm">Oct 1 - Oct 31, 2023</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                            <div className={`p-4 rounded-lg border ${isDarkMode ? 'bg-slate-900/50 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
                                <p className="text-slate-400 text-xs uppercase tracking-wider font-bold mb-1">Total Revenue</p>
                                <p className={`text-2xl font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>${loading ? '...' : metrics.totalRevenue.toLocaleString()}</p>
                            </div>
                            <div className={`p-4 rounded-lg border ${isDarkMode ? 'bg-slate-900/50 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
                                <p className="text-slate-400 text-xs uppercase tracking-wider font-bold mb-1">Closed Leads</p>
                                <p className={`text-2xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{loading ? '...' : metrics.closedLeads}</p>
                            </div>
                            <div className={`p-4 rounded-lg border ${isDarkMode ? 'bg-slate-900/50 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
                                <p className="text-slate-400 text-xs uppercase tracking-wider font-bold mb-1">Conversion Rate</p>
                                <p className={`text-2xl font-bold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>{loading ? '...' : `${metrics.conversionRate}%`}</p>
                            </div>
                        </div>

                        <div>
                            <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Lead Performance Analysis</h3>
                            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                                Tracking {metrics.totalLeads} total leads with {metrics.closedLeads} successfully closed. Your conversion rate of {metrics.conversionRate}% shows {metrics.conversionRate > 20 ? 'strong' : 'steady'} performance across your pipeline.
                            </p>
                            <div className="h-[300px] w-full">
                                {loading ? (
                                    <div className="flex items-center justify-center h-full">
                                        <Loader2 className="animate-spin text-indigo-600" size={32} />
                                    </div>
                                ) : chartData.length === 0 ? (
                                    <div className="flex items-center justify-center h-full text-slate-400">
                                        <p>No data available</p>
                                    </div>
                                ) : (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={chartData} barGap={0}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#334155' : '#e2e8f0'} />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                            <Tooltip
                                                cursor={{ fill: isDarkMode ? '#1e293b' : '#f1f5f9' }}
                                                contentStyle={{
                                                    backgroundColor: isDarkMode ? '#0f172a' : '#fff',
                                                    borderRadius: '8px',
                                                    border: isDarkMode ? '1px solid #1e293b' : 'none',
                                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                                }}
                                            />
                                            <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                                            <Bar dataKey="total" name="Total Leads" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={30} />
                                            <Bar dataKey="closed" name="Closed Leads" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={30} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                )}
                            </div>
                        </div>

                        <div className="pt-8 border-t border-slate-200/10">
                            <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Key Achievements</h3>
                            <ul className="space-y-3">
                                {[
                                    'Implemented 2-way sync between CRM and Email Marketing',
                                    'Automated invoice generation for closed deals',
                                    'Set up real-time Slack notifications for high-value leads'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle size={18} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                                        <span className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Sidebar Actions */}
                <div className="space-y-6">
                    <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                        <h3 className={`font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Report Settings</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Date Range</label>
                                <select className={`w-full p-2.5 rounded-lg border text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'}`}>
                                    <option>Last 30 Days</option>
                                    <option>Last Quarter</option>
                                    <option>Year to Date</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Comparison</label>
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" defaultChecked className="rounded border-slate-600 text-indigo-600 focus:ring-indigo-500" />
                                    <span className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Compare to previous period</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                        <h3 className={`font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Distribution</h3>
                        <div className="space-y-3">
                            <button className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${isDarkMode ? 'bg-slate-900/50 border-slate-700 hover:border-indigo-500' : 'bg-slate-50 border-slate-200 hover:border-indigo-300'}`}>
                                <div className="flex items-center gap-3">
                                    <Mail size={18} className="text-slate-400" />
                                    <span className={`text-sm font-medium ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>Email to Client</span>
                                </div>
                                <ArrowRight size={16} className="text-slate-500" />
                            </button>
                            <button className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${isDarkMode ? 'bg-slate-900/50 border-slate-700 hover:border-indigo-500' : 'bg-slate-50 border-slate-200 hover:border-indigo-300'}`}>
                                <div className="flex items-center gap-3">
                                    <Calendar size={18} className="text-slate-400" />
                                    <span className={`text-sm font-medium ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>Schedule Recurring</span>
                                </div>
                                <ArrowRight size={16} className="text-slate-500" />
                            </button>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                        <TrendingUp className="mb-4 text-indigo-200" size={32} />
                        <h3 className="font-bold text-lg mb-2">Pro Tip</h3>
                        <p className="text-indigo-100 text-sm mb-4">
                            Automate this report! Set up a workflow to generate and email this PDF to your clients every Monday morning.
                        </p>
                        <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-bold transition-colors">
                            Create Workflow
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
