import {
  ArrowRight,
  ArrowUpRight,
  Camera,
  ChevronLeft,
  ChevronRight,
  Info,
  MapPin,
  Maximize2,
  X,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { PHOTO_JOURNALISM_ITEMS } from '../data/photojournalism';
import {
  PageRoute,
  PhotoJournalismCategory,
  PhotoJournalismItem,
} from '../types/football';
import { EditorialImage } from './EditorialImage';

interface PhotojournalismSectionProps {
  mode: 'featured' | 'full';
  onNavigate: (route: PageRoute) => void;
  showHeader?: boolean;
}

const PHOTO_CATEGORIES: ('Semua Foto' | PhotoJournalismCategory)[] = [
  'Semua Foto',
  'Aksi Pertandingan',
  'Profil Pemain',
  'Atmosfer Stadion',
  'Taktik & Lapangan',
];

function formatPhotoCreditLine(item: PhotoJournalismItem): string {
  const parts: string[] = [];
  if (item.photographer) parts.push(item.photographer);
  if (item.source) parts.push(item.source);
  const base = parts.length > 0 ? parts.join(' / ') : 'Arsip Redaksi Whistle Side';
  return item.license ? `Foto: ${base} (${item.license})` : `Foto: ${base}`;
}

export function PhotojournalismSection({
  mode,
  onNavigate,
  showHeader = true,
}: PhotojournalismSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    'Semua Foto' | PhotoJournalismCategory
  >('Semua Foto');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const visiblePhotos = useMemo(() => {
    if (mode === 'featured') {
      return PHOTO_JOURNALISM_ITEMS.slice(0, 4);
    }
    if (selectedCategory === 'Semua Foto') return PHOTO_JOURNALISM_ITEMS;
    return PHOTO_JOURNALISM_ITEMS.filter(
      (item) => item.category === selectedCategory
    );
  }, [mode, selectedCategory]);

  const activePhoto =
    activeIndex !== null ? visiblePhotos[activeIndex] ?? null : null;

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((prev) =>
          prev === null ? null : (prev + 1) % visiblePhotos.length
        );
      } else if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + visiblePhotos.length) % visiblePhotos.length
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, visiblePhotos.length]);

  const handleCategoryChange = (cat: 'Semua Foto' | PhotoJournalismCategory) => {
    setSelectedCategory(cat);
    setActiveIndex(null);
  };

  const showLeadPlate =
    visiblePhotos.length > 0 &&
    (mode === 'featured' || selectedCategory === 'Semua Foto');

  return (
    <div>
      {showHeader && (
        <div className="border-b border-zinc-200 pb-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E53935]">
                <Camera className="h-3.5 w-3.5" />
                <span>Rubrik Multimedia · Liputan Visual</span>
              </p>
              <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
                Foto Jurnalistik
              </h2>
              <p className="mt-1.5 max-w-2xl text-sm text-zinc-600">
                Dokumentasi momen lapangan dengan keterangan foto jurnalistik,
                atribusi fotografer transparan, serta tautan langsung ke artikel
                terkait.
              </p>
            </div>

            {mode === 'featured' ? (
              <button
                type="button"
                onClick={() =>
                  onNavigate({
                    name: 'news',
                    initialRubric: 'Foto Jurnalistik',
                  })
                }
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#111111] transition-colors hover:text-[#E53935] whitespace-nowrap shrink-0"
              >
                <span>Semua Foto di Berita</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <div className="rounded-lg border border-zinc-200 bg-[#F7F7F8] px-4 py-2.5 text-xs text-zinc-600 lg:max-w-sm">
                <div className="flex items-start gap-2">
                  <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#E53935]" />
                  <p className="leading-relaxed">
                    Kredit fotografer &amp; lisensi publik ditampilkan sesuai
                    sumber asli; ilustrasi editorial internal ditandai secara
                    transparan.
                  </p>
                </div>
              </div>
            )}
          </div>

          {mode === 'full' && (
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {PHOTO_CATEGORIES.map((category) => {
                const active = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategoryChange(category)}
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
          )}
        </div>
      )}

      {/* Konten Galeri */}
      <div className={showHeader ? 'mt-7 space-y-6' : 'space-y-6'}>
        {showLeadPlate && (
          <article className="overflow-hidden rounded-xl border border-zinc-200 bg-[#111111] text-white">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <button
                type="button"
                onClick={() => setActiveIndex(0)}
                className="group relative lg:col-span-8 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E53935]"
                aria-label={`Perbesar foto: ${visiblePhotos[0].title}`}
              >
                <EditorialImage
                  src={visiblePhotos[0].image}
                  alt={visiblePhotos[0].title}
                  aspectClassName="aspect-[16/10] h-full w-full"
                  imgClassName="object-cover object-[50%_20%] transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />
                <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-lg bg-black/75 px-3 py-1.5 text-xs font-semibold text-white">
                  <Maximize2 className="h-3.5 w-3.5" />
                  <span>Perbesar</span>
                </span>
              </button>

              <div className="lg:col-span-4 flex flex-col justify-between p-6 sm:p-8">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                    <span className="font-bold uppercase tracking-wider text-[#E53935]">
                      Foto Pilihan · {visiblePhotos[0].category}
                    </span>
                  </div>

                  <h3 className="mt-3 text-xl sm:text-2xl font-bold leading-snug text-white">
                    {visiblePhotos[0].title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                    {visiblePhotos[0].caption}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-400">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-[#E53935]" />
                      <span>{visiblePhotos[0].location}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{visiblePhotos[0].dateLabel}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-4 border-t border-zinc-800 pt-4">
                  <div className="text-xs leading-relaxed text-zinc-300">
                    <p className="font-medium">
                      {formatPhotoCreditLine(visiblePhotos[0])}
                    </p>
                    {visiblePhotos[0].sourceUrl && (
                      <a
                        href={visiblePhotos[0].sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-flex items-center gap-1 text-zinc-400 underline decoration-zinc-600 underline-offset-4 hover:text-white"
                      >
                        <span>Sumber arsip asli</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveIndex(0)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#E53935] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#c62828]"
                    >
                      <Maximize2 className="h-3.5 w-3.5" />
                      <span>Lihat Detail Foto</span>
                    </button>

                    {visiblePhotos[0].linkedArticleId && (
                      <button
                        type="button"
                        onClick={() =>
                          onNavigate({
                            name: 'article',
                            id: visiblePhotos[0].linkedArticleId!,
                          })
                        }
                        className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 px-3.5 py-2 text-xs font-semibold text-zinc-200 transition-colors hover:border-white hover:text-white"
                      >
                        <span>Baca Berita Terkait</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* Grid Foto */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visiblePhotos.map((item, idx) => {
            if (showLeadPlate && idx === 0) return null;
            return (
              <article
                key={item.id}
                className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md"
              >
                <button
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className="relative block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E53935]"
                  aria-label={`Perbesar foto: ${item.title}`}
                >
                  <EditorialImage
                    src={item.image}
                    alt={item.title}
                    aspectClassName="aspect-[4/3] w-full"
                    imgClassName="object-cover object-[50%_20%] transition-transform duration-300 ease-out group-hover:scale-105"
                  />
                  <span className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-black/70 text-white opacity-90 transition-opacity group-hover:opacity-100">
                    <Maximize2 className="h-3.5 w-3.5" />
                  </span>
                </button>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                    <span className="font-semibold uppercase tracking-wide text-[#E53935]">
                      {item.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{item.dateLabel}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      item.linkedArticleId
                        ? onNavigate({
                            name: 'article',
                            id: item.linkedArticleId,
                          })
                        : setActiveIndex(idx)
                    }
                    className="mt-2 text-left text-base font-bold leading-snug text-[#111111] transition-colors group-hover:text-[#E53935]"
                  >
                    {item.title}
                  </button>

                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-zinc-600 line-clamp-3">
                    {item.caption}
                  </p>

                  <div className="mt-4 border-t border-zinc-100 pt-3 text-[11px] leading-relaxed text-zinc-500">
                    <p className="font-semibold text-zinc-700">
                      {formatPhotoCreditLine(item)}
                    </p>
                    {item.needsCompletion && item.completionNote && (
                      <p className="mt-1 text-zinc-500 italic">
                        Catatan redaksi: {item.completionNote}
                      </p>
                    )}
                  </div>

                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-zinc-100 text-xs">
                    <button
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      className="font-semibold text-[#111111] transition-colors hover:text-[#E53935]"
                    >
                      Buka Lightbox
                    </button>

                    {item.linkedArticleId && (
                      <button
                        type="button"
                        onClick={() =>
                          onNavigate({
                            name: 'article',
                            id: item.linkedArticleId!,
                          })
                        }
                        className="inline-flex items-center gap-1 font-semibold text-[#E53935] hover:underline"
                      >
                        <span>Artikel Terkait</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-6 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-label={`Detail foto jurnalistik: ${activePhoto.title}`}
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-zinc-800 bg-[#111111] text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3 sm:px-6">
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <span className="font-bold uppercase tracking-wider text-[#E53935]">
                  {activePhoto.category}
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums text-zinc-300">
                  {activeIndex + 1} / {visiblePhotos.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex(
                      (activeIndex - 1 + visiblePhotos.length) %
                        visiblePhotos.length
                    )
                  }
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-700 text-zinc-200 transition-colors hover:border-white hover:text-white"
                  aria-label="Foto sebelumnya"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex((activeIndex + 1) % visiblePhotos.length)
                  }
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-700 text-zinc-200 transition-colors hover:border-white hover:text-white"
                  aria-label="Foto berikutnya"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveIndex(null)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-700 text-zinc-200 transition-colors hover:border-[#E53935] hover:bg-[#E53935] hover:text-white"
                  aria-label="Tutup lightbox"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="grid flex-1 grid-cols-1 overflow-y-auto lg:grid-cols-12">
              <div className="flex items-center justify-center bg-black p-4 lg:col-span-8">
                <img
                  src={activePhoto.image}
                  alt={activePhoto.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[65vh] w-auto rounded-lg object-contain"
                />
              </div>

              <div className="flex flex-col justify-between border-t border-zinc-800 p-5 sm:p-6 lg:col-span-4 lg:border-l lg:border-t-0">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold leading-snug text-white">
                    {activePhoto.title}
                  </h2>

                  <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                    {activePhoto.caption}
                  </p>

                  <dl className="mt-5 space-y-2.5 border-t border-zinc-800 pt-4 text-xs">
                    <div>
                      <dt className="font-semibold uppercase tracking-wider text-zinc-500">
                        Lokasi &amp; Waktu
                      </dt>
                      <dd className="mt-0.5 text-zinc-200">
                        {activePhoto.location} · {activePhoto.dateLabel}
                      </dd>
                    </div>

                    <div>
                      <dt className="font-semibold uppercase tracking-wider text-zinc-500">
                        Kredit &amp; Sumber Foto
                      </dt>
                      <dd className="mt-0.5 text-zinc-200">
                        {formatPhotoCreditLine(activePhoto)}
                      </dd>
                      {activePhoto.sourceUrl && (
                        <a
                          href={activePhoto.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-flex items-center gap-1 text-[#E53935] hover:underline"
                        >
                          <span>Lihat sumber dokumentasi asli</span>
                          <ArrowUpRight className="h-3 w-3" />
                        </a>
                      )}
                    </div>

                    {activePhoto.needsCompletion && activePhoto.completionNote && (
                      <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-3 text-zinc-300">
                        <span className="font-semibold text-white">
                          Status Kelengkapan Kredit:{' '}
                        </span>
                        {activePhoto.completionNote}
                      </div>
                    )}
                  </dl>
                </div>

                {activePhoto.linkedArticleId && (
                  <div className="mt-6 border-t border-zinc-800 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        const targetId = activePhoto.linkedArticleId!;
                        setActiveIndex(null);
                        onNavigate({ name: 'article', id: targetId });
                      }}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#E53935] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#c62828]"
                    >
                      <span>Baca Artikel Terkait</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
