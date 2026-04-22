"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";

function seededRandom(seed: number) {
  let s = (seed * 9301 + 49297) % 233280;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function getTearClipPath(index: number): string {
  const rand = seededRandom(index * 137 + 29);
  const steps = 20;
  const pts: string[] = ["0% 0%", "100% 0%", "100% 92%"];
  for (let i = steps; i >= 0; i--) {
    const x = (i / steps) * 100;
    const spike = rand() > 0.55;
    const y = spike ? 92 + rand() * 2 : 94 + rand() * 3;
    pts.push(`${x.toFixed(1)}% ${y.toFixed(1)}%`);
  }
  return `polygon(${pts.join(", ")})`;
}

type Tag = { label: string; slug: string; color: string };

const TAGS: Record<string, Tag> = {
  iceoutmeta: { label: "Ice Out Meta", slug: "/iceoutmeta", color: "bg-[#e63329]" },
  lgbt: { label: "LGBT", slug: "/iceoutmeta", color: "bg-[#6d28d9]" },
};

type CardData = {
  outlet: string;
  date: string;
  title: string;
  url: string;
  description: string | null;
  image: string | null;
  tags: string[];
  x: number;
  y: number;
  rot: number;
};

const INITIAL_CARDS: CardData[] = [
  { outlet: "Wired", date: "2025", title: "How Meta Cafeteria Workers Rallied to Take on ICE", description: null, url: "https://www.wired.com/story/how-meta-cafeteria-workers-rallied-to-take-on-ice/", image: null, tags: ["iceoutmeta"], x: 20, y: 50, rot: -1.5 },
  { outlet: "Axios", date: "2026-01-15", title: "ICE Raids Meta Campus Amid Trump's AI Immigration Push", description: null, url: "https://www.axios.com/2026/01/15/ice-meta-ai-immigration-raid-trump", image: null, tags: ["iceoutmeta"], x: 310, y: 30, rot: 2 },
  { outlet: "Bloomberg", date: "2026-01-15", title: "Immigration Officers Descend on Meta Data Center, Arrest Drivers", description: null, url: "https://www.bloomberg.com/news/articles/2026-01-15/immigration-officers-descend-on-meta-data-center-arrest-drivers", image: null, tags: ["iceoutmeta"], x: 610, y: 50, rot: -2 },
  { outlet: "Human Rights Campaign", date: "2025-01-15", title: "Meta's New Policies: How They Endanger LGBTQ+ Communities", description: "Meta's January 2025 policy changes—ending fact-checking, reducing moderation, and permitting anti-LGBTQ+ rhetoric—create significant safety risks for LGBTQ+ communities.", url: "https://www.hrc.org/news/metas-new-policies-how-they-endanger-lgbtq-communities-and-our-tips-for-staying-safe-online", image: null, tags: ["lgbt"], x: 840, y: 35, rot: 1.5 },
  { outlet: "GoFundMe", date: "2026-02-17", title: "Help Meta Workers Seeking Asylum and Facing Deportation", description: "Meta workers facing deportation need legal fees for filings and lawyers.", url: "https://www.gofundme.com/f/help-meta-workers-seeking-asylum-and-facing-deportation", image: "https://images.gofundme.com/gSR1bNw4RQcxt6802oydvKVZMAA=/1200x900/https://d2g8igdw686xgo.cloudfront.net/100155677_1771353690199620_r.png", tags: ["iceoutmeta"], x: 15, y: 310, rot: 1.5 },
  { outlet: "Ken Klippenstein", date: "2026-04-20", title: "Exclusive: ICE Glasses", description: "DHS is developing smart glasses with real-time biometric identification to identify individuals on American streets.", url: "https://www.kenklippenstein.com/p/exclusive-ice-glasses", image: "https://substackcdn.com/image/fetch/$s_!13bS!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6567dfc8-786e-4128-b1b4-ddb3e71045e7_2000x1401.png", tags: ["iceoutmeta"], x: 330, y: 280, rot: -1.5 },
  { outlet: "404 Media", date: "2025-12-09", title: "Border Patrol Agent Recorded Raid with Meta's Ray-Ban Smart Glasses", description: "A Border Patrol agent wore Meta's Ray-Ban smart glasses during an immigration raid in Charlotte, NC, violating CBP's ban on personal recording devices.", url: "https://www.404media.co/border-patrol-agent-recorded-raid-with-metas-ray-ban-smart-glasses/", image: null, tags: ["iceoutmeta"], x: 650, y: 300, rot: 2.5 },
  { outlet: "404 Media", date: "2025-01-10", title: "Meta Deletes Trans and Nonbinary Messenger Themes", description: "Meta deleted trans and nonbinary Messenger themes as policy changes allowed users to declare LGBTQ+ people 'mentally ill.'", url: "https://www.404media.co/meta-deletes-trans-and-nonbinary-messenger-themes/", image: null, tags: ["lgbt"], x: 855, y: 285, rot: -2 },
  { outlet: "404 Media", date: "2025-08-13", title: "Podcast: Why Are DHS Agents Wearing Meta Ray-Bans?", description: "Examining DHS agents' use of Meta Ray-Ban smart glasses and federal agencies' expanding access to surveillance systems.", url: "https://www.404media.co/podcast-why-are-dhs-agents-wearing-meta-ray-bans/", image: null, tags: ["iceoutmeta"], x: 60, y: 590, rot: -2.5 },
  { outlet: "Bloomberg", date: "2026-01-28", title: "DHS Tried Novel Argument to Compel Meta to Provide User Data", description: null, url: "https://www.bloomberg.com/news/newsletters/2026-01-28/dhs-tried-novel-argument-to-compel-meta-to-provide-user-data", image: null, tags: ["iceoutmeta"], x: 320, y: 560, rot: 1 },
  { outlet: "The New York Times", date: "2026-02-13", title: "DHS Targets Anti-ICE Posts on Social Media", description: null, url: "https://www.nytimes.com/2026/02/13/technology/dhs-anti-ice-social-media.html", image: null, tags: ["iceoutmeta"], x: 600, y: 575, rot: -1.5 },
  { outlet: "404 Media", date: "2025-06-16", title: "Meta Users Feel Less Safe Since It Weakened 'Hateful Conduct' Policy, Survey Finds", description: "A survey of 7,000 Meta users from protected groups found that over 90% feel less safe since the company weakened its hateful conduct policy.", url: "https://www.404media.co/meta-users-feel-less-safe-since-it-weakened-hateful-conduct-policy-survey-finds/", image: null, tags: ["lgbt"], x: 845, y: 560, rot: 2 },
  { outlet: "The Independent", date: "2026", title: "Immigration Officers Spotted Using Meta AI Smart Glasses During Operations", description: null, url: "https://www.independent.co.uk/news/world/americas/us-politics/immigration-officers-meta-ai-glasses-b2937382.html", image: null, tags: ["iceoutmeta"], x: 140, y: 840, rot: -1 },
  { outlet: "Wired", date: "2026", title: "Meta Is Blocking Links to ICE Lists on Facebook, Instagram, and Threads", description: null, url: "https://www.wired.com/story/meta-is-blocking-links-to-ice-list-on-facebook-instagram-and-threads/", image: null, tags: ["iceoutmeta"], x: 490, y: 820, rot: 1.5 },
];

type DragState = {
  url: string;
  startMouseX: number;
  startMouseY: number;
  startCardX: number;
  startCardY: number;
  moved: boolean;
};

export default function Home() {
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>(
    Object.fromEntries(INITIAL_CARDS.map((c) => [c.url, { x: c.x, y: c.y }]))
  );
  const [activeUrl, setActiveUrl] = useState<string | null>(null);
  const [zOrder, setZOrder] = useState<string[]>(INITIAL_CARDS.map((c) => c.url));
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const drag = useRef<DragState | null>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const d = drag.current;
      if (!d) return;
      const dx = e.clientX - d.startMouseX;
      const dy = e.clientY - d.startMouseY;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) d.moved = true;
      setPositions((prev) => ({
        ...prev,
        [d.url]: {
          x: d.startCardX + dx,
          y: d.startCardY + dy,
        },
      }));
    };

    const onMouseUp = () => {
      const d = drag.current;
      if (!d) return;
      if (!d.moved) {
        const card = INITIAL_CARDS.find((c) => c.url === d.url) ?? null;
        setSelectedCard(card);
      }
      drag.current = null;
      setActiveUrl(null);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCard(null);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent, card: CardData) => {
    e.preventDefault();
    const pos = positions[card.url];
    drag.current = {
      url: card.url,
      startMouseX: e.clientX,
      startMouseY: e.clientY,
      startCardX: pos.x,
      startCardY: pos.y,
      moved: false,
    };
    setActiveUrl(card.url);
    setZOrder((prev) => [...prev.filter((u) => u !== card.url), card.url]);
  };

  return (
    <main className="min-h-screen bg-white text-black">
      <Nav />

      <div className="bg-[#ede8de] relative overflow-x-auto select-none" style={{ minHeight: "1080px" }}>
        <p className="absolute top-5 left-6 font-sans font-bold text-2xl text-black pointer-events-none">
          Bulletin board material
        </p>
        {INITIAL_CARDS.map((card, index) => {
          const pos = positions[card.url];
          const isActive = activeUrl === card.url;
          return (
            <div
              key={card.url}
              onMouseDown={(e) => handleMouseDown(e, card)}
              style={{
                position: "absolute",
                left: `${pos.x}px`,
                top: `${pos.y + 68}px`,
                width: "230px",
                transform: isActive ? "rotate(0deg) scale(1.04)" : `rotate(${card.rot}deg)`,
                transition: isActive ? "none" : "transform 0.2s ease",
                zIndex: isActive ? zOrder.length + 1 : zOrder.indexOf(card.url) + 1,
                cursor: isActive ? "grabbing" : "grab",
              }}
            >
              {/* tape — outside the clipped card so it stays visible */}
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-10 opacity-70"
                style={{ background: "#d4c99a" }}
              />
              {/* card body — clipped to torn shape, shadow follows the tear */}
              <div
                style={{
                  background: "#fffef9",
                  clipPath: getTearClipPath(index),
                  filter: isActive
                    ? "drop-shadow(6px 12px 36px rgba(0,0,0,0.22))"
                    : "drop-shadow(2px 4px 12px rgba(0,0,0,0.12))",
                  transition: isActive ? "none" : "filter 0.2s ease",
                }}
              >
                <div className="p-3 pb-12 flex flex-col gap-2">
                  {card.image && (
                    <div className="w-full h-32 overflow-hidden mb-1">
                      <Image
                        src={card.image}
                        alt={card.title}
                        width={230}
                        height={128}
                        className="w-full h-full object-cover pointer-events-none"
                        draggable={false}
                      />
                    </div>
                  )}
                  <p className="font-serif font-bold text-sm leading-snug text-black pointer-events-none">
                    {card.title}
                  </p>
                  {card.description && (
                    <p className="font-sans text-xs leading-snug text-black/50 pointer-events-none">
                      {card.description}
                    </p>
                  )}
                  <div className="flex items-center gap-1.5 flex-wrap mt-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-black/40 pointer-events-none">
                      {card.outlet}
                    </span>
                    <span className="font-mono text-[10px] text-black/30 pointer-events-none">·</span>
                    <span className="font-mono text-[10px] text-black/30 pointer-events-none">
                      {card.date}
                    </span>
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    {card.tags.map((tagKey) => {
                      const tag = TAGS[tagKey];
                      return (
                        <span
                          key={tagKey}
                          className={`font-mono text-[10px] font-medium text-white ${tag.color} px-1.5 py-0.5 uppercase tracking-widest pointer-events-none`}
                        >
                          {tag.label}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {selectedCard && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60"
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="relative bg-[#fffef9] max-w-2xl w-full mx-6 p-12 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCard(null)}
              className="absolute top-4 right-4 font-mono text-xs text-black/30 hover:text-black transition-colors uppercase tracking-widest"
            >
              Close ✕
            </button>

            {selectedCard.image && (
              <div className="w-full h-72 overflow-hidden mb-6">
                <Image
                  src={selectedCard.image}
                  alt={selectedCard.title}
                  width={448}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex gap-2 flex-wrap mb-4">
              {selectedCard.tags.map((tagKey) => {
                const tag = TAGS[tagKey];
                return (
                  <Link
                    key={tagKey}
                    href={tag.slug}
                    onClick={() => setSelectedCard(null)}
                    className={`font-mono text-xs font-medium text-white ${tag.color} px-2 py-0.5 hover:bg-black transition-colors uppercase tracking-widest`}
                  >
                    {tag.label}
                  </Link>
                );
              })}
            </div>

            <h2 className="font-serif font-black text-3xl leading-snug text-black mb-3">
              {selectedCard.title}
            </h2>

            {selectedCard.description && (
              <p className="font-sans text-sm text-black/60 leading-relaxed mb-4">
                {selectedCard.description}
              </p>
            )}

            <p className="font-mono text-xs text-black/30 uppercase tracking-widest mb-6">
              {selectedCard.outlet} · {selectedCard.date}
            </p>

            <a
              href={selectedCard.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-black text-white font-mono text-xs uppercase tracking-widest px-5 py-3 hover:bg-[#e63329] transition-colors"
            >
              Read full article →
            </a>
          </div>
        </div>
      )}
    </main>
  );
}
