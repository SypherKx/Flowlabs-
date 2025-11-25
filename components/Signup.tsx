import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Mail, Lock } from 'lucide-react';
import { auth } from '../services/supabaseService';
import toast from 'react-hot-toast';

interface SignupProps {
    isDarkMode: boolean;
}

export const Signup: React.FC<SignupProps> = ({ isDarkMode }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            await auth.signUp(email, password);
            toast.success('Account created! Please check your email to verify.');
            navigate('/dashboard');
        } catch (error: any) {
            console.error('Signup error:', error);
            toast.error(error.message || 'Failed to create account');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`min-h-screen flex items-center justify-center p-4 ${isDarkMode ? 'bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950' : 'bg-gradient-to-br from-slate-50 via-purple-50 to-slate-100'
            }`}>
            <div className={`w-full max-w-md p-8 rounded-2xl shadow-2xl ${isDarkMode ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-200'
                }`}>
                <div className="text-center mb-8">
                    <h1 className={`text-4xl font-bold mb-2 ${isDarkMode ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400' : 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600'
                        }`}>
                        FlowLabs
                    </h1>
                    <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>
                        Create your account
                    </p>
                </div>

                <form onSubmit={handleSignup} className="space-y-6">
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
                                className={`w-full pl-11 pr-4 py-3 rounded-lg border ${isDarkMode
                                        ? 'bg-slate-800 border-slate-700 text-slate-100 focus:border-purple-500'
                                        : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-purple-500'
                                    } focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all`}
                                placeholder="you@example.com"
                                required
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
                                className={`w-full pl-11 pr-4 py-3 rounded-lg border ${isDarkMode
                                        ? 'bg-slate-800 border-slate-700 text-slate-100 focus:border-purple-500'
                                        : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-purple-500'
                                    } focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all`}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                            Confirm Password
                        </label>
                        <div className="relative">
                            <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={`w-full pl-11 pr-4 py-3 rounded-lg border ${isDarkMode
                                        ? 'bg-slate-800 border-slate-700 text-slate-100 focus:border-purple-500'
                                        : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-purple-500'
                                    } focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all`}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <UserPlus className="w-5 h-5 animate-spin" />
                                Creating account...
                            </>
                        ) : (
                            'Create Account'
                        )}
                    </button>
                </form>

                <div className={`mt-6 pt-6 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-200'} text-center`}>
                    <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className={`font-semibold ${isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'} transition-colors`}
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
