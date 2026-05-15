"use client";

import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import TaxForm from "@/components/TaxForm";
import ResultsDashboard from "@/components/ResultsDashboard";
import LegalReferences from "@/components/LegalReferences";
import { StartupInput, TaxResult } from "@/lib/taxEngine";
import { LawSection } from "@/lib/taxLaws";

export default function AnalyzePage() {
  const [result, setResult] = useState<TaxResult | null>(null);
  const [laws, setLaws] = useState<LawSection[]>([]);
  const [reportId, setReportId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sessionId, setSessionId] = useState("");
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const existing = localStorage.getItem("taxwise_session");
    if (existing) {
      setSessionId(existing);
    } else {
      const newId = crypto.randomUUID();
      localStorage.setItem("taxwise_session", newId);
      setSessionId(newId);
    }
  }, []);

  const handleSubmit = async (input: StartupInput) => {
    setLoading(true);
    setError("");
    setResult(null);
    setLaws([]);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input, sessionId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setResult(data.result);
      setLaws(data.relevantLaws || []);
      setReportId(data.reportId);

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20 px-6">
        <div className="max-w-3xl mx-auto">

          <div className="mb-10 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-1.5 text-sm text-yellow-500 mb-4">
              <span className="h-2 w-2 rounded-full bg-yellow-500" />
              Tax Analyzer
            </div>
            <h1 className="text-4xl font-bold">Your startup tax profile</h1>
            <p className="mt-3 text-zinc-400">
              Fill in your details for a complete tax breakdown with legal references.
            </p>
          </div>

          <TaxForm onSubmit={handleSubmit} loading={loading} />

          {error && (
            <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-400">
              {error}
            </div>
          )}

          {result && (
            <div ref={resultsRef} className="mt-12 space-y-12">
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <div className="h-px flex-1 bg-white/10" />
                  <span className="text-xs text-zinc-500 uppercase tracking-widest">Your tax report</span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
                <ResultsDashboard result={result} reportId={reportId} />
              </div>

              {laws.length > 0 && (
                <div>
                  <div className="mb-6 flex items-center gap-3">
                    <div className="h-px flex-1 bg-white/10" />
                    <span className="text-xs text-zinc-500 uppercase tracking-widest">Legal references</span>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>
                  <LegalReferences laws={laws} />
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
