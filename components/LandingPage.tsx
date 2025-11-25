import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Inbox, Kanban, Zap, CreditCard, MessageSquare, Target, TrendingUp, Shield, Star } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { Logo } from './Logo';

interface PremiumLandingPageProps {
    isDarkMode?: boolean;
}

// Animation variants for Framer Motion
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

// Animated section component
const AnimatedSection: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeInUp}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export const LandingPage: React.FC<PremiumLandingPageProps> = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const companies = [
        { name: 'Apex', opacity: 0.6 },
        { name: 'Bolt', opacity: 0.7 },
        { name: 'Sphere', opacity: 0.6 },
        { name: 'Quantum', opacity: 0.7 },
        { name: 'Nexus', opacity: 0.6 },
    ];

    return (
        <div className="min-h-screen bg-slate-100">
            {/* Sticky Glassmorphism Navbar */}
            <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Logo size="md" />

                    <div className="flex items-center gap-6">
                        <a href="#features" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
                            Features
                        </a>
                        <a href="#pricing" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
                            Pricing
                        </a>
                        <Link to="/login" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105"
                        >
                            Start Free Trial
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-20 pb-32 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left: Text Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                        >
                            <h1 className="text-6xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
                                Supercharge Your Agency's{' '}
                                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                                    Lead Flow
                                </span>
                            </h1>
                            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                                The all-in-one CRM and automation platform built for modern marketing agencies.
                            </p>
                            <div className="flex items-center gap-4">
                                <Link
                                    to="/signup"
                                    className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2"
                                >
                                    Start Free Trial
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <a
                                    href="#features"
                                    className="px-8 py-4 bg-white text-slate-700 border-2 border-slate-200 rounded-xl font-semibold hover:border-slate-300 transition-all"
                                >
                                    Learn More
                                </a>
                            </div>
                            <div className="mt-8 flex items-center gap-6 text-sm text-slate-500">
                                <div className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-green-500" />
                                    <span>14-day free trial</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-green-500" />
                                    <span>No credit card required</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right: 3D Tilted Dashboard Mockup */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                            className="relative"
                        >
                            <div
                                className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
                                style={{
                                    transform: 'perspective(1000px) rotateY(-8deg) rotateX(4deg)',
                                    transformStyle: 'preserve-3d'
                                }}
                            >
                                {/* Mockup Header */}
                                <div className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-4 flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-white/30"></div>
                                    <div className="w-3 h-3 rounded-full bg-white/30"></div>
                                    <div className="w-3 h-3 rounded-full bg-white/30"></div>
                                </div>
                                {/* Mockup Body */}
                                <div className="p-6 bg-slate-50">
                                    <div className="grid grid-cols-3 gap-4 mb-4">
                                        <div className="bg-white rounded-lg p-4 border border-slate-200">
                                            <div className="w-8 h-8 bg-blue-100 rounded-lg mb-3"></div>
                                            <div className="h-3 bg-slate-200 rounded w-full mb-2"></div>
                                            <div className="h-6 bg-gradient-to-r from-slate-300 to-slate-200 rounded w-3/4"></div>
                                        </div>
                                        <div className="bg-white rounded-lg p-4 border border-slate-200">
                                            <div className="w-8 h-8 bg-purple-100 rounded-lg mb-3"></div>
                                            <div className="h-3 bg-slate-200 rounded w-full mb-2"></div>
                                            <div className="h-6 bg-gradient-to-r from-slate-300 to-slate-200 rounded w-2/3"></div>
                                        </div>
                                        <div className="bg-white rounded-lg p-4 border border-slate-200">
                                            <div className="w-8 h-8 bg-green-100 rounded-lg mb-3"></div>
                                            <div className="h-3 bg-slate-200 rounded w-full mb-2"></div>
                                            <div className="h-6 bg-gradient-to-r from-slate-300 to-slate-200 rounded w-4/5"></div>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                                        <div className="h-4 bg-slate-200 rounded w-1/3 mb-3"></div>
                                        <div className="space-y-2">
                                            <div className="h-3 bg-slate-100 rounded"></div>
                                            <div className="h-3 bg-slate-100 rounded w-5/6"></div>
                                            <div className="h-3 bg-slate-100 rounded w-4/6"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Floating Elements */}
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-2xl opacity-40 animate-pulse"></div>
                            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-tr from-purple-400 to-pink-400 rounded-full blur-2xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Social Proof Section */}
            <section className="py-16 px-6 border-y border-slate-200 bg-white">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-sm text-slate-500 mb-8 uppercase tracking-wide font-semibold">
                        Trusted by 500+ innovative agencies
                    </p>
                    <div className="flex items-center justify-center gap-12 flex-wrap">
                        {companies.map((company, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className="text-2xl font-bold grayscale hover:grayscale-0 transition-all cursor-pointer"
                                style={{ opacity: company.opacity }}
                            >
                                <span className="bg-gradient-to-r from-slate-400 to-slate-600 hover:from-blue-500 hover:to-purple-500 bg-clip-text text-transparent transition-all">
                                    {company.name}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Value Props - 3 Columns */}
            <section className="py-24 px-6" id="features">
                <div className="max-w-7xl mx-auto">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                            Everything you need to grow
                        </h2>
                        <p className="text-xl text-slate-600">
                            Built for agencies who want to move fast and close more deals
                        </p>
                    </AnimatedSection>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {[
                            {
                                icon: Inbox,
                                title: 'Centralize Leads',
                                description: 'Capture every lead from every channel in one unified inbox. Never miss an opportunity.',
                                color: 'blue'
                            },
                            {
                                icon: Kanban,
                                title: 'Visual Pipelines',
                                description: 'Drag-and-drop Kanban boards to move deals through your sales process effortlessly.',
                                color: 'purple'
                            },
                            {
                                icon: Zap,
                                title: 'Automated Reports',
                                description: 'Get real-time insights and beautiful reports delivered to your inbox automatically.',
                                color: 'green'
                            }
                        ].map((prop, idx) => (
                            <motion.div
                                key={idx}
                                variants={fadeInUp}
                                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                                className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all"
                            >
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-${prop.color}-100 to-${prop.color}-200 flex items-center justify-center mb-6`}>
                                    <prop.icon className={`w-8 h-8 text-${prop.color}-600`} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-3">{prop.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{prop.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Bento Grid Features */}
            <section className="py-24 px-6 bg-slate-100">
                <div className="max-w-7xl mx-auto">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                            Features that scale with you
                        </h2>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Target,
                                title: 'AI Scoring',
                                description: 'Automatically prioritize your best leads with machine learning.',
                                span: 'md:col-span-1'
                            },
                            {
                                icon: MessageSquare,
                                title: 'Team Chat',
                                description: 'Built-in messaging to collaborate on deals in real-time.',
                                span: 'md:col-span-1'
                            },
                            {
                                icon: CreditCard,
                                title: 'Payments',
                                description: 'Accept deposits and close deals faster with integrated billing.',
                                span: 'md:col-span-1'
                            },
                            {
                                icon: TrendingUp,
                                title: 'Advanced Analytics',
                                description: 'Track conversion rates, revenue, and team performance with detailed dashboards.',
                                span: 'md:col-span-2'
                            },
                            {
                                icon: Shield,
                                title: 'Enterprise Security',
                                description: 'Bank-level encryption and SOC 2 compliance.',
                                span: 'md:col-span-1'
                            }
                        ].map((feature, idx) => (
                            <AnimatedSection
                                key={idx}
                                className={`bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-all ${feature.span} hover:-translate-y-1 duration-300`}
                            >
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-4">
                                    <feature.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                                <p className="text-slate-600">{feature.description}</p>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-24 px-6" id="pricing">
                <div className="max-w-7xl mx-auto">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                            Simple, transparent pricing
                        </h2>
                        <p className="text-xl text-slate-600">
                            No hidden fees. Cancel anytime.
                        </p>
                    </AnimatedSection>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
                    >
                        {[
                            {
                                name: 'Starter',
                                price: '$49',
                                description: 'Perfect for small agencies',
                                features: ['Up to 500 leads', 'Basic CRM', 'Email support', '1 team member'],
                                highlight: false
                            },
                            {
                                name: 'Pro',
                                badge: 'Most Popular',
                                price: '$149',
                                description: 'For growing teams',
                                features: ['Unlimited leads', 'Advanced CRM', 'Priority support', 'Up to 10 team members', 'AI Scoring', 'Custom integrations'],
                                highlight: true
                            },
                            {
                                name: 'Agency',
                                price: '$399',
                                description: 'For established agencies',
                                features: ['Everything in Pro', 'Unlimited team members', 'White-label options', 'Dedicated account manager', 'SLA guarantee'],
                                highlight: false
                            }
                        ].map((plan, idx) => (
                            <motion.div
                                key={idx}
                                variants={fadeInUp}
                                className={`bg-white rounded-2xl p-8 border-2 ${plan.highlight
                                    ? 'border-transparent bg-gradient-to-b from-white to-blue-50 shadow-2xl scale-105 relative'
                                    : 'border-slate-200'
                                    } hover:shadow-xl transition-all`}
                                style={plan.highlight ? {
                                    background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #60A5FA, #A78BFA) border-box'
                                } : {}}
                            >
                                {plan.badge && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                                        <Star className="w-4 h-4" />
                                        {plan.badge}
                                    </div>
                                )}
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                                <div className="mb-4">
                                    <span className="text-5xl font-bold text-slate-900">{plan.price}</span>
                                    <span className="text-slate-600">/month</span>
                                </div>
                                <p className="text-slate-600 mb-6">{plan.description}</p>
                                <Link
                                    to="/signup"
                                    className={`block w-full py-3 rounded-xl font-semibold text-center transition-all ${plan.highlight
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl hover:scale-105'
                                        : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                                        }`}
                                >
                                    Get Started
                                </Link>
                                <ul className="mt-6 space-y-3">
                                    {plan.features.map((feature, fidx) => (
                                        <li key={fidx} className="flex items-start gap-2 text-slate-700">
                                            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-16 px-6 bg-slate-900 text-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
                        <div>
                            <h4 className="font-semibold mb-4 text-slate-300">Product</h4>
                            <ul className="space-y-2 text-slate-400">
                                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                                <li><Link to="/signup" className="hover:text-white transition-colors">Sign Up</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4 text-slate-300">Company</h4>
                            <ul className="space-y-2 text-slate-400">
                                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4 text-slate-300">Resources</h4>
                            <ul className="space-y-2 text-slate-400">
                                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4 text-slate-300">Legal</h4>
                            <ul className="space-y-2 text-slate-400">
                                <Link to="/privacy" className="hover:text-white transition-colors block">Privacy</Link>
                                <Link to="/terms" className="hover:text-white transition-colors block">Terms</Link>
                                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between">
                        <div className="mb-4 md:mb-0">
                            <Logo size="sm" />
                        </div>
                        <p className="text-slate-400 text-sm">
                            © 2024 FlowLabs. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};
