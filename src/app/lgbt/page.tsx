import Image from "next/image";
import Nav from "@/components/Nav";
import ArticleTimeline from "@/components/ArticleTimeline";
import { ARTICLES } from "@/lib/articles";

export const metadata = {
  title: "No Hateful Conduct — Meta Workers for Change",
  description: "How Meta's policy changes are endangering LGBTQ+ communities.",
};

export default function LGBT() {
  const articles = ARTICLES.filter((a) => a.tags.includes("lgbt"));

  return (
    <main className="min-h-screen bg-white text-black">
      <Nav />

      <div className="max-w-5xl mx-auto px-6">
        <section className="py-12 border-b border-black/10">
          <h1 className="font-serif font-black text-4xl md:text-6xl text-black leading-tight mb-8">
            #NoHatefulConduct
          </h1>
          <blockquote className="max-w-2xl">
            <p className="font-serif text-lg leading-relaxed text-black/80 italic mb-4">
              "On January 7, 2025, Meta CEO Mark Zuckerberg announced a complete overhaul of content policies across Meta platforms. These changes include the end of fact-checking, thinned-down moderation efforts, and a dismantled Hateful Conduct policy that expressly permits abuse against LGBTQ+ people while forbidding the same abuses against all other communities. In the following days, Meta has also announced the termination of its broader DEI efforts, further signaling an abdication from its commitment to inclusion."
            </p>
            <a
              href="https://www.hrc.org/news/metas-new-policies-how-they-endanger-lgbtq-communities-and-our-tips-for-staying-safe-online"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-widest text-black/40 hover:text-black transition-colors"
            >
              Human Rights Campaign →
            </a>
          </blockquote>
        </section>

        <section className="py-10 border-b border-black/10">
          <div className="max-w-2xl mb-10">
            <Image
              src="/nohatefulconduct.jpg"
              alt="#NoHatefulConduct petition"
              width={672}
              height={0}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
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
