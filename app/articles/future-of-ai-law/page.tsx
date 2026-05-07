"use client";

import { motion } from "framer-motion";

export default function ArticlePage() {
  return (
    <main className="min-h-screen bg-[#efe4cf] text-[#1a1a1a]">

      {/* Paper Texture Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(120,90,40,0.06),transparent_60%)]" />

      {/* Article Container */}
      <section className="relative z-10 mx-auto max-w-5xl px-8 py-28">

        {/* Category */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-5 text-sm uppercase tracking-[0.3em] text-amber-700"
        >
          Legal Technology • AI • Future
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl text-5xl md:text-7xl font-bold leading-tight"
        >
          The Future of AI in Legal Education and Practice
        </motion.h1>

        {/* Metadata */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex flex-wrap gap-6 text-sm text-zinc-600"
        >
          <span>By Atharv</span>
          <span>May 2026</span>
          <span>8 min read</span>
        </motion.div>

        {/* Divider */}
        <div className="my-12 h-px bg-gradient-to-r from-transparent via-amber-700 to-transparent" />

        {/* Abstract Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-16 rounded-2xl border border-amber-900/10 bg-white/40 p-8 backdrop-blur-md"
        >
          <h2 className="mb-4 text-2xl font-semibold">
            Abstract
          </h2>

          <p className="leading-8 text-zinc-700">
            Artificial Intelligence is transforming legal education,
            legal research, compliance systems, judicial analysis,
            and the structure of future legal professions worldwide.
            This article explores the opportunities, ethical concerns,
            and institutional impact of AI integration in law.
          </p>
        </motion.div>

        {/* Article Body */}
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-12 text-[1.2rem] leading-[2.4rem] text-zinc-800"
        >

          <section>
            <h2 className="mb-5 text-3xl font-bold">
              Introduction
            </h2>

            <p>
              The legal profession has traditionally relied upon
              analytical reasoning, extensive documentation,
              and institutional structures resistant to rapid change.
              However, Artificial Intelligence has begun reshaping
              this ecosystem with unprecedented speed.
            </p>
          </section>

          <section>
            <h2 className="mb-5 text-3xl font-bold">
              AI in Legal Education
            </h2>

            <p>
              Law students increasingly depend upon AI-powered systems
              for legal drafting, case law analysis, research assistance,
              and conceptual clarification. Institutions worldwide are
              debating how legal education must evolve in response.
            </p>
          </section>

          <section>
            <h2 className="mb-5 text-3xl font-bold">
              Ethical Challenges
            </h2>

            <p>
              Despite technological advantages, AI introduces concerns
              involving data privacy, algorithmic bias, professional ethics,
              accountability, and overdependence upon automated reasoning.
            </p>
          </section>

          <section>
            <h2 className="mb-5 text-3xl font-bold">
              Conclusion
            </h2>

            <p>
              The future of law will likely involve collaboration between
              human reasoning and machine intelligence rather than complete
              replacement. Legal professionals who adapt intelligently
              will remain highly valuable in the evolving ecosystem.
            </p>
          </section>

        </motion.article>

      </section>
    </main>
  );
}