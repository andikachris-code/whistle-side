import { Camera, ChevronRight, Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { ArticleCard } from '../components/ArticleCard';
import { PhotojournalismSection } from '../components/PhotojournalismSection';
import { ARTICLES } from '../data/articles';
import {
  EditorialRubric,
  NewsCategory,
  NewsType,
  PageRoute,
} from '../types/football';

type NewsRubricOption = 'Semua Rubrik' | EditorialRubric | 'Foto Jurnalistik';

interface NewsPageProps {
  initialCategory?: string;
  initialRubric?: EditorialRubric | 'Foto Jurnalistik';
  onNavigate: (route: PageRoute) => void;
}

const RUBRICS: NewsRubricOption[] = [
  'Semua Rubrik',
  'Berita Sepak Bola',
  'Liga dan Kompetisi',
  'Klub',
  'Profil Pemain',
  'Analisis dan Opini',
  'Foto Jurnalistik',
];

const CATEGORIES: ('Semua' | NewsCategory)[] = [
  'Semua',
  'Premier League',
  'Champions League',
  'La Liga',
  'Serie A',
  'Bundesliga',
  'Transfer',
  'Internasional',
  'Pemain',
];

const NEWS_TYPES: ('Semua Jenis' | NewsType)[] = [
  'Semua Jenis',
  'Hard News',
  'Soft News / Feature',
  'Analisis & Opini',
];

export function NewsPage({
  initialCategory,
  initialRubric,
  onNavigate,
}: NewsPageProps) {
  const validInitialCategory =
    initialCategory && CATEGORIES.includes(initialCategory as NewsCategory)
      ? (initialCategory as NewsCategory)
      : 'Semua';

  const validInitialRubric: NewsRubricOption =
    initialRubric && RUBRICS.includes(initialRubric)
      ? initialRubric
      : 'Semua Rubrik';

  const [selectedRubric, setSelectedRubric] =
    useState<NewsRubricOption>(validInitialRubric);
  const [selectedCategory, setSelectedCategory] = useState<'Semua' | NewsCategory>(
    validInitialCategory
  );
  const [selectedNewsType, setSelectedNewsType] = useState<
    'Semua Jenis' | NewsType
  >('Semua Jenis');
  const [searchTerm, setSearchTerm] = useState('');

  const isPhotoRubric = selectedRubric === 'Foto Jurnalistik';

  const filteredArticles = useMemo(() => {
    if (isPhotoRubric) return [];
    const q = searchTerm.trim().toLowerCase();
    return ARTICLES.filter((article) => {
      const rubricMatch =
        selectedRubric === 'Semua Rubrik' || article.rubric === selectedRubric;
      const catMatch =
        selectedCategory === 'Semua' || article.category === selectedCategory;
      const typeMatch =
        selectedNewsType === 'Semua Jenis' ||
        article.newsType === selectedNewsType;
      const queryMatch =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.rubric.toLowerCase().includes(q) ||
        article.newsType.toLowerCase().includes(q) ||
        article.tags.some((t) => t.toLowerCase().includes(q)) ||
        article.author.name.toLowerCase().includes(q);
      return rubricMatch && catMatch && typeMatch && queryMatch;
    });
  }, [isPhotoRubric, selectedRubric, selectedCategory, selectedNewsType, searchTerm]);

  const hasActiveFilter =
    selectedRubric !== 'Semua Rubrik' ||
    selectedCategory !== 'Semua' ||
    selectedNewsType !== 'Semua Jenis' ||
    searchTerm.trim().length > 0;

  return (
    <main className="min-h-[75vh] bg-white py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
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
          <span className="font-semibold text-[#111111]" aria-current="page">
            {selectedRubric === 'Semua Rubrik' ? 'Berita & Rubrikasi' : selectedRubric}
          </span>
        </nav>

        {/* Header Halaman */}
        <div className="border-b border-zinc-200 pb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-[#E53935]">
            Ruang Redaksi Sepak Bola
          </p>
          <div className="mt-2 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111111]">
                {selectedRubric === 'Semua Rubrik'
                  ? 'Berita Sepak Bola Terbaru'
                  : selectedRubric}
              </h1>
              <p className="mt-2 max-w-2xl text-sm sm:text-base text-zinc-600">
                {isPhotoRubric
                  ? 'Kurasi dokumentasi foto jurnalistik sepak bola lengkap dengan caption, kredit fotografer transparan, lightbox, dan tautan berita terkait.'
                  : 'Liputan terkini, laporan pertandingan, profil pemain, analisis taktik, hingga foto jurnalistik dari Inggris dan seluruh Eropa.'}
              </p>
            </div>

            {/* Pencarian Judul */}
            {!isPhotoRubric && (
              <div className="relative w-full md:w-80">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari judul, rubrik, atau topik..."
                  aria-label="Saring berita berdasarkan kata kunci"
                  className="w-full rounded-lg border border-zinc-300 bg-white py-2.5 pl-9 pr-9 text-sm text-[#111111] placeholder:text-zinc-400 focus:border-[#E53935] focus:outline-none"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-[#111111]"
                    aria-label="Hapus kata kunci"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Rubrikasi Redaksi */}
          <div className="mt-6">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-zinc-500">
              Rubrik Redaksi
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {RUBRICS.map((rubric) => {
                const active = selectedRubric === rubric;
                const isPhotoTab = rubric === 'Foto Jurnalistik';
                return (
                  <button
                    key={rubric}
                    type="button"
                    onClick={() => setSelectedRubric(rubric)}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                      active
                        ? 'bg-[#111111] text-white'
                        : 'border border-zinc-200 bg-white text-[#18181B] hover:border-[#111111]'
                    }`}
                  >
                    {isPhotoTab && (
                      <Camera
                        className={`h-3.5 w-3.5 ${
                          active ? 'text-[#E53935]' : 'text-[#E53935]'
                        }`}
                      />
                    )}
                    <span>{rubric}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filter Kategori / Liga & Jenis Berita (tampil untuk rubrik artikel) */}
          {!isPhotoRubric && (
            <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                {CATEGORIES.map((category) => {
                  const active = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                        active
                          ? 'bg-[#E53935] text-white'
                          : 'bg-zinc-100 text-[#18181B] hover:bg-zinc-200'
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className="font-medium text-zinc-500 mr-1">Jenis:</span>
                {NEWS_TYPES.map((type) => {
                  const active = selectedNewsType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSelectedNewsType(type)}
                      className={`rounded-md px-2.5 py-1 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                        active
                          ? 'bg-zinc-900 text-white'
                          : 'text-zinc-600 hover:bg-zinc-100 hover:text-[#111111]'
                      }`}
                    >
                      {type === 'Semua Jenis' ? 'Semua' : type}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Konten Utama: Foto Jurnalistik Penuh ATAU Artikel + Sorotan Foto Jurnalistik */}
        {isPhotoRubric ? (
          <section className="mt-8">
            <PhotojournalismSection
              mode="full"
              onNavigate={onNavigate}
              showHeader={true}
            />
          </section>
        ) : (
          <>
            {/* Ringkasan Hasil Filter */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500">
              <span>
                Menampilkan{' '}
                <strong className="text-[#111111]">
                  {filteredArticles.length}
                </strong>{' '}
                dari {ARTICLES.length} artikel
              </span>
              {hasActiveFilter && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRubric('Semua Rubrik');
                    setSelectedCategory('Semua');
                    setSelectedNewsType('Semua Jenis');
                    setSearchTerm('');
                  }}
                  className="font-semibold text-[#E53935] hover:underline"
                >
                  Atur ulang semua filter
                </button>
              )}
            </div>

            {/* Daftar Artikel */}
            {filteredArticles.length === 0 ? (
              <div className="my-14 rounded-xl border border-zinc-200 bg-zinc-50 p-10 text-center">
                <p className="text-base font-bold text-[#111111]">
                  Tidak ada artikel yang sesuai
                </p>
                <p className="mt-1.5 text-sm text-zinc-600">
                  Coba hapus kata kunci pencarian atau pilih rubrik dan kategori
                  Semua.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRubric('Semua Rubrik');
                    setSelectedCategory('Semua');
                    setSelectedNewsType('Semua Jenis');
                    setSearchTerm('');
                  }}
                  className="mt-5 rounded-lg bg-[#111111] px-4 py-2 text-xs font-semibold text-white hover:bg-[#E53935]"
                >
                  Atur Ulang Filter
                </button>
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

            {/* Sorotan Foto Jurnalistik terintegrasi di halaman Berita */}
            {!hasActiveFilter && (
              <section className="mt-16 border-t border-zinc-200 pt-12">
                <PhotojournalismSection
                  mode="featured"
                  onNavigate={onNavigate}
                  showHeader={true}
                />
              </section>
            )}
          </>
        )}
      </div>
    </main>
  );
}
