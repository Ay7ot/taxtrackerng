'use client';

import { useState } from 'react';
import { calculateTax, TAX_BANDS, calculateCorporateTax, formatCompanySize, SMALL_COMPANY_TURNOVER_LIMIT, SMALL_COMPANY_ASSETS_LIMIT, LARGE_COMPANY_TURNOVER_THRESHOLD, CIT_RATE, DEVELOPMENT_LEVY_RATE, MINIMUM_ETR } from '@/lib/utils/tax-calculator';
import { formatCurrency } from '@/lib/utils/formatters';
import type { CorporateTaxInput, CorporateTaxResult } from '@/lib/types';

type CalculatorMode = 'personal' | 'corporate';

export default function CalculatorPage() {
  const [mode, setMode] = useState<CalculatorMode>('personal');

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-slate-900 text-white">
        <div className="max-w-2xl mx-auto px-4 pt-safe pb-6">
          <div className="pt-3">
            <p className="text-slate-400 text-xs font-medium">Nigerian Tax Act 2026</p>
            <h1 className="text-xl font-bold mt-0.5">Tax Calculator</h1>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="max-w-2xl mx-auto px-4 pb-4">
          <div className="bg-slate-800/50 rounded-xl p-1 flex">
            <button
              onClick={() => setMode('personal')}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${mode === 'personal'
                ? 'bg-white text-slate-900 shadow-md'
                : 'text-slate-400 hover:text-white'
                }`}
            >
              <span className="flex items-center justify-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Personal
              </span>
            </button>
            <button
              onClick={() => setMode('corporate')}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${mode === 'corporate'
                ? 'bg-white text-slate-900 shadow-md'
                : 'text-slate-400 hover:text-white'
                }`}
            >
              <span className="flex items-center justify-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M9 21V9" />
                </svg>
                Corporate
              </span>
            </button>
          </div>
        </div>

        <div className="h-5 bg-slate-50 rounded-t-[24px]" />
      </header>

      <main className="max-w-2xl mx-auto px-4 pb-24">
        {mode === 'personal' ? <PersonalTaxCalculator /> : <CorporateTaxCalculator />}
      </main>
    </div>
  );
}

// ================================
// Personal Income Tax Calculator
// ================================
function PersonalTaxCalculator() {
  const [income, setIncome] = useState<number>(0);
  const [deductions, setDeductions] = useState({
    annualRent: 0,
    pension: 0,
    nhf: 0,
    nhis: 0,
    lifeInsurance: 0,
  });
  const [showDeductions, setShowDeductions] = useState(false);

  const rentRelief = Math.min(deductions.annualRent * 0.2, 500000);
  const totalDeductions = rentRelief + deductions.pension + deductions.nhf + deductions.nhis + deductions.lifeInsurance;

  const deductionData = {
    pensionContributions: deductions.pension,
    nhfContributions: deductions.nhf,
    nhisContributions: deductions.nhis,
    lifeInsurance: deductions.lifeInsurance,
    annualRent: deductions.annualRent,
    mortgageInterest: 0,
  };

  const result = calculateTax(income, deductionData);

  const deductionItems = [
    { key: 'annualRent', label: 'Annual Rent', hint: '20% relief, max ₦500k', icon: '🏢' },
    { key: 'pension', label: 'Pension', hint: '8% of basic', icon: '🏦' },
    { key: 'nhf', label: 'NHF', hint: '2.5% of basic', icon: '🏠' },
    { key: 'nhis', label: 'NHIS', hint: 'Health insurance', icon: '🏥' },
    { key: 'lifeInsurance', label: 'Life Insurance', hint: 'Annual premium', icon: '🛡️' },
  ];

  return (
    <>
      {/* Income Input */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100">
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
          Annual Gross Income
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-300">₦</span>
          <input
            type="text"
            inputMode="numeric"
            value={income ? income.toLocaleString('en-NG') : ''}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/[^0-9]/g, '');
              setIncome(parseInt(rawValue, 10) || 0);
            }}
            placeholder="0"
            className="w-full h-16 pl-12 pr-4 rounded-xl text-3xl font-bold text-slate-900 bg-slate-50 border-2 border-slate-200 focus:outline-none focus:bg-white focus:border-blue-500 placeholder:text-slate-300 number-display"
          />
        </div>
      </div>

      {/* Deductions Toggle */}
      <button
        onClick={() => setShowDeductions(!showDeductions)}
        className="w-full mt-4 bg-white rounded-2xl p-4 border border-slate-100 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-violet-100 flex items-center justify-center text-violet-600">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12h8M12 8v8" />
            </svg>
          </div>
          <div className="text-left">
            <p className="font-semibold text-slate-800 text-sm">Deductions</p>
            <p className="text-xs text-slate-500">
              {totalDeductions > 0 ? formatCurrency(totalDeductions, { compact: true }) : 'Add deductible amounts'}
            </p>
          </div>
        </div>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#94A3B8"
          strokeWidth="2"
          className={`transition-transform ${showDeductions ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Deductions Form */}
      {showDeductions && (
        <div className="mt-2 bg-white rounded-2xl p-5 border border-slate-100 space-y-4">
          {deductionItems.map((item) => (
            <div key={item.key}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span>{item.icon}</span>
                  <span className="text-sm font-medium text-slate-700">{item.label}</span>
                </div>
                <span className="text-xs text-slate-400">{item.hint}</span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">₦</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={deductions[item.key as keyof typeof deductions] || ''}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/[^0-9]/g, '');
                    setDeductions({
                      ...deductions,
                      [item.key]: parseInt(rawValue, 10) || 0,
                    });
                  }}
                  placeholder="0"
                  className="w-full h-11 pl-8 pr-4 rounded-lg text-slate-900 bg-slate-50 border border-slate-200 focus:outline-none focus:bg-white focus:border-violet-500 placeholder:text-slate-300 number-display"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Results */}
      {income > 0 && (
        <div className="mt-6 space-y-4">
          {/* Main Result Card */}
          <div className="bg-emerald-600 rounded-2xl p-5 text-white">
            <p className="text-emerald-100 text-xs font-medium uppercase tracking-wider">Estimated Annual Tax</p>
            <p className="text-3xl font-bold mt-1 number-display">{formatCurrency(result.totalTax)}</p>
            <div className="flex gap-4 mt-4 pt-4 border-t border-white/20">
              <div>
                <p className="text-emerald-100 text-[10px] uppercase tracking-wider">Effective Rate</p>
                <p className="text-lg font-bold">{(result.effectiveRate * 100).toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-emerald-100 text-[10px] uppercase tracking-wider">Monthly Tax</p>
                <p className="text-lg font-bold number-display">{formatCurrency(result.totalTax / 12, { compact: true })}</p>
              </div>
            </div>
          </div>

          {/* Income Breakdown */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100">
            <h3 className="font-semibold text-slate-800 text-sm mb-4">Income Breakdown</h3>
            <div className="space-y-3">
              <Row label="Gross Income" value={formatCurrency(result.grossIncome)} />
              <Row label="Total Deductions" value={`- ${formatCurrency(totalDeductions)}`} muted />
              <div className="h-px bg-slate-100 my-2" />
              <Row label="Taxable Income" value={formatCurrency(result.taxableIncome)} bold />
            </div>
          </div>

          {/* Tax Bands Applied */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100">
            <h3 className="font-semibold text-slate-800 text-sm mb-4">Tax Bands Applied</h3>
            <div className="space-y-2">
              {result.taxBreakdown.map((breakdownItem, i) => {
                const colors = ['bg-emerald-100 text-emerald-700', 'bg-blue-100 text-blue-700', 'bg-violet-100 text-violet-700', 'bg-amber-100 text-amber-700', 'bg-orange-100 text-orange-700', 'bg-red-100 text-red-700'];
                const colorIndex = breakdownItem.band.rate === 0 ? 0 : breakdownItem.band.rate === 0.15 ? 1 : breakdownItem.band.rate === 0.18 ? 2 : breakdownItem.band.rate === 0.21 ? 3 : breakdownItem.band.rate === 0.23 ? 4 : 5;

                return (
                  <div key={i} className={`flex items-center justify-between p-3 rounded-lg ${colors[colorIndex]}`}>
                    <span className="text-xs font-medium">
                      {(breakdownItem.band.rate * 100).toFixed(0)}% on {formatCurrency(breakdownItem.taxableInBand, { compact: true })}
                    </span>
                    <span className="text-xs font-bold number-display">{formatCurrency(breakdownItem.taxAmount)}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Net Income */}
          <div className="bg-blue-600 rounded-2xl p-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-xs">Annual Net Income</p>
                <p className="text-2xl font-bold number-display">{formatCurrency(result.netIncome)}</p>
              </div>
              <div className="text-right">
                <p className="text-blue-100 text-xs">Monthly Take-Home</p>
                <p className="text-xl font-bold number-display">{formatCurrency(result.netIncome / 12)}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tax Bands Reference */}
      <div className="mt-8">
        <h3 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">Personal Tax Bands</h3>
        <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-100">
          {TAX_BANDS.map((band, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3">
              <span className="text-xs text-slate-600">
                {band.max === Infinity
                  ? `Above ${formatCurrency(band.min, { compact: true })}`
                  : `${formatCurrency(band.min, { compact: true })} - ${formatCurrency(band.max, { compact: true })}`}
              </span>
              <span className={`text-xs font-semibold ${band.rate === 0 ? 'text-emerald-600' : 'text-slate-800'}`}>
                {band.rate === 0 ? 'Tax Free' : `${(band.rate * 100).toFixed(0)}%`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ================================
// Corporate Income Tax Calculator
// ================================
function CorporateTaxCalculator() {
  const [inputs, setInputs] = useState<CorporateTaxInput>({
    annualTurnover: 0,
    totalFixedAssets: 0,
    totalRevenue: 0,
    deductions: {
      allowedExpenses: 0,
      capitalAllowances: 0,
      lossesCarriedForward: 0,
    },
    profitBeforeTax: 0,
    otherTaxesPaid: 0,
    isProfessionalServices: false,
  });
  const [showDeductions, setShowDeductions] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const result: CorporateTaxResult | null = inputs.profitBeforeTax > 0 || inputs.totalRevenue > 0
    ? calculateCorporateTax(inputs)
    : null;

  const totalDeductions = inputs.deductions.allowedExpenses + inputs.deductions.capitalAllowances + inputs.deductions.lossesCarriedForward;

  const handleInputChange = (field: keyof CorporateTaxInput, value: number | boolean) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleDeductionChange = (field: keyof CorporateTaxInput['deductions'], value: number) => {
    setInputs(prev => ({
      ...prev,
      deductions: { ...prev.deductions, [field]: value }
    }));
  };

  const parseNumber = (value: string): number => {
    return parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
  };

  const formatInputValue = (value: number): string => {
    return value ? value.toLocaleString('en-NG') : '';
  };

  return (
    <>
      {/* Company Classification Info */}
      <div className="bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl p-5 text-white mb-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-sm">Company Classification</p>
            <p className="text-xs text-white/80 mt-1">
              Small companies (turnover ≤ ₦50M & assets ≤ ₦250M) are <strong>tax exempt</strong>.
              Large companies (turnover ≥ ₦20B) must meet 15% minimum effective tax rate.
            </p>
          </div>
        </div>
      </div>

      {/* Revenue & Turnover */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 space-y-5">
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Annual Turnover
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-300">₦</span>
            <input
              type="text"
              inputMode="numeric"
              value={formatInputValue(inputs.annualTurnover)}
              onChange={(e) => handleInputChange('annualTurnover', parseNumber(e.target.value))}
              placeholder="0"
              className="w-full h-16 pl-12 pr-4 rounded-xl text-3xl font-bold text-slate-900 bg-slate-50 border-2 border-slate-200 focus:outline-none focus:bg-white focus:border-indigo-500 placeholder:text-slate-300 number-display"
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Used to determine company size classification</p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Total Revenue
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-slate-300">₦</span>
            <input
              type="text"
              inputMode="numeric"
              value={formatInputValue(inputs.totalRevenue)}
              onChange={(e) => handleInputChange('totalRevenue', parseNumber(e.target.value))}
              placeholder="0"
              className="w-full h-14 pl-10 pr-4 rounded-xl text-xl font-bold text-slate-900 bg-slate-50 border-2 border-slate-200 focus:outline-none focus:bg-white focus:border-indigo-500 placeholder:text-slate-300 number-display"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Total Fixed Assets
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-slate-300">₦</span>
            <input
              type="text"
              inputMode="numeric"
              value={formatInputValue(inputs.totalFixedAssets)}
              onChange={(e) => handleInputChange('totalFixedAssets', parseNumber(e.target.value))}
              placeholder="0"
              className="w-full h-14 pl-10 pr-4 rounded-xl text-xl font-bold text-slate-900 bg-slate-50 border-2 border-slate-200 focus:outline-none focus:bg-white focus:border-indigo-500 placeholder:text-slate-300 number-display"
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Assets limit for small company status: ₦250M</p>
        </div>
      </div>

      {/* Business Type Toggle */}
      <div className="mt-4 bg-white rounded-2xl p-4 border border-slate-100">
        <label className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center">
              <span className="text-lg">⚖️</span>
            </div>
            <div>
              <p className="font-semibold text-slate-800 text-sm">Professional Services Firm</p>
              <p className="text-xs text-slate-500">Law, accounting, consulting, etc.</p>
            </div>
          </div>
          <div className="relative">
            <input
              type="checkbox"
              checked={inputs.isProfessionalServices}
              onChange={(e) => handleInputChange('isProfessionalServices', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </div>
        </label>
        <p className="text-[11px] text-amber-600 mt-2 ml-12">
          Professional services firms don&apos;t qualify for small company tax exemption
        </p>
      </div>

      {/* Deductions Toggle */}
      <button
        onClick={() => setShowDeductions(!showDeductions)}
        className="w-full mt-4 bg-white rounded-2xl p-4 border border-slate-100 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-violet-100 flex items-center justify-center text-violet-600">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12h8M12 8v8" />
            </svg>
          </div>
          <div className="text-left">
            <p className="font-semibold text-slate-800 text-sm">Allowable Deductions</p>
            <p className="text-xs text-slate-500">
              {totalDeductions > 0 ? formatCurrency(totalDeductions, { compact: true }) : 'Expenses, allowances, losses'}
            </p>
          </div>
        </div>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#94A3B8"
          strokeWidth="2"
          className={`transition-transform ${showDeductions ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Deductions Form */}
      {showDeductions && (
        <div className="mt-2 bg-white rounded-2xl p-5 border border-slate-100 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span>💼</span>
                <span className="text-sm font-medium text-slate-700">Allowed Expenses</span>
              </div>
              <span className="text-xs text-slate-400">Rent, salaries, R&D, etc.</span>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">₦</span>
              <input
                type="text"
                inputMode="numeric"
                value={formatInputValue(inputs.deductions.allowedExpenses)}
                onChange={(e) => handleDeductionChange('allowedExpenses', parseNumber(e.target.value))}
                placeholder="0"
                className="w-full h-11 pl-8 pr-4 rounded-lg text-slate-900 bg-slate-50 border border-slate-200 focus:outline-none focus:bg-white focus:border-violet-500 placeholder:text-slate-300 number-display"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span>🏭</span>
                <span className="text-sm font-medium text-slate-700">Capital Allowances</span>
              </div>
              <span className="text-xs text-slate-400">Depreciation</span>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">₦</span>
              <input
                type="text"
                inputMode="numeric"
                value={formatInputValue(inputs.deductions.capitalAllowances)}
                onChange={(e) => handleDeductionChange('capitalAllowances', parseNumber(e.target.value))}
                placeholder="0"
                className="w-full h-11 pl-8 pr-4 rounded-lg text-slate-900 bg-slate-50 border border-slate-200 focus:outline-none focus:bg-white focus:border-violet-500 placeholder:text-slate-300 number-display"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span>📉</span>
                <span className="text-sm font-medium text-slate-700">Losses Carried Forward</span>
              </div>
              <span className="text-xs text-slate-400">Prior year losses</span>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">₦</span>
              <input
                type="text"
                inputMode="numeric"
                value={formatInputValue(inputs.deductions.lossesCarriedForward)}
                onChange={(e) => handleDeductionChange('lossesCarriedForward', parseNumber(e.target.value))}
                placeholder="0"
                className="w-full h-11 pl-8 pr-4 rounded-lg text-slate-900 bg-slate-50 border border-slate-200 focus:outline-none focus:bg-white focus:border-violet-500 placeholder:text-slate-300 number-display"
              />
            </div>
          </div>
        </div>
      )}

      {/* Profit Before Tax */}
      <div className="mt-4 bg-white rounded-2xl p-5 border border-slate-100">
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
          Profit Before Tax
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-300">₦</span>
          <input
            type="text"
            inputMode="numeric"
            value={formatInputValue(inputs.profitBeforeTax)}
            onChange={(e) => handleInputChange('profitBeforeTax', parseNumber(e.target.value))}
            placeholder="0"
            className="w-full h-16 pl-12 pr-4 rounded-xl text-3xl font-bold text-slate-900 bg-slate-50 border-2 border-slate-200 focus:outline-none focus:bg-white focus:border-indigo-500 placeholder:text-slate-300 number-display"
          />
        </div>
        <p className="text-[11px] text-slate-400 mt-2">Used for effective tax rate calculation</p>
      </div>

      {/* Advanced Settings */}
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="w-full mt-4 bg-white rounded-2xl p-4 border border-slate-100 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </div>
          <div className="text-left">
            <p className="font-semibold text-slate-800 text-sm">Advanced Options</p>
            <p className="text-xs text-slate-500">Other taxes paid (for ETR)</p>
          </div>
        </div>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#94A3B8"
          strokeWidth="2"
          className={`transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {showAdvanced && (
        <div className="mt-2 bg-white rounded-2xl p-5 border border-slate-100">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <span>📋</span>
              <span className="text-sm font-medium text-slate-700">Other Taxes Paid</span>
            </div>
            <span className="text-xs text-slate-400">For ETR calculation</span>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">₦</span>
            <input
              type="text"
              inputMode="numeric"
              value={formatInputValue(inputs.otherTaxesPaid)}
              onChange={(e) => handleInputChange('otherTaxesPaid', parseNumber(e.target.value))}
              placeholder="0"
              className="w-full h-11 pl-8 pr-4 rounded-lg text-slate-900 bg-slate-50 border border-slate-200 focus:outline-none focus:bg-white focus:border-violet-500 placeholder:text-slate-300 number-display"
            />
          </div>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="mt-6 space-y-4">
          {/* Company Classification Badge */}
          <div className={`rounded-2xl p-4 border ${result.isSmallCompany
            ? 'bg-emerald-50 border-emerald-200'
            : result.isLargeCompany
              ? 'bg-amber-50 border-amber-200'
              : 'bg-indigo-50 border-indigo-200'
            }`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${result.isSmallCompany
                ? 'bg-emerald-100'
                : result.isLargeCompany
                  ? 'bg-amber-100'
                  : 'bg-indigo-100'
                }`}>
                {result.isSmallCompany ? '🎉' : result.isLargeCompany ? '🏢' : '🏛️'}
              </div>
              <div>
                <p className={`font-semibold text-sm ${result.isSmallCompany
                  ? 'text-emerald-800'
                  : result.isLargeCompany
                    ? 'text-amber-800'
                    : 'text-indigo-800'
                  }`}>
                  {formatCompanySize(result.companySize)}
                </p>
                <p className={`text-xs ${result.isSmallCompany
                  ? 'text-emerald-600'
                  : result.isLargeCompany
                    ? 'text-amber-600'
                    : 'text-indigo-600'
                  }`}>
                  {result.isSmallCompany
                    ? 'Exempt from CIT and Development Levy'
                    : result.isLargeCompany
                      ? 'Subject to 15% minimum effective tax rate'
                      : 'Standard CIT (30%) + Development Levy (4%)'}
                </p>
              </div>
            </div>
          </div>

          {/* Main Result Card */}
          <div className={`rounded-2xl p-5 text-white ${result.isSmallCompany ? 'bg-emerald-600' : 'bg-indigo-600'
            }`}>
            <p className={`text-xs font-medium uppercase tracking-wider ${result.isSmallCompany ? 'text-emerald-100' : 'text-indigo-100'
              }`}>Total Corporate Tax</p>
            <p className="text-3xl font-bold mt-1 number-display">{formatCurrency(result.totalTax)}</p>
            <div className="flex gap-4 mt-4 pt-4 border-t border-white/20">
              <div>
                <p className={`text-[10px] uppercase tracking-wider ${result.isSmallCompany ? 'text-emerald-100' : 'text-indigo-100'
                  }`}>Effective Rate</p>
                <p className="text-lg font-bold">{(result.effectiveTaxRate * 100).toFixed(1)}%</p>
              </div>
              <div>
                <p className={`text-[10px] uppercase tracking-wider ${result.isSmallCompany ? 'text-emerald-100' : 'text-indigo-100'
                  }`}>Assessable Profit</p>
                <p className="text-lg font-bold number-display">{formatCurrency(result.assessableProfit, { compact: true })}</p>
              </div>
            </div>
          </div>

          {/* Top-up Tax Warning */}
          {result.minimumETRRequired && result.topUpTax > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                  <span className="text-base">⚠️</span>
                </div>
                <div>
                  <p className="font-semibold text-amber-800 text-sm">Minimum ETR Top-Up Applied</p>
                  <p className="text-xs text-amber-700 mt-1">
                    As a large company, you must meet the 15% minimum effective tax rate.
                    A top-up tax of <strong>{formatCurrency(result.topUpTax)}</strong> has been added.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tax Breakdown */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100">
            <h3 className="font-semibold text-slate-800 text-sm mb-4">Tax Breakdown</h3>
            <div className="space-y-3">
              <Row label="Total Revenue" value={formatCurrency(result.totalRevenue)} />
              <Row label="Total Deductions" value={`- ${formatCurrency(totalDeductions)}`} muted />
              <div className="h-px bg-slate-100 my-2" />
              <Row label="Assessable Profit" value={formatCurrency(result.assessableProfit)} bold />
            </div>
          </div>

          {/* Tax Components */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100">
            <h3 className="font-semibold text-slate-800 text-sm mb-4">Tax Components</h3>
            <div className="space-y-2">
              <div className={`flex items-center justify-between p-3 rounded-lg ${result.isSmallCompany ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'
                }`}>
                <span className="text-xs font-medium">
                  Corporate Income Tax ({(CIT_RATE * 100).toFixed(0)}%)
                </span>
                <span className="text-xs font-bold number-display">{formatCurrency(result.taxBreakdown.cit)}</span>
              </div>
              <div className={`flex items-center justify-between p-3 rounded-lg ${result.isSmallCompany ? 'bg-emerald-100 text-emerald-700' : 'bg-violet-100 text-violet-700'
                }`}>
                <span className="text-xs font-medium">
                  Development Levy ({(DEVELOPMENT_LEVY_RATE * 100).toFixed(0)}%)
                </span>
                <span className="text-xs font-bold number-display">{formatCurrency(result.taxBreakdown.devLevy)}</span>
              </div>
              {result.topUpTax > 0 && (
                <div className="flex items-center justify-between p-3 rounded-lg bg-amber-100 text-amber-700">
                  <span className="text-xs font-medium">
                    ETR Top-Up Tax ({(MINIMUM_ETR * 100).toFixed(0)}% min ETR)
                  </span>
                  <span className="text-xs font-bold number-display">{formatCurrency(result.taxBreakdown.topUp)}</span>
                </div>
              )}
              {inputs.otherTaxesPaid > 0 && (
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-100 text-slate-700">
                  <span className="text-xs font-medium">Other Taxes Paid</span>
                  <span className="text-xs font-bold number-display">{formatCurrency(inputs.otherTaxesPaid)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Profit Summary */}
          <div className="bg-linear-to-br from-blue-600 to-blue-700 rounded-2xl p-5 text-white overflow-hidden">
            <h3 className="text-blue-200 text-xs font-semibold uppercase tracking-wider mb-4">Profit Summary</h3>

            {/* Profit Before Tax */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-blue-200 text-sm">Profit Before Tax</span>
              <span className="text-lg font-bold number-display">{formatCurrency(inputs.profitBeforeTax)}</span>
            </div>

            {/* Tax Deducted */}
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/20">
              <span className="text-blue-200 text-sm">Less: Total Tax</span>
              <span className="text-base font-semibold number-display text-blue-200">- {formatCurrency(result.totalTax)}</span>
            </div>

            {/* Net Profit After Tax */}
            <div className="flex items-center justify-between">
              <span className="text-white text-sm font-semibold">Net Profit After Tax</span>
              <span className={`text-2xl font-bold number-display ${result.netProfit < 0 ? 'text-red-300' : 'text-white'}`}>
                {formatCurrency(result.netProfit)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* CIT Reference */}
      <div className="mt-8">
        <h3 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">Corporate Tax Rules</h3>
        <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-100">
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-xs text-slate-600">Small Company (≤₦{(SMALL_COMPANY_TURNOVER_LIMIT / 1_000_000).toFixed(0)}M turnover)</span>
            <span className="text-xs font-semibold text-emerald-600">0% Tax Exempt</span>
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-xs text-slate-600">Corporate Income Tax</span>
            <span className="text-xs font-semibold text-slate-800">{(CIT_RATE * 100).toFixed(0)}%</span>
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-xs text-slate-600">Development Levy</span>
            <span className="text-xs font-semibold text-slate-800">{(DEVELOPMENT_LEVY_RATE * 100).toFixed(0)}%</span>
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-xs text-slate-600">Large Company (≥₦{(LARGE_COMPANY_TURNOVER_THRESHOLD / 1_000_000_000).toFixed(0)}B) Min ETR</span>
            <span className="text-xs font-semibold text-amber-600">{(MINIMUM_ETR * 100).toFixed(0)}%</span>
          </div>
        </div>
      </div>
    </>
  );
}

// Shared Row Component
function Row({
  label,
  value,
  subtitle,
  bold,
  muted
}: {
  label: string;
  value: string;
  subtitle?: string;
  bold?: boolean;
  muted?: boolean;
}) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <span className={`text-xs ${bold ? 'font-semibold text-slate-800' : muted ? 'text-slate-500' : 'text-slate-700'}`}>
          {label}
        </span>
        {subtitle && <p className="text-[10px] text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
      <span className={`text-xs number-display ${bold ? 'font-bold text-slate-800' : muted ? 'text-slate-500' : 'font-medium text-slate-700'}`}>
        {value}
      </span>
    </div>
  );
}
