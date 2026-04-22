import Nav from "@/components/Nav";
import ArticleTimeline from "@/components/ArticleTimeline";
import { ARTICLES, TAGS } from "@/lib/articles";

export const metadata = {
  title: "AI — Meta Employees for Change",
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
          <h1 className="font-serif font-black text-6xl text-black leading-tight mb-6">
            AI
          </h1>
          <p className="text-lg text-black/60 max-w-2xl leading-relaxed">
            Meta's AI products — from Ray-Ban smart glasses to its chatbot and
            employee monitoring tools — are enabling surveillance, eroding
            privacy, and being deployed by federal agencies. This page tracks
            the documentation.
          </p>
        </section>

        <section className="py-10">
          <h2 className="font-mono text-xs uppercase tracking-widest text-black/30 mb-8">
            Coverage — {articles.length} articles
          </h2>
          <ArticleTimeline articles={articles} />
        </section>
      </div>
    </main>
  );
}
