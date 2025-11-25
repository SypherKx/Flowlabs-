import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Mail, Lock } from 'lucide-react';
import { auth } from '../services/supabaseService';
import toast from 'react-hot-toast';

interface LoginProps {
    isDarkMode: boolean;
}

export const Login: React.FC<LoginProps> = ({ isDarkMode }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showResetPassword, setShowResetPassword] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        console.log('Attempting login with:', email);

        try {
            const data = await auth.signIn(email, password);
            console.log('Supabase Response:', data);

            console.log('Redirecting to dashboard now...');
            toast.success('Welcome back!');
            navigate('/dashboard');
        } catch (error: any) {
            console.error('Login error:', error);
            toast.error(error.message || 'Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordReset = async () => {
        if (!email) {
            toast.error('Please enter your email address first');
            return;
        }
        setLoading(true);
        try {
            await auth.resetPassword(email);
            toast.success('Password reset email sent!');
            setShowResetPassword(false);
        } catch (error: any) {
            toast.error(error.message || 'Failed to send reset email');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`min-h-screen flex items-center justify-center p-4 ${isDarkMode ? 'bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950' : 'bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100'}`}>
            <div className={`w-full max-w-md p-8 rounded-2xl shadow-2xl ${isDarkMode ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-200'}`}>
                <div className="text-center mb-8">
                    <h1 className={`text-4xl font-bold mb-2 ${isDarkMode ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400' : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600'}`}>
                        FlowLabs
                    </h1>
                    <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>
                        {showResetPassword ? 'Reset your password' : 'Sign in to your account'}
                    </p>
                </div>

                {!showResetPassword ? (
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`w-full pl-11 pr-4 py-3 rounded-lg border ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-100 focus:border-indigo-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-indigo-500'} focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all`}
                                    placeholder="you@example.com"
                                    required
                                    data-testid="email-input"
                                />
                            </div>
                        </div>

                        <div>
                            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                                Password
                            </label>
                            <div className="relative">
                                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`w-full pl-11 pr-4 py-3 rounded-lg border ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-100 focus:border-indigo-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-indigo-500'} focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all`}
                                    placeholder="••••••••"
                                    required
                                    data-testid="password-input"
                                />
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => setShowResetPassword(true)}
                            className={`text-sm ${isDarkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700'} transition-colors`}
                        >
                            Forgot password?
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            data-testid="login-submit"
                        >
                            {loading ? (
                                <>
                                    <LogIn className="w-5 h-5 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>
                ) : (
                    <div className="space-y-6">
                        <div>
                            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                                Email
                            </label>
                            <div className="relative">
                                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`w-full pl-11 pr-4 py-3 rounded-lg border ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-100 focus:border-indigo-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-indigo-500'} focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all`}
                                    placeholder="you@example.com"
                                    required
                                    data-testid="email-input"
                                />
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={handlePasswordReset}
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Sending...' : 'Send Reset Link'}
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowResetPassword(false)}
                            className={`text-sm ${isDarkMode ? 'text-slate-400 hover:text-slate-300' : 'text-slate-600 hover:text-slate-700'} transition-colors`}
                        >
                            ← Back to login
                        </button>
                    </div>
                )}

                <div className={`mt-6 pt-6 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-200'} text-center`}>
                    <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>
                        Don't have an account?{' '}
                        <Link
                            to="/signup"
                            className={`font-semibold ${isDarkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700'} transition-colors`}
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
