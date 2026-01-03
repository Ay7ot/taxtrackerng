Below is an **extensive, structured product document** for your Nigerian **Income Tracker App** that includes the necessary **tax rules and systems** under the _new Nigeria Tax Act (effective January 1, 2026)_. I pulled authoritative details and relief/deduction rules from official reporting and tax summaries so your app’s logic will be grounded in real law. ([Nairametrics][1])

---

# 📘 Product Requirements Document

### **TaxTracker NG**

**Version:** 1.0
**Last Updated:** January 2026

---

## 🧩 1) Product Overview

**TaxTracker NG** is a mobile/web app for Nigerians to **log every income event**, visualize earnings over time, and **estimate personal income tax** based on the _new Nigerian tax reforms effective January 1, 2026_. The app helps users understand net income after tax, track progress toward goals, and forecast future incomes/taxes.

---

## 🎯 2) Objectives

### **Primary Objectives**

- Enable users to track all income sources (jobs, gigs, business, freelance).
- Provide real-time visualization of income trends (daily/weekly/monthly/yearly).
- Calculate **annual taxable income and tax owed** using the new Nigerian tax rules.
- Allow users to enter allowable deductions like rent relief, pensions, NHIS, NHF, etc.

### **Secondary Objectives**

- Support export of reports (CSV/PDF).
- Provide customizable dashboards and notifications.
- Plan income goals and tax projections.

---

## 📊 3) Target Users

| Segment                                  | Needs                                                   |
| ---------------------------------------- | ------------------------------------------------------- |
| Salaried employees                       | Track pay, see net income after tax, project annual tax |
| Freelancers & contractors                | Record irregular income flows                           |
| Small business owners (sole proprietors) | See business income combined with personal income       |
| Gig workers (drivers, creatives)         | Monitor earnings across platforms                       |

---

## 📌 4) Tax Rules & Requirements (Effective Jan 1, 2026)

These rules govern how the app computes taxable income and tax due:

### **4.1 Progressive Personal Income Tax Bands**

Under the new tax regime:

| Taxable Income Bracket    | Rate    |                         |
| ------------------------- | ------- | ----------------------- |
| ₦0 – ₦800,000             | **0%**  |                         |
| ₦800,001 – ₦3,000,000     | **15%** |                         |
| ₦3,000,001 – ₦12,000,000  | **18%** |                         |
| ₦12,000,001 – ₦25,000,000 | **21%** |                         |
| ₦25,000,001 – ₦50,000,000 | **23%** |                         |
| Above ₦50,000,000         | **25%** | ([Naijaonpoint.com][2]) |

**Notes**

- The first **₦800,000 of taxable income is tax-free**. ([Naijaonpoint.com][2])
- Rates apply progressively per bracket. ([Naijaonpoint.com][2])

---

### **4.2 Allowable Deductions (Reliefs)**

Allowable deductions reduce taxable income:

| Deduction                                    | Details                                                                        |
| -------------------------------------------- | ------------------------------------------------------------------------------ |
| Rent Relief                                  | 20 % of annual rent, max ₦500,000 (documentation required) ([Nairametrics][1]) |
| Pension Contributions                        | Contributions to pension funds (PFA) ([Nairametrics][1])                       |
| NHIS Contributions                           | National Health Insurance Scheme ([Nairametrics][1])                           |
| NHF Contributions                            | National Housing Fund ([Nairametrics][1])                                      |
| Interest on loans for owner-occupied housing | Applicable subject to documentation ([Nairametrics][1])                        |
| Life insurance/annuity premiums              | Deductible with proof ([Nairametrics][1])                                      |

**Important:** The old consolidated relief and personal relief are replaced with the rent-based system under the new act. ([TheCable][3])

---

### **4.3 Taxable Income Calculation**

Taxable income = **Total logged income for the year**
         − **Total allowable deductions**

**Example:**
If total logged income = ₦6,000,000 and deductions = ₦500,000 → taxable income = ₦5,500,000.

---

## 📌 5) Functional Requirements

### **5.1 User & Account Management**

- Email/phone registration
- Multi-device sync
- Profile with tax preferences (fiscal year, tax year)

---

### **5.2 Income Logging**

Each income record includes:

| Field    | Description                 |
| -------- | --------------------------- |
| Amount   | Gross amount                |
| Source   | Job/client/gig description  |
| Category | Salary, freelance, business |
| Date     | Received date               |
| Taxable  | Yes/No flag                 |
| Notes    | Optional details            |

---

### **5.3 Deductions Input**

Users should enter:

- Annual rent paid
- Pension contributions
- NHIS/NHF payments
- Life insurance/annuity details
- Home mortgage interest (if owner-occupied)

---

### **5.4 Tax Computation Module**

Automatically:

1. Aggregates incomes by year.
2. Aggregates deductions.
3. Applies tax bands.
4. Calculates **estimated annual tax** and **effective tax rate**.

---

### **5.5 Dashboard & Visualization**

Provide:

- Yearly income vs tax chart
- Monthly breakdown
- Net income progression
- Tax projections

Charts should use libraries like **Recharts** or **Chart.js**.

---

### **5.6 Export & Sharing**

- Export to CSV
- PDF annual summary
- Shareable summary views

---

### **5.7 Notifications & Alerts**

Examples:

- “Add your latest income”
- “Annual projection updated”
- “You’re near the next tax bracket”

---

## 🔐 6) Security & Compliance

- Secure authentication (tokens/OAuth)
- encryption at rest and in transit
- Local data privacy compliant with Nigerian laws

---

## ⚙️ 7) Architecture (High Level)

```
Frontend
 ├─ React / React Native
 ├─ Redux/MobX for state
 ├─ Secure storage (local + cloud sync)
Backend
 ├─ Node.js / Django / Laravel
 ├─ REST APIs / GraphQL
 ├─ PostgreSQL / MongoDB
Tax Engine
 ├─ Rule module (tax bands/deductions)
 ├─ Yearly summation
 ├─ Progressive computation
```

---

## 🧠 8) Future Systems & Enhancements

### 📍 8.1 Bank Sync API

Auto-import income transactions.

### 📍 8.2 Multi-Currency Support

If user works with foreign income.

### 📍 8.3 Automated Filing Support

Generate forms that match Nigerian Revenue Service filing formats.

### 📍 8.4 Presumptive Tax Modes

Support informal sector taxpayers (no formal pay records). ([EY Tax News][4])

---

## 📊 9) Metrics to Track

- Monthly Active Users (MAU)
- Income records entered
- Total income logged year-to-date
- Taxes estimated
- Feature usage (dashboard vs logs vs exports)

---

## 📌 10) Roadmap (MVP → V2)

| Release | Features                                  |
| ------- | ----------------------------------------- |
| **MVP** | Income logging, dashboard, tax estimation |
| **V1**  | Reporting exports, deductions manager     |
| **V2**  | Bank sync, push reminders                 |
| **V3**  | Filing assistance, international income   |

---

## 📌 11) Glossary

- **Taxable Income:** Income after deductions that is subject to tax. ([Naijaonpoint.com][2])
- **Rent Relief:** New deduction permitted under the 2025 Tax Act. ([Nairametrics][1])
- **Progressive Tax:** A system where higher income segments are taxed at higher rates. ([Naijaonpoint.com][2])

[1]: https://nairametrics.com/2025/11/04/tax-reforms-committee-unveils-50-exemptions-for-low-income-earners-smes-from-2026/?utm_source=chatgpt.com "Tax reforms committee unveils 50 exemptions for low-income earners, SMEs from 2026  - Nairametrics"
[2]: https://www.naijaonpoint.com/personal-income-tax-in-nigeria-what-changes-on-1-jan-2026-and-how-it-affects-you/?utm_source=chatgpt.com "Personal Income Tax in Nigeria: What Changes on 1 Jan 2026 (and How It Affects You) - Naijaonpoint.com"
[3]: https://www.thecable.ng/new-tax-law-introduces-rent-relief-capped-at-n500k-for-nigerians/?utm_source=chatgpt.com "New tax law introduces rent relief capped at N500k for Nigerians"
[4]: https://taxnews.ey.com/news/2025-1388-nigeria-tax-act-2025-has-been-signed-highlights?utm_source=chatgpt.com "Nigeria Tax Act, 2025 has been signed - highlights"
