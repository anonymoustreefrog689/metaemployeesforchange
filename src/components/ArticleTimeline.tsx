import Image from "next/image";
import { formatDate, type CardData } from "@/lib/articles";

export default function ArticleTimeline({ articles }: { articles: CardData[] }) {
  return (
    <div className="divide-y divide-black/10">
      {articles.map((article) => (
        <a
          key={article.url}
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex gap-4 py-5 group"
        >
          {article.image ? (
            <div className="flex-shrink-0 w-24 h-16 overflow-hidden">
              <Image
                src={article.image}
                alt={article.title}
                width={96}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="flex-shrink-0 w-24 h-16 bg-black/5" />
          )}
          <div className="flex flex-col gap-1 min-w-0">
            <p className="font-serif font-bold text-base leading-snug text-black group-hover:underline">
              {article.title}
            </p>
            {article.description && (
              <p className="font-sans text-sm text-black/50 leading-snug line-clamp-2">
                {article.description}
              </p>
            )}
            <p className="font-mono text-xs text-black/30 uppercase tracking-widest mt-1">
              {article.outlet} · {formatDate(article.date)}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}
