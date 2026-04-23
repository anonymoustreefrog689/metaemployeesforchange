import Image from "next/image";
import Nav from "@/components/Nav";
import ArticleTimeline from "@/components/ArticleTimeline";
import { ARTICLES, TAGS, formatDate } from "@/lib/articles";

export const metadata = {
  title: "Ice Out Meta — Meta Workers for Change",
  description: "Meta is doing business with ICE. We work there. Here's what we know.",
};

export default function IceOutMeta() {
  const articles = ARTICLES.filter((a) => a.tags.includes("iceoutmeta"));
  const featured = ARTICLES.find((a) => a.url === "https://www.axios.com/2026/01/15/ice-meta-ai-immigration-raid-trump")!;
  const tag = TAGS.iceoutmeta;

  return (
    <main className="min-h-screen bg-white text-black">
      <Nav />

      <div className="max-w-5xl mx-auto px-6">
        <section className="py-12 border-b border-black/10">
          <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: tag.color }}>
            Campaign — Ongoing
          </p>
          <h1 className="font-serif font-black text-6xl text-black leading-tight mb-8">
            Ice Out Meta
          </h1>
          <div className="max-w-2xl mb-10">
            <Image
              src="/flyer.png"
              alt="Ice Out Meta flyer"
              width={672}
              height={0}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <blockquote className="max-w-2xl mb-10 border-l-4 pl-6" style={{ borderColor: tag.color }}>
            <p className="font-serif text-lg leading-relaxed text-black/80 italic mb-4">
              "U.S. Immigration and Customs Enforcement on Wednesday targeted construction workers on their way to a Meta data center in Louisiana, per multiple reports. Two drivers from Guatemala and Honduras were arrested because of their immigration status."
            </p>
            <a
              href={featured.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-widest text-black/40 hover:text-black transition-colors"
            >
              {featured.outlet} · {formatDate(featured.date)} →
            </a>
          </blockquote>

          <a
            href="https://tally.so/r/7RWNyL"
            target="_blank"
            rel="noopener noreferrer"
            className="block max-w-2xl text-center bg-black text-white font-mono text-sm uppercase tracking-widest px-6 py-5 hover:bg-[#e63329] transition-colors"
          >
            Sign the petition →
          </a>
        </section>

        <section className="py-10 border-b border-black/10">
          <h2 className="font-serif font-black text-3xl text-black leading-tight mb-4">
            Help Meta workers seeking asylum and facing deportation
          </h2>
          <p className="text-base text-black/60 max-w-2xl leading-relaxed mb-3">
            Low-wage workers on Meta campuses are facing immediate deportation.
          </p>
          <p className="text-base text-black/60 max-w-2xl leading-relaxed mb-8">
            This fundraiser covers increased filing fees (which can be $1,000/person), and legal counsel to prepare and defend their cases or navigate these new hurdles ($5,000 and up/person).
          </p>
          <a
            href="https://www.gofundme.com/f/help-meta-workers-seeking-asylum-and-facing-deportation"
            target="_blank"
            rel="noopener noreferrer"
            className="block max-w-2xl text-center bg-black text-white font-mono text-sm uppercase tracking-widest px-6 py-5 hover:bg-[#e63329] transition-colors"
          >
            Donate →
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
