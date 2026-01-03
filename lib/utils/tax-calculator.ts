import type { TaxBand, TaxBreakdown, TaxCalculationResult, Deductions } from '../types';

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

