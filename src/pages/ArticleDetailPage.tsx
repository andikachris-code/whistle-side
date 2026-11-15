import { ArrowLeft, Check, Copy, Share2 } from 'lucide-react';
import { useState } from 'react';
import { ArticleCard } from '../components/ArticleCard';
import { EditorialImage } from '../components/EditorialImage';
import { ARTICLES } from '../data/articles';
import { PageRoute } from '../types/football';

interface ArticleDetailPageProps {
  articleId: string;
  onNavigate: (route: PageRoute) => void;
}

export function ArticleDetailPage({
  articleId,
  onNavigate,
}: ArticleDetailPageProps) {
  const [copied, setCopied] = useState(false);

  const article =
    ARTICLES.find((a) => a.id === articleId) || ARTICLES[0];

  const relatedArticles = article.relatedIds
    .map((id) => ARTICLES.find((a) => a.id === id))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  const shareUrl =
    typeof window !== 'undefined' ? window.location.href : 'https://whistleside.com';

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const xShareHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    article.title
  )}&url=${encodeURIComponent(shareUrl)}`;

  const whatsappShareHref = `https://wa.me/?text=${encodeURIComponent(
    `${article.title} — ${shareUrl}`
  )}`;

  return (
    <main className="min-h-[75vh] bg-white py-8 sm:py-12">
      <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Navigasi Kembali */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onNavigate({ name: 'news' })}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-600 transition-colors hover:text-[#E53935]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Kembali ke Berita</span>
          </button>

          <button
            type="button"
            onClick={() =>
              onNavigate({
                name: 'news',
                initialCategory: article.category,
              })
            }
            className="text-xs font-bold uppercase tracking-wider text-[#E53935] hover:underline"
          >
            {article.category}
          </button>
        </div>

        {/* Judul & Info Penulis */}
        <header>
          <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
            <span className="font-bold uppercase tracking-wider text-[#E53935]">
              {article.category}
            </span>
            <span aria-hidden="true">·</span>
            <span>{article.publishedAt}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
          </div>

          <h1 className="mt-3 text-2xl sm:text-4xl lg:text-[2.6rem] font-extrabold leading-[1.15] tracking-tight text-[#111111]">
            {article.title}
          </h1>

          <p className="mt-4 text-base sm:text-lg leading-relaxed text-zinc-600">
            {article.excerpt}
          </p>

          {/* Penulis + Tombol Bagikan */}
          <div className="mt-6 flex flex-col gap-4 border-y border-zinc-200 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold text-[#111111]">
                {article.author.name}
              </p>
              {article.author.role && (
                <p className="text-xs text-zinc-500">{article.author.role}</p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 mr-1">
                <Share2 className="h-3.5 w-3.5" />
                <span>Bagikan:</span>
              </span>

              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-[#111111] transition-colors hover:border-[#111111]"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#E53935]" />
                    <span>Tersalin</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Salin Tautan</span>
                  </>
                )}
              </button>

              <a
                href={xShareHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-[#111111] transition-colors hover:border-[#111111]"
              >
                Bagikan ke X
              </a>

              <a
                href={whatsappShareHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-[#111111] transition-colors hover:border-[#111111]"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </header>

        {/* Gambar Utama */}
        <figure className="mt-8">
          <EditorialImage
            src={article.image}
            alt={article.title}
            aspectClassName="aspect-[16/9] w-full rounded-xl"
            imgClassName="object-[50%_20%]"
          />
          <figcaption className="mt-2.5 text-xs text-zinc-500">
            {article.imageCaption}
          </figcaption>
        </figure>

        {/* Isi Artikel */}
        <div className="mx-auto mt-8 max-w-3xl space-y-5 text-base sm:text-[17px] leading-[1.8] text-[#1F2937]">
          {article.content.map((block, index) => {
            if (block.startsWith('## ')) {
              const headingText = block.slice(3).trim();
              return (
                <h2
                  key={index}
                  className="pt-4 text-xl sm:text-2xl font-bold leading-snug tracking-tight text-[#111111]"
                >
                  {headingText}
                </h2>
              );
            }

            if (block.startsWith('**')) {
              const closingIdx = block.indexOf('**', 2);
              if (closingIdx !== -1) {
                const question = block.slice(2, closingIdx).trim();
                const answer = block.slice(closingIdx + 2).trim();
                return (
                  <div
                    key={index}
                    className="rounded-lg border border-zinc-200 bg-[#F7F7F8] p-4 sm:p-5"
                  >
                    <h3 className="text-sm sm:text-base font-bold text-[#111111]">
                      {question}
                    </h3>
                    {answer && (
                      <p className="mt-1.5 text-sm sm:text-[15px] leading-relaxed text-zinc-700">
                        {answer}
                      </p>
                    )}
                  </div>
                );
              }
            }

            return (
              <div key={index}>
                <p
                  className={
                    index === 0
                      ? 'first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-5xl first-letter:font-extrabold first-letter:leading-none first-letter:text-[#E53935]'
                      : undefined
                  }
                >
                  {block}
                </p>

                {index === 1 && article.pullQuote && (
                  <blockquote className="my-8 border-y border-zinc-200 py-6 text-xl sm:text-2xl font-bold leading-snug text-[#111111]">
                    “{article.pullQuote}”
                  </blockquote>
                )}
              </div>
            );
          })}
        </div>

        {/* Topik Terkait */}
        <div className="mx-auto mt-10 max-w-3xl border-t border-zinc-200 pt-5 text-xs text-zinc-500">
          <span className="font-semibold text-[#111111]">Topik: </span>
          {article.tags.join(' · ')}
        </div>
      </article>

      {/* Artikel Terkait */}
      {relatedArticles.length > 0 && (
        <section className="mx-auto mt-14 max-w-7xl border-t border-zinc-200 px-4 pt-12 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-[#111111]">
              Artikel Terkait
            </h2>
            <button
              type="button"
              onClick={() => onNavigate({ name: 'news' })}
              className="text-xs font-semibold text-[#E53935] hover:underline"
            >
              Lihat Semua Berita
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedArticles.map((related) => (
              <ArticleCard
                key={related.id}
                article={related}
                onSelect={(id) => onNavigate({ name: 'article', id })}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
