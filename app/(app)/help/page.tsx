'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronDown } from 'lucide-react';

export default function HelpPage() {
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
            <h1 className="text-xl font-bold">How to Use</h1>
          </div>
        </div>
        <div className="h-5 bg-slate-50 rounded-t-[24px]" />
      </header>

      <main className="max-w-2xl mx-auto px-4 pb-24 space-y-6">
        {/* Welcome */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
          <h2 className="text-xl font-bold mb-2">Welcome to TaxTracker NG</h2>
          <p className="text-blue-100 text-sm leading-relaxed">
            Your personal Nigerian tax calculator and income tracker. Learn how to use all features to manage your taxes effectively.
          </p>
        </div>

        {/* Quick Start Guide */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
            <h3 className="font-semibold text-slate-900">🚀 Quick Start Guide</h3>
          </div>
          <div className="p-4 space-y-4">
            <QuickStep number={1} title="Add Your Income">
              <p>Navigate to the <strong>Dashboard</strong> and tap <strong>&quot;Add Income&quot;</strong> to record your earnings. Enter the amount, select a category, and add any notes.</p>
            </QuickStep>
            <QuickStep number={2} title="Calculate Your Tax">
              <p>Go to the <strong>Calculator</strong> tab and enter your annual gross income. The app will automatically calculate your tax based on Nigerian PAYE rates.</p>
            </QuickStep>
            <QuickStep number={3} title="Track History">
              <p>Use the <strong>History</strong> tab to view all your past income entries and tax calculations. Filter by date or category.</p>
            </QuickStep>
          </div>
        </div>

        {/* Features Explained */}
        <div className="space-y-3">
          <h3 className="font-semibold text-slate-900 px-1">Features Explained</h3>
          
          <Accordion title="📊 Dashboard" defaultOpen>
            <p>Your Dashboard shows an overview of your financial status:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Total Income This Month:</strong> Sum of all income recorded this month</li>
              <li><strong>Total Income This Year:</strong> Your year-to-date income</li>
              <li><strong>Estimated Tax:</strong> Projected annual tax based on current income</li>
              <li><strong>Recent Activity:</strong> Quick view of your latest transactions</li>
            </ul>
          </Accordion>

          <Accordion title="🧮 Tax Calculator">
            <p>The Calculator helps you understand your tax obligations:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Gross Income:</strong> Enter your total annual income before deductions</li>
              <li><strong>Tax Bands:</strong> See how your income is taxed at different rates (7% to 24%)</li>
              <li><strong>Monthly Breakdown:</strong> View estimated monthly tax payments</li>
              <li><strong>Effective Rate:</strong> Your actual overall tax percentage</li>
            </ul>
            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800"><strong>Tip:</strong> Nigerian tax uses progressive rates - you&apos;re only taxed at higher rates for income above each threshold.</p>
            </div>
          </Accordion>

          <Accordion title="📝 Income Categories">
            <p>Organize your income by category for better tracking:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Salary:</strong> Regular employment income</li>
              <li><strong>Freelance:</strong> Contract or project-based work</li>
              <li><strong>Business:</strong> Income from your own business</li>
              <li><strong>Gig Work:</strong> Ride-sharing, delivery, etc.</li>
              <li><strong>Investment:</strong> Dividends, interest, capital gains</li>
              <li><strong>Other:</strong> Any other income sources</li>
            </ul>
          </Accordion>

          <Accordion title="📈 Tax History">
            <p>Keep track of your tax records over time:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>View calculations by month or year</li>
              <li>See trends in your income and tax</li>
              <li>Export data for your records</li>
              <li>Track tax filing status</li>
            </ul>
          </Accordion>

          <Accordion title="⚙️ Profile & Settings">
            <p>Manage your account and preferences:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Edit Profile:</strong> Update your name and phone number</li>
              <li><strong>Export Data:</strong> Download your records</li>
              <li><strong>Delete Account:</strong> Permanently remove your data</li>
            </ul>
          </Accordion>
        </div>

        {/* Nigerian Tax Info */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
            <h3 className="font-semibold text-slate-900">🇳🇬 Nigerian Tax Rates (PAYE)</h3>
          </div>
          <div className="p-4">
            <p className="text-sm text-slate-600 mb-4">
              Personal income tax in Nigeria uses a progressive rate system:
            </p>
            <div className="space-y-2">
              <TaxBand range="First ₦300,000" rate="7%" />
              <TaxBand range="Next ₦300,000" rate="11%" />
              <TaxBand range="Next ₦500,000" rate="15%" />
              <TaxBand range="Next ₦500,000" rate="19%" />
              <TaxBand range="Next ₦1,600,000" rate="21%" />
              <TaxBand range="Above ₦3,200,000" rate="24%" />
            </div>
            <div className="mt-4 p-3 bg-amber-50 rounded-lg">
              <p className="text-sm text-amber-800">
                <strong>Note:</strong> These rates apply to taxable income after deductions. Consult a tax professional for personalized advice.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-3">
          <h3 className="font-semibold text-slate-900 px-1">Frequently Asked Questions</h3>
          
          <Accordion title="Is my data secure?">
            <p>Yes! Your data is stored securely using Firebase with encryption. We never share your financial information with third parties.</p>
          </Accordion>

          <Accordion title="Can I use this for official tax filing?">
            <p>TaxTracker NG provides estimates for personal reference. For official tax filing, please use FIRS-approved channels and consult a tax professional.</p>
          </Accordion>

          <Accordion title="How accurate are the calculations?">
            <p>Our calculations follow the official Nigerian PAYE tax bands. However, individual situations may vary based on deductions, exemptions, and other factors.</p>
          </Accordion>

          <Accordion title="Can I export my data?">
            <p>Yes! You can export your income and tax calculation history from your Profile. This feature is coming soon.</p>
          </Accordion>

          <Accordion title="Is there a mobile app?">
            <p>TaxTracker NG is a Progressive Web App (PWA). You can install it on your phone for a native app experience. See the &quot;Install App&quot; section in your Profile.</p>
          </Accordion>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <h3 className="font-semibold text-slate-900 mb-3">Need More Help?</h3>
          <p className="text-sm text-slate-600 mb-4">
            If you have questions or need assistance, reach out to us:
          </p>
          <div className="space-y-2">
            <a 
              href="mailto:support@taxtrackerng.com"
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-slate-900 text-sm">Email Support</p>
                <p className="text-xs text-slate-500">support@taxtrackerng.com</p>
              </div>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

function QuickStep({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0">
        {number}
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-slate-900 mb-1">{title}</h4>
        <div className="text-sm text-slate-600 leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

function Accordion({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors"
      >
        <span className="font-medium text-slate-900 text-sm">{title}</span>
        <ChevronDown 
          size={18} 
          className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      {isOpen && (
        <div className="px-4 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
          {children}
        </div>
      )}
    </div>
  );
}

function TaxBand({ range, rate }: { range: string; rate: string }) {
  return (
    <div className="flex items-center justify-between py-2 px-3 bg-slate-50 rounded-lg">
      <span className="text-sm text-slate-700">{range}</span>
      <span className="text-sm font-semibold text-blue-600">{rate}</span>
    </div>
  );
}

