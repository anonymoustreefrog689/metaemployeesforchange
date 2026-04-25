"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import { ARTICLES as INITIAL_CARDS, TAGS, formatDate, type CardData } from "@/lib/articles";

// ── Layout constants ──────────────────────────────────────────────────────────
const COLS = 4;
const CARD_W = 230;
const COL_GAP = 23;
// Petitions span exactly 2 columns — no overlap possible
const PETITION_W = CARD_W * 2 + COL_GAP; // 483px
const ROW_GAP = 66;
const CARD_H = 300; // estimated article card height
const BOARD_W = 1024; // max-w-5xl

// ── Seeded RNG ────────────────────────────────────────────────────────────────
function seededRandom(seed: number) {
  let s = (seed * 9301 + 49297) % 233280;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

// ── Torn-bottom clip path ─────────────────────────────────────────────────────
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

// ── Masonry layout — each column tracked independently ────────────────────────
function getInitialPositions(cards: CardData[]): { positions: Record<string, { x: number; y: number }>; boardHeight: number } {
  const totalW = COLS * CARD_W + (COLS - 1) * COL_GAP;
  const leftMargin = Math.round((BOARD_W - totalW) / 2);
  const colX = Array.from({ length: COLS }, (_, i) => leftMargin + i * (CARD_W + COL_GAP));
  const colH = Array(COLS).fill(20); // independent height per column

  const sorted = [...cards].sort((a, b) => b.date.localeCompare(a.date));
  const positions: Record<string, { x: number; y: number }> = {};

  for (let i = 0; i < sorted.length; i++) {
    const card = sorted[i];
    const rand = seededRandom(i * 139 + 17);
    const dx = Math.round((rand() - 0.5) * 16);
    const dy = Math.round((rand() - 0.5) * 24);

    if (card.type === "petition") {
      // Find the 2-column pair whose combined top is lowest
      let bestPair = 0;
      let bestTop = Infinity;
      for (let c = 0; c <= COLS - 2; c++) {
        const top = Math.max(colH[c], colH[c + 1]);
        if (top < bestTop) { bestTop = top; bestPair = c; }
      }
      const petH =
        Math.round(PETITION_W * (card.image === "/iceoutmetaflyer.png" ? 2048 / 1536 : 1024 / 790)) + 40;
      positions[card.url] = { x: colX[bestPair] + dx, y: bestTop + dy };
      colH[bestPair] = bestTop + petH + ROW_GAP;
      colH[bestPair + 1] = bestTop + petH + ROW_GAP;
    } else {
      // Place in shortest column
      const col = colH.indexOf(Math.min(...colH));
      positions[card.url] = { x: colX[col] + dx, y: colH[col] + dy };
      colH[col] += CARD_H + ROW_GAP;
    }
  }

  return { positions, boardHeight: Math.max(...colH) + 80 };
}

const { positions: INITIAL_POSITIONS, boardHeight: BOARD_HEIGHT } = getInitialPositions(INITIAL_CARDS);

// ── Card rotation (seeded, consistent) ───────────────────────────────────────
function getCardRot(index: number): number {
  return +((seededRandom(index * 101 + 47)() - 0.5) * 5).toFixed(1);
}

// ── Drag state ────────────────────────────────────────────────────────────────
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
    () => INITIAL_POSITIONS
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
        [d.url]: { x: d.startCardX + dx, y: d.startCardY + dy },
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

  const sortedForMobile = [...INITIAL_CARDS].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <main className="min-h-screen bg-white text-black">
      <Nav />

      {/* ── Desktop bulletin board ── */}
      <div className="hidden md:block bg-[#ede8de] select-none" style={{ minHeight: `${BOARD_HEIGHT}px` }}>
        <div className="max-w-5xl mx-auto relative" style={{ minHeight: `${BOARD_HEIGHT}px` }}>
          {INITIAL_CARDS.map((card, index) => {
            const pos = positions[card.url];
            const isActive = activeUrl === card.url;
            const isPetition = card.type === "petition";
            const cardWidth = isPetition ? PETITION_W : CARD_W;
            const rot = getCardRot(index);
            return (
              <div
                key={card.url}
                onMouseDown={(e) => handleMouseDown(e, card)}
                style={{
                  position: "absolute",
                  left: `${pos.x}px`,
                  top: `${pos.y + 68}px`,
                  width: `${cardWidth}px`,
                  transform: isActive ? "rotate(0deg) scale(1.02)" : `rotate(${rot}deg)`,
                  transition: isActive ? "none" : "transform 0.2s ease",
                  zIndex: isActive ? zOrder.length + 1 : zOrder.indexOf(card.url) + 1,
                  cursor: isActive ? "grabbing" : "grab",
                }}
              >
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
                  {isPetition ? (
                    <div style={{ paddingBottom: "40px" }}>
                      {card.image && (
                        <Image
                          src={card.image}
                          alt={card.title}
                          width={480}
                          height={640}
                          className="w-full h-auto pointer-events-none"
                          draggable={false}
                        />
                      )}
                    </div>
                  ) : (
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
                          {formatDate(card.date)}
                        </span>
                      </div>
                      <div className="flex gap-1.5 flex-wrap">
                        {card.tags.map((tagKey) => {
                          const tag = TAGS[tagKey];
                          return (
                            <span
                              key={tagKey}
                              className="font-mono text-[10px] font-medium text-white px-1.5 py-0.5 uppercase tracking-widest pointer-events-none"
                              style={{ backgroundColor: tag.color }}
                            >
                              {tag.label}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
                {/* tape */}
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 h-5 w-4 opacity-75"
                  style={{ background: "#f0d535" }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Mobile bulletin board ── */}
      <div className="md:hidden bg-[#ede8de] px-3 py-8">
        <div className="grid grid-cols-2 gap-x-4 gap-y-6">
          {sortedForMobile.map((card, index) =>
            card.type === "petition" ? (
              <div key={card.url} className="col-span-2">
                {card.image && (
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={400}
                    height={533}
                    className="w-full h-auto shadow-md"
                  />
                )}
                <a
                  href={card.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 block text-center bg-black text-white font-mono text-xs uppercase tracking-widest px-4 py-3"
                >
                  Sign the Petition →
                </a>
              </div>
            ) : (
              <div
                key={card.url}
                className="relative"
                style={{ transform: `rotate(${(getCardRot(index) * 0.5).toFixed(1)}deg)` }}
              >
                <div
                  className="absolute -top-2 left-1/2 -translate-x-1/2 h-4 w-6 opacity-75 z-10"
                  style={{ background: "#f0d535" }}
                />
                <a href={card.url} target="_blank" rel="noopener noreferrer" className="block">
                  <div
                    style={{
                      background: "#fffef9",
                      clipPath: getTearClipPath(index),
                      filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.12))",
                    }}
                  >
                    {card.image && (
                      <div className="w-full h-20 overflow-hidden">
                        <Image
                          src={card.image}
                          alt={card.title}
                          width={180}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-2 pb-8 flex flex-col gap-1">
                      <p className="font-serif font-bold text-xs leading-snug text-black">{card.title}</p>
                      <p className="font-mono text-[8px] text-black/30 uppercase tracking-wider">
                        {card.outlet} · {formatDate(card.date)}
                      </p>
                      <div className="flex gap-1 flex-wrap mt-0.5">
                        {card.tags.map((tagKey) => {
                          const tag = TAGS[tagKey];
                          return (
                            <span
                              key={tagKey}
                              className="font-mono text-[7px] font-medium text-white px-1 py-0.5 uppercase tracking-widest"
                              style={{ backgroundColor: tag.color }}
                            >
                              {tag.label}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            )
          )}
        </div>
      </div>

      {/* ── Modal ── */}
      {selectedCard && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60"
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="relative bg-[#fffef9] max-w-2xl w-full mx-4 p-8 md:p-12 shadow-2xl overflow-y-auto"
            style={{ maxHeight: "90vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCard(null)}
              className="absolute top-4 right-4 font-mono text-xs text-black/30 hover:text-black transition-colors uppercase tracking-widest"
            >
              Close ✕
            </button>

            {selectedCard.type === "petition" ? (
              <>
                {selectedCard.image && (
                  <Image
                    src={selectedCard.image}
                    alt={selectedCard.title}
                    width={624}
                    height={832}
                    className="w-full h-auto mb-6"
                  />
                )}
                <a
                  href={selectedCard.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-black text-white font-mono text-xs uppercase tracking-widest px-5 py-3 hover:bg-[#e63329] transition-colors mb-6"
                >
                  Sign the Petition →
                </a>
                <div className="flex gap-2 flex-wrap">
                  {selectedCard.tags.map((tagKey) => {
                    const tag = TAGS[tagKey];
                    return (
                      <Link
                        key={tagKey}
                        href={tag.slug}
                        onClick={() => setSelectedCard(null)}
                        className="font-mono text-xs font-medium text-white px-2 py-0.5 hover:opacity-80 transition-opacity uppercase tracking-widest"
                        style={{ backgroundColor: tag.color }}
                      >
                        {tag.label}
                      </Link>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                {selectedCard.image && (
                  <div className="w-full h-56 md:h-72 overflow-hidden mb-6">
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
                        className="font-mono text-xs font-medium text-white px-2 py-0.5 hover:opacity-80 transition-opacity uppercase tracking-widest"
                        style={{ backgroundColor: tag.color }}
                      >
                        {tag.label}
                      </Link>
                    );
                  })}
                </div>
                <h2 className="font-serif font-black text-2xl md:text-3xl leading-snug text-black mb-3">
                  {selectedCard.title}
                </h2>
                {selectedCard.description && (
                  <p className="font-sans text-sm text-black/60 leading-relaxed mb-4">
                    {selectedCard.description}
                  </p>
                )}
                <p className="font-mono text-xs text-black/30 uppercase tracking-widest mb-6">
                  {selectedCard.outlet} · {formatDate(selectedCard.date)}
                </p>
                <a
                  href={selectedCard.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-black text-white font-mono text-xs uppercase tracking-widest px-5 py-3 hover:bg-[#e63329] transition-colors"
                >
                  Read full article →
                </a>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── CTA / sign-up ── */}
      <div className="bg-white py-16 md:py-24" style={{ scrollSnapAlign: "start" }}>
        <div className="max-w-5xl mx-auto px-6 w-full">
          <h2 className="font-serif font-black text-3xl md:text-5xl text-black leading-tight mb-6">
            It doesn't have to be like this.
          </h2>
          <a
            href="https://airtable.com/appzy3AxLJBSTbsHz/pagbcBniFMo6sp34j/form"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-sm md:text-base text-blue-600 leading-relaxed hover:text-blue-800 transition-colors underline underline-offset-4"
          >
            Sign up to commit to making Meta a better place for all of us →
          </a>
        </div>
      </div>
    </main>
  );
}
