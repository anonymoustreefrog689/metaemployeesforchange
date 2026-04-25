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
        </section>
      </div>
    </main>
  );
}
