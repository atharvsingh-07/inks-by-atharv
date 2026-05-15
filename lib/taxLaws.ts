// ─────────────────────────────────────────────────────────────────────────────
// Indian Tax Law Database for Startups
// All sections reference the Income Tax Act 1961, GST Act 2017,
// Finance Acts, and CGST Rules unless otherwise noted.
// ─────────────────────────────────────────────────────────────────────────────

export interface LawSection {
  act: string;
  section: string;
  title: string;
  summary: string;
  applicability: string;
  penalty?: string;
  lastAmended?: string;
  officialRef?: string;
}

export interface TaxLawCategory {
  category: string;
  description: string;
  laws: LawSection[];
}

export const TAX_LAW_DATABASE: TaxLawCategory[] = [
  {
    category: "Corporate Tax — Rates & Regimes",
    description: "Core income tax provisions for companies and LLPs",
    laws: [
      {
        act: "Income Tax Act, 1961",
        section: "Section 115BAA",
        title: "Concessional tax rate for domestic companies",
        summary:
          "Domestic companies can opt for a flat 22% tax rate (25.17% effective after surcharge and health & education cess of 4%). Once opted, the company cannot claim most deductions including 80-IC, 80-ID, 10AA. The option is irrevocable.",
        applicability: "All domestic companies (Pvt Ltd, OPC) that forgo exemptions",
        penalty: "Incorrect filing after opting attracts interest u/s 234B & 234C",
        lastAmended: "Finance Act 2019",
        officialRef: "https://www.incometax.gov.in/iec/foportal/help/how-to-file-itr/section-115baa",
      },
      {
        act: "Income Tax Act, 1961",
        section: "Section 115BAB",
        title: "Concessional tax rate for new manufacturing companies",
        summary:
          "New domestic manufacturing companies incorporated on or after 1 October 2019 and commencing production before 31 March 2024 (extended by Finance Act 2023) can pay tax at 15% (17.16% effective). Cannot opt if already claiming 10A, 10AA, 80-IC, or other incentives.",
        applicability: "New Pvt Ltd / OPC companies in manufacturing sector only",
        penalty: "Violation of conditions leads to tax being recalculated at regular rates plus interest",
        lastAmended: "Finance Act 2023",
      },
      {
        act: "Income Tax Act, 1961",
        section: "Section 115JB",
        title: "Minimum Alternate Tax (MAT)",
        summary:
          "Companies whose regular tax liability is less than 15% of book profit must pay MAT at 15% of book profit. Companies opting for Section 115BAA or 115BAB are EXEMPT from MAT. Startups with 80-IAC exemption are also exempt from MAT for those years.",
        applicability: "Domestic companies not under 115BAA/115BAB regime",
        lastAmended: "Finance Act 2020",
      },
      {
        act: "Income Tax Act, 1961",
        section: "Section 87A",
        title: "Tax rebate for individuals (Sole proprietors)",
        summary:
          "Individual taxpayers (including sole proprietors) with total income up to ₹7 lakhs get a full tax rebate under the new regime. Under the old regime, rebate is available up to ₹5 lakhs income.",
        applicability: "Sole proprietorship entities only",
        lastAmended: "Finance Act 2023",
      },
    ],
  },
  {
    category: "Startup-Specific Exemptions",
    description: "Tax benefits exclusively available to DPIIT-recognised startups",
    laws: [
      {
        act: "Income Tax Act, 1961",
        section: "Section 80-IAC",
        title: "Tax holiday for eligible startups",
        summary:
          "DPIIT-recognised startups incorporated between 1 April 2016 and 1 April 2025 (extended via Finance Act 2024) can claim 100% deduction of profits for any 3 consecutive assessment years out of the first 10 years from incorporation. The startup must be a Pvt Ltd, LLP, or OPC. Annual turnover must not exceed ₹100 crore in the year of deduction. Form 10CCB must be filed with ITR.",
        applicability: "DPIIT-recognised Pvt Ltd, LLP, OPC — turnover below ₹100 crore",
        penalty: "If conditions are violated after claiming deduction, the deduction is reversed and tax + interest u/s 234A/B/C is payable",
        lastAmended: "Finance Act 2024",
        officialRef: "https://www.startupindia.gov.in/content/sih/en/tax-exemption.html",
      },
      {
        act: "Income Tax Act, 1961",
        section: "Section 56(2)(viib) — Angel Tax",
        title: "Angel Tax — abolished for all investors",
        summary:
          "Previously, when a startup received investment at a valuation exceeding fair market value, the excess was taxed as 'income from other sources.' Finance Act 2024 abolished Section 56(2)(viib) entirely for all categories of investors (domestic and foreign) with effect from 1 April 2024 (AY 2025-26 onwards). No startup is subject to angel tax as of FY 2024-25.",
        applicability: "All startups — angel tax no longer applies",
        lastAmended: "Finance Act 2024 — Section deleted",
      },
      {
        act: "Income Tax Act, 1961",
        section: "Section 54GB",
        title: "Capital gains exemption for investors in startups",
        summary:
          "Investors who sell a residential property and invest the long-term capital gains into equity shares of an eligible startup within 6 months get an exemption from capital gains tax. The startup must use the funds to purchase new assets within 1 year. Lock-in period: 5 years on startup shares.",
        applicability: "Investors in DPIIT-recognised startups",
        lastAmended: "Finance Act 2023 (extended deadline)",
      },
      {
        act: "Income Tax Act, 1961",
        section: "Section 79 — Carry Forward of Losses",
        title: "Loss carry forward relaxation for startups",
        summary:
          "Generally, a company cannot carry forward and set off losses if more than 49% of voting power changes hands. For DPIIT-recognised startups, this restriction is relaxed — losses can be carried forward for up to 7 years even if shareholding changes, provided all original shareholders remain shareholders on the last day of the year in which the loss is to be set off.",
        applicability: "DPIIT-recognised startups",
        lastAmended: "Finance Act 2019",
      },
    ],
  },
  {
    category: "GST — Registration & Filing",
    description: "Goods and Services Tax Act 2017 obligations",
    laws: [
      {
        act: "CGST Act, 2017",
        section: "Section 22",
        title: "Mandatory GST registration — threshold",
        summary:
          "Every supplier whose aggregate turnover exceeds ₹40 lakhs (goods) or ₹20 lakhs (services) in a financial year must register for GST. Special category states have lower thresholds of ₹20 lakhs (goods) and ₹10 lakhs (services). Threshold applies to PAN-level aggregate across all states.",
        applicability: "All businesses supplying goods or services in India",
        penalty: "Operating without registration: penalty equal to 100% of tax due or ₹10,000 — whichever is higher (Section 122)",
        lastAmended: "GST Council 32nd Meeting, 2019",
      },
      {
        act: "CGST Act, 2017",
        section: "Section 24",
        title: "Mandatory registration regardless of turnover",
        summary:
          "Certain categories must register irrespective of turnover: e-commerce operators (mandatory TCS u/s 52), inter-state suppliers, casual taxable persons, non-resident taxable persons, and those required to pay tax under reverse charge mechanism.",
        applicability: "E-commerce operators, inter-state suppliers, casual sellers",
        penalty: "Same as Section 22 — 100% of tax or ₹10,000 min",
      },
      {
        act: "CGST Act, 2017",
        section: "Section 39",
        title: "GSTR-3B — Monthly summary return",
        summary:
          "Every registered taxpayer must file GSTR-3B (summary of outward/inward supplies and tax payment) by the 20th of the following month. Quarterly filers (Composition Scheme or QRMP) file by 22nd/24th depending on state. Interest at 18% p.a. applies on late tax payment from due date.",
        applicability: "All GST-registered businesses",
        penalty: "Late filing fee: ₹50/day (₹20/day for nil return). Interest: 18% p.a. on unpaid tax",
        lastAmended: "Finance Act 2022",
      },
      {
        act: "CGST Act, 2017",
        section: "Section 37",
        title: "GSTR-1 — Outward supplies return",
        summary:
          "Monthly filers must submit GSTR-1 (invoice-level details of all sales) by the 11th of the following month. Quarterly filers submit by 13th of month after quarter. If GSTR-1 is not filed, GSTR-3B cannot be filed, blocking input tax credit for your buyers.",
        applicability: "All GST-registered businesses",
        penalty: "Late filing fee: ₹50/day. Blocking of buyer's ITC if not filed",
      },
      {
        act: "CGST Act, 2017",
        section: "Section 10",
        title: "Composition Scheme",
        summary:
          "Businesses with turnover below ₹1.5 crore (₹75 lakhs in special category states) can opt for Composition Scheme — pay tax at 1% (manufacturers/retailers) or 6% (service providers / restaurants) of turnover. File quarterly GSTR-4. Cannot issue tax invoices or collect GST from customers. Not available for e-commerce operators or inter-state suppliers.",
        applicability: "Small businesses — turnover below ₹1.5 crore",
        penalty: "Wrongful use of composition scheme: tax + penalty equal to tax amount (Section 122)",
        lastAmended: "CGST Amendment Act 2018",
      },
      {
        act: "CGST Act, 2017",
        section: "Section 16",
        title: "Input Tax Credit (ITC) eligibility",
        summary:
          "GST paid on purchases (inputs) can be claimed as credit against GST payable on sales. Conditions: (1) possess a valid tax invoice, (2) goods/services received, (3) supplier has filed their GSTR-1, (4) ITC is reflected in GSTR-2B. ITC is blocked on certain goods — motor vehicles, food, membership clubs, personal use items (Section 17(5)).",
        applicability: "All GST-registered businesses",
        penalty: "Wrongful ITC claim: 100% penalty plus reversal of ITC with 24% interest",
        lastAmended: "Finance Act 2022",
      },
    ],
  },
  {
    category: "TDS — Tax Deducted at Source",
    description: "TDS obligations under Chapter XVII-B of Income Tax Act 1961",
    laws: [
      {
        act: "Income Tax Act, 1961",
        section: "Section 192",
        title: "TDS on salary",
        summary:
          "Every employer must deduct TDS from salaries at the applicable income tax slab rate of each employee. Employer must issue Form 16 by 15 June each year. Employees must submit investment declarations and proof to employer by March 31.",
        applicability: "All employers paying salary above the basic exemption limit",
        penalty: "Non-deduction: 30% of payment disallowed as expense + 1% interest/month. Non-deposit: 1.5% interest/month + possible prosecution u/s 276B",
      },
      {
        act: "Income Tax Act, 1961",
        section: "Section 194C",
        title: "TDS on contractor payments",
        summary:
          "TDS at 1% (individual/HUF) or 2% (company/firm) on payments to contractors/sub-contractors exceeding ₹30,000 per payment or ₹1 lakh in aggregate per year. Applies to advertising agencies, transport, catering, IT development contracts.",
        applicability: "Startups paying contractors — threshold: ₹30,000/payment or ₹1L/year",
        penalty: "Failure to deduct: equal to tax not deducted. Interest: 1% (if not deducted) or 1.5% (if deducted but not deposited) per month",
      },
      {
        act: "Income Tax Act, 1961",
        section: "Section 194J",
        title: "TDS on professional and technical fees",
        summary:
          "TDS at 10% on fees paid to professionals (lawyers, CAs, doctors, architects, technical consultants) exceeding ₹30,000 per year. TDS at 2% on call centre payments. Royalties and non-compete fees also covered at 10%.",
        applicability: "Startups paying professional/technical service providers",
        penalty: "Same as Section 194C — non-deduction or non-deposit attracts interest and disallowance",
      },
      {
        act: "Income Tax Act, 1961",
        section: "Section 194I",
        title: "TDS on rent",
        summary:
          "TDS at 10% on rent for land, building, or furniture exceeding ₹2.4 lakhs per year (₹20,000/month). TDS at 2% on plant, machinery, or equipment rent. Applicable to office rent payments by startups.",
        applicability: "Startups paying office/warehouse rent above ₹2.4L/year",
        penalty: "Same as Section 194C",
      },
      {
        act: "Income Tax Act, 1961",
        section: "Section 200",
        title: "TDS deposit and quarterly returns",
        summary:
          "TDS deducted must be deposited with the government by the 7th of the following month (30 April for March deductions). Quarterly TDS returns: Form 26Q (non-salary) and Form 24Q (salary) must be filed by 31st of the month after quarter end (Q4 by 31 May). Form 16/16A must be issued to deductees within 15 days of due date of filing.",
        applicability: "All TDS deductors",
        penalty: "Late filing of TDS return: ₹200/day under Section 234E. Inaccurate filing: ₹10,000–₹1,00,000 penalty under Section 271H",
        lastAmended: "Finance Act 2015",
      },
    ],
  },
  {
    category: "Advance Tax",
    description: "Pay-as-you-earn tax obligations during the financial year",
    laws: [
      {
        act: "Income Tax Act, 1961",
        section: "Section 207–209",
        title: "Advance tax liability",
        summary:
          "Every taxpayer (company or individual) whose estimated tax liability exceeds ₹10,000 for the year must pay advance tax in 4 instalments: 15% by June 15, 45% by September 15, 75% by December 15, and 100% by March 15. Companies under 115BAA must also pay advance tax.",
        applicability: "All startups with annual tax liability above ₹10,000",
        penalty: "Shortfall in instalments attracts 1% interest per month under Section 234C. Non-payment attracts 1% per month under Section 234B",
      },
    ],
  },
  {
    category: "Annual Compliance — Companies & LLPs",
    description: "MCA and ROC filings mandatory for registered entities",
    laws: [
      {
        act: "Companies Act, 2013",
        section: "Section 137",
        title: "Filing of financial statements — Form AOC-4",
        summary:
          "Every company must file its balance sheet, P&L account, auditor's report, and directors' report with the ROC within 30 days of AGM (or within 30 October if AGM not held). OPCs have 180 days from year-end. Filing fee: ₹300 for small companies.",
        applicability: "All Pvt Ltd, OPC, Public Ltd companies",
        penalty: "₹1,000 per day of default after deadline. Directors personally liable for continued default.",
        lastAmended: "Companies Amendment Act 2020",
      },
      {
        act: "Companies Act, 2013",
        section: "Section 92",
        title: "Annual return — Form MGT-7 / MGT-7A",
        summary:
          "Every company must file its annual return within 60 days of AGM. Small companies and OPCs file abridged MGT-7A. Contains details of shareholding, directors, KMP, registered charges, and compliances.",
        applicability: "All Pvt Ltd, OPC, Public Ltd companies",
        penalty: "₹100 per day per form for delay (no cap). Directors personally liable after 270 days default.",
      },
      {
        act: "Limited Liability Partnership Act, 2008",
        section: "Section 34 — Form 8",
        title: "LLP — Statement of accounts & solvency",
        summary:
          "LLPs must file Form 8 (statement of accounts and solvency) with the MCA within 30 October each year for the previous financial year ending March 31. Must be certified by a practising CA/CS/CMA.",
        applicability: "All LLPs",
        penalty: "₹100/day per partner for delay",
      },
      {
        act: "Limited Liability Partnership Act, 2008",
        section: "Section 35 — Form 11",
        title: "LLP — Annual return",
        summary:
          "LLPs with turnover above ₹40 lakhs or contribution above ₹25 lakhs must have accounts audited. Form 11 (annual return with partner details) due by 30 May each year.",
        applicability: "All LLPs",
        penalty: "₹100/day per partner",
      },
    ],
  },
  {
    category: "Transfer Pricing & International Transactions",
    description: "Rules for startups with cross-border transactions or foreign investment",
    laws: [
      {
        act: "Income Tax Act, 1961",
        section: "Section 92–92F",
        title: "Transfer pricing regulations",
        summary:
          "If your startup transacts with foreign group companies or related parties, the price must be at arm's length (market price). Transactions above ₹1 crore require maintaining documentation. Transactions above ₹50 crore require a CA certificate in Form 3CEB filed with ITR.",
        applicability: "Startups with foreign parent, subsidiary, or related party transactions",
        penalty: "Under-reporting of income due to TP adjustment: 50% of tax on under-reported income. Failure to maintain documentation: 2% of transaction value",
        lastAmended: "Finance Act 2017",
      },
      {
        act: "FEMA, 1999 / RBI Regulations",
        section: "FEMA Regulations — FDI Policy",
        title: "Foreign Direct Investment — compliance",
        summary:
          "Startups receiving foreign investment must file FC-GPR (Form for reporting foreign investment) with RBI within 30 days of issue of shares. Annual return on FLA (Foreign Liabilities and Assets) must be filed by 15 July every year if outstanding foreign investment exists.",
        applicability: "Startups with any foreign investor / FDI",
        penalty: "Contravention of FEMA: up to 3x the sum involved or ₹2 lakhs, whichever is higher. Continuing offence: ₹5,000/day",
      },
    ],
  },
  {
    category: "E-commerce Specific",
    description: "Tax provisions specific to e-commerce operators and sellers",
    laws: [
      {
        act: "CGST Act, 2017",
        section: "Section 52",
        title: "Tax Collected at Source (TCS) by e-commerce operators",
        summary:
          "E-commerce operators (platforms like Flipkart, Amazon, or your own marketplace) must collect TCS at 1% of net taxable value of sales made through the platform. This must be deposited by the 10th of the following month and filed in GSTR-8.",
        applicability: "E-commerce platforms facilitating third-party seller transactions",
        penalty: "Failure to collect: 100% of TCS amount. Late filing of GSTR-8: ₹200/day",
      },
      {
        act: "Income Tax Act, 1961",
        section: "Section 194-O",
        title: "TDS on e-commerce participant payments",
        summary:
          "E-commerce operators must deduct TDS at 1% on gross amount of sales facilitated for sellers (individuals/HUF) above ₹5 lakhs per year. This is an additional compliance layer for marketplace operators, not individual sellers.",
        applicability: "E-commerce operators paying out to individual / HUF sellers",
        lastAmended: "Finance Act 2020 (inserted)",
      },
    ],
  },
  {
    category: "Penalties & Interest — Key Provisions",
    description: "Consequences of non-compliance — critical for startup founders to understand",
    laws: [
      {
        act: "Income Tax Act, 1961",
        section: "Section 234A",
        title: "Interest for late filing of ITR",
        summary:
          "If you file your income tax return after the due date, interest at 1% per month (or part thereof) on the unpaid tax is charged from the due date to the actual date of filing. If you have a refund, no interest is charged.",
        applicability: "All taxpayers who file ITR late",
      },
      {
        act: "Income Tax Act, 1961",
        section: "Section 271(1)(c)",
        title: "Penalty for concealment of income",
        summary:
          "If a taxpayer conceals income or furnishes inaccurate particulars, penalty of 100% to 300% of tax sought to be evaded can be levied. Replaced by Section 270A (under-reporting / misreporting) from AY 2017-18 — penalty is 50% of tax for under-reporting and 200% for misreporting.",
        applicability: "All taxpayers — critical to ensure accurate filings",
        lastAmended: "Finance Act 2016 (Section 270A inserted)",
      },
      {
        act: "CGST Act, 2017",
        section: "Section 73 & 74",
        title: "GST demand and recovery",
        summary:
          "Section 73 covers non-fraudulent cases (ignorance/mistake) — demand can be raised within 3 years, penalty is 10% of tax or ₹10,000 min. Section 74 covers fraud/suppression — demand within 5 years, penalty is 100% of tax. Interest at 18% (Section 73) or 24% (Section 74) applies.",
        applicability: "All GST-registered businesses",
        lastAmended: "Finance Act 2023",
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Helper: get relevant laws for a given startup profile
// ─────────────────────────────────────────────────────────────────────────────
export function getRelevantLaws(
  entity: string,
  sector: string,
  turnover: string,
  startupIndia: string,
  funding: string,
  hasTds: string
): LawSection[] {
  const relevant: LawSection[] = [];

  // Always include core tax rate
  if (entity === "pvt" || entity === "opc") {
    relevant.push(findLaw("Section 115BAA")!);
    if (sector === "manufacturing") relevant.push(findLaw("Section 115BAB")!);
    relevant.push(findLaw("Section 115JB")!);
  }
  if (entity === "sole") relevant.push(findLaw("Section 87A")!);

  // Startup exemptions
  if (startupIndia === "yes") {
    relevant.push(findLaw("Section 80-IAC")!);
    relevant.push(findLaw("Section 79 — Carry Forward of Losses")!);
    relevant.push(findLaw("Section 54GB")!);
  }

  // Angel tax — always show
  relevant.push(findLaw("Section 56(2)(viib) — Angel Tax")!);

  // GST
  relevant.push(findLaw("Section 22")!);
  if (sector === "ecommerce") {
    relevant.push(findLaw("Section 24")!);
    relevant.push(findLaw("Section 52")!);
    relevant.push(findLaw("Section 194-O")!);
  }
  relevant.push(findLaw("Section 39")!);
  relevant.push(findLaw("Section 37")!);
  relevant.push(findLaw("Section 16")!);
  if (["under20", "20to40", "40to1cr"].includes(turnover) && sector !== "ecommerce") {
    relevant.push(findLaw("Section 10")!);
  }

  // TDS
  if (hasTds === "yes") {
    relevant.push(findLaw("Section 192")!);
    relevant.push(findLaw("Section 194C")!);
    relevant.push(findLaw("Section 194J")!);
    relevant.push(findLaw("Section 194I")!);
    relevant.push(findLaw("Section 200")!);
  }

  // Advance tax
  relevant.push(findLaw("Section 207–209")!);

  // MCA compliance
  if (entity === "pvt" || entity === "opc") {
    relevant.push(findLaw("Section 137")!);
    relevant.push(findLaw("Section 92")!);
  }
  if (entity === "llp") {
    relevant.push(findLaw("Section 34 — Form 8")!);
    relevant.push(findLaw("Section 35 — Form 11")!);
  }

  // Penalties
  relevant.push(findLaw("Section 234A")!);
  relevant.push(findLaw("Section 73 & 74")!);

  // Foreign / transfer pricing
  if (funding === "yes") {
    relevant.push(findLaw("FEMA Regulations — FDI Policy")!);
  }

  return relevant.filter(Boolean);
}

function findLaw(titleOrSection: string): LawSection | undefined {
  for (const cat of TAX_LAW_DATABASE) {
    const found = cat.laws.find(
      (l) =>
        l.section.includes(titleOrSection) ||
        l.title.includes(titleOrSection) ||
        titleOrSection.includes(l.section)
    );
    if (found) return found;
  }
  return undefined;
}
