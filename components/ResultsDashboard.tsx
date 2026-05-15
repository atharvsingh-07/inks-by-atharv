"use client";

import { TaxResult } from "@/lib/taxEngine";

const fmt = (n: number) =>
  "₹" + Math.round(n).toLocaleString("en-IN");

const pct = (n: number) => (n * 100).toFixed(2) + "%";

interface Props {
  result: TaxResult;
  reportId?: string;
}

export default function ResultsDashboard({ result, reportId }: Props) {
  return (
    <div className="space-y-8">

      {/* Saved badge */}
      {reportId && (
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          Report saved · ID: {reportId}
        </div>
      )}

      {/* ── Summary metrics ── */}
      <section>
        <h3 className="section-label">Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              label: "Effective tax rate",
              value: result.effectiveTaxRate === 0 ? "0% 🎉" : pct(result.effectiveTaxRate),
              note: result.effectiveTaxRate === 0 ? "80-IAC exempt" : "incl. surcharge & cess",
            },
            {
              label: "Est. annual tax",
              value: result.incomeTax.estimatedAnnualLiability > 0
                ? fmt(result.incomeTax.estimatedAnnualLiability)
                : "—",
              note: "based on entered profit",
            },
            {
              label: "GST status",
              value:
                result.gstStatus === "mandatory"
                  ? "Mandatory"
                  : result.gstStatus === "optional"
                  ? "Optional"
                  : "Not required",
              note:
                result.gstStatus === "mandatory"
                  ? "Monthly filing required"
                  : "",
            },
            {
              label: "TDS required",
              value: result.tdsRequired ? "Yes" : "No",
              note: result.tdsRequired ? "Deposit by 7th monthly" : "",
            },
          ].map((m) => (
            <div
              key={m.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="text-xs text-zinc-400 mb-2">{m.label}</div>
              <div className="text-2xl font-semibold">{m.value}</div>
              {m.note && <div className="text-xs text-zinc-500 mt-1">{m.note}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* ── Deadlines ── */}
      <section>
        <h3 className="section-label">Upcoming deadlines</h3>
        <div className="space-y-2">
          {result.deadlines.map((d, i) => (
            <div
              key={i}
              className={`flex items-center justify-between rounded-xl border px-5 py-3 text-sm ${
                d.urgent
                  ? "border-yellow-500/20 bg-yellow-500/5 text-yellow-200"
                  : "border-white/10 bg-white/5 text-zinc-300"
              }`}
            >
              <span>{d.label}</span>
              <span className="font-medium text-xs ml-4 whitespace-nowrap">{d.date}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tax breakdown ── */}
      <section>
        <h3 className="section-label">Tax obligations breakdown</h3>
        <div className="space-y-4">

          {/* GST */}
          <TaxCard
            title="Goods & Services Tax (GST)"
            badge={
              result.gst.mandatory
                ? { label: "Monthly filing", color: "yellow" }
                : result.gst.applicable
                ? { label: "Optional", color: "blue" }
                : { label: "Not applicable", color: "gray" }
            }
            rows={[
              { label: "Applicability", value: result.gst.mandatory ? "Mandatory registration" : result.gst.applicable ? "Voluntary" : "Not required" },
              { label: "GST threshold", value: result.gst.threshold },
              { label: "Returns to file", value: result.gst.returns },
              ...(result.gst.estimatedMonthlyOutflow > 0
                ? [{ label: "Est. monthly GST outflow", value: fmt(result.gst.estimatedMonthlyOutflow) }]
                : []),
            ]}
          />

          {/* Income tax */}
          <TaxCard
            title="Corporate / Income Tax"
            badge={{ label: "Annual filing", color: "blue" }}
            rows={[
              { label: "Tax regime", value: result.incomeTax.regime },
              { label: "Base rate", value: pct(result.incomeTax.baseRate) },
              { label: "Effective rate (incl. cess)", value: result.effectiveTaxRate === 0 ? "0% — 80-IAC exempt" : pct(result.effectiveTaxRate) },
              { label: "Filing deadline", value: result.incomeTax.filingDeadline },
              ...(result.incomeTax.estimatedAnnualLiability > 0
                ? [{ label: "Est. annual liability", value: fmt(result.incomeTax.estimatedAnnualLiability) }]
                : []),
            ]}
          />

          {/* TDS */}
          {result.tds.required && (
            <TaxCard
              title="TDS — Tax Deducted at Source"
              badge={{ label: "Monthly deposit", color: "yellow" }}
              rows={[
                { label: "Deposit deadline", value: result.tds.depositDeadline },
                ...result.tds.sections.map((s) => ({
                  label: `${s.section} — ${s.description}`,
                  value: s.rate,
                })),
              ]}
            />
          )}

          {/* MCA Compliance */}
          {result.mcaCompliance.length > 0 && (
            <TaxCard
              title="MCA Annual Compliance"
              badge={{ label: "Regulatory", color: "gray" }}
              rows={result.mcaCompliance.map((m) => ({
                label: `${m.form} — ${m.description}`,
                value: m.frequency,
              }))}
            />
          )}
        </div>
      </section>

      {/* ── Benefits ── */}
      <section>
        <h3 className="section-label">Exemptions & benefits</h3>
        <div className="space-y-3">
          {result.benefits.map((b) => (
            <div
              key={b.id}
              className={`rounded-2xl border p-5 ${
                b.type === "success"
                  ? "border-green-500/20 bg-green-500/5"
                  : b.type === "warning"
                  ? "border-yellow-500/20 bg-yellow-500/5"
                  : "border-blue-500/20 bg-blue-500/5"
              }`}
            >
              <div
                className={`text-sm font-semibold mb-2 flex items-center gap-2 ${
                  b.type === "success"
                    ? "text-green-400"
                    : b.type === "warning"
                    ? "text-yellow-400"
                    : "text-blue-400"
                }`}
              >
                {b.type === "success" ? "✓" : b.type === "warning" ? "⚠" : "ℹ"}{" "}
                {b.title}
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {b.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Advisor notes ── */}
      <section>
        <h3 className="section-label">Advisor notes</h3>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
          <div className="flex items-center gap-2 text-xs text-zinc-500 mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
            Personalised analysis
          </div>
          {result.advisorNotes.map((note, i) => (
            <p key={i} className="text-sm text-zinc-300 leading-relaxed border-l-2 border-yellow-500/30 pl-4">
              {note}
            </p>
          ))}
        </div>
      </section>

      {/* ── Official portals ── */}
      <section>
        <h3 className="section-label">Official portals</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "GST Portal", url: "https://www.gst.gov.in" },
            { label: "Income Tax Portal", url: "https://www.incometax.gov.in" },
            { label: "Startup India Hub", url: "https://www.startupindia.gov.in" },
            { label: "MCA Portal", url: "https://www.mca.gov.in" },
          ].map((p) => (
            <a
              key={p.label}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-300 hover:border-yellow-500/30 hover:text-yellow-400 transition flex items-center justify-between gap-2"
            >
              {p.label}
              <span className="text-xs opacity-50">↗</span>
            </a>
          ))}
        </div>
      </section>

      <p className="text-xs text-zinc-600 text-center pb-4">
        TaxWise provides general guidance only and does not constitute legal or financial advice.
        Always consult a qualified CA for your specific situation.
      </p>
    </div>
  );
}

// ── Reusable TaxCard ──────────────────────────────────────────────────────────
function TaxCard({
  title,
  badge,
  rows,
}: {
  title: string;
  badge: { label: string; color: "yellow" | "blue" | "gray" | "green" };
  rows: { label: string; value: string }[];
}) {
  const badgeColors = {
    yellow: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    gray: "bg-white/5 text-zinc-400 border-white/10",
    green: "bg-green-500/10 text-green-400 border-green-500/20",
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <h4 className="font-medium text-sm">{title}</h4>
        <span
          className={`text-xs px-3 py-1 rounded-full border ${badgeColors[badge.color]}`}
        >
          {badge.label}
        </span>
      </div>
      <div className="px-6 py-2">
        {rows.map((row, i) => (
          <div
            key={i}
            className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-none text-sm"
          >
            <span className="text-zinc-400">{row.label}</span>
            <span className="font-medium text-right ml-4">{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
