import React, { useState, useEffect } from 'react';
import { Check, Zap, Crown, Rocket, Sparkles } from 'lucide-react';
import { pricingTiers, initializePayment, getCurrentSubscription } from '../services/paymentService';
import { auth } from '../services/supabaseService';
import toast from 'react-hot-toast';

interface PricingProps {
    isDarkMode: boolean;
    currentTier?: string;
}

export const Pricing: React.FC<PricingProps> = ({ isDarkMode, currentTier: propCurrentTier }) => {
    const [billingInterval, setBillingInterval] = useState<'month' | 'year'>('month');
    const [currentTier, setCurrentTier] = useState<string>(propCurrentTier || 'free');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch current subscription tier
        const fetchSubscription = async () => {
            try {
                const user = await auth.getCurrentUser();
                if (user) {
                    const tier = await getCurrentSubscription(user.id);
                    setCurrentTier(tier);
                }
            } catch (error) {
                console.error('Error fetching subscription:', error);
            }
        };

        fetchSubscription();
    }, []);

    const handleSubscribe = async (tierId: string, tierName: string, price: number) => {
        if (tierId === 'free') {
            toast.success('You\'re already on the free plan!');
            return;
        }

        if (loading) return;

        try {
            setLoading(true);

            // Get current user
            const user = await auth.getCurrentUser();
            if (!user) {
                toast.error('Please log in to subscribe');
                return;
            }

            // Calculate amount based on billing interval
            const amount = billingInterval === 'year' ? Math.floor(price * 12 * 0.8) : price;

            // Initialize Razorpay payment
            await initializePayment(tierName, amount, user.email || '', user.id);

        } catch (error: any) {
            console.error('Payment error:', error);
            toast.error(error.message || 'Failed to process payment');
        } finally {
            setLoading(false);
        }
    };

    const getTierIcon = (tierId: string) => {
        switch (tierId) {
            case 'free': return Sparkles;
            case 'starter': return Zap;
            case 'professional': return Rocket;
            case 'enterprise': return Crown;
            default: return Zap;
        }
    };

    return (
        <div className={`min-h-full ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className={`text-5xl font-bold mb-4 ${isDarkMode ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400' : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600'
                        }`}>
                        Simple, Transparent Pricing
                    </h1>
                    <p className={`text-xl ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        Choose the perfect plan for your automation agency
                    </p>

                    {/* Billing Toggle */}
                    <div className={`inline-flex items-center gap-4 mt-8 p-1 rounded-full ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'
                        }`}>
                        <button
                            onClick={() => setBillingInterval('month')}
                            className={`px-6 py-2 rounded-full font-semibold transition-all ${billingInterval === 'month'
                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                                : isDarkMode ? 'text-slate-400' : 'text-slate-600'
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingInterval('year')}
                            className={`px-6 py-2 rounded-full font-semibold transition-all flex items-center gap-2 ${billingInterval === 'year'
                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                                : isDarkMode ? 'text-slate-400' : 'text-slate-600'
                                }`}
                        >
                            Yearly
                            <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">Save 20%</span>
                        </button>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {pricingTiers.map((tier) => {
                        const Icon = getTierIcon(tier.id);
                        const displayPrice = billingInterval === 'year' ? Math.floor(tier.price * 0.8) : tier.price;
                        const isCurrentTier = currentTier === tier.id;

                        return (
                            <div
                                key={tier.id}
                                className={`relative rounded-2xl p-8 transition-all ${tier.recommended
                                    ? `ring-2 ring-indigo-500 shadow-2xl scale-105 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`
                                    : isDarkMode
                                        ? 'bg-slate-800 hover:bg-slate-750'
                                        : 'bg-white hover:shadow-xl'
                                    } border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}
                            >
                                {tier.recommended && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                                            MOST POPULAR
                                        </span>
                                    </div>
                                )}

                                {isCurrentTier && (
                                    <div className="absolute top-4 right-4">
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${isDarkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700'
                                            }`}>
                                            Current Plan
                                        </span>
                                    </div>
                                )}

                                <div className="text-center mb-6">
                                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${tier.recommended
                                        ? 'bg-gradient-to-br from-indigo-500 to-purple-600'
                                        : isDarkMode ? 'bg-slate-700' : 'bg-slate-100'
                                        }`}>
                                        <Icon className={tier.recommended ? 'text-white' : isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} size={32} />
                                    </div>
                                    <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                                        {tier.name}
                                    </h3>
                                    <div className="flex items-baseline justify-center gap-1">
                                        <span className={`text-5xl font-bold ${tier.recommended
                                            ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400'
                                            : isDarkMode ? 'text-slate-100' : 'text-slate-900'
                                            }`}>
                                            ${displayPrice}
                                        </span>
                                        <span className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>
                                            /{billingInterval === 'month' ? 'mo' : 'yr'}
                                        </span>
                                    </div>
                                    {billingInterval === 'year' && tier.price > 0 && (
                                        <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                                            ${tier.price}/mo billed monthly
                                        </p>
                                    )}
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {tier.features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${tier.recommended ? 'text-indigo-400' : 'text-green-500'
                                                }`} />
                                            <span className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => handleSubscribe(tier.id, tier.name, tier.price)}
                                    disabled={isCurrentTier || loading}
                                    className={`w-full py-3 rounded-lg font-semibold transition-all ${tier.recommended
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                                        : isCurrentTier
                                            ? isDarkMode ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                            : isDarkMode
                                                ? 'bg-slate-700 hover:bg-slate-600 text-slate-100'
                                                : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                                        } disabled:opacity-50`}
                                    data-testid={tier.id === 'professional' ? 'upgrade-pro-btn' : `upgrade-btn-${tier.id}`}
                                >
                                    {loading ? 'Processing...' : isCurrentTier ? 'Current Plan' : tier.id === 'free' ? 'Get Started' : 'Upgrade Now'}
                                </button>
                            </div>
                        );
                    })}
                </div>

                {/* FAQ or Additional Info */}
                <div className={`text-center p-8 rounded-2xl ${isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-200'}`}>
                    <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                        All plans include
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                        <div>
                            <p className={`font-semibold mb-1 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                                🔒 Secure & Private
                            </p>
                            <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                Your data is encrypted and never shared
                            </p>
                        </div>
                        <div>
                            <p className={`font-semibold mb-1 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                                📱 Mobile Ready
                            </p>
                            <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                Access from any device, anywhere
                            </p>
                        </div>
                        <div>
                            <p className={`font-semibold mb-1 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                                🚀 Regular Updates
                            </p>
                            <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                New features added every month
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
