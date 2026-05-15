"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

interface Report {
  _id: string;
  createdAt: string;
  input: {
    entity: string;
    sector: string;
    turnover: string;
    monthlyProfit: number;
  };
  result: {
    effectiveTaxRate: number;
    gstStatus: string;
    tdsRequired: boolean;
  };
}

const ENTITY_LABELS: Record<string, string> = {
  pvt: "Pvt. Ltd.", llp: "LLP", opc: "OPC",
  partnership: "Partnership", sole: "Sole Proprietorship",
};
const SECTOR_LABELS: Record<string, string> = {
  saas: "SaaS", ecommerce: "E-commerce", fintech: "Fintech",
  manufacturing: "Manufacturing", edtech: "Edtech", healthtech: "Healthtech",
  consulting: "Consulting", retail: "Retail", other: "Other",
};
const TURNOVER_LABELS: Record<string, string> = {
  under20: "< ₹20L", "20to40": "₹20–40L", "40to1cr": "₹40L–1Cr",
  "1to10cr": "₹1–10Cr", "10to25cr": "₹10–25Cr", above25cr: "> ₹25Cr",
};

export default function HistoryPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const sessionId = localStorage.getItem("taxwise_session");
    if (!sessionId) { setLoading(false); return; }

    fetch(`/api/reports?sessionId=${sessionId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setReports(data.reports || []);
      })
      .catch(() => setError("Failed to load reports."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20 px-6">
        <div className="max-w-3xl mx-auto">

          <div className="mb-10">
            <h1 className="text-4xl font-bold mb-2">My reports</h1>
            <p className="text-zinc-400">Your saved tax analyses from this device.</p>
          </div>

          {loading && (
            <div className="text-zinc-500 text-sm flex items-center gap-2">
              <span className="h-4 w-4 border-2 border-white/10 border-t-zinc-400 rounded-full animate-spin" />
              Loading reports...
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-400">
              {error}
            </div>
          )}

          {!loading && reports.length === 0 && !error && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
              <p className="text-zinc-400 mb-4">No reports saved yet.</p>
              <Link
                href="/analyze"
                className="rounded-full bg-yellow-500 px-6 py-2.5 text-black font-semibold text-sm hover:bg-yellow-400 transition"
              >
                Run my first analysis →
              </Link>
            </div>
          )}

          <div className="space-y-4">
            {reports.map((r) => (
              <div
                key={r._id}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs px-2.5 py-0.5 rounded-full border border-white/10 bg-white/5 text-zinc-300">
                        {ENTITY_LABELS[r.input.entity] || r.input.entity}
                      </span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full border border-white/10 bg-white/5 text-zinc-300">
                        {SECTOR_LABELS[r.input.sector] || r.input.sector}
                      </span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full border border-white/10 bg-white/5 text-zinc-300">
                        {TURNOVER_LABELS[r.input.turnover] || r.input.turnover}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-600 mt-2">
                      {new Date(r.createdAt).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-lg font-semibold">
                      {r.result.effectiveTaxRate === 0
                        ? "0% tax"
                        : (r.result.effectiveTaxRate * 100).toFixed(2) + "%"}
                    </div>
                    <div className="text-xs text-zinc-500">effective rate</div>
                  </div>
                </div>

                <div className="flex gap-3 flex-wrap text-xs">
                  <span
                    className={`px-2.5 py-1 rounded-lg ${
                      r.result.gstStatus === "mandatory"
                        ? "bg-yellow-500/10 text-yellow-400"
                        : "bg-white/5 text-zinc-400"
                    }`}
                  >
                    GST: {r.result.gstStatus}
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-lg ${
                      r.result.tdsRequired
                        ? "bg-yellow-500/10 text-yellow-400"
                        : "bg-white/5 text-zinc-400"
                    }`}
                  >
                    TDS: {r.result.tdsRequired ? "required" : "not required"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
