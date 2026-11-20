import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Camera,
  Check,
  ChevronRight,
  Clock,
  Copy,
  FileText,
  Info,
  Share2,
  User,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { ArticleCard } from '../components/ArticleCard';
import { EditorialImage } from '../components/EditorialImage';
import { ARTICLES } from '../data/articles';
import { getAuthorById } from '../data/authors';
import { PageRoute, PhotoCredit } from '../types/football';

interface ArticleDetailPageProps {
  articleId: string;
  onNavigate: (route: PageRoute) => void;
}

type FontSizeMode = 'sm' | 'md' | 'lg';

function formatCreditLine(photoCredit: PhotoCredit): string {
  const parts: string[] = [];
  if (photoCredit.photographer) parts.push(photoCredit.photographer);
  if (photoCredit.source) parts.push(photoCredit.source);
  const base = parts.length > 0 ? parts.join(' / ') : 'Arsip Redaksi Whistle Side';
  return photoCredit.license ? `Foto: ${base} (${photoCredit.license})` : `Foto: ${base}`;
}

export function ArticleDetailPage({
  articleId,
  onNavigate,
}: ArticleDetailPageProps) {
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState<FontSizeMode>('md');
  const [readProgress, setReadProgress] = useState(0);

  const article = ARTICLES.find((a) => a.id === articleId) || ARTICLES[0];
  const authorProfile = getAuthorById(article.author.id);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setReadProgress(0);
        return;
      }
      const percent = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
      setReadProgress(percent);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [articleId]);

  const relatedArticles = article.relatedIds
    .map((id) => ARTICLES.find((a) => a.id === id))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  const relatedIdSet = new Set([article.id, ...relatedArticles.map((a) => a.id)]);
  const latestRecommendations = ARTICLES.filter(
    (item) => !relatedIdSet.has(item.id)
  ).slice(0, 3);

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

  const facebookShareHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    shareUrl
  )}`;

  const bodySizeClass =
    fontSize === 'sm'
      ? 'text-[15px] leading-[1.75]'
      : fontSize === 'lg'
        ? 'text-lg sm:text-[19px] leading-[1.85]'
        : 'text-base sm:text-[17px] leading-[1.8]';

  const fiveWItems = [
    { label: 'Apa (What)', value: article.fiveWOneH.what },
    { label: 'Siapa (Who)', value: article.fiveWOneH.who },
    { label: 'Kapan (When)', value: article.fiveWOneH.when },
    { label: 'Di Mana (Where)', value: article.fiveWOneH.where },
    { label: 'Mengapa (Why)', value: article.fiveWOneH.why },
    { label: 'Bagaimana (How)', value: article.fiveWOneH.how },
  ];

  return (
    <main className="relative min-h-[75vh] bg-white pb-14 pt-6 sm:pt-10">
      {/* Reading Progress Bar */}
      <div
        className="fixed left-0 top-16 z-30 h-[2px] w-full bg-zinc-100"
        aria-hidden="true"
      >
        <div
          className="h-full bg-[#E53935] transition-[width] duration-75 ease-out"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigasi */}
        <nav
          aria-label="Breadcrumb"
          className="mb-5 flex flex-wrap items-center gap-1.5 text-xs text-zinc-500"
        >
          <button
            type="button"
            onClick={() => onNavigate({ name: 'home' })}
            className="font-medium transition-colors hover:text-[#E53935]"
          >
            Beranda
          </button>
          <ChevronRight className="h-3.5 w-3.5 text-zinc-400" aria-hidden="true" />
          <button
            type="button"
            onClick={() => onNavigate({ name: 'news' })}
            className="font-medium transition-colors hover:text-[#E53935]"
          >
            Berita
          </button>
          <ChevronRight className="h-3.5 w-3.5 text-zinc-400" aria-hidden="true" />
          <button
            type="button"
            onClick={() =>
              onNavigate({ name: 'news', initialRubric: article.rubric })
            }
            className="font-medium transition-colors hover:text-[#E53935]"
          >
            {article.rubric}
          </button>
          <ChevronRight className="h-3.5 w-3.5 text-zinc-400" aria-hidden="true" />
          <span
            className="max-w-[220px] truncate font-semibold text-[#111111] sm:max-w-xs"
            aria-current="page"
          >
            {article.title}
          </span>
        </nav>

        {/* Baris Kembali & Kategori */}
        <div className="mb-6 flex items-center justify-between gap-4 border-b border-zinc-100 pb-4">
          <button
            type="button"
            onClick={() => onNavigate({ name: 'news' })}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-600 transition-colors hover:text-[#E53935]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Kembali ke Berita</span>
          </button>

          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() =>
                onNavigate({ name: 'news', initialRubric: article.rubric })
              }
              className="font-semibold text-zinc-600 transition-colors hover:text-[#E53935]"
            >
              {article.rubric}
            </button>
            <span className="text-zinc-300" aria-hidden="true">
              /
            </span>
            <button
              type="button"
              onClick={() =>
                onNavigate({
                  name: 'news',
                  initialCategory: article.category,
                })
              }
              className="font-bold uppercase tracking-wider text-[#E53935] hover:underline"
            >
              {article.category}
            </button>
          </div>
        </div>

        {/* Identitas Artikel */}
        <header>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-500">
            <span className="font-bold uppercase tracking-wider text-[#E53935]">
              {article.category}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-semibold text-zinc-700">{article.newsType}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
          </div>

          <h1 className="mt-3 text-2xl sm:text-4xl lg:text-[2.6rem] font-extrabold leading-[1.15] tracking-tight text-[#111111]">
            {article.title}
          </h1>

          {/* Lead / Teras Berita */}
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-zinc-600">
            {article.excerpt}
          </p>

          {/* Identitas Penulis, Waktu Publikasi & Revisi, Kontrol Baca & Bagikan */}
          <div className="mt-6 space-y-4 border-y border-zinc-200 py-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              {/* Penulis Klikable + Timestamp */}
              <div className="flex items-center gap-3">
                {authorProfile?.avatar ? (
                  <button
                    type="button"
                    onClick={() =>
                      onNavigate({ name: 'author', id: article.author.id })
                    }
                    className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-zinc-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E53935]"
                    aria-label={`Lihat profil ${article.author.name}`}
                  >
                    <img
                      src={authorProfile.avatar}
                      alt={article.author.name}
                      className="h-full w-full object-cover object-[50%_55%]"
                    />
                  </button>
                ) : (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#111111] text-white">
                    <User className="h-4 w-4" />
                  </div>
                )}

                <div>
                  <button
                    type="button"
                    onClick={() =>
                      onNavigate({ name: 'author', id: article.author.id })
                    }
                    className="group inline-flex items-center gap-1 text-left text-sm font-bold text-[#111111] transition-colors hover:text-[#E53935]"
                  >
                    <span className="group-hover:underline">
                      {article.author.name}
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400 transition-colors group-hover:text-[#E53935]" />
                  </button>

                  <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-zinc-500">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3 text-zinc-400" />
                      <span>
                        Dipublikasikan: {article.publishedAt},{' '}
                        {article.publishedTime}
                      </span>
                    </span>
                    {article.updatedAt && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="font-medium text-zinc-600">
                          Diperbarui: {article.updatedAt}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Pengaturan Ukuran Huruf */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="mr-1 font-medium text-zinc-500">Ukuran Teks:</span>
                {(
                  [
                    { key: 'sm', label: 'A-' },
                    { key: 'md', label: 'A' },
                    { key: 'lg', label: 'A+' },
                  ] as { key: FontSizeMode; label: string }[]
                ).map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setFontSize(opt.key)}
                    aria-pressed={fontSize === opt.key}
                    className={`rounded-md border px-2.5 py-1 font-mono text-xs font-semibold transition-colors ${
                      fontSize === opt.key
                        ? 'border-[#111111] bg-[#111111] text-white'
                        : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 hover:text-[#111111]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tombol Bagikan */}
            <div className="flex flex-wrap items-center gap-2 border-t border-zinc-100 pt-3">
              <span className="mr-1 inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500">
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

              <a
                href={facebookShareHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-[#111111] transition-colors hover:border-[#111111]"
              >
                Facebook
              </a>
            </div>
          </div>
        </header>

        {/* Foto Utama & Kredit Foto Jurnalistik */}
        <figure className="mt-8">
          <EditorialImage
            src={article.image}
            alt={article.title}
            aspectClassName="aspect-[16/9] w-full rounded-xl"
            imgClassName="object-[50%_20%]"
          />
          <figcaption className="mt-3 space-y-1.5 border-b border-zinc-100 pb-4 text-xs leading-relaxed text-zinc-600">
            <p>{article.photoCredit.caption || article.imageCaption}</p>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-zinc-500">
              <span className="inline-flex items-center gap-1 font-semibold text-zinc-700">
                <Camera className="h-3.5 w-3.5 text-[#E53935]" />
                <span>{formatCreditLine(article.photoCredit)}</span>
              </span>
              {article.photoCredit.sourceUrl && (
                <>
                  <span aria-hidden="true">·</span>
                  <a
                    href={article.photoCredit.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 font-medium text-[#E53935] hover:underline"
                  >
                    <span>Tautan sumber foto</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </>
              )}
            </div>
            {article.photoCredit.needsCompletion &&
              article.photoCredit.completionNote && (
                <p className="text-[11px] italic text-zinc-500">
                  Catatan atribusi foto: {article.photoCredit.completionNote}
                </p>
              )}
          </figcaption>
        </figure>

        {/* Isi Berita */}
        <div
          className={`mx-auto mt-8 max-w-3xl space-y-5 text-[#1F2937] ${bodySizeClass}`}
        >
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
                  <blockquote className="my-8 border-y border-zinc-200 py-6">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#E53935]">
                      Sorotan Redaksi
                    </p>
                    <p className="mt-2 text-xl sm:text-2xl font-bold leading-snug text-[#111111]">
                      “{article.pullQuote}”
                    </p>
                  </blockquote>
                )}
              </div>
            );
          })}
        </div>

        {/* Ringkasan Unsur 5W+1H & Catatan Kutipan */}
        <section
          aria-labelledby="five-w-heading"
          className="mx-auto mt-10 max-w-3xl rounded-xl border border-zinc-200 bg-[#F7F7F8] p-5 sm:p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 pb-3">
            <h2
              id="five-w-heading"
              className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#111111]"
            >
              <FileText className="h-4 w-4 text-[#E53935]" />
              <span>Ringkasan Unsur Berita (5W + 1H)</span>
            </h2>
            <span className="text-xs font-medium text-zinc-500">
              {article.newsType}
            </span>
          </div>

          <dl className="mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            {fiveWItems.map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-zinc-200/80 bg-white p-3.5"
              >
                <dt className="text-[11px] font-bold uppercase tracking-wider text-[#E53935]">
                  {item.label}
                </dt>
                <dd className="mt-1 text-xs sm:text-sm leading-relaxed text-zinc-700">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-4 flex items-start gap-2 border-t border-zinc-200 pt-3.5 text-xs leading-relaxed text-zinc-600">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#E53935]" />
            <p>
              <span className="font-semibold text-[#111111]">
                Status Kutipan Narasumber:{' '}
              </span>
              {article.interviewQuoteStatus}
            </p>
          </div>
        </section>

        {/* Sumber Informasi & Referensi */}
        <section
          aria-labelledby="sources-heading"
          className="mx-auto mt-6 max-w-3xl rounded-xl border border-zinc-200 bg-white p-5 sm:p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 pb-3">
            <h2
              id="sources-heading"
              className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#111111]"
            >
              <BookOpen className="h-4 w-4 text-[#E53935]" />
              <span>Sumber Informasi &amp; Referensi</span>
            </h2>
            <span className="text-xs text-zinc-500">
              {article.sources.length} referensi tercatat
            </span>
          </div>

          <ul className="mt-4 divide-y divide-zinc-100">
            {article.sources.map((src, idx) => (
              <li
                key={`${src.name}-${idx}`}
                className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs sm:text-sm">
                    <span className="font-bold text-[#111111]">{src.name}</span>
                    <span className="text-zinc-400" aria-hidden="true">
                      ·
                    </span>
                    <span className="text-xs font-medium text-zinc-500">
                      {src.type}
                    </span>
                  </div>
                  {src.note && (
                    <p className="mt-0.5 text-xs leading-relaxed text-zinc-600">
                      {src.note}
                    </p>
                  )}
                </div>

                {src.url && (
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-[#E53935] hover:underline"
                  >
                    <span>Kunjungi Sumber</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
              </li>
            ))}
          </ul>

          {article.sourceCompletionNote && (
            <p className="mt-4 border-t border-zinc-100 pt-3 text-xs leading-relaxed text-zinc-500">
              <span className="font-semibold text-zinc-700">
                Catatan Redaksi:{' '}
              </span>
              {article.sourceCompletionNote}
            </p>
          )}
        </section>

        {/* Topik / Tag */}
        <div className="mx-auto mt-8 max-w-3xl border-t border-zinc-200 pt-5 text-xs text-zinc-500">
          <span className="font-semibold text-[#111111]">Topik: </span>
          {article.tags.join(' · ')}
        </div>

        {/* Kartu Penulis (Menuju Halaman Profil Penulis) */}
        {authorProfile && (
          <section
            aria-label="Tentang Penulis"
            className="mx-auto mt-8 max-w-3xl rounded-xl border border-zinc-200 bg-[#F7F7F8] p-5 sm:p-6"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                {authorProfile.avatar && (
                  <button
                    type="button"
                    onClick={() =>
                      onNavigate({ name: 'author', id: authorProfile.id })
                    }
                    className="h-14 w-14 shrink-0 overflow-hidden rounded-full border border-zinc-200"
                    aria-label={`Profil ${authorProfile.name}`}
                  >
                    <img
                      src={authorProfile.avatar}
                      alt={authorProfile.name}
                      className="h-full w-full object-cover object-[50%_55%]"
                    />
                  </button>
                )}

                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#E53935]">
                    Ditulis Oleh
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      onNavigate({ name: 'author', id: authorProfile.id })
                    }
                    className="mt-0.5 text-base font-bold text-[#111111] transition-colors hover:text-[#E53935] hover:underline"
                  >
                    {authorProfile.name}
                  </button>
                  <p className="text-xs font-medium text-zinc-600">
                    {authorProfile.role}
                  </p>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-zinc-600">
                    {authorProfile.shortBio}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  onNavigate({ name: 'author', id: authorProfile.id })
                }
                className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-[#111111] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#E53935] whitespace-nowrap"
              >
                <span>Profil &amp; Artikel</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </section>
        )}
      </article>

      {/* Artikel Terkait */}
      {relatedArticles.length > 0 && (
        <section className="mx-auto mt-14 max-w-7xl border-t border-zinc-200 px-4 pt-12 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#E53935]">
                Bacaan Lanjutan
              </p>
              <h2 className="mt-1 text-xl sm:text-2xl font-bold text-[#111111]">
                Artikel Terkait
              </h2>
            </div>
            <button
              type="button"
              onClick={() =>
                onNavigate({ name: 'news', initialRubric: article.rubric })
              }
              className="text-xs font-semibold text-[#E53935] hover:underline"
            >
              Lihat Rubrik {article.rubric}
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedArticles.map((related) => (
              <ArticleCard
                key={related.id}
                article={related}
                onSelect={(id) => onNavigate({ name: 'article', id })}
                onSelectAuthor={(id) => onNavigate({ name: 'author', id })}
              />
            ))}
          </div>
        </section>
      )}

      {/* Rekomendasi Berita Terbaru */}
      {latestRecommendations.length > 0 && (
        <section className="mx-auto mt-12 max-w-7xl border-t border-zinc-200 px-4 pt-10 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Meja Redaksi Whistle Side
              </p>
              <h2 className="mt-1 text-xl sm:text-2xl font-bold text-[#111111]">
                Berita Terbaru Lainnya
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate({ name: 'news' })}
              className="text-xs font-semibold text-[#E53935] hover:underline"
            >
              Semua Berita
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestRecommendations.map((item) => (
              <ArticleCard
                key={item.id}
                article={item}
                onSelect={(id) => onNavigate({ name: 'article', id })}
                onSelectAuthor={(id) => onNavigate({ name: 'author', id })}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
