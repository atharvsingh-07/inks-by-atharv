"use client";

import { useState } from "react";
import { LawSection } from "@/lib/taxLaws";

interface Props {
  laws: LawSection[];
}

export default function LegalReferences({ laws }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section>
      <h3 className="section-label">Legal references — applicable acts & sections</h3>
      <p className="text-xs text-zinc-500 mb-4">
        The following provisions of Indian law apply to your startup. Click any section to expand.
      </p>
      <div className="space-y-2">
        {laws.map((law) => (
          <div
            key={law.section}
            className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
          >
            {/* Header — always visible */}
            <button
              onClick={() =>
                setExpanded(expanded === law.section ? null : law.section)
              }
              className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-white/5 transition"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="shrink-0 text-xs font-mono px-2 py-0.5 rounded-md border border-yellow-500/20 bg-yellow-500/10 text-yellow-400">
                  {law.section}
                </span>
                <span className="text-sm font-medium truncate">{law.title}</span>
              </div>
              <div className="flex items-center gap-3 shrink-0 ml-3">
                <span className="text-xs text-zinc-500 hidden sm:block">{law.act}</span>
                <span className="text-zinc-500 text-xs">
                  {expanded === law.section ? "▲" : "▼"}
                </span>
              </div>
            </button>

            {/* Expanded details */}
            {expanded === law.section && (
              <div className="px-5 pb-5 border-t border-white/5 pt-4 space-y-3">
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {law.summary}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  <div className="rounded-xl bg-white/5 px-4 py-3">
                    <div className="text-xs text-zinc-500 mb-1">Applies to</div>
                    <div className="text-xs text-zinc-300">{law.applicability}</div>
                  </div>
                  {law.penalty && (
                    <div className="rounded-xl bg-red-500/5 border border-red-500/10 px-4 py-3">
                      <div className="text-xs text-red-400 mb-1">Penalty for non-compliance</div>
                      <div className="text-xs text-zinc-300">{law.penalty}</div>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-4 flex-wrap pt-1">
                  {law.lastAmended && (
                    <span className="text-xs text-zinc-600">
                      Last amended: {law.lastAmended}
                    </span>
                  )}
                  {law.officialRef && (
                    <a
                      href={law.officialRef}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-yellow-500 hover:text-yellow-400 transition"
                    >
                      Official reference ↗
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
