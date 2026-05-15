import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">

        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-1.5 text-sm text-yellow-500">
          <span className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse" />
          AI-powered · India-specific · Free to use
        </div>

        {/* Headline */}
        <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight md:text-6xl">
          Tax clarity for{" "}
          <span className="text-yellow-500">Indian startups</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg text-zinc-400 leading-relaxed">
          Enter your startup details and get a personalised breakdown of GST,
          income tax, TDS obligations and startup exemptions — instantly.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/analyze"
            className="rounded-full bg-yellow-500 px-8 py-3 text-black font-semibold hover:bg-yellow-400 transition text-base"
          >
            Get my tax report →
          </Link>
          <a
            href="#how-it-works"
            className="rounded-full border border-white/10 px-8 py-3 text-sm text-zinc-300 hover:bg-white/5 transition"
          >
            How it works
          </a>
        </div>

        {/* Feature pills */}
        <div className="mt-16 flex flex-wrap justify-center gap-3 text-sm text-zinc-400">
          {[
            "GST applicability check",
            "Corporate tax calculator",
            "TDS obligations",
            "80-IAC tax holiday",
            "Angel tax exemption",
            "Filing deadlines",
            "Official portal links",
            "MongoDB report saving",
          ].map((f) => (
            <span
              key={f}
              className="rounded-full border border-white/10 px-4 py-1.5"
            >
              {f}
            </span>
          ))}
        </div>

        {/* How it works */}
        <section id="how-it-works" className="mt-28 max-w-3xl w-full text-left">
          <h2 className="text-2xl font-bold mb-10 text-center">How it works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Enter your details",
                desc: "Tell us your entity type, sector, turnover, and funding status.",
              },
              {
                step: "02",
                title: "Get your tax profile",
                desc: "We calculate GST, corporate tax, TDS rates and applicable exemptions.",
              },
              {
                step: "03",
                title: "Take action",
                desc: "See deadlines, benefits you qualify for, and links to official portals.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
              >
                <div className="text-3xl font-bold text-yellow-500/40 mb-3">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <p className="mt-20 text-xs text-zinc-600 max-w-md">
          TaxWise provides general guidance only and does not constitute legal
          or financial advice. Always consult a qualified CA for your specific
          situation.
        </p>
      </main>
    </>
  );
}
