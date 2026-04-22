import Nav from "@/components/Nav";

export const metadata = {
  title: "Ice Out Meta — Meta Employees for Change",
  description: "Meta is doing business with ICE. We work there. Here's what we know.",
};

export default function IceOutMeta() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Nav />

      <div className="max-w-5xl mx-auto px-6">
        <section className="py-12 border-b border-black/10">
          <p className="font-mono text-xs uppercase tracking-widest text-[#e63329] mb-4">
            Campaign — Ongoing
          </p>
          <h1 className="font-serif font-black text-6xl text-black leading-tight mb-6">
            Ice Out Meta
          </h1>
          <p className="text-lg text-black/60 max-w-2xl leading-relaxed">
            Meta is providing tools and infrastructure to ICE. We are employees
            of this company, and we are done pretending this is acceptable. This
            page exists to document what is happening and to make clear that
            not everyone at Meta is complicit.
          </p>
        </section>

        <section className="py-10">
          <h2 className="font-mono text-xs uppercase tracking-widest text-black/30 mb-8">
            What We Know
          </h2>
          <p className="text-black/30 italic">
            Content coming soon. Check back for updates.
          </p>
        </section>
      </div>
    </main>
  );
}
