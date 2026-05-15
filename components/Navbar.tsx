"use client";

import { useEffect, useState } from "react";
import { PenTool, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/30 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <Link href="/" className="flex items-center gap-3">
          <PenTool className="h-6 w-6 rotate-[280deg] text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.7)]" />
          <span className="text-xl font-semibold tracking-wide">TaxWise</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-zinc-300">
          <a href="/#how-it-works" className="transition hover:text-yellow-500">
            How it works
          </a>
          <Link href="/analyze" className="transition hover:text-yellow-500">
            Tax Analyzer
          </Link>
          <Link href="/history" className="transition hover:text-yellow-500">
            My Reports
          </Link>
          <a href="/#about" className="transition hover:text-yellow-500">
            About
          </a>

          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full border border-white/10 p-2 transition hover:bg-white/10"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-black" />
              )}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
