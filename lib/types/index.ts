// User Types
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
  preferences: UserPreferences;
}

export interface UserPreferences {
  fiscalYearStart: number; // Month (1-12)
  currency: 'NGN';
  notificationsEnabled: boolean;
}

// Income Types
export type IncomeCategory = 'salary' | 'freelance' | 'business' | 'gig' | 'investment' | 'other';

export interface Income {
  id: string;
  userId: string;
  amount: number;
  source: string;
  category: IncomeCategory;
  date: Date;
  taxable: boolean;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IncomeFormData {
  amount: number;
  source: string;
  category: IncomeCategory;
  date: Date;
  taxable: boolean;
  notes?: string;
}

// Deductions Types
export interface Deductions {
  id: string;
  userId: string;
  year: number;
  annualRent: number;
  pensionContributions: number;
  nhisContributions: number;
  nhfContributions: number;
  lifeInsurance: number;
  mortgageInterest: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DeductionsFormData {
  year: number;
  annualRent: number;
  pensionContributions: number;
  nhisContributions: number;
  nhfContributions: number;
  lifeInsurance: number;
  mortgageInterest: number;
}

// Tax Calculation Types
export interface TaxBand {
  min: number;
  max: number;
  rate: number;
}

export interface TaxBreakdown {
  band: TaxBand;
  taxableInBand: number;
  taxAmount: number;
}

export interface TaxCalculationResult {
  grossIncome: number;
  totalDeductions: number;
  deductionBreakdown: {
    rentRelief: number;
    pension: number;
    nhis: number;
    nhf: number;
    insurance: number;
    mortgage: number;
  };
  taxableIncome: number;
  taxBreakdown: TaxBreakdown[];
  totalTax: number;
  effectiveRate: number;
  netIncome: number;
}

export interface SavedTaxCalculation {
  id: string;
  userId: string;
  year: number;
  calculation: TaxCalculationResult;
  createdAt: Date;
}

// Tax Status Types
export type TaxStatus = 'submitted' | 'reviewed' | 'approved';

export interface TaxHistory {
  id: string;
  userId: string;
  year: number;
  month?: number;
  grossIncome: number;
  taxAmount: number;
  status: TaxStatus;
  createdAt: Date;
}

// Dashboard Types
export interface DashboardStats {
  totalIncomeThisMonth: number;
  totalIncomeThisYear: number;
  estimatedTax: number;
  incomeCount: number;
  lastUpdated: Date;
}

export interface RecentActivity {
  id: string;
  type: 'income_added' | 'tax_calculated' | 'deductions_updated';
  description: string;
  amount?: number;
  date: Date;
}

// Filter Types
export interface IncomeFilters {
  dateFrom?: Date;
  dateTo?: Date;
  category?: IncomeCategory;
  searchQuery?: string;
  sortBy: 'date' | 'amount';
  sortOrder: 'asc' | 'desc';
}

// Form State Types
export interface FormState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

// Toast Types
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  icon: string;
  activeIcon: string;
}

