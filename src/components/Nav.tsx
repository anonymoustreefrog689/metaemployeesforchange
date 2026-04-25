"use client";

import { useState } from "react";
import Link from "next/link";

const LINKS = [
  { href: "/ai", label: "AI + Job Security" },
  { href: "/iceoutmeta", label: "Ice Out Meta" },
  { href: "/lgbt", label: "#NoHatefulConduct" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <div className="bg-[#e63329] px-6 py-4 md:py-5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="block" onClick={() => setOpen(false)}>
            <h1 className="font-serif font-black text-xl md:text-3xl text-white leading-none tracking-normal hover:opacity-80 transition-opacity">
              Meta Workers for Change
            </h1>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs font-mono uppercase tracking-widest text-white/80 hover:text-white transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-1"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-[#e63329] border-t border-white/20">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-6 py-4 font-mono text-xs uppercase tracking-widest text-white/80 hover:text-white hover:bg-white/10 transition-colors border-b border-white/10 last:border-0"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}

      <div className="border-b-2 border-black" />
    </header>
  );
}
