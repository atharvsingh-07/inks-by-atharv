export type EntityType = "pvt" | "llp" | "opc" | "partnership" | "sole";
export type Sector =
  | "saas"
  | "ecommerce"
  | "fintech"
  | "manufacturing"
  | "edtech"
  | "healthtech"
  | "consulting"
  | "retail"
  | "other";
export type TurnoverBand =
  | "under20"
  | "20to40"
  | "40to1cr"
  | "1to10cr"
  | "10to25cr"
  | "above25cr";

export interface StartupInput {
  entity: EntityType;
  sector: Sector;
  turnover: TurnoverBand;
  startupIndia: "yes" | "no" | "applying";
  incYear: string;
  hasTds: "yes" | "no";
  funding: "yes" | "no";
  monthlyProfit: number;
}

export interface TaxResult {
  // Summary metrics
  effectiveTaxRate: number;
  estimatedAnnualTax: number;
  gstStatus: "mandatory" | "optional" | "not-required";
  tdsRequired: boolean;

  // GST details
  gst: {
    applicable: boolean;
    mandatory: boolean;
    threshold: string;
    returns: string;
    estimatedMonthlyOutflow: number;
  };

  // Corporate / income tax
  incomeTax: {
    baseRate: number;
    effectiveRate: number;
    filingDeadline: string;
    estimatedAnnualLiability: number;
    regime: string;
  };

  // TDS
  tds: {
    required: boolean;
    depositDeadline: string;
    sections: { section: string; description: string; rate: string }[];
  };

  // Deadlines
  deadlines: { label: string; date: string; urgent: boolean }[];

  // Benefits
  benefits: {
    id: string;
    title: string;
    description: string;
    type: "success" | "info" | "warning";
    qualifies: boolean;
  }[];

  // AI notes
  advisorNotes: string[];

  // MCA compliance
  mcaCompliance: { form: string; description: string; frequency: string }[];
}

export function calculateTax(input: StartupInput): TaxResult {
  const currentYear = 2026;
  const incYear =
    input.incYear === "before2018" ? 2017 : parseInt(input.incYear);
  const yearsSinceInc = currentYear - incYear;

  // ── GST logic ──────────────────────────────────────────────────────────────
  const isServiceSector = [
    "saas",
    "fintech",
    "edtech",
    "healthtech",
    "consulting",
  ].includes(input.sector);
  const gstThresholdLabel = isServiceSector ? "₹20 lakhs" : "₹40 lakhs";

  const gstMandatory =
    ["40to1cr", "1to10cr", "10to25cr", "above25cr"].includes(
      input.turnover
    ) ||
    input.sector === "ecommerce" ||
    (isServiceSector && input.turnover !== "under20");

  const gstOptional = !gstMandatory && input.turnover === "20to40";
  const gstStatus: "mandatory" | "optional" | "not-required" = gstMandatory
    ? "mandatory"
    : gstOptional
    ? "optional"
    : "not-required";

  const annualProfit = input.monthlyProfit * 12;
  const estimatedMonthlyGst = gstMandatory
    ? Math.round(annualProfit * 0.18) / 12
    : 0;

  // ── Corporate / income tax ─────────────────────────────────────────────────
  let baseRate = 0.22;
  let regime = "New tax regime (Section 115BAA)";

  if (input.sector === "manufacturing" && input.entity === "pvt") {
    baseRate = 0.15;
    regime = "New manufacturing company (Section 115BAB)";
  } else if (input.entity === "llp" || input.entity === "partnership") {
    baseRate = 0.30;
    regime = "LLP / Partnership flat rate";
  } else if (input.entity === "sole") {
    baseRate = 0.30;
    regime = "Individual slab rate (highest bracket)";
  }

  // Surcharge + cess
  let effectiveRate = baseRate;
  if (input.entity === "pvt" || input.entity === "opc") {
    effectiveRate = baseRate === 0.15 ? 0.1716 : 0.2517;
  } else if (input.entity === "llp" || input.entity === "partnership") {
    effectiveRate = 0.3093;
  } else {
    effectiveRate = baseRate + 0.04; // cess only
  }

  // 80-IAC exemption
  const eligible80IAC =
    input.startupIndia === "yes" &&
    yearsSinceInc <= 10 &&
    ["pvt", "llp", "opc"].includes(input.entity);

  if (eligible80IAC) effectiveRate = 0;

  const estimatedAnnualTax = Math.round(annualProfit * effectiveRate);

  // ── TDS sections ───────────────────────────────────────────────────────────
  const tdsSections = [
    {
      section: "Section 192",
      description: "Salary payments",
      rate: "Per employee slab",
    },
    {
      section: "Section 194C",
      description: "Contractor / sub-contractor payments",
      rate: "1% (individual) / 2% (company)",
    },
    {
      section: "Section 194J",
      description: "Professional / technical fees",
      rate: "10%",
    },
    {
      section: "Section 194I",
      description: "Rent payments above ₹2.4L/year",
      rate: "10%",
    },
  ];

  // ── Deadlines ──────────────────────────────────────────────────────────────
  const deadlines = [];
  if (input.hasTds === "yes") {
    deadlines.push({
      label: "TDS deposit (every month)",
      date: "7th of following month",
      urgent: true,
    });
    deadlines.push({
      label: "TDS quarterly return (Form 24Q/26Q)",
      date: "31st of month after quarter end",
      urgent: false,
    });
  }
  if (gstMandatory) {
    deadlines.push({
      label: "GSTR-3B (monthly summary)",
      date: "20th of every month",
      urgent: true,
    });
    deadlines.push({
      label: "GSTR-1 (sales register)",
      date: "11th of every month",
      urgent: true,
    });
  }
  deadlines.push({
    label: "Income Tax Return (ITR) filing",
    date: "31 October 2026",
    urgent: false,
  });
  if (["pvt", "llp", "opc"].includes(input.entity)) {
    deadlines.push({
      label: "Advance tax (4th instalment)",
      date: "15 March 2026",
      urgent: false,
    });
  }

  // ── Benefits ───────────────────────────────────────────────────────────────
  const benefits = [
    {
      id: "80iac",
      title: "Section 80-IAC — 100% profit deduction for 3 years",
      description: eligible80IAC
        ? "You qualify! As a DPIIT-recognised startup within your first 10 years, you can claim a 100% deduction on profits for any 3 consecutive years. Apply via the income tax portal using Form 10CCB before your next ITR filing."
        : input.startupIndia === "no"
        ? "Not currently eligible. Register with DPIIT (Startup India) — it's free — to unlock this benefit and reduce your tax burden to zero for 3 years."
        : input.startupIndia === "applying"
        ? "Once your DPIIT recognition is approved, you can apply for this benefit through the income tax portal. Keep your registration certificate handy."
        : yearsSinceInc > 10
        ? "Unfortunately your startup has passed the 10-year window for this exemption. It only applies within the first 10 years of incorporation."
        : "Not applicable for your entity type. Only Pvt Ltd, LLP, and OPC entities can claim this benefit.",
      type: eligible80IAC
        ? ("success" as const)
        : input.startupIndia === "no"
        ? ("info" as const)
        : ("warning" as const),
      qualifies: eligible80IAC,
    },
    {
      id: "angeltax",
      title: "Angel Tax (Section 56(2)(viib)) — abolished",
      description:
        input.funding === "yes"
          ? "Great news — the government abolished angel tax for all investors (domestic and foreign) in Budget 2024. Capital raised from investors is no longer treated as income for your startup."
          : "If you raise external funding in the future, note that angel tax has been abolished. Capital raised from angel investors or VCs is no longer taxable as income.",
      type: "success" as const,
      qualifies: true,
    },
    {
      id: "startuppresumptive",
      title: "Presumptive taxation (Section 44AD/44ADA)",
      description:
        input.entity === "sole" || input.entity === "partnership"
          ? "You may qualify for presumptive taxation — declare 8% of turnover as profit (6% for digital transactions) and skip maintaining detailed books. Applicable if turnover is below ₹2 crores (goods) or ₹50 lakhs (professionals)."
          : "Not applicable — presumptive taxation is only for sole proprietors, partnerships, and professionals, not companies.",
      type:
        input.entity === "sole" || input.entity === "partnership"
          ? ("success" as const)
          : ("info" as const),
      qualifies:
        input.entity === "sole" || input.entity === "partnership",
    },
    {
      id: "compositionscheme",
      title: "GST Composition Scheme",
      description:
        ["under20", "20to40", "40to1cr"].includes(input.turnover) &&
        input.sector !== "ecommerce"
          ? "If your turnover is below ₹1.5 crore, you can opt for the GST Composition Scheme — pay a flat 1–6% GST rate and file quarterly instead of monthly. Simpler compliance, lower burden."
          : "Not applicable — composition scheme is for turnover below ₹1.5 crore and is not available for e-commerce operators or inter-state suppliers.",
      type: ["under20", "20to40", "40to1cr"].includes(input.turnover)
        ? ("success" as const)
        : ("info" as const),
      qualifies:
        ["under20", "20to40", "40to1cr"].includes(input.turnover) &&
        input.sector !== "ecommerce",
    },
  ];

  // ── Advisor notes ──────────────────────────────────────────────────────────
  const sectorNotes: Record<string, string> = {
    saas: "SaaS is classified as a service — your GST threshold is ₹20 lakhs, not ₹40 lakhs. B2B invoices must include GST even if your turnover is below the threshold when your client is GST-registered.",
    ecommerce:
      "E-commerce operators must mandatorily register for GST regardless of turnover under Section 24 of the GST Act. TCS (Tax Collected at Source) at 1% applies on net taxable sales through your platform.",
    fintech:
      "Fintech companies face layered compliance — RBI regulations, SEBI rules, and tax obligations often overlap. Engage a CA who specialises in financial services early.",
    manufacturing:
      input.entity === "pvt"
        ? "New manufacturing companies incorporated after October 2019 qualify for a 15% base tax rate (17.16% effective) under Section 115BAB — one of the lowest corporate tax rates in Asia."
        : "Only Private Limited companies get the 15% manufacturing rate. Consider converting your entity type to unlock this significant saving.",
    edtech:
      "Edtech has mixed GST treatment — pure educational services may be exempt, but software subscriptions, live tutoring, and recorded content attract 18% GST. Get a GST classification audit done.",
    healthtech:
      "Healthcare services are largely GST-exempt, but SaaS/software components of your product attract 18%. Ensure your invoices clearly separate exempt and taxable components.",
    consulting:
      "Consultants and professionals can opt for the presumptive scheme under Section 44ADA — declare 50% of receipts as profit and skip detailed bookkeeping, if turnover is below ₹50 lakhs.",
    retail:
      "Retail businesses with goods turnover above ₹40 lakhs must register for GST. The composition scheme (flat 1%) is available below ₹1.5 crore turnover.",
    other:
      "Ensure your accountant correctly classifies your primary business activity — the HSN/SAC code on your GST registration determines your applicable tax rates.",
  };

  const entityNotes: Record<string, string> = {
    pvt: "Pvt. Ltd. companies must file two MCA annual returns — AOC-4 (financials, by 30 Nov) and MGT-7 (annual return, by 28 Nov). Penalty for late filing is ₹100/day per form.",
    llp: "LLPs must file Form 11 (annual return, by 30 May) and Form 8 (statement of accounts, by 30 Oct) with the MCA each year. Tax audit is mandatory if turnover exceeds ₹1 crore.",
    opc: "OPCs have the same tax treatment as Pvt. Ltd. They are exempt from AGM requirements but must convert to a Pvt. Ltd. if paid-up share capital exceeds ₹50 lakhs or turnover exceeds ₹2 crore.",
    partnership:
      "Partnership firms are taxed at 30% flat — there is no concessional rate. If your business is growing, converting to an LLP or Pvt. Ltd. can significantly reduce your tax burden.",
    sole: "Sole proprietors are taxed at individual slab rates. Income above ₹10 lakhs/year is taxed at 30%. As your business grows, incorporating as a Pvt. Ltd. (taxed at 25.17%) becomes more tax-efficient.",
  };

  const notes = [
    sectorNotes[input.sector] || sectorNotes.other,
    entityNotes[input.entity],
    eligible80IAC
      ? "Your 80-IAC eligibility is your biggest tax advantage. File Form 10CCB with your ITR to claim the 3-year profit exemption — this can save you lakhs in taxes."
      : input.startupIndia === "no"
      ? "Applying for DPIIT Startup India recognition is free and takes 2–3 weeks. It unlocks 80-IAC tax holidays, self-certification for labour laws, and fast-track IP filings."
      : "",
    input.hasTds === "yes"
      ? "Missed TDS deposits attract interest at 1.5% per month and can trigger scrutiny assessments. Set an automated reminder for the 7th of every month."
      : "",
    annualProfit > 1000000
      ? "Your estimated profits suggest advance tax payments are mandatory. Pay in 4 instalments: 15% by June 15, 45% by Sep 15, 75% by Dec 15, 100% by March 15."
      : "",
    "Consider hiring a CA for your first filing year. The typical cost of ₹15,000–₹50,000 is recovered many times over through optimised deductions and avoided penalties.",
  ].filter(Boolean) as string[];

  // ── MCA compliance ─────────────────────────────────────────────────────────
  const mcaCompliance: { form: string; description: string; frequency: string }[] = [];
  if (input.entity === "pvt" || input.entity === "opc") {
    mcaCompliance.push(
      { form: "AOC-4", description: "Filing of financial statements", frequency: "Annual — 30 November" },
      { form: "MGT-7 / MGT-7A", description: "Annual return filing", frequency: "Annual — 28 November" },
      { form: "ADT-1", description: "Appointment of auditor", frequency: "Once / on change" }
    );
  }
  if (input.entity === "llp") {
    mcaCompliance.push(
      { form: "Form 11", description: "LLP annual return", frequency: "Annual — 30 May" },
      { form: "Form 8", description: "Statement of accounts & solvency", frequency: "Annual — 30 October" }
    );
  }

  return {
    effectiveTaxRate: effectiveRate,
    estimatedAnnualTax,
    gstStatus,
    tdsRequired: input.hasTds === "yes",
    gst: {
      applicable: gstMandatory || gstOptional,
      mandatory: gstMandatory,
      threshold: gstThresholdLabel,
      returns: gstMandatory ? "GSTR-1 (11th) + GSTR-3B (20th)" : "—",
      estimatedMonthlyOutflow: estimatedMonthlyGst,
    },
    incomeTax: {
      baseRate,
      effectiveRate,
      filingDeadline: "31 October 2026",
      estimatedAnnualLiability: estimatedAnnualTax,
      regime,
    },
    tds: {
      required: input.hasTds === "yes",
      depositDeadline: "7th of following month",
      sections: tdsSections,
    },
    deadlines,
    benefits,
    advisorNotes: notes,
    mcaCompliance,
  };
}
