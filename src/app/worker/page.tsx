import Nav from "@/components/Nav";
import ArticleTimeline from "@/components/ArticleTimeline";
import { ARTICLES, TAGS } from "@/lib/articles";

export const metadata = {
  title: "Worker Impact — Meta Workers for Change",
  description: "How Meta's cooperation with ICE has affected workers on campus.",
};

export default function Worker() {
  const articles = ARTICLES.filter((a) => a.tags.includes("worker"));
  const tag = TAGS.worker;

  return (
    <main className="min-h-screen bg-white text-black">
      <Nav />

      <div className="max-w-5xl mx-auto px-6">
        <section className="py-12 border-b border-black/10">
          <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: tag.color }}>
            Issue — Ongoing
          </p>
          <h1 className="font-serif font-black text-6xl text-black leading-tight mb-6">
            Worker Impact
          </h1>
          <p className="text-lg text-black/60 max-w-2xl leading-relaxed">
            Workers at Meta campuses — cafeteria staff, contractors, drivers —
            have faced ICE raids, arrests, and deportation proceedings. This
            page documents what has happened to them.
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
