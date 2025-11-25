import React from 'react';
import { Shield, Lock, Database, CreditCard, Mail } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 mb-4">
                        <Shield className="w-12 h-12" />
                        <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
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
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Introduction</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Welcome to FlowLabs. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you use our platform and tell you about your privacy rights.
                        </p>
                    </section>

                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Database className="w-6 h-6 text-blue-500" />
                            <h2 className="text-2xl font-bold text-slate-900">Data We Collect</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            We collect and process the following types of data:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-slate-600">
                            <li><strong>Account Information:</strong> Email address, name, and password (encrypted)</li>
                            <li><strong>Business Data:</strong> Leads, clients, and automation logs you create</li>
                            <li><strong>Usage Data:</strong> How you interact with our platform, feature usage statistics</li>
                            <li><strong>Payment Information:</strong> Processed securely through Razorpay (we do not store credit card details)</li>
                        </ul>
                    </section>

                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Lock className="w-6 h-6 text-purple-500" />
                            <h2 className="text-2xl font-bold text-slate-900">How We Use Your Data</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            We use your personal data for the following purposes:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-slate-600">
                            <li>To provide and maintain our service</li>
                            <li>To process your payments and manage subscriptions</li>
                            <li>To send you important updates about your account</li>
                            <li>To improve our platform based on usage analytics</li>
                            <li>To comply with legal obligations</li>
                        </ul>
                    </section>

                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <CreditCard className="w-6 h-6 text-emerald-500" />
                            <h2 className="text-2xl font-bold text-slate-900">Payment Processing</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                            All payment transactions are processed through Razorpay, a PCI-DSS compliant payment gateway. We do not store or have access to your complete credit card information. Razorpay handles all payment data securely according to industry standards.
                        </p>
                    </section>

                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Shield className="w-6 h-6 text-blue-500" />
                            <h2 className="text-2xl font-bold text-slate-900">Data Security</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                            We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. This includes:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-slate-600 mt-4">
                            <li>Encryption of data in transit and at rest</li>
                            <li>Regular security audits and updates</li>
                            <li>Strict access controls and authentication</li>
                            <li>Secure hosting with Supabase</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Your Rights</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            You have the following rights regarding your personal data:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-slate-600">
                            <li><strong>Access:</strong> Request a copy of your personal data</li>
                            <li><strong>Rectification:</strong> Request correction of inaccurate data</li>
                            <li><strong>Deletion:</strong> Request deletion of your data</li>
                            <li><strong>Data Portability:</strong> Request transfer of your data to another service</li>
                            <li><strong>Withdrawal of Consent:</strong> Withdraw consent at any time</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Data Retention</h2>
                        <p className="text-slate-600 leading-relaxed">
                            We retain your personal data only for as long as necessary to provide our services and comply with legal obligations. When you delete your account, we will delete or anonymize your personal data within 30 days, except where we are required to retain it by law.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Third-Party Services</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            We use the following third-party services:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-slate-600">
                            <li><strong>Supabase:</strong> Database and authentication hosting</li>
                            <li><strong>Razorpay:</strong> Payment processing</li>
                            <li><strong>Google Gemini AI:</strong> AI-powered features (optional)</li>
                        </ul>
                        <p className="text-slate-600 leading-relaxed mt-4">
                            These services have their own privacy policies and we encourage you to review them.
                        </p>
                    </section>

                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Mail className="w-6 h-6 text-purple-500" />
                            <h2 className="text-2xl font-bold text-slate-900">Contact Us</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                            If you have any questions about this Privacy Policy or our data practices, please contact us at:
                        </p>
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-slate-700 font-medium">privacy@flowlabs.app</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Changes to This Policy</h2>
                        <p className="text-slate-600 leading-relaxed">
                            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
                        </p>
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
