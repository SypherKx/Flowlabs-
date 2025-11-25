import React from 'react';
import { FileText, AlertCircle, CreditCard, RefreshCw, Shield } from 'lucide-react';

export const TermsOfService: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 mb-4">
                        <FileText className="w-12 h-12" />
                        <h1 className="text-4xl md:text-5xl font-bold">Terms of Service</h1>
                    </div>
                    <p className="text-lg text-white/90">
                        Last updated: November 24, 2024
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 space-y-8">

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Agreement to Terms</h2>
                        <p className="text-slate-600 leading-relaxed">
                            By accessing or using FlowLabs ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, you may not access the Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Description of Service</h2>
                        <p className="text-slate-600 leading-relaxed">
                            FlowLabs is a B2B SaaS platform that provides CRM and automation tools for marketing agencies. The Service includes features for lead management, client tracking, automation workflows, and reporting.
                        </p>
                    </section>

                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <CreditCard className="w-6 h-6 text-emerald-500" />
                            <h2 className="text-2xl font-bold text-slate-900">Subscription & Billing</h2>
                        </div>
                        <div className="space-y-4 text-slate-600">
                            <p className="leading-relaxed">
                                <strong>Subscription Plans:</strong> FlowLabs offers multiple subscription tiers (Free, Starter, Pro, Agency). Each tier has different features and limitations as described on our pricing page.
                            </p>
                            <p className="leading-relaxed">
                                <strong>Billing Cycle:</strong> Subscriptions are billed monthly or annually, depending on your chosen plan. Billing occurs at the beginning of each billing cycle.
                            </p>
                            <p className="leading-relaxed">
                                <strong>Payment Processing:</strong> All payments are processed securely through Razorpay. By subscribing, you authorize us to charge your chosen payment method.
                            </p>
                            <p className="leading-relaxed">
                                <strong>Price Changes:</strong> We reserve the right to modify our pricing with 30 days' notice. Existing subscribers will be grandfathered at their current rate for their current billing cycle.
                            </p>
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <RefreshCw className="w-6 h-6 text-blue-500" />
                            <h2 className="text-2xl font-bold text-slate-900">Cancellation & Refunds</h2>
                        </div>
                        <div className="space-y-4 text-slate-600">
                            <p className="leading-relaxed">
                                <strong>Cancel Anytime:</strong> You may cancel your subscription at any time through your account settings. Cancellation takes effect at the end of your current billing period.
                            </p>
                            <p className="leading-relaxed">
                                <strong>Refund Policy:</strong> We offer a 14-day money-back guarantee for new customers. If you're not satisfied within the first 14 days of your initial subscription, contact us for a full refund. Refunds are not available after 14 days or for renewal payments.
                            </p>
                            <p className="leading-relaxed">
                                <strong>Data Upon Cancellation:</strong> After cancellation, you will have 30 days to export your data. After 30 days, your data will be permanently deleted.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">User Account</h2>
                        <div className="space-y-4 text-slate-600">
                            <p className="leading-relaxed">
                                <strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your account credentials. Notify us immediately of any unauthorized access.
                            </p>
                            <p className="leading-relaxed">
                                <strong>Accurate Information:</strong> You agree to provide accurate and complete information during registration and keep it updated.
                            </p>
                            <p className="leading-relaxed">
                                <strong>Prohibited Use:</strong> You may not use the Service for any illegal purposes, to violate any laws, or to harm others. We reserve the right to terminate accounts that violate these terms.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Service Level & Availability</h2>
                        <div className="space-y-4 text-slate-600">
                            <p className="leading-relaxed">
                                <strong>Uptime Target:</strong> We strive for 99.9% uptime but do not guarantee uninterrupted service. Scheduled maintenance will be announced in advance when possible.
                            </p>
                            <p className="leading-relaxed">
                                <strong>"As Is" Service:</strong> The Service is provided "as is" without warranties of any kind, either express or implied, including but not limited to merchantability or fitness for a particular purpose.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Data Ownership & Usage</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            <strong>Your Data:</strong> You retain all ownership rights to the data you input into FlowLabs (leads, clients, etc.). We do not claim ownership of your data.
                        </p>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            <strong>Our Use:</strong> We may use aggregated, anonymized data for analytics and service improvement. We will never sell your personal data to third parties.
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                            <strong>Data Export:</strong> You can export your data at any time in CSV or JSON format.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Intellectual Property</h2>
                        <p className="text-slate-600 leading-relaxed">
                            The Service, including its original content, features, and functionality, is owned by FlowLabs and is protected by international copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, sell, or lease any part of our Service without our express written permission.
                        </p>
                    </section>

                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <AlertCircle className="w-6 h-6 text-amber-500" />
                            <h2 className="text-2xl font-bold text-slate-900">Limitation of Liability</h2>
                        </div>
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-slate-700">
                            <p className="leading-relaxed">
                                In no event shall FlowLabs, its directors, employees, partners, or suppliers be liable for any indirect, incidental, special, consequential, or punitive damages, including lost profits, revenue, or data, arising from your use of the Service, even if we have been advised of the possibility of such damages.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Indemnification</h2>
                        <p className="text-slate-600 leading-relaxed">
                            You agree to indemnify and hold FlowLabs harmless from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from your use of the Service or violation of these Terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Termination</h2>
                        <p className="text-slate-600 leading-relaxed">
                            We reserve the right to terminate or suspend your account and access to the Service immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason at our sole discretion.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Changes to Terms</h2>
                        <p className="text-slate-600 leading-relaxed">
                            We reserve the right to modify these Terms at any time. We will provide notice of material changes via email or through the Service. Your continued use of the Service after such notice constitutes your acceptance of the new Terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Governing Law</h2>
                        <p className="text-slate-600 leading-relaxed">
                            These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising from these Terms or the Service shall be resolved in the courts of [Your Jurisdiction].
                        </p>
                    </section>

                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Shield className="w-6 h-6 text-purple-500" />
                            <h2 className="text-2xl font-bold text-slate-900">Contact Us</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                            If you have any questions about these Terms of Service, please contact us at:
                        </p>
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-slate-700 font-medium">support@flowlabs.app</p>
                        </div>
                    </section>
                </div>

                {/* Back to Home */}
                <div className="mt-8 text-center">
                    <a
                        href="/"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                    >
                        ← Back to Home
                    </a>
                </div>
            </div>
        </div>
    );
};
