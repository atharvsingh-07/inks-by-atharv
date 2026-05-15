"use client";

import { useState } from "react";
import { StartupInput } from "@/lib/taxEngine";

interface Props {
  onSubmit: (input: StartupInput) => void;
  loading: boolean;
}

const SELECT_CLASSES =
  "w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm focus:outline-none focus:border-yellow-500/50 transition backdrop-blur-sm";

const LABEL_CLASSES = "block text-xs font-medium text-zinc-400 mb-1.5";

export default function TaxForm({ onSubmit, loading }: Props) {
  const [form, setForm] = useState<Partial<StartupInput>>({
    monthlyProfit: 0,
  });

  const set = (key: keyof StartupInput, value: string | number) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    const required: (keyof StartupInput)[] = [
      "entity", "sector", "turnover", "startupIndia",
      "incYear", "hasTds", "funding",
    ];
    for (const f of required) {
      if (!form[f]) {
        alert(`Please fill in: ${f}`);
        return;
      }
    }
    onSubmit(form as StartupInput);
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <span className="text-yellow-500">01</span> Your startup details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Entity type */}
        <div>
          <label className={LABEL_CLASSES}>Entity type</label>
          <select className={SELECT_CLASSES} onChange={(e) => set("entity", e.target.value)} defaultValue="">
            <option value="" disabled>Select...</option>
            <option value="pvt">Private Limited (Pvt. Ltd.)</option>
            <option value="llp">LLP — Limited Liability Partnership</option>
            <option value="opc">One Person Company (OPC)</option>
            <option value="partnership">Partnership Firm</option>
            <option value="sole">Sole Proprietorship</option>
          </select>
        </div>

        {/* Sector */}
        <div>
          <label className={LABEL_CLASSES}>Industry / sector</label>
          <select className={SELECT_CLASSES} onChange={(e) => set("sector", e.target.value)} defaultValue="">
            <option value="" disabled>Select...</option>
            <option value="saas">SaaS / Software</option>
            <option value="ecommerce">E-commerce</option>
            <option value="fintech">Fintech</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="edtech">Edtech</option>
            <option value="healthtech">Healthtech</option>
            <option value="consulting">Consulting / Services</option>
            <option value="retail">Retail / FMCG</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Turnover */}
        <div>
          <label className={LABEL_CLASSES}>Annual turnover</label>
          <select className={SELECT_CLASSES} onChange={(e) => set("turnover", e.target.value)} defaultValue="">
            <option value="" disabled>Select...</option>
            <option value="under20">Under ₹20 lakhs</option>
            <option value="20to40">₹20 – ₹40 lakhs</option>
            <option value="40to1cr">₹40 lakhs – ₹1 crore</option>
            <option value="1to10cr">₹1 crore – ₹10 crore</option>
            <option value="10to25cr">₹10 crore – ₹25 crore</option>
            <option value="above25cr">Above ₹25 crore</option>
          </select>
        </div>

        {/* Startup India */}
        <div>
          <label className={LABEL_CLASSES}>DPIIT / Startup India recognised?</label>
          <select className={SELECT_CLASSES} onChange={(e) => set("startupIndia", e.target.value)} defaultValue="">
            <option value="" disabled>Select...</option>
            <option value="yes">Yes — DPIIT recognised</option>
            <option value="no">No</option>
            <option value="applying">Application in progress</option>
          </select>
        </div>

        {/* Year of incorporation */}
        <div>
          <label className={LABEL_CLASSES}>Year of incorporation</label>
          <select className={SELECT_CLASSES} onChange={(e) => set("incYear", e.target.value)} defaultValue="">
            <option value="" disabled>Select...</option>
            {[2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018].map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
            <option value="before2018">Before 2018</option>
          </select>
        </div>

        {/* TDS */}
        <div>
          <label className={LABEL_CLASSES}>Pays salaries or vendor fees?</label>
          <select className={SELECT_CLASSES} onChange={(e) => set("hasTds", e.target.value)} defaultValue="">
            <option value="" disabled>Select...</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* Funding */}
        <div>
          <label className={LABEL_CLASSES}>External funding raised?</label>
          <select className={SELECT_CLASSES} onChange={(e) => set("funding", e.target.value)} defaultValue="">
            <option value="" disabled>Select...</option>
            <option value="yes">Yes — angel / VC funded</option>
            <option value="no">No — bootstrapped</option>
          </select>
        </div>

        {/* Monthly profit */}
        <div>
          <label className={LABEL_CLASSES}>
            Estimated monthly profit (₹)
            <span className="ml-1 text-zinc-600">optional</span>
          </label>
          <input
            type="number"
            min="0"
            placeholder="e.g. 500000"
            className={SELECT_CLASSES}
            onChange={(e) => set("monthlyProfit", parseFloat(e.target.value) || 0)}
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-8 w-full rounded-2xl bg-yellow-500 py-3.5 text-black font-semibold text-base hover:bg-yellow-400 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <span className="h-4 w-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            Calculating...
          </>
        ) : (
          "Analyse my tax obligations →"
        )}
      </button>
    </div>
  );
}
