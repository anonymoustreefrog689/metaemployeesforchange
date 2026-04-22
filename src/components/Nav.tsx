import Link from "next/link";

export default function Nav() {
  return (
    <header>
      <div className="bg-[#e63329] px-6 py-5">
        <div className="max-w-5xl mx-auto flex items-baseline justify-between">
          <Link href="/" className="block">
            <h1 className="font-serif font-black text-3xl text-white leading-none tracking-tight hover:opacity-80 transition-opacity">
              Meta Employees for Change
            </h1>
          </Link>
          <nav className="flex items-center gap-8">
            <Link href="/iceoutmeta" className="text-xs font-mono uppercase tracking-widest text-white/80 hover:text-white transition-colors">
              Ice Out Meta
            </Link>
            <Link href="/about" className="text-xs font-mono uppercase tracking-widest text-white/60 hover:text-white transition-colors">
              About
            </Link>
          </nav>
        </div>
      </div>
      <div className="border-b-2 border-black" />
    </header>
  );
}
