"use client";

import { motion } from "framer-motion";

export default function StoryPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0b0907] text-[#f5efe6]">

      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,160,23,0.08),transparent_60%)]" />

      <div className="absolute top-20 left-20 h-96 w-96 rounded-full bg-yellow-500/5 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-orange-500/5 blur-3xl" />

      {/* Reading Progress Line */}
      <div className="fixed top-0 left-0 z-50 h-[2px] w-1/3 bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.8)]" />

      {/* Main Reading Area */}
      <section className="relative z-10 mx-auto max-w-4xl px-8 py-32">

        {/* Chapter Label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 text-sm uppercase tracking-[0.4em] text-yellow-500"
        >
          Chapter One
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-3xl text-6xl md:text-8xl font-bold leading-[1.1]"
        >
          Whispers of Tomorrow
        </motion.h1>

        {/* Decorative Divider */}
        <div className="my-12 h-px bg-gradient-to-r from-transparent via-yellow-600 to-transparent" />

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-16 border-l-2 border-yellow-500 pl-6 italic text-zinc-400"
        >
          “Sometimes silence becomes louder than words.”
        </motion.blockquote>

        {/* Story Content */}
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-12 text-[1.35rem] leading-[2.8rem] text-zinc-300"
        >

          <p>
            The corridor lights flickered softly as Aarav walked alone
            through the silent hostel hallway. Midnight had already passed,
            yet sleep felt distant from his restless mind.
          </p>

          <p>
            Outside the window, rain touched the empty campus roads.
            Inside his heart, another storm had already begun —
            one made of expectations, loneliness, ambition, and memories
            that refused to disappear.
          </p>

          <p>
            Law school was never only about books and lectures.
            Sometimes it became a battlefield of identity,
            survival, friendships, and emotional silence.
          </p>

          <p>
            And somewhere between unfinished assignments,
            unanswered messages, and endless overthinking,
            Aarav slowly realized:
            growing up was far more painful than anyone had warned him.
          </p>

          <p>
            Somewhere far away, another chapter of his life
            was already waiting to begin.
          </p>

        </motion.article>

      </section>
    </main>
  );
}