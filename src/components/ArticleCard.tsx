import { ArrowUpRight } from 'lucide-react';
import { Article } from '../types/football';
import { EditorialImage } from './EditorialImage';

interface ArticleCardProps {
  article: Article;
  onSelect: (articleId: string) => void;
  onSelectAuthor?: (authorId: string) => void;
  variant?: 'grid' | 'compact';
}

export function ArticleCard({
  article,
  onSelect,
  onSelectAuthor,
  variant = 'grid',
}: ArticleCardProps) {
  if (variant === 'compact') {
    return (
      <article className="group border-b border-zinc-200 pb-4 last:border-b-0 last:pb-0">
        <button
          type="button"
          onClick={() => onSelect(article.id)}
          className="flex w-full items-start gap-4 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E53935]"
        >
          <EditorialImage
            src={article.image}
            alt={article.title}
            aspectClassName="aspect-[4/3] w-24 sm:w-28 shrink-0 rounded-lg"
            imgClassName="object-[50%_20%] transition-transform duration-300 ease-out group-hover:scale-105"
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-zinc-500">
              <span className="font-semibold text-[#E53935]">
                {article.category}
              </span>
              <span aria-hidden="true">·</span>
              <span>{article.publishedAt}</span>
            </div>
            <h3 className="mt-1.5 text-sm font-bold leading-snug text-[#111111] transition-colors group-hover:text-[#E53935] line-clamp-2">
              {article.title}
            </h3>
          </div>
        </button>
      </article>
    );
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md">
      <button
        type="button"
        onClick={() => onSelect(article.id)}
        className="block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E53935]"
        aria-label={`Baca artikel: ${article.title}`}
      >
        <EditorialImage
          src={article.image}
          alt={article.title}
          aspectClassName="aspect-[4/3] w-full"
          imgClassName="object-[50%_20%] transition-transform duration-300 ease-out group-hover:scale-105"
        />
      </button>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-zinc-500">
          <span className="font-semibold uppercase tracking-wide text-[#E53935]">
            {article.category}
          </span>
          <span aria-hidden="true">·</span>
          <span className="font-medium text-zinc-600">{article.rubric}</span>
          <span aria-hidden="true">·</span>
          <span>{article.publishedAt}</span>
        </div>

        <button
          type="button"
          onClick={() => onSelect(article.id)}
          className="mt-2.5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E53935]"
        >
          <h3 className="text-base sm:text-lg font-bold leading-snug text-[#111111] transition-colors group-hover:text-[#E53935]">
            {article.title}
          </h3>
        </button>

        <p className="mt-2 text-sm leading-relaxed text-zinc-600 line-clamp-2">
          {article.excerpt}
        </p>

        <div className="mt-auto pt-4 flex items-center justify-between gap-2 border-t border-zinc-100 text-xs text-zinc-500">
          <div className="min-w-0 truncate">
            {onSelectAuthor ? (
              <button
                type="button"
                onClick={() => onSelectAuthor(article.author.id)}
                className="font-medium text-zinc-700 transition-colors hover:text-[#E53935] hover:underline"
              >
                {article.author.name}
              </button>
            ) : (
              <span className="font-medium text-zinc-700">
                {article.author.name}
              </span>
            )}
            <span aria-hidden="true"> · </span>
            <span>{article.readTime}</span>
          </div>

          <button
            type="button"
            onClick={() => onSelect(article.id)}
            className="inline-flex shrink-0 items-center gap-1 font-semibold text-[#111111] transition-colors hover:text-[#E53935]"
          >
            <span>Baca</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
}
