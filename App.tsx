import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Prospecting } from './components/Prospecting';
import { Fulfillment } from './components/Fulfillment';
import { Reporting } from './components/Reporting';
import { Settings } from './components/Settings';
import { AIAssistant } from './components/AIAssistant';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Pricing } from './components/Pricing';
import { LandingPage } from './components/LandingPage';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfService } from './components/TermsOfService';
import { auth } from './services/supabaseService';
import { View } from './types';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode; user: any }> = ({ children, user }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

// Public Route Component (redirect to dashboard if already logged in)
const PublicRoute: React.FC<{ children: React.ReactNode; user: any }> = ({ children, user }) => {
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
};

// Dashboard Layout Wrapper
const DashboardLayout: React.FC<{ user: any }> = ({ user }) => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard isDarkMode={isDarkMode} onNavigate={(view) => setCurrentView(view as View)} />;
      case 'prospecting': return <Prospecting isDarkMode={isDarkMode} />;
      case 'fulfillment': return <Fulfillment isDarkMode={isDarkMode} />;
      case 'reporting': return <Reporting isDarkMode={isDarkMode} />;
      case 'settings': return <Settings isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />;
      case 'pricing': return <Pricing isDarkMode={isDarkMode} />;
      default: return <Dashboard isDarkMode={isDarkMode} />;
    }
  };

  return (
    <>
      <Layout
        currentView={currentView}
        onViewChange={(view) => setCurrentView(view as View)}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      >
        {renderView()}
      </Layout>
      <AIAssistant isDarkMode={isDarkMode} />
    </>
  );
};

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : true;
  });

  // Check for existing session and listen for auth changes
  useEffect(() => {
    const checkSession = async () => {
      try {
        const currentUser = await auth.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Session check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen for auth state changes
    const { data: { subscription } } = auth.onAuthStateChange((newUser) => {
      setUser(newUser);
      setLoading(false);
    });

    // Cleanup subscription
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${isDarkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>Loading FlowLabs...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: isDarkMode ? '#1e293b' : '#ffffff',
            color: isDarkMode ? '#f1f5f9' : '#0f172a',
            border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
          },
        }}
      />

      <Routes>
        {/* Landing Page - Public */}
        <Route
          path="/"
          element={
            <PublicRoute user={user}>
              <LandingPage />
            </PublicRoute>
          }
        />

        {/* Auth Routes - Public */}
        <Route
          path="/login"
          element={
            <PublicRoute user={user}>
              <Login isDarkMode={isDarkMode} />
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute user={user}>
              <Signup isDarkMode={isDarkMode} />
            </PublicRoute>
          }
        />

        {/* Dashboard Routes - Protected */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute user={user}>
              <DashboardLayout user={user} />
            </ProtectedRoute>
          }
        />

        {/* Legal Pages - Public */}
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />

        {/* Fallback - redirect to landing or dashboard based on auth */}
        <Route
          path="*"
          element={<Navigate to={user ? "/dashboard" : "/"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;