import Nav from "@/components/Nav";
import ArticleTimeline from "@/components/ArticleTimeline";
import { ARTICLES, TAGS } from "@/lib/articles";

export const metadata = {
  title: "No Hateful Conduct — Meta Workers for Change",
  description: "How Meta's policy changes are endangering LGBTQ+ communities.",
};

export default function LGBT() {
  const articles = ARTICLES.filter((a) => a.tags.includes("lgbt"));
  const tag = TAGS.lgbt;

  return (
    <main className="min-h-screen bg-white text-black">
      <Nav />

      <div className="max-w-5xl mx-auto px-6">
        <section className="py-12 border-b border-black/10">
          <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: tag.color }}>
            Issue — Ongoing
          </p>
          <h1 className="font-serif font-black text-4xl md:text-6xl text-black leading-tight mb-6">
            No Hateful Conduct
          </h1>
        </section>

        <section className="py-10 border-b border-black/10">
          <p className="font-mono text-xs uppercase tracking-widest text-black/30 mb-4">
            Petition
          </p>
          <h2 className="font-serif font-black text-3xl text-black leading-tight mb-3">
            Demand Meta restore its hateful conduct policy
          </h2>
          <p className="text-base text-black/60 max-w-2xl leading-relaxed mb-6">
            Meta's January 2025 policy changes allow users to target LGBTQ+
            people with slurs and harassment. Sign the petition demanding Meta
            reinstate meaningful protections against hateful conduct.
          </p>
          <a
            href="https://tinyurl.com/NoHatefulConduct"
            target="_blank"
            rel="noopener noreferrer"
            className="block max-w-2xl text-center bg-black text-white font-mono text-sm uppercase tracking-widest px-6 py-5 hover:bg-[#e63329] transition-colors"
          >
            Sign the petition →
          </a>
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
