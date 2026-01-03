'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfServicePage() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-slate-900 text-white">
                <div className="max-w-2xl mx-auto px-4 pt-safe pb-6">
                    <div className="pt-3 flex items-center gap-3">
                        <Link
                            href="/profile"
                            className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
                        >
                            <ArrowLeft size={20} />
                        </Link>
                        <h1 className="text-xl font-bold">Terms of Service</h1>
                    </div>
                </div>
                <div className="h-5 bg-slate-50 rounded-t-[24px]" />
            </header>

            <main className="max-w-2xl mx-auto px-4 pb-24">
                <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-6">
                    <p className="text-sm text-slate-500">Last updated: January 1, 2026</p>

                    <section className="space-y-3">
                        <h2 className="text-lg font-semibold text-slate-900">1. Acceptance of Terms</h2>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            By accessing and using TaxTracker NG (&quot;the App&quot;), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this service.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-semibold text-slate-900">2. Description of Service</h2>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            TaxTracker NG is a personal finance application designed to help Nigerian residents track their income and estimate their tax obligations under Nigerian tax law. The App provides:
                        </p>
                        <ul className="text-sm text-slate-600 leading-relaxed list-disc pl-5 space-y-1">
                            <li>Income tracking and categorization</li>
                            <li>Tax calculation based on Nigerian PAYE tax bands</li>
                            <li>Deduction management for tax relief purposes</li>
                            <li>Historical tax data storage and review</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-semibold text-slate-900">3. Disclaimer</h2>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            The tax calculations provided by TaxTracker NG are estimates based on the information you provide and our understanding of Nigerian tax law. These calculations are for informational purposes only and should not be considered as professional tax advice.
                        </p>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            We strongly recommend consulting with a qualified tax professional or the Federal Inland Revenue Service (FIRS) for official tax matters.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-semibold text-slate-900">4. User Responsibilities</h2>
                        <p className="text-sm text-slate-600 leading-relaxed">You are responsible for:</p>
                        <ul className="text-sm text-slate-600 leading-relaxed list-disc pl-5 space-y-1">
                            <li>Maintaining the confidentiality of your account credentials</li>
                            <li>Ensuring the accuracy of information you enter into the App</li>
                            <li>Complying with all applicable Nigerian tax laws and regulations</li>
                            <li>Using the App for lawful purposes only</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-semibold text-slate-900">5. Data Collection and Privacy</h2>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Your use of TaxTracker NG is also governed by our Privacy Policy. By using the App, you consent to the collection and use of your information as described in our Privacy Policy.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-semibold text-slate-900">6. Account Termination</h2>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            You may delete your account at any time through the App settings. We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent or abusive behavior.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-semibold text-slate-900">7. Intellectual Property</h2>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            All content, features, and functionality of TaxTracker NG, including but not limited to text, graphics, logos, and software, are owned by us and protected by Nigerian and international intellectual property laws.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-semibold text-slate-900">8. Limitation of Liability</h2>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            To the maximum extent permitted by law, TaxTracker NG and its developers shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or other intangible losses resulting from:
                        </p>
                        <ul className="text-sm text-slate-600 leading-relaxed list-disc pl-5 space-y-1">
                            <li>Your use or inability to use the App</li>
                            <li>Any errors or inaccuracies in tax calculations</li>
                            <li>Unauthorized access to your data</li>
                            <li>Any third-party conduct or content</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-semibold text-slate-900">9. Changes to Terms</h2>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            We reserve the right to modify these terms at any time. We will notify users of significant changes through the App or via email. Your continued use of the App after changes constitutes acceptance of the new terms.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-semibold text-slate-900">10. Governing Law</h2>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            These terms shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes arising from these terms shall be resolved in Nigerian courts.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-semibold text-slate-900">11. Contact Information</h2>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            For questions about these Terms of Service, please contact us at:
                        </p>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Email: support@taxtrackerng.com
                        </p>
                    </section>
                </div>
            </main>
        </div>
    );
}

