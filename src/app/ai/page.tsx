import Nav from "@/components/Nav";
import ArticleTimeline from "@/components/ArticleTimeline";
import { ARTICLES, TAGS } from "@/lib/articles";

const REUTERS_MCI_URL = "https://www.reuters.com/sustainability/boards-policy-regulation/meta-start-capturing-employee-mouse-movements-keystrokes-ai-training-data-2026-04-21/";

export const metadata = {
  title: "AI + Job Security — Meta Workers for Change",
  description: "How Meta's AI products are being used for surveillance and harm.",
};

export default function AI() {
  const articles = ARTICLES.filter((a) => a.tags.includes("ai"));
  const tag = TAGS.ai;

  return (
    <main className="min-h-screen bg-white text-black">
      <Nav />

      <div className="max-w-5xl mx-auto px-6">
        <section className="py-12 border-b border-black/10">
          <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: tag.color }}>
            Issue — Ongoing
          </p>
          <h1 className="font-serif font-black text-4xl md:text-6xl text-black leading-tight mb-6">
            AI + Job Security
          </h1>
        </section>

        <section className="py-10 border-b border-black/10">
          <blockquote className="max-w-2xl border-l-4 pl-6" style={{ borderColor: "#e63329" }}>
            <p className="font-serif text-lg leading-relaxed text-black/80 italic mb-4">
              "Meta is installing new tracking software on U.S.-based employees' computers to capture mouse movements, clicks and keystrokes for use in training its artificial intelligence models, part of a broad initiative to build AI agents that can perform work tasks autonomously, the company told staffers in internal memos seen by Reuters."
            </p>
            <p className="font-serif text-lg leading-relaxed text-black/80 italic mb-4">
              "The tool, called Model Capability Initiative (MCI), will run on work-related apps and websites and will also take occasional snapshots of the content on employees' screens."
            </p>
            <a
              href={REUTERS_MCI_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-widest text-black/40 hover:text-black transition-colors"
            >
              Reuters · 04-21-2026 →
            </a>
          </blockquote>
        </section>

        <section className="py-10">
          <h2 className="font-mono text-xs uppercase tracking-widest text-black/30 mb-8">
            Coverage
          </h2>
          <ArticleTimeline articles={articles} />
        </section>
      </div>
    </main>
  );
}
