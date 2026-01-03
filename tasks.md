# TaxTracker NG - Development Tasks

## 📋 Project Overview
Building a mobile-first PWA for Nigerian income tracking and tax estimation based on the new 2026 Tax Act.

---

## 🏗️ Phase 1: Foundation & Setup

### 1.1 Project Configuration
- [x] Initialize Next.js project with TypeScript
- [x] Install Firebase SDK
- [ ] Configure PWA (next-pwa, manifest.json, service worker)
- [ ] Set up Firebase configuration file (`lib/firebase.ts`)
- [ ] Configure Firestore security rules for user data
- [ ] Set up environment variables for Firebase config
- [ ] Add PWA meta tags and icons

### 1.2 Design System Implementation
- [ ] Create CSS variables from design guide (`globals.css`)
- [ ] Set up color palette (Royal Blue #2B4FE8, Navy #1A1F3A, etc.)
- [ ] Configure typography scale (system fonts)
- [ ] Create spacing system (8px base)
- [ ] Set up shadow system
- [ ] Create border-radius tokens

### 1.3 Core Components Library
- [ ] Button component (Primary, Secondary, Text, Icon variants)
- [ ] Card component (Standard, Modal, Dark Header)
- [ ] Input component (Text, Number, Select, Date)
- [ ] Bottom Navigation (mobile native feel)
- [ ] Toast/Notification component
- [ ] Modal component
- [ ] Skeleton loader component
- [ ] Status indicator component
- [ ] Avatar component
- [ ] Icon system (Lucide React)

---

## 🔐 Phase 2: Authentication Flow

### 2.1 Onboarding Screens
- [ ] Onboarding layout wrapper
- [ ] Slide 1: "Do Your Taxes With Ease" + illustration
- [ ] Slide 2: "Track All Income Sources" + illustration
- [ ] Slide 3: "Created For All Business Sizes" + illustration
- [ ] Progress dots indicator
- [ ] Skip/Next navigation
- [ ] "Powered By LIRS" footer

### 2.2 Authentication Pages
- [ ] Login page (email/password)
- [ ] Sign up page (name, email, password)
- [ ] Forgot password page
- [ ] Email verification handler
- [ ] Auth context/provider
- [ ] Protected route wrapper
- [ ] Session persistence

### 2.3 Firebase Auth Integration
- [ ] Email/password authentication
- [ ] Google Sign-In (optional)
- [ ] Password reset flow
- [ ] Auth state listener
- [ ] User profile creation on signup

---

## 📱 Phase 3: Main Application

### 3.1 App Shell & Navigation
- [ ] App layout with bottom navigation
- [ ] Navigation items: Home, Income, Calculator, History, Profile
- [ ] Active state indicators
- [ ] Safe area handling for mobile
- [ ] Pull-to-refresh functionality

### 3.2 Dashboard/Home Page
- [ ] Welcome header with user name
- [ ] Total income summary card (monthly/yearly toggle)
- [ ] Income vs Tax chart (mini visualization)
- [ ] Quick actions grid:
  - Add Income
  - Calculate Tax
  - View History
  - Export Report
- [ ] Recent activity list (last 5 income entries)
- [ ] Tax projection card

### 3.3 Income Logging
- [ ] Add income form:
  - Amount (Naira input with formatting)
  - Source (text input)
  - Category dropdown (Salary, Freelance, Business, Gig, Other)
  - Date picker
  - Taxable toggle (Yes/No)
  - Notes (optional textarea)
- [ ] Edit income modal
- [ ] Delete income confirmation
- [ ] Success/error feedback (toast)

### 3.4 Income History
- [ ] List view with filters:
  - Date range picker
  - Category filter
  - Search by source
- [ ] Income item cards with:
  - Amount (formatted)
  - Source & category
  - Date
  - Taxable indicator
- [ ] Sort options (date, amount)
- [ ] Pull-to-refresh
- [ ] Empty state design
- [ ] Infinite scroll/pagination

### 3.5 Tax Calculator
- [ ] Annual income summary (auto-calculated)
- [ ] Deductions input section:
  - Annual rent paid
  - Pension contributions
  - NHIS contributions
  - NHF contributions
  - Life insurance/annuity
  - Home mortgage interest
- [ ] Calculate button
- [ ] Tax results display:
  - Gross income
  - Total deductions
  - Taxable income
  - Tax breakdown by bracket
  - Total tax owed
  - Effective tax rate
  - Net income after tax
- [ ] Save deductions to profile
- [ ] Tax bracket visualization

### 3.6 Tax History
- [ ] Monthly/yearly tax calculations
- [ ] Status indicators (Submitted, Reviewed, Approved)
- [ ] Colored list items (pastel backgrounds)
- [ ] Export individual reports

### 3.7 Profile & Settings
- [ ] User info display/edit:
  - Name
  - Email
  - Phone (optional)
- [ ] Tax preferences:
  - Fiscal year start
  - Default currency
- [ ] Saved deductions management
- [ ] Notification preferences
- [ ] Export all data
- [ ] Delete account
- [ ] Logout
- [ ] App version info

---

## 📊 Phase 4: Advanced Features

### 4.1 Data Visualization
- [ ] Install Recharts
- [ ] Monthly income bar chart
- [ ] Income by category pie chart
- [ ] Tax vs Net income comparison
- [ ] Year-over-year trends
- [ ] Interactive tooltips

### 4.2 Export Functionality
- [ ] CSV export (income records)
- [ ] PDF annual summary generation
- [ ] Share functionality
- [ ] Date range selection for exports

### 4.3 Notifications
- [ ] Push notification setup (PWA)
- [ ] "Add your latest income" reminder
- [ ] "Annual projection updated" alert
- [ ] "Near next tax bracket" notification

---

## 🗄️ Phase 5: Database & State Management

### 5.1 Firestore Structure
```
users/
  {userId}/
    profile: { name, email, phone, createdAt, preferences }
    deductions/
      {year}: { rent, pension, nhis, nhf, insurance, mortgage }
    incomes/
      {incomeId}: { amount, source, category, date, taxable, notes, createdAt }
    taxCalculations/
      {calcId}: { year, grossIncome, deductions, taxableIncome, taxOwed, createdAt }
```

### 5.2 Firestore Security Rules
- [ ] User can only read/write own data
- [ ] Validate data types and required fields
- [ ] Rate limiting considerations

### 5.3 State Management
- [ ] React Context for auth state
- [ ] React Context for user data
- [ ] Local caching strategy
- [ ] Optimistic updates
- [ ] Offline support

---

## 🎨 Phase 6: Polish & PWA

### 6.1 PWA Configuration
- [ ] Web app manifest (name, icons, theme colors)
- [ ] Service worker for offline caching
- [ ] App icons (192px, 512px)
- [ ] Splash screens
- [ ] Install prompt handling
- [ ] Standalone display mode

### 6.2 Performance
- [ ] Image optimization
- [ ] Code splitting
- [ ] Lazy loading routes
- [ ] Skeleton loading states
- [ ] Error boundaries

### 6.3 Mobile Native Feel
- [ ] Haptic feedback (where supported)
- [ ] Smooth page transitions
- [ ] Pull-to-refresh animations
- [ ] Bottom sheet modals
- [ ] iOS safe area handling
- [ ] Android status bar theming

### 6.4 Accessibility
- [ ] ARIA labels
- [ ] Focus management
- [ ] Color contrast verification
- [ ] Touch target sizes (44px min)
- [ ] Screen reader testing

---

## 📁 Project Structure

```
app/
├── (auth)/
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   ├── forgot-password/page.tsx
│   └── layout.tsx
├── (onboarding)/
│   ├── page.tsx
│   └── layout.tsx
├── (app)/
│   ├── dashboard/page.tsx
│   ├── income/
│   │   ├── page.tsx (list)
│   │   └── add/page.tsx
│   ├── calculator/page.tsx
│   ├── history/page.tsx
│   ├── profile/page.tsx
│   └── layout.tsx (with bottom nav)
├── layout.tsx
├── globals.css
└── page.tsx (redirect logic)
components/
├── ui/
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── modal.tsx
│   ├── toast.tsx
│   ├── skeleton.tsx
│   └── ...
├── navigation/
│   └── bottom-nav.tsx
├── charts/
│   ├── income-chart.tsx
│   └── tax-breakdown.tsx
└── forms/
    ├── income-form.tsx
    └── deductions-form.tsx
lib/
├── firebase.ts
├── auth.tsx (context)
├── hooks/
│   ├── useAuth.ts
│   ├── useIncomes.ts
│   └── useTax.ts
├── utils/
│   ├── tax-calculator.ts
│   ├── formatters.ts
│   └── validators.ts
└── types/
    └── index.ts
public/
├── manifest.json
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
└── sw.js
```

---

## 🧮 Tax Calculation Logic

```typescript
// Tax bands effective Jan 1, 2026
const TAX_BANDS = [
  { min: 0, max: 800000, rate: 0 },
  { min: 800001, max: 3000000, rate: 0.15 },
  { min: 3000001, max: 12000000, rate: 0.18 },
  { min: 12000001, max: 25000000, rate: 0.21 },
  { min: 25000001, max: 50000000, rate: 0.23 },
  { min: 50000001, max: Infinity, rate: 0.25 },
];

// Rent relief: 20% of annual rent, max ₦500,000
const MAX_RENT_RELIEF = 500000;
const RENT_RELIEF_PERCENTAGE = 0.20;
```

---

## 🚀 Implementation Order

### Week 1: Foundation
1. Design system & CSS variables
2. Core UI components
3. Firebase setup
4. Auth context

### Week 2: Authentication
1. Onboarding screens
2. Login/Signup pages
3. Auth integration
4. Protected routes

### Week 3: Core Features
1. Dashboard page
2. Income logging
3. Income history
4. Bottom navigation

### Week 4: Tax Features
1. Tax calculator
2. Deductions manager
3. Tax results display
4. Tax history

### Week 5: Polish
1. Charts & visualization
2. Export functionality
3. PWA configuration
4. Performance optimization

---

## ✅ Current Progress

**Status:** MVP Complete! 🎉

**Completed:**
- ✅ Design system with CSS variables
- ✅ Core UI components (Button, Card, Input, Modal, Toast, Skeleton)
- ✅ Firebase configuration with Auth and Firestore
- ✅ Onboarding screens (3 slides)
- ✅ Authentication (Login, Signup, Forgot Password)
- ✅ Dashboard with income summary and tax estimates
- ✅ Income logging and history
- ✅ Tax Calculator with 2026 Nigerian tax rules
- ✅ Profile page with logout
- ✅ Bottom navigation
- ✅ PWA manifest

**Next Steps (Post-MVP):**
1. Generate proper PWA icons (192x192, 512x512)
2. Add charts with Recharts
3. Implement export functionality (CSV/PDF)
4. Add push notifications

---

## 📝 Notes

- Mobile-first approach: Design for 375px width, then scale up
- Use system fonts for native feel
- Implement skeleton loaders instead of spinners
- All monetary values in Naira (₦) with proper formatting
- Store dates in ISO format, display in local format
- Use custom toast for feedback, not browser alerts

