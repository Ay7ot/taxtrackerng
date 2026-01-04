import type { TaxBand, TaxBreakdown, TaxCalculationResult, Deductions, CorporateTaxInput, CorporateTaxResult, CompanySize } from '../types';

/**
 * Nigerian Personal Income Tax Bands
 * Effective January 1, 2026 under the new Nigeria Tax Act
 */
export const TAX_BANDS: TaxBand[] = [
  { min: 0, max: 800000, rate: 0 },           // 0% on first ₦800,000
  { min: 800001, max: 3000000, rate: 0.15 },  // 15% on ₦800,001 - ₦3,000,000
  { min: 3000001, max: 12000000, rate: 0.18 }, // 18% on ₦3,000,001 - ₦12,000,000
  { min: 12000001, max: 25000000, rate: 0.21 }, // 21% on ₦12,000,001 - ₦25,000,000
  { min: 25000001, max: 50000000, rate: 0.23 }, // 23% on ₦25,000,001 - ₦50,000,000
  { min: 50000001, max: Infinity, rate: 0.25 }, // 25% on above ₦50,000,000
];

/**
 * Maximum rent relief allowed under the new tax act
 */
export const MAX_RENT_RELIEF = 500000;

/**
 * Percentage of annual rent that qualifies for relief
 */
export const RENT_RELIEF_PERCENTAGE = 0.20;

/**
 * Calculate rent relief based on annual rent paid
 * @param annualRent - Total annual rent paid
 * @returns Rent relief amount (20% of rent, max ₦500,000)
 */
export function calculateRentRelief(annualRent: number): number {
  const relief = annualRent * RENT_RELIEF_PERCENTAGE;
  return Math.min(relief, MAX_RENT_RELIEF);
}


/**
 * Calculate total allowable deductions
 * @param deductions - User's deduction inputs
 * @returns Object with individual and total deductions
 */
export function calculateTotalDeductions(deductions: Partial<Deductions>): {
  rentRelief: number;
  pension: number;
  nhis: number;
  nhf: number;
  insurance: number;
  mortgage: number;
  total: number;
} {
  const rentRelief = calculateRentRelief(deductions.annualRent || 0);
  const pension = deductions.pensionContributions || 0;
  const nhis = deductions.nhisContributions || 0;
  const nhf = deductions.nhfContributions || 0;
  const insurance = deductions.lifeInsurance || 0;
  const mortgage = deductions.mortgageInterest || 0;

  return {
    rentRelief,
    pension,
    nhis,
    nhf,
    insurance,
    mortgage,
    total: rentRelief + pension + nhis + nhf + insurance + mortgage,
  };
}

/**
 * Calculate tax for a specific income amount using progressive tax bands
 * @param taxableIncome - Income after deductions
 * @returns Array of tax breakdown by band
 */
export function calculateTaxByBands(taxableIncome: number): TaxBreakdown[] {
  const breakdown: TaxBreakdown[] = [];
  let remainingIncome = taxableIncome;

  for (const band of TAX_BANDS) {
    if (remainingIncome <= 0) break;

    const bandWidth = band.max === Infinity
      ? remainingIncome
      : band.max - band.min + 1;

    const incomeInThisBand = Math.min(remainingIncome, bandWidth);
    const taxAmount = incomeInThisBand * band.rate;

    breakdown.push({
      band,
      taxableInBand: incomeInThisBand,
      taxAmount,
    });

    remainingIncome -= incomeInThisBand;
  }

  return breakdown;
}

/**
 * Calculate total tax owed
 * @param taxBreakdown - Tax breakdown by band
 * @returns Total tax amount
 */
export function calculateTotalTax(taxBreakdown: TaxBreakdown[]): number {
  return taxBreakdown.reduce((total, item) => total + item.taxAmount, 0);
}

/**
 * Calculate effective tax rate
 * @param totalTax - Total tax owed
 * @param grossIncome - Total gross income
 * @returns Effective tax rate as a decimal (e.g., 0.15 for 15%)
 */
export function calculateEffectiveRate(totalTax: number, grossIncome: number): number {
  if (grossIncome <= 0) return 0;
  return totalTax / grossIncome;
}

/**
 * Complete tax calculation
 * @param grossIncome - Total annual income
 * @param deductions - User's deduction data
 * @returns Complete tax calculation result
 */
export function calculateTax(
  grossIncome: number,
  deductions: Partial<Deductions> = {}
): TaxCalculationResult {
  // Calculate allowable deductions
  const deductionBreakdown = calculateTotalDeductions(deductions);

  // Total deductions
  const totalDeductions = deductionBreakdown.total;

  // Calculate taxable income (cannot be negative)
  const taxableIncome = Math.max(0, grossIncome - totalDeductions);

  // Calculate tax by bands
  const taxBreakdown = calculateTaxByBands(taxableIncome);

  // Calculate totals
  const totalTax = calculateTotalTax(taxBreakdown);
  const effectiveRate = calculateEffectiveRate(totalTax, grossIncome);
  const netIncome = grossIncome - totalTax;

  return {
    grossIncome,
    totalDeductions,
    deductionBreakdown: {
      rentRelief: deductionBreakdown.rentRelief,
      pension: deductionBreakdown.pension,
      nhis: deductionBreakdown.nhis,
      nhf: deductionBreakdown.nhf,
      insurance: deductionBreakdown.insurance,
      mortgage: deductionBreakdown.mortgage,
    },
    taxableIncome,
    taxBreakdown,
    totalTax,
    effectiveRate,
    netIncome,
  };
}

/**
 * Get the tax bracket for a given income
 * @param taxableIncome - Taxable income amount
 * @returns The tax band the income falls into (highest applicable)
 */
export function getTaxBracket(taxableIncome: number): TaxBand {
  for (let i = TAX_BANDS.length - 1; i >= 0; i--) {
    if (taxableIncome >= TAX_BANDS[i].min) {
      return TAX_BANDS[i];
    }
  }
  return TAX_BANDS[0];
}

/**
 * Calculate how much more income until next tax bracket
 * @param taxableIncome - Current taxable income
 * @returns Amount until next bracket, or 0 if at highest bracket
 */
export function getAmountToNextBracket(taxableIncome: number): number {
  const currentBracket = getTaxBracket(taxableIncome);
  const currentIndex = TAX_BANDS.findIndex(b => b.min === currentBracket.min);

  if (currentIndex === TAX_BANDS.length - 1 || currentBracket.max === Infinity) {
    return 0; // Already at highest bracket
  }

  return currentBracket.max - taxableIncome + 1;
}

/**
 * Format tax rate as percentage string
 * @param rate - Rate as decimal
 * @returns Formatted percentage string
 */
export function formatTaxRate(rate: number): string {
  return `${(rate * 100).toFixed(0)}%`;
}

/**
 * Get tax band description
 * @param band - Tax band
 * @returns Human-readable description
 */
export function getTaxBandDescription(band: TaxBand): string {
  if (band.max === Infinity) {
    return `Above ₦${band.min.toLocaleString()}`;
  }
  return `₦${band.min.toLocaleString()} - ₦${band.max.toLocaleString()}`;
}

// ================================
// Corporate Income Tax (CIT) Calculator
// Nigeria Tax Act 2025 (Effective January 2026)
// ================================

/**
 * Corporate Tax Rate Constants
 */
export const CIT_RATE = 0.30;              // 30% Corporate Income Tax
export const DEVELOPMENT_LEVY_RATE = 0.04; // 4% Development Levy
export const MINIMUM_ETR = 0.15;           // 15% Minimum Effective Tax Rate

// Thresholds
export const SMALL_COMPANY_TURNOVER_LIMIT = 50_000_000;   // ₦50 million
export const SMALL_COMPANY_ASSETS_LIMIT = 250_000_000;    // ₦250 million
export const LARGE_COMPANY_TURNOVER_THRESHOLD = 20_000_000_000; // ₦20 billion

/**
 * Determine company size based on turnover, assets, and business type
 */
export function determineCompanySize(
  annualTurnover: number,
  totalFixedAssets: number,
  isProfessionalServices: boolean
): CompanySize {
  // Small company criteria: turnover ≤ ₦50M AND assets ≤ ₦250M AND not professional services
  const isSmall =
    annualTurnover <= SMALL_COMPANY_TURNOVER_LIMIT &&
    totalFixedAssets <= SMALL_COMPANY_ASSETS_LIMIT &&
    !isProfessionalServices;

  if (isSmall) return 'small';

  // Large company: turnover ≥ ₦20 billion (subject to minimum ETR)
  if (annualTurnover >= LARGE_COMPANY_TURNOVER_THRESHOLD) return 'large';

  return 'standard';
}

/**
 * Check if company qualifies as small (tax exempt)
 */
export function isSmallCompany(
  annualTurnover: number,
  totalFixedAssets: number,
  isProfessionalServices: boolean
): boolean {
  return determineCompanySize(annualTurnover, totalFixedAssets, isProfessionalServices) === 'small';
}

/**
 * Calculate assessable profit for corporate tax
 * Assessable profit = Revenue - Allowable Expenses - Capital Allowances - Losses Carried Forward
 */
export function calculateAssessableProfit(
  totalRevenue: number,
  allowedExpenses: number,
  capitalAllowances: number,
  lossesCarriedForward: number
): number {
  const assessableProfit = totalRevenue - allowedExpenses - capitalAllowances - lossesCarriedForward;
  return Math.max(0, assessableProfit);
}

/**
 * Calculate Corporate Income Tax
 */
export function calculateCIT(assessableProfit: number, isSmall: boolean): number {
  if (isSmall) return 0;
  return assessableProfit * CIT_RATE;
}

/**
 * Calculate Development Levy (4% on assessable profits, except small companies)
 */
export function calculateDevelopmentLevy(assessableProfit: number, isSmall: boolean): number {
  if (isSmall) return 0;
  return assessableProfit * DEVELOPMENT_LEVY_RATE;
}

/**
 * Calculate Effective Tax Rate
 */
export function calculateCorporateETR(totalTax: number, profitBeforeTax: number): number {
  if (profitBeforeTax <= 0) return 0;
  return totalTax / profitBeforeTax;
}

/**
 * Calculate top-up tax if ETR is below 15% (for large companies)
 */
export function calculateTopUpTax(
  currentTotalTax: number,
  profitBeforeTax: number,
  isLargeCompany: boolean
): number {
  if (!isLargeCompany || profitBeforeTax <= 0) return 0;

  const currentETR = calculateCorporateETR(currentTotalTax, profitBeforeTax);

  if (currentETR >= MINIMUM_ETR) return 0;

  // Top-up tax brings ETR to 15%
  const requiredTax = profitBeforeTax * MINIMUM_ETR;
  return requiredTax - currentTotalTax;
}

/**
 * Complete Corporate Tax Calculation
 */
export function calculateCorporateTax(input: CorporateTaxInput): CorporateTaxResult {
  const {
    annualTurnover,
    totalFixedAssets,
    totalRevenue,
    deductions,
    profitBeforeTax,
    otherTaxesPaid,
    isProfessionalServices,
  } = input;

  // Determine company size
  const companySize = determineCompanySize(annualTurnover, totalFixedAssets, isProfessionalServices);
  const isSmall = companySize === 'small';
  const isLarge = companySize === 'large';

  // Calculate assessable profit
  const assessableProfit = calculateAssessableProfit(
    totalRevenue,
    deductions.allowedExpenses,
    deductions.capitalAllowances,
    deductions.lossesCarriedForward
  );

  // Calculate base taxes
  const corporateIncomeTax = calculateCIT(assessableProfit, isSmall);
  const developmentLevy = calculateDevelopmentLevy(assessableProfit, isSmall);
  const subtotalTax = corporateIncomeTax + developmentLevy + otherTaxesPaid;

  // Calculate ETR and potential top-up tax
  const effectiveTaxRate = calculateCorporateETR(subtotalTax, profitBeforeTax);
  const minimumETRRequired = isLarge && effectiveTaxRate < MINIMUM_ETR && profitBeforeTax > 0;
  const topUpTax = calculateTopUpTax(subtotalTax, profitBeforeTax, isLarge);

  // Total tax
  const totalTax = subtotalTax + topUpTax;
  const finalETR = calculateCorporateETR(totalTax, profitBeforeTax);

  // Net profit after tax
  const netProfit = profitBeforeTax - totalTax;

  return {
    companySize,
    isSmallCompany: isSmall,
    isLargeCompany: isLarge,
    totalRevenue,
    assessableProfit,
    corporateIncomeTax,
    developmentLevy,
    subtotalTax,
    effectiveTaxRate: finalETR,
    minimumETRRequired,
    topUpTax,
    totalTax,
    netProfit,
    taxBreakdown: {
      cit: corporateIncomeTax,
      devLevy: developmentLevy,
      topUp: topUpTax,
    },
  };
}

/**
 * Format company size for display
 */
export function formatCompanySize(size: CompanySize): string {
  switch (size) {
    case 'small': return 'Small Company (Tax Exempt)';
    case 'large': return 'Large Company (₦20B+ Turnover)';
    default: return 'Standard Company';
  }
}

