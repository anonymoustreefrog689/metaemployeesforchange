import Nav from "@/components/Nav";
import ArticleTimeline from "@/components/ArticleTimeline";
import { ARTICLES, TAGS } from "@/lib/articles";

export const metadata = {
  title: "User Impact — Meta Workers for Change",
  description: "How Meta's data practices and policy decisions are affecting its users.",
};

export default function User() {
  const articles = ARTICLES.filter((a) => a.tags.includes("user"));
  const tag = TAGS.user;

  return (
    <main className="min-h-screen bg-white text-black">
      <Nav />

      <div className="max-w-5xl mx-auto px-6">
        <section className="py-12 border-b border-black/10">
          <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: tag.color }}>
            Issue — Ongoing
          </p>
          <h1 className="font-serif font-black text-6xl text-black leading-tight mb-6">
            User Impact
          </h1>
          <p className="text-lg text-black/60 max-w-2xl leading-relaxed">
            Meta's cooperation with federal authorities and weakening of content
            policies has put ordinary users at risk. This page tracks how those
            decisions affect the people using these platforms.
          </p>
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
