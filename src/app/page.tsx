"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import { ARTICLES as INITIAL_CARDS, TAGS, formatDate, type CardData } from "@/lib/articles";

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

      <div className="bg-[#ede8de] overflow-x-auto select-none" style={{ minHeight: "2200px" }}>
        <div className="max-w-5xl mx-auto relative" style={{ minHeight: "2200px" }}>
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
              </div>
              {/* tape — rendered after card body so it paints on top */}
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 h-5 w-4 opacity-75"
                style={{ background: "#f0d535" }}
              />
            </div>
          );
        })}
        </div>
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
                    className="font-mono text-xs font-medium text-white px-2 py-0.5 hover:opacity-80 transition-opacity uppercase tracking-widest"
                    style={{ backgroundColor: tag.color }}
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
          </div>
        </div>
      )}
    </main>
  );
}
