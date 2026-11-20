import { ArrowLeft, ArrowUpRight, ChevronRight, Instagram, Mail, MapPin } from 'lucide-react';
import { useMemo, useState } from 'react';
import { ArticleCard } from '../components/ArticleCard';
import { EditorialImage } from '../components/EditorialImage';
import { ARTICLES } from '../data/articles';
import { AUTHORS, getAuthorById } from '../data/authors';
import { EditorialRubric, PageRoute } from '../types/football';

interface AuthorProfilePageProps {
  authorId: string;
  onNavigate: (route: PageRoute) => void;
}

const RUBRIC_FILTERS: ('Semua Rubrik' | EditorialRubric)[] = [
  'Semua Rubrik',
  'Berita Sepak Bola',
  'Liga dan Kompetisi',
  'Klub',
  'Profil Pemain',
  'Analisis dan Opini',
];

export function AuthorProfilePage({
  authorId,
  onNavigate,
}: AuthorProfilePageProps) {
  const author = getAuthorById(authorId) || AUTHORS[0];
  const [selectedRubric, setSelectedRubric] = useState<'Semua Rubrik' | EditorialRubric>(
    'Semua Rubrik'
  );

  const authorArticles = useMemo(
    () => ARTICLES.filter((article) => article.author.id === author.id),
    [author.id]
  );

  const filteredArticles = useMemo(() => {
    if (selectedRubric === 'Semua Rubrik') return authorArticles;
    return authorArticles.filter((article) => article.rubric === selectedRubric);
  }, [authorArticles, selectedRubric]);

  const rubricCounts = useMemo(() => {
    const counts: Record<string, number> = {
      'Semua Rubrik': authorArticles.length,
    };
    for (const rubric of RUBRIC_FILTERS.slice(1)) {
      counts[rubric] = authorArticles.filter((a) => a.rubric === rubric).length;
    }
    return counts;
  }, [authorArticles]);

  return (
    <main className="min-h-[75vh] bg-white py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-zinc-500"
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
            onClick={() => onNavigate({ name: 'about' })}
            className="font-medium transition-colors hover:text-[#E53935]"
          >
            Redaksi
          </button>
          <ChevronRight className="h-3.5 w-3.5 text-zinc-400" aria-hidden="true" />
          <span className="font-semibold text-[#111111]" aria-current="page">
            {author.name}
          </span>
        </nav>

        {/* Profil Penulis Header */}
        <section className="rounded-xl border border-zinc-200 bg-[#F7F7F8] p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
            {/* Foto Potret Penulis */}
            <div className="lg:col-span-4">
              <div className="overflow-hidden rounded-xl border border-zinc-200 bg-[#111111]">
                {author.avatar ? (
                  <EditorialImage
                    src={author.avatar}
                    alt={`${author.name} — ${author.role}`}
                    aspectClassName="aspect-[3/4] w-full"
                    imgClassName="object-cover object-[50%_75%]"
                  />
                ) : (
                  <div className="flex aspect-[4/5] w-full items-center justify-center bg-[#111111] text-4xl font-extrabold text-white">
                    {author.name.slice(0, 2).toUpperCase()}
                  </div>
                )}
              </div>
            </div>

            {/* Biodata & Kredensial Redaksi */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#E53935]">
                  Profil Penulis &amp; Redaksi
                </p>
                <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111111]">
                  {author.name}
                </h1>
                <p className="mt-1.5 text-sm sm:text-base font-semibold text-zinc-700">
                  {author.role}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-zinc-500">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-[#E53935]" />
                    <span>{author.location}</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono font-semibold text-[#111111] tabular-nums">
                    {authorArticles.length} Artikel Terpublikasi
                  </span>
                </div>

                {/* Deskripsi Penulis */}
                <div className="mt-5 space-y-3 border-t border-zinc-200 pt-5 text-sm sm:text-[15px] leading-relaxed text-zinc-700">
                  {author.fullBio.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                {/* Fokus Liputan (Zero-Pill Inline Editorial Metadata) */}
                <div className="mt-5 border-t border-zinc-200 pt-4 text-xs leading-relaxed text-zinc-600">
                  <span className="font-bold uppercase tracking-wider text-[#111111]">
                    Fokus Liputan:{' '}
                  </span>
                  <span>{author.focusAreas.join(' · ')}</span>
                </div>
              </div>

              {/* Kontak & Tautan Resmi */}
              <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-zinc-200 pt-5">
                {author.instagramUrl && (
                  <a
                    href={author.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#E53935] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#c62828]"
                  >
                    <Instagram className="h-4 w-4" />
                    <span>Instagram Penulis</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}

                <a
                  href={`mailto:${author.email}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-xs font-semibold text-[#111111] transition-colors hover:border-[#111111]"
                >
                  <Mail className="h-4 w-4 text-[#E53935]" />
                  <span>{author.email}</span>
                </a>

                <button
                  type="button"
                  onClick={() => onNavigate({ name: 'about' })}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-xs font-semibold text-zinc-700 transition-colors hover:border-[#111111] hover:text-[#111111]"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Tentang Whistle Side</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Daftar Artikel Karya Penulis */}
        <section className="mt-12">
          <div className="border-b border-zinc-200 pb-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#E53935]">
                  Arsip Karya Jurnalistik
                </p>
                <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
                  Artikel oleh {author.name}
                </h2>
              </div>
              <p className="text-xs font-medium text-zinc-500">
                Menampilkan {filteredArticles.length} dari {authorArticles.length} artikel
              </p>
            </div>

            {/* Filter Rubrik */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {RUBRIC_FILTERS.map((rubric) => {
                const count = rubricCounts[rubric] ?? 0;
                const active = selectedRubric === rubric;
                return (
                  <button
                    key={rubric}
                    type="button"
                    onClick={() => setSelectedRubric(rubric)}
                    className={`rounded-lg px-3.5 py-2 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                      active
                        ? 'bg-[#E53935] text-white'
                        : 'bg-zinc-100 text-[#18181B] hover:bg-zinc-200'
                    }`}
                  >
                    {rubric}{' '}
                    <span
                      className={`ml-1 font-mono tabular-nums ${
                        active ? 'text-white/80' : 'text-zinc-500'
                      }`}
                    >
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="my-12 rounded-xl border border-zinc-200 bg-zinc-50 p-8 text-center">
              <p className="text-sm font-bold text-[#111111]">
                Belum ada artikel pada rubrik ini.
              </p>
              <button
                type="button"
                onClick={() => setSelectedRubric('Semua Rubrik')}
                className="mt-4 rounded-lg bg-[#111111] px-4 py-2 text-xs font-semibold text-white hover:bg-[#E53935]"
              >
                Tampilkan Semua Rubrik
              </button>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onSelect={(id) => onNavigate({ name: 'article', id })}
                  onSelectAuthor={(id) => onNavigate({ name: 'author', id })}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
