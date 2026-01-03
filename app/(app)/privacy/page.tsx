'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
            <h1 className="text-xl font-bold">Privacy Policy</h1>
          </div>
        </div>
        <div className="h-5 bg-slate-50 rounded-t-[24px]" />
      </header>

      <main className="max-w-2xl mx-auto px-4 pb-24">
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-6">
          <p className="text-sm text-slate-500">Last updated: January 1, 2026</p>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-slate-900">Introduction</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              TaxTracker NG (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile and web application.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-slate-900">Information We Collect</h2>
            
            <h3 className="text-base font-medium text-slate-800">Personal Information</h3>
            <p className="text-sm text-slate-600 leading-relaxed">When you create an account, we collect:</p>
            <ul className="text-sm text-slate-600 leading-relaxed list-disc pl-5 space-y-1">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number (optional)</li>
              <li>Account credentials (encrypted)</li>
            </ul>

            <h3 className="text-base font-medium text-slate-800 mt-4">Financial Information</h3>
            <p className="text-sm text-slate-600 leading-relaxed">To provide our services, we collect:</p>
            <ul className="text-sm text-slate-600 leading-relaxed list-disc pl-5 space-y-1">
              <li>Income records (amount, source, category, date)</li>
              <li>Tax deduction information</li>
              <li>Tax calculation history</li>
            </ul>

            <h3 className="text-base font-medium text-slate-800 mt-4">Usage Information</h3>
            <p className="text-sm text-slate-600 leading-relaxed">We automatically collect:</p>
            <ul className="text-sm text-slate-600 leading-relaxed list-disc pl-5 space-y-1">
              <li>Device information and identifiers</li>
              <li>App usage patterns and preferences</li>
              <li>Error logs and performance data</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-slate-900">How We Use Your Information</h2>
            <p className="text-sm text-slate-600 leading-relaxed">We use your information to:</p>
            <ul className="text-sm text-slate-600 leading-relaxed list-disc pl-5 space-y-1">
              <li>Provide and maintain our tax tracking services</li>
              <li>Calculate and estimate your tax obligations</li>
              <li>Generate reports and historical records</li>
              <li>Improve and optimize the App</li>
              <li>Communicate with you about updates and support</li>
              <li>Ensure security and prevent fraud</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-slate-900">Data Storage and Security</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Your data is stored securely using Firebase/Google Cloud infrastructure. We implement industry-standard security measures including:
            </p>
            <ul className="text-sm text-slate-600 leading-relaxed list-disc pl-5 space-y-1">
              <li>End-to-end encryption for data transmission</li>
              <li>Encrypted storage of sensitive information</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and authentication measures</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-slate-900">Data Sharing</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We do not sell your personal or financial information. We may share data only in the following circumstances:
            </p>
            <ul className="text-sm text-slate-600 leading-relaxed list-disc pl-5 space-y-1">
              <li><strong>Service Providers:</strong> With trusted third-party services that help us operate the App (e.g., cloud hosting, analytics)</li>
              <li><strong>Legal Requirements:</strong> When required by Nigerian law or valid legal process</li>
              <li><strong>Protection:</strong> To protect rights, safety, and property</li>
              <li><strong>Consent:</strong> With your explicit consent for specific purposes</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-slate-900">Your Rights</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Under the Nigeria Data Protection Regulation (NDPR), you have the right to:
            </p>
            <ul className="text-sm text-slate-600 leading-relaxed list-disc pl-5 space-y-1">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Delete your data (account deletion)</li>
              <li>Export your data</li>
              <li>Object to certain processing</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-slate-900">Data Retention</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We retain your data for as long as your account is active. When you delete your account, we will delete your personal data within 30 days, except where retention is required by law (e.g., for tax compliance purposes).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-slate-900">Cookies and Tracking</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Our web application uses essential cookies for authentication and functionality. We may use analytics cookies to understand usage patterns and improve our services. You can manage cookie preferences in your browser settings.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-slate-900">Third-Party Services</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We use the following third-party services:
            </p>
            <ul className="text-sm text-slate-600 leading-relaxed list-disc pl-5 space-y-1">
              <li><strong>Firebase (Google):</strong> Authentication and database services</li>
              <li><strong>Vercel:</strong> Web hosting and deployment</li>
            </ul>
            <p className="text-sm text-slate-600 leading-relaxed mt-2">
              These services have their own privacy policies governing data handling.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-slate-900">Children&apos;s Privacy</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              TaxTracker NG is not intended for use by individuals under 18 years of age. We do not knowingly collect personal information from children.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-slate-900">Changes to This Policy</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of material changes through the App or via email. The &quot;Last updated&quot; date at the top indicates when the policy was last revised.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-slate-900">Contact Us</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              For questions or concerns about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="text-sm text-slate-600 leading-relaxed">
              <p>Email: privacy@taxtrackerng.com</p>
              <p>Support: support@taxtrackerng.com</p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-slate-900">Data Protection Officer</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              In compliance with NDPR requirements, you may contact our Data Protection Officer at dpo@taxtrackerng.com for any data protection inquiries.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

