// Simple debug script for 2026 Nigerian Tax Act
const TAX_BANDS = [
  { min: 0, max: 800000, rate: 0 },
  { min: 800001, max: 3000000, rate: 0.15 },
  { min: 3000001, max: 12000000, rate: 0.18 },
  { min: 12000001, max: 25000000, rate: 0.21 },
  { min: 25000001, max: 50000000, rate: 0.23 },
  { min: 50000001, max: Infinity, rate: 0.25 },
];

const MAX_RENT_RELIEF = 500000;
const RENT_RELIEF_PERCENTAGE = 0.20;

function calculateRentRelief(annualRent) {
  const relief = annualRent * RENT_RELIEF_PERCENTAGE;
  return Math.min(relief, MAX_RENT_RELIEF);
}

function calculateTaxByBands(taxableIncome) {
  const breakdown = [];
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

function calculateTotalTax(taxBreakdown) {
  return taxBreakdown.reduce((total, item) => total + item.taxAmount, 0);
}

function calculateTax(grossIncome, deductions = {}) {
  // Calculate allowable deductions
  const rentRelief = calculateRentRelief(deductions.annualRent || 0);
  const pension = deductions.pensionContributions || 0;
  const nhis = deductions.nhisContributions || 0;
  const nhf = deductions.nhfContributions || 0;
  const insurance = deductions.lifeInsurance || 0;
  const mortgage = deductions.mortgageInterest || 0;

  const totalDeductions = rentRelief + pension + nhis + nhf + insurance + mortgage;

  // Calculate taxable income
  const taxableIncome = Math.max(0, grossIncome - totalDeductions);

  // Calculate tax by bands
  const taxBreakdown = calculateTaxByBands(taxableIncome);
  const totalTax = calculateTotalTax(taxBreakdown);
  const effectiveRate = grossIncome <= 0 ? 0 : totalTax / grossIncome;
  const netIncome = grossIncome - totalTax;

  return {
    grossIncome,
    totalDeductions,
    taxableIncome,
    taxBreakdown,
    totalTax,
    effectiveRate,
    netIncome,
  };
}

// Test with 940,000 (no deductions)
console.log('Testing 2026 tax calculation for ₦940,000 (no deductions):');
const result = calculateTax(940000);
console.log('Gross Income:', result.grossIncome);
console.log('Total Deductions:', result.totalDeductions);
console.log('Taxable Income:', result.taxableIncome);
console.log('Total Tax:', result.totalTax);
console.log('Effective Rate:', (result.effectiveRate * 100).toFixed(2) + '%');
console.log('Net Income:', result.netIncome);

// Test with 940,000 and some deductions
console.log('\nTesting 2026 tax calculation for ₦940,000 (with ₦200k annual rent):');
const resultWithRent = calculateTax(940000, { annualRent: 200000 });
console.log('Gross Income:', resultWithRent.grossIncome);
console.log('Total Deductions:', resultWithRent.totalDeductions);
console.log('Taxable Income:', resultWithRent.taxableIncome);
console.log('Total Tax:', resultWithRent.totalTax);
console.log('Effective Rate:', (resultWithRent.effectiveRate * 100).toFixed(2) + '%');
console.log('Net Income:', resultWithRent.netIncome);

// Test with higher amount
console.log('\nTesting 2026 tax calculation for ₦1,500,000 (no deductions):');
const result2 = calculateTax(1500000);
console.log('Gross Income:', result2.grossIncome);
console.log('Total Deductions:', result2.totalDeductions);
console.log('Taxable Income:', result2.taxableIncome);
console.log('Total Tax:', result2.totalTax);
console.log('Effective Rate:', (result2.effectiveRate * 100).toFixed(2) + '%');
console.log('Net Income:', result2.netIncome);
