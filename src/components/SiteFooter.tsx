"use client";

import { usePathname } from "next/navigation";

export default function SiteFooter() {
  const pathname = usePathname();
  if (pathname === "/password") return null;

  return (
    <footer className="bg-white border-t border-black/10 py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-4">
        <a
          href="mailto:metaworkersforchange@gmail.com"
          className="font-sans text-xs text-black hover:text-black/60 transition-colors"
        >
          metaworkersforchange@gmail.com
        </a>
        <a
          href="https://www.instagram.com/metaworkers4change/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black hover:text-black/60 transition-colors"
          aria-label="Instagram"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
          </svg>
        </a>
      </div>
    </footer>
  );
}
