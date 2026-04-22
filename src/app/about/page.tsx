import Nav from "@/components/Nav";

export const metadata = {
  title: "About — Meta Employees for Change",
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
          <p className="text-lg text-black/60 max-w-2xl leading-relaxed mb-6">
            We are current and former employees of Meta. We are not speaking on
            behalf of the company — we are speaking despite it.
          </p>
          <p className="text-lg text-black/60 max-w-2xl leading-relaxed">
            More information about who we are and how to contact us is coming
            soon.
          </p>
        </section>
      </div>
    </main>
  );
}
