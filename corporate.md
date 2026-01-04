Here’s the **authoritative summary you need** if you want to include a **Corporate Income Tax (CIT) calculator and business module** in your Nigerian income-tracker app — based on the **new Nigerian Tax Act, effective January 1 2026**:

---

## 🏢 Nigeria Corporate Income Tax (CIT) — What Your App Needs to Know

### **1) Tax Rates & Bands**

Under the **Nigeria Tax Act 2025 (effective 2026)**, companies pay Corporate Income Tax on **assessable profits** with rates that depend on size:

* **Small companies** (turnover ≤ ₦50 million *and* total fixed assets ≤ ₦250 million
  **and** not professional-services firms) → **0% CIT**. ([Baker Tilly Nigeria][1])
* **Standard/large companies** → **30% CIT** on profits. ([PwC Tax Summaries][2])

There used to be a medium rate (20%) in older law drafts, but the new Act simplifies this into *small vs all others* for the main tax. ([Tax News][3])

> 📌 Small companies are fully exempt from CIT (and often from other levies like Capital Gains Tax or the 4% development levy). ([Baker Tilly Nigeria][1])

---

### **2) Development Levy**

In addition to CIT:

* A **4% development levy** is charged on *assessable profits* of companies **except small companies**. ([Gombe State Internal Revenue Service][4])

This is new under the reform and replaces a bunch of older levies (tertiary education tax, tech fund levies, etc.). ([Gombe State Internal Revenue Service][4])

---

### **3) Minimum Effective Tax Requirement**

Large companies (especially multinationals or companies with **turnover ≥ ₦20 billion**) must meet at least a **15% effective tax rate (ETR)** on profits. If the computed tax falls below 15%, an additional *top-up tax* is payable to bring the ETR up to 15%. ([Gombe State Internal Revenue Service][4])

* **Effective Tax Rate formula**:
  ( \text{ETR} = (\text{total tax paid} ÷ \text{profit before tax}) × 100 ) ([TaxEase Nigeria][5])

This means even with heavy deductions or allowances, the company has a floor tax it must meet if it’s very large.

---

### **4) Taxable Profit Definition**

Your CIT calculator will need to compute **profit before tax** and **assessable profit**:

**Assessable profit = Total revenue – allowable expenses & deductions**

Common allowable deductions for CIT include: ([PwC Tax Summaries][6])

* Interest on capital borrowed for business
* Rent
* Salaries & wages
* Repairs
* R&D expenses
* Reasonable business expenses

**Losses** can be carried forward indefinitely, but not carried back. ([PwC Tax Summaries][6])

Capital allowances (depreciation for tax purposes) on qualifying assets also reduce assessable profit. ([TaxEase Nigeria][7])

---

### **5) Capital Gains Tax (CGT)**

CGT for companies is now **aligned with CIT (30%)** and is generally treated as part of the corporate tax regime rather than a separate tax. ([Baker Tilly Nigeria][1])

---

## 🧠 How to Build a CIT Calculator

Your business module will mirror what you’d do for income tax but with corporate specifics:

### **Input Fields You’ll Need**

For each company:

| Field                      | Purpose                             |
| -------------------------- | ----------------------------------- |
| **Annual turnover**        | Determine small vs standard/large   |
| **Total fixed assets**     | Determine small company eligibility |
| **Revenue details**        | Total gross revenue                 |
| **Expenses**               | Costs allowed as deductions         |
| **Capital allowances**     | Depreciation tax adjustments        |
| **Losses carried forward** | Reduce assessable profit            |
| **Profit before tax**      | For ETR calc                        |
| **Other taxes paid**       | For ETR and top-up logic            |

---

### **Calculation Steps (Example in Code Logic)**

1. **Is small company?**
   If turnover ≤ 50 M and assets ≤ 250 M → **CIT = 0**, skip levy & ETR. ([Baker Tilly Nigeria][1])

2. **Compute assessable profits**:

   ```
   assessableProfit = revenue - allowedDeductions - capitalAllowances;
   ```

3. **Base taxes**:

   ```
   cit = assessableProfit * 30%
   devLevy = assessableProfit * 4%
   totalTax = cit + devLevy
   ```

4. **Minimum ETR check (if large)**:

   ```
   effectiveTaxRate = totalTax / profitBeforeTax
   if effectiveTaxRate < 15%:
       topUp = (15% * profitBeforeTax) - totalTax
       totalTax += topUp
   ```

5. **Report results** (breakdown, totals, effective rate).

---

## 🧩 Special Cases & Edge Logic

### **Resident vs Non-Resident**

* **Resident companies** pay CIT on worldwide profits attributable to Nigeria. ([PwC Tax Summaries][2])
* **Non-resident firms** with Nigerian operations or a permanent establishment must register and pay CIT on Nigeria-derived profits. ([PwC Tax Summaries][2])

Digital/non-resident firms earning income in Nigeria can be deemed to have a taxable presence if they generate revenue here. ([PwC Tax Summaries][2])

---

## 🧠 How This Fits Into Your App

Your corporate module can sit alongside the **individual income tracker**. Same ecosystem, different tax engines:

* **Individual tax engine** for users tracking personal income and tax.
* **Business/CIT engine** for companies tracking profits and corporate tax liability.

You can let users:

* Add multiple companies
* Enter quarterly revenue/expense data
* See profit & tax projections over time
* Export CIT reports
* Compare pre- and post-tax cash flows
* Track ETR compliance and whether top-up tax applies

---

## 🏁 Final Notes

* CIT rules in the new Act simplify corporate tax into two broad categories: **small** (tax-exempt) and **standard/large** (30% + 4% development levy). ([PwC Tax Summaries][2])
* The **15% minimum effective tax rule** is a global-style tax floor for large companies. ([Gombe State Internal Revenue Service][4])
* Allowable deductions and capital allowances are key to computing assessable profit. ([PwC Tax Summaries][6])

[1]: https://www.bakertilly.ng/insights/nigerias-2025-tax-reform-acts-explained?utm_source=chatgpt.com "Baker Tilly Nigeria | Nigeria’s 2025 Tax Reform Acts Explained: Key…"
[2]: https://taxsummaries.pwc.com/nigeria/corporate/taxes-on-corporate-income?utm_source=chatgpt.com "Nigeria - Corporate - Taxes on corporate income"
[3]: https://taxnews.ey.com/news/2025-1388-nigeria-tax-act-2025-has-been-signed-highlights?utm_source=chatgpt.com "Nigeria Tax Act, 2025 has been signed - highlights"
[4]: https://irs.gm.gov.ng/docs/national/NIGERIA_TAX_ACT_2025.pdf?utm_source=chatgpt.com "Nigeria Tax Act, 2025 2025 No. 7 A 385  |"
[5]: https://taxeasenigeria.com/blog/tax-news/nigerian-tax-act-2025-roadmap-entrepreneurs?utm_source=chatgpt.com "Understanding the Nigerian Tax Act 2025: A Roadmap for Entrepreneurs | TaxEase Nigeria Blog | TaxEase Nigeria"
[6]: https://taxsummaries.pwc.com/nigeria/corporate/deductions?utm_source=chatgpt.com "Nigeria - Corporate - Deductions"
[7]: https://taxeasenigeria.com/calculators/cit?utm_source=chatgpt.com "TaxEase Nigeria - Free Tax Calculators & AI Tax Assistant | Nigeria Tax Act 2025"
