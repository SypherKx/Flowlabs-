import React, { useEffect, useState } from 'react';
import { Activity, Users, DollarSign, BarChart3, PieChart } from 'lucide-react';
import { db } from '../services/supabaseService';

import toast from 'react-hot-toast';
import { MetricCard } from './MetricCard';
import { ActivityFeed } from './ActivityFeed';
import { OnboardingWidget } from './OnboardingWidget';



interface DashboardProps {
  isDarkMode: boolean;
  onNavigate?: (view: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ isDarkMode, onNavigate }) => {
  const [stats, setStats] = useState({
    leads: 0,
    clients: 0,
    automations: 0,
    successRate: 0,
    revenue: 0  // Will be calculated from database
  });
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('Last 7 Days');

  useEffect(() => {
    const fetchData = async () => {


      try {
        // Fetch each table separately to handle missing tables gracefully
        let leads: any[] = [];
        let clients: any[] = [];
        let logs: any[] = [];

        // Fetch leads (critical)
        try {
          leads = await db.leads.getAll() || [];

        } catch (error) {

          toast.error('Failed to load leads. Check console for details.');
        }

        // Fetch clients (optional)
        try {
          clients = await db.clients.getAll() || [];

        } catch (error) {

        }

        // Fetch logs (optional)
        try {
          logs = await db.logs.getAll() || [];

        } catch (error) {

        }



        // Calculate Total Pipeline Value (sum of ALL leads' value)
        const totalPipelineValue = leads
          .reduce((sum: number, l: any) => sum + (parseFloat(l.value) || 0), 0) || 0;

        // Calculate Active Leads (total count)
        const totalLeads = leads.length;

        const totalClients = clients.length;
        const totalLogs = logs.length;
        const successLogs = logs.filter((log: any) => log.status === 'Success').length || 0;
        const successRate = totalLogs > 0 ? Math.round((successLogs / totalLogs) * 100) : 0;



        setStats({
          leads: totalLeads,
          clients: totalClients,
          automations: totalLogs,
          successRate,
          revenue: totalPipelineValue
        });



      } catch (error) {

        toast.error('Unexpected error loading dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTimeRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeRange(e.target.value);
    toast.success(`Updated view to ${e.target.value}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Onboarding Widget */}
      <OnboardingWidget />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          label="Pipeline Value"
          value={`$${stats.revenue.toLocaleString()}`}
          trend="vs last month"
          trendValue="12%"
          trendDirection="up"
          icon={DollarSign}
          color="emerald"
          data-testid="kpi-card"
        />
        <MetricCard
          label="Active Leads"
          value={stats.leads.toLocaleString()}
          trend="total in pipeline"
          trendValue=""
          trendDirection="up"
          icon={Users}
          color="blue"
          data-testid="kpi-card"
        />
        <MetricCard
          label="Total Clients"
          value={stats.clients.toLocaleString()}
          trend="active clients"
          trendValue=""
          trendDirection="up"
          icon={PieChart}
          color="purple"
          data-testid="kpi-card"
        />
        <MetricCard
          label="Automation Success"
          value={`${stats.successRate}%`}
          trend="success rate"
          trendValue=""
          trendDirection="up"
          icon={Activity}
          color="amber"
          data-testid="kpi-card"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className={`lg:col-span-2 p-6 rounded-xl border shadow-sm backdrop-blur-md transition-colors ${isDarkMode
          ? 'bg-white/5 border-white/10'
          : 'bg-white border-slate-200 shadow-slate-200/50'
          }`}>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Revenue & Growth</h3>
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Financial performance over time</p>
            </div>
            <select
              value={timeRange}
              onChange={handleTimeRangeChange}
              className={`border rounded-lg text-sm px-3 py-2 outline-none focus:border-indigo-500 transition-colors ${isDarkMode
                ? 'bg-slate-800 border-slate-700 text-slate-200'
                : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
            >
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Quarter</option>
            </select>
          </div>

          <div className="h-[350px] w-full flex items-center justify-center">
            <div className="text-center">
              <BarChart3 size={48} className={`mx-auto mb-4 ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`} />
              <p className={`font-medium mb-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>No Historical Data Yet</p>
              <p className={`text-sm ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Charts will appear as you add more leads over time</p>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="lg:col-span-1 h-full min-h-[400px]">
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
};
