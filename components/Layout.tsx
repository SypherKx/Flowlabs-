import React, { useState, useEffect, useRef } from 'react';
import { LayoutDashboard, Users, Workflow, BarChart3, Settings, Zap, Bell, Search, Command, Moon, Sun, LogOut, User as UserIcon, CreditCard, Menu } from 'lucide-react';
import { View } from '../types';
import { auth } from '../services/supabaseService';
import toast from 'react-hot-toast';

interface LayoutProps {
  children: React.ReactNode;
  currentView: View;
  onViewChange: (view: View) => void;
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, onViewChange, isDarkMode, setIsDarkMode }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Mission Control', icon: LayoutDashboard },
    { id: 'prospecting', label: 'Lead Engine', icon: Users },
    { id: 'fulfillment', label: 'Fulfillment', icon: Workflow },
    { id: 'reporting', label: 'Analytics', icon: BarChart3 },
    { id: 'pricing', label: 'Pricing & Billing', icon: Zap },
  ];

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`flex w-full h-full transition-colors ${isDarkMode ? 'bg-slate-900' : 'bg-[#f8fafc]'}`}>
      {/* Sidebar */}
      <aside className={`w-72 flex flex-col h-full border-r shadow-2xl z-20 transition-colors ${isDarkMode ? 'bg-slate-950 text-slate-300 border-slate-800' : 'bg-white text-slate-700 border-slate-200'
        }`}>
        <div className="p-6 pb-8">
          <div className={`flex items-center gap-3 mb-8 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Zap size={22} className="text-white" fill="currentColor" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight block leading-tight">FlowLabs</span>
              <span className={`text-[10px] font-medium uppercase tracking-widest ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Agency OS</span>
            </div>
          </div>

          <div className="relative mb-6">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} size={14} />
            <input
              type="text"
              placeholder="Jump to..."
              className={`w-full rounded-lg py-2 pl-9 pr-3 text-xs focus:outline-none focus:border-indigo-500 transition-colors ${isDarkMode
                ? 'bg-slate-800/50 border border-slate-700 text-slate-300 placeholder:text-slate-600'
                : 'bg-white border border-slate-300 text-slate-700 placeholder:text-slate-400'
                }`}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${isDarkMode ? 'bg-slate-700 text-slate-400' : 'bg-slate-200 text-slate-600'}`}><Command size={10} className="inline" /> K</span>
            </div>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id as View)}
                  data-testid={`nav-${item.id}`}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative ${isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-900/20'
                    : isDarkMode
                      ? 'hover:bg-slate-800/50 text-slate-400 hover:text-slate-100'
                      : 'hover:bg-slate-200/50 text-slate-600 hover:text-slate-900'
                    }`}
                >
                  <Icon size={18} className={isActive ? 'text-indigo-100' : isDarkMode ? 'text-slate-500 group-hover:text-slate-300' : 'text-slate-400 group-hover:text-slate-700'} />
                  <span className="font-medium text-sm">{item.label}</span>
                  {isActive && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white/20 rounded-l-full" />}
                </button>
              );
            })}
          </nav>
        </div>

        <div className={`mt-auto p-4 border-t transition-colors ${isDarkMode ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-slate-50'}`}>
          <div className={`rounded-xl p-4 border mb-4 backdrop-blur-sm transition-colors ${isDarkMode ? 'bg-slate-800/40 border-slate-700/50' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <div className="absolute top-0 left-0 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>System Operational</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className={`flex justify-between text-[11px] ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>
                <span>Make.com Webhooks</span>
                <span className="text-emerald-400 font-medium">Active</span>
              </div>
              <div className={`flex justify-between text-[11px] ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>
                <span>Airtable Sync</span>
                <span className="text-emerald-400 font-medium">Live</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => onViewChange('settings')}
              className={`flex items-center gap-3 px-4 py-3 w-full rounded-lg transition-colors text-sm ${currentView === 'settings'
                ? 'bg-slate-800 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
            >
              <Settings size={18} />
              <span>Settings & API</span>
            </button>
            <button
              onClick={async () => {
                try {
                  await auth.signOut();
                  toast.success('Signed out successfully');
                } catch (error: any) {
                  toast.error('Failed to sign out');
                }
              }}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-lg transition-colors text-sm text-rose-400 hover:text-rose-300 hover:bg-rose-950/30"
            >
              <LogOut size={18} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto relative flex flex-col">
        <header className={`sticky top-0 z-20 backdrop-blur-xl border-b px-8 py-4 flex justify-between items-center shadow-sm transition-colors ${isDarkMode
          ? 'bg-slate-900/80 border-slate-800/60'
          : 'bg-white/80 border-slate-200/60'
          }`}>
          <div>
            <div className="flex items-center gap-3">
              <button
                className="md:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg dark:text-slate-400 dark:hover:bg-slate-800"
                data-testid="sidebar-toggle"
              >
                <Menu size={20} />
              </button>
              <div>
                <h1 className={`text-xl font-bold capitalize tracking-tight flex items-center gap-2 ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                  {currentView.replace('-', ' ')}
                  {currentView === 'prospecting' && <span className="bg-indigo-50 text-indigo-600 text-[10px] px-2 py-0.5 rounded-full border border-indigo-100 uppercase tracking-wide">Live</span>}
                </h1>
                <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Welcome back, Administrator</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className={`text-xs font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Auto-Pilot Active</span>
            </div>

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full transition-colors ${isDarkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'}`}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative p-2 rounded-full transition-colors ${isDarkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <Bell size={20} />
                <span className={`absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 ${isDarkMode ? 'border-slate-900' : 'border-white'}`}></span>
              </button>

              {showNotifications && (
                <div className={`absolute right-0 mt-2 w-80 rounded-xl shadow-2xl border overflow-hidden z-50 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                  <div className={`p-4 border-b ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
                    <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Notifications</h3>
                  </div>
                  <div className="p-4 max-h-96 overflow-y-auto">
                    <p className={`text-sm text-center py-8 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>No new notifications</p>
                  </div>
                </div>
              )}
            </div>

            <div className="relative" ref={profileRef}>
              <div className={`flex items-center gap-3 pl-6 border-l cursor-pointer ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <div className="text-right hidden sm:block">
                  <p className={`text-sm font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>You</p>
                  <p className={`text-[10px] uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Agency Owner</p>
                </div>
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" className={`w-10 h-10 rounded-full border-2 shadow-md hover:scale-105 transition-transform ${isDarkMode ? 'border-slate-800' : 'border-slate-300'}`} />
              </div>

              {showProfileMenu && (
                <div className={`absolute right-0 mt-2 w-56 rounded-xl shadow-2xl border overflow-hidden z-50 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                  <div className={`p-3 border-b ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
                    <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Account</p>
                    <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Manage your profile</p>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={() => {
                        onViewChange('settings');
                        setShowProfileMenu(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${isDarkMode ? 'hover:bg-slate-700 text-slate-300' : 'hover:bg-slate-100 text-slate-700'}`}
                    >
                      <UserIcon size={16} />
                      Profile & Settings
                    </button>
                    <button
                      onClick={() => {
                        onViewChange('pricing');
                        setShowProfileMenu(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${isDarkMode ? 'hover:bg-slate-700 text-slate-300' : 'hover:bg-slate-100 text-slate-700'}`}
                    >
                      <CreditCard size={16} />
                      Billing
                    </button>
                    <div className={`my-2 border-t ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}></div>
                    <button
                      onClick={async () => {
                        try {
                          await auth.signOut();
                          toast.success('Signed out successfully');
                          setShowProfileMenu(false);
                        } catch (error: any) {
                          toast.error('Failed to sign out');
                        }
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="p-8 pb-32 max-w-[1600px] w-full mx-auto flex-1">
          {children}
        </div>
      </main>
    </div>
  );
};