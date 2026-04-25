import Nav from "@/components/Nav";

export const metadata = {
  title: "About — Meta Workers for Change",
  description: "Who we are.",
};

export default function About() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Nav />

      <div className="max-w-5xl mx-auto px-6">
        <section className="py-12">
          <h1 className="font-serif font-black text-5xl text-black leading-tight mb-8">
            About
          </h1>
          <p className="font-sans text-base text-black/60 max-w-2xl leading-relaxed mb-8">
            We are current and former Meta employees who are invested in creating a more fair, transparent, and equitable environment for Meta employees, contract workers, and users across the globe.
          </p>
          <a
            href="https://airtable.com/appzy3AxLJBSTbsHz/pagbcBniFMo6sp34j/form"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-sans text-sm text-blue-600 underline underline-offset-4 mb-8"
          >
            Sign up to commit to making Meta a better place for all of us →
          </a>
          <div>
            <a
              href="https://www.instagram.com/metaworkers4change/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-black/50 hover:text-black transition-colors"
            >
              <span>@metaworkers4change</span>
              <span>→</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
