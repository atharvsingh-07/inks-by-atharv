"use client";

import { motion } from "framer-motion";

interface StoryCardProps {
  title: string;
  category: string;
  description: string;
}

export default function StoryCard({
  title,
  category,
  description,
}: StoryCardProps) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
    >

      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/5 opacity-0 transition duration-500 group-hover:opacity-100" />

      <div className="relative z-10">

        <span className="text-sm uppercase tracking-widest text-yellow-500">
          {category}
        </span>

        <h3 className="mt-4 text-3xl font-bold">
          {title}
        </h3>

        <p className="mt-4 leading-relaxed text-zinc-400">
          {description}
        </p>

        <button className="mt-6 rounded-full border border-yellow-500/40 px-5 py-2 text-sm transition hover:bg-yellow-500 hover:text-black">
          Read More
        </button>

      </div>
    </motion.div>
  );
}