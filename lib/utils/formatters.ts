/**
 * Format a number as Nigerian Naira currency
 * @param amount - The amount to format
 * @param options - Formatting options
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number | undefined | null,
  options: {
    showSymbol?: boolean;
    showDecimals?: boolean;
    compact?: boolean;
  } = {}
): string {
  const { showSymbol = true, showDecimals = false, compact = false } = options;

  // Handle undefined, null, or NaN values
  if (amount === undefined || amount === null || isNaN(amount)) {
    return showSymbol ? '₦0' : '0';
  }

  if (compact && Math.abs(amount) >= 1000000) {
    const millions = amount / 1000000;
    const formatted = millions.toFixed(1).replace(/\.0$/, '');
    return showSymbol ? `₦${formatted}M` : `${formatted}M`;
  }

  if (compact && Math.abs(amount) >= 1000) {
    const thousands = amount / 1000;
    const formatted = thousands.toFixed(1).replace(/\.0$/, '');
    return showSymbol ? `₦${formatted}K` : `${formatted}K`;
  }

  const formatted = amount.toLocaleString('en-NG', {
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  });

  return showSymbol ? `₦${formatted}` : formatted;
}

/**
 * Parse a currency string back to number
 * @param value - Currency string (e.g., "₦1,000,000" or "1000000")
 * @returns Parsed number
 */
export function parseCurrency(value: string): number {
  // Remove currency symbol, commas, and spaces
  const cleaned = value.replace(/[₦,\s]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Format a date for display
 * @param date - Date to format
 * @param format - Format style
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string,
  format: 'short' | 'medium' | 'long' | 'relative' = 'medium'
): string {
  const d = typeof date === 'string' ? new Date(date) : date;

  if (format === 'relative') {
    return formatRelativeDate(d);
  }

  const formatOptions: Record<string, Intl.DateTimeFormatOptions> = {
    short: { day: 'numeric', month: 'short' },
    medium: { day: 'numeric', month: 'short', year: 'numeric' },
    long: { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' },
  };
  const options = formatOptions[format];

  return d.toLocaleDateString('en-NG', options);
}

/**
 * Format a date as relative time (e.g., "2 hours ago", "Yesterday")
 * @param date - Date to format
 * @returns Relative time string
 */
export function formatRelativeDate(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) {
    return 'Yesterday';
  }

  if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  }

  return formatDate(date, 'short');
}

/**
 * Format a month and year
 * @param month - Month number (1-12)
 * @param year - Year
 * @returns Formatted month/year string
 */
export function formatMonthYear(month: number, year: number): string {
  const date = new Date(year, month - 1);
  return date.toLocaleDateString('en-NG', { month: 'long', year: 'numeric' });
}

/**
 * Format a percentage
 * @param value - Decimal value (e.g., 0.15 for 15%)
 * @param decimals - Number of decimal places
 * @returns Formatted percentage string
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * Get the ordinal suffix for a number (1st, 2nd, 3rd, etc.)
 * @param n - The number
 * @returns Number with ordinal suffix
 */
export function getOrdinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

/**
 * Truncate text with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

/**
 * Capitalize first letter of each word
 * @param text - Text to capitalize
 * @returns Capitalized text
 */
export function capitalizeWords(text: string): string {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Format a number with commas
 * @param num - Number to format
 * @returns Formatted number string
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('en-NG');
}

/**
 * Get greeting based on time of day
 * @returns Greeting string
 */
export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

/**
 * Get income category label
 * @param category - Income category key
 * @returns Human-readable label
 */
export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    salary: 'Salary',
    freelance: 'Freelance',
    business: 'Business',
    gig: 'Gig Work',
    investment: 'Investment',
    other: 'Other',
  };
  return labels[category] || category;
}

/**
 * Get income category color
 * @param category - Income category key
 * @returns CSS color variable or hex
 */
export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    salary: 'var(--color-primary)',
    freelance: 'var(--color-success)',
    business: 'var(--color-warning)',
    gig: 'var(--color-info)',
    investment: '#10B981',
    other: 'var(--color-text-secondary)',
  };
  return colors[category] || colors.other;
}

