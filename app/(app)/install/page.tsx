'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function InstallAppPage() {
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
            <h1 className="text-xl font-bold">Install App</h1>
          </div>
        </div>
        <div className="h-5 bg-slate-50 rounded-t-[24px]" />
      </header>

      <main className="max-w-2xl mx-auto px-4 pb-24 space-y-6">
        {/* Intro */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
              <line x1="12" y1="18" x2="12" y2="18.01" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2">Install TaxTracker NG</h2>
          <p className="text-blue-100 text-sm leading-relaxed">
            Get the full app experience! Install TaxTracker NG on your device for faster access, offline support, and a native app feel.
          </p>
        </div>

        {/* iOS Instructions */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-900">iPhone & iPad (Safari)</h3>
          </div>
          <div className="p-4 space-y-4">
            <Step number={1}>
              <p className="text-sm text-slate-700">Open <strong>Safari</strong> and go to <span className="text-blue-600">taxtrackerng.com</span></p>
            </Step>
            <Step number={2}>
              <p className="text-sm text-slate-700">Tap the <strong>Share</strong> button at the bottom of the screen</p>
              <div className="mt-2 w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2">
                  <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
                  <polyline points="16 6 12 2 8 6" />
                  <line x1="12" y1="2" x2="12" y2="15" />
                </svg>
              </div>
            </Step>
            <Step number={3}>
              <p className="text-sm text-slate-700">Scroll down and tap <strong>&quot;Add to Home Screen&quot;</strong></p>
            </Step>
            <Step number={4}>
              <p className="text-sm text-slate-700">Tap <strong>&quot;Add&quot;</strong> in the top right corner</p>
            </Step>
          </div>
        </div>

        {/* Android Instructions */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24c-2.86-1.21-6.08-1.21-8.94 0L5.65 5.67c-.19-.29-.58-.38-.87-.2-.28.18-.37.54-.22.83L6.4 9.48C3.3 11.25 1.28 14.44 1 18h22c-.28-3.56-2.3-6.75-5.4-8.52zM7 15.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm10 0c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-900">Android (Chrome)</h3>
          </div>
          <div className="p-4 space-y-4">
            <Step number={1}>
              <p className="text-sm text-slate-700">Open <strong>Chrome</strong> and go to <span className="text-blue-600">taxtrackerng.com</span></p>
            </Step>
            <Step number={2}>
              <p className="text-sm text-slate-700">Tap the <strong>three dots menu</strong> in the top right</p>
              <div className="mt-2 w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#475569">
                  <circle cx="12" cy="5" r="2" />
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="12" cy="19" r="2" />
                </svg>
              </div>
            </Step>
            <Step number={3}>
              <p className="text-sm text-slate-700">Tap <strong>&quot;Install app&quot;</strong> or <strong>&quot;Add to Home screen&quot;</strong></p>
            </Step>
            <Step number={4}>
              <p className="text-sm text-slate-700">Tap <strong>&quot;Install&quot;</strong> to confirm</p>
            </Step>
          </div>
        </div>

        {/* Desktop Instructions */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-900">Desktop (Chrome/Edge)</h3>
          </div>
          <div className="p-4 space-y-4">
            <Step number={1}>
              <p className="text-sm text-slate-700">Open <strong>Chrome</strong> or <strong>Edge</strong> and go to <span className="text-blue-600">taxtrackerng.com</span></p>
            </Step>
            <Step number={2}>
              <p className="text-sm text-slate-700">Look for the <strong>install icon</strong> in the address bar (right side)</p>
              <div className="mt-2 w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </div>
            </Step>
            <Step number={3}>
              <p className="text-sm text-slate-700">Click <strong>&quot;Install&quot;</strong> when prompted</p>
            </Step>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Why Install?</h3>
          <div className="space-y-3">
            <Benefit 
              icon="⚡" 
              title="Faster Access" 
              description="Launch directly from your home screen"
            />
            <Benefit 
              icon="📱" 
              title="Native Experience" 
              description="Full-screen app without browser UI"
            />
            <Benefit 
              icon="🔔" 
              title="Notifications" 
              description="Get reminders for tax deadlines"
            />
            <Benefit 
              icon="🔒" 
              title="Secure" 
              description="Your data stays on your device"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function Step({ number, children }: { number: number; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">
        {number}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

function Benefit({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-lg">
        {icon}
      </div>
      <div>
        <h4 className="font-medium text-slate-900 text-sm">{title}</h4>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
    </div>
  );
}

