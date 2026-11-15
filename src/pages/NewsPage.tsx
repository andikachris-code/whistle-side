import { Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { ArticleCard } from '../components/ArticleCard';
import { ARTICLES } from '../data/articles';
import { NewsCategory, PageRoute } from '../types/football';

interface NewsPageProps {
  initialCategory?: string;
  onNavigate: (route: PageRoute) => void;
}

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

export function NewsPage({ initialCategory, onNavigate }: NewsPageProps) {
  const validInitial =
    initialCategory && CATEGORIES.includes(initialCategory as NewsCategory)
      ? (initialCategory as NewsCategory)
      : 'Semua';

  const [selectedCategory, setSelectedCategory] = useState<'Semua' | NewsCategory>(
    validInitial
  );
  const [searchTerm, setSearchTerm] = useState('');

  const filteredArticles = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return ARTICLES.filter((article) => {
      const catMatch =
        selectedCategory === 'Semua' || article.category === selectedCategory;
      const queryMatch =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.tags.some((t) => t.toLowerCase().includes(q)) ||
        article.author.name.toLowerCase().includes(q);
      return catMatch && queryMatch;
    });
  }, [selectedCategory, searchTerm]);

  return (
    <main className="min-h-[75vh] bg-white py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Halaman */}
        <div className="border-b border-zinc-200 pb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-[#E53935]">
            Ruang Redaksi Sepak Bola
          </p>
          <div className="mt-2 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111111]">
                Berita Sepak Bola Terbaru
              </h1>
              <p className="mt-2 max-w-2xl text-sm sm:text-base text-zinc-600">
                Liputan terkini, analisis taktik, pantauan bursa transfer, dan
                laporan pertandingan dari Inggris hingga seluruh Eropa.
              </p>
            </div>

            {/* Pencarian Judul */}
            <div className="relative w-full md:w-80">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari judul atau topik..."
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
          </div>

          {/* Filter Kategori */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-lg px-3.5 py-2 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
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
        </div>

        {/* Daftar Artikel */}
        {filteredArticles.length === 0 ? (
          <div className="my-14 rounded-xl border border-zinc-200 bg-zinc-50 p-10 text-center">
            <p className="text-base font-bold text-[#111111]">
              Tidak ada artikel yang sesuai
            </p>
            <p className="mt-1.5 text-sm text-zinc-600">
              Coba hapus kata kunci pencarian atau pilih kategori Semua.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('Semua');
                setSearchTerm('');
              }}
              className="mt-5 rounded-lg bg-[#111111] px-4 py-2 text-xs font-semibold text-white hover:bg-[#E53935]"
            >
              Atur Ulang Filter
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onSelect={(id) => onNavigate({ name: 'article', id })}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
