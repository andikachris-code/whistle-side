import { ArrowRight, Camera, Search, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ARTICLES } from '../data/articles';
import { PHOTO_JOURNALISM_ITEMS } from '../data/photojournalism';
import { PLAYERS } from '../data/players';
import { PageRoute } from '../types/football';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: PageRoute) => void;
}

export function SearchModal({ isOpen, onClose, onNavigate }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 40);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const normalized = query.trim().toLowerCase();

  const matchedArticles = useMemo(() => {
    if (!normalized) return ARTICLES.slice(0, 4);
    return ARTICLES.filter(
      (a) =>
        a.title.toLowerCase().includes(normalized) ||
        a.excerpt.toLowerCase().includes(normalized) ||
        a.category.toLowerCase().includes(normalized) ||
        a.rubric.toLowerCase().includes(normalized) ||
        a.newsType.toLowerCase().includes(normalized) ||
        a.tags.some((t) => t.toLowerCase().includes(normalized)) ||
        a.author.name.toLowerCase().includes(normalized)
    );
  }, [normalized]);

  const matchedPlayers = useMemo(() => {
    if (!normalized) return [];
    return PLAYERS.filter(
      (p) =>
        p.name.toLowerCase().includes(normalized) ||
        p.club.toLowerCase().includes(normalized) ||
        p.league.toLowerCase().includes(normalized) ||
        p.position.toLowerCase().includes(normalized)
    );
  }, [normalized]);

  const matchedPhotos = useMemo(() => {
    if (!normalized) return [];
    return PHOTO_JOURNALISM_ITEMS.filter(
      (item) =>
        item.title.toLowerCase().includes(normalized) ||
        item.caption.toLowerCase().includes(normalized) ||
        item.category.toLowerCase().includes(normalized) ||
        (item.photographer?.toLowerCase().includes(normalized) ?? false)
    );
  }, [normalized]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 px-4 pt-16 sm:pt-24 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Cari di Whistle Side"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Row */}
        <div className="flex items-center gap-3 border-b border-zinc-200 px-4 py-3.5 sm:px-5">
          <Search className="h-5 w-5 shrink-0 text-[#E53935]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari berita Premier League, Champions League, pemain, atau transfer..."
            className="w-full bg-transparent text-sm sm:text-base text-[#111111] placeholder:text-zinc-400 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="rounded px-2 py-1 text-xs font-medium text-zinc-500 hover:bg-zinc-100 hover:text-[#111111]"
            >
              Hapus
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100 hover:text-[#111111]"
            aria-label="Tutup pencarian"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Quick Topic Suggestions */}
        <div className="flex flex-wrap items-center gap-2 border-b border-zinc-100 bg-zinc-50 px-4 py-2.5 sm:px-5">
          <span className="text-xs font-medium text-zinc-500">Topik populer:</span>
          {['Premier League', 'Champions League', 'Transfer', 'Gelandang'].map(
            (topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => setQuery(topic)}
                className="rounded-md border border-zinc-200 bg-white px-2.5 py-1 text-xs font-medium text-[#18181B] transition-colors hover:border-[#E53935] hover:text-[#E53935]"
              >
                {topic}
              </button>
            )
          )}
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5 space-y-5">
          {matchedPlayers.length > 0 && (
            <div>
              <h3 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-zinc-500">
                Pemain ({matchedPlayers.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {matchedPlayers.map((player) => (
                  <button
                    key={player.id}
                    type="button"
                    onClick={() => {
                      onClose();
                      onNavigate({ name: 'article', id: player.articleId });
                    }}
                    className="flex items-center justify-between rounded-lg border border-zinc-200 p-3 text-left transition-colors hover:border-[#E53935] hover:bg-zinc-50"
                  >
                    <div>
                      <div className="text-sm font-semibold text-[#111111]">
                        {player.name}
                      </div>
                      <div className="text-xs text-zinc-500">
                        {player.club} · {player.position}
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-zinc-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {matchedPhotos.length > 0 && (
            <div>
              <h3 className="mb-2.5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-500">
                <Camera className="h-3.5 w-3.5 text-[#E53935]" />
                <span>Foto Jurnalistik ({matchedPhotos.length})</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {matchedPhotos.slice(0, 4).map((photo) => (
                  <button
                    key={photo.id}
                    type="button"
                    onClick={() => {
                      onClose();
                      if (photo.linkedArticleId) {
                        onNavigate({ name: 'article', id: photo.linkedArticleId });
                      } else {
                        onNavigate({ name: 'news', initialRubric: 'Foto Jurnalistik' });
                      }
                    }}
                    className="flex items-center justify-between gap-2 rounded-lg border border-zinc-200 p-3 text-left transition-colors hover:border-[#E53935] hover:bg-zinc-50"
                  >
                    <div className="min-w-0">
                      <div className="truncate text-xs font-semibold text-[#E53935]">
                        {photo.category}
                      </div>
                      <div className="truncate text-sm font-semibold text-[#111111]">
                        {photo.title}
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-zinc-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-zinc-500">
              {normalized
                ? `Artikel (${matchedArticles.length})`
                : 'Berita Pilihan'}
            </h3>
            {matchedArticles.length === 0 ? (
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-6 text-center">
                <p className="text-sm font-medium text-[#111111]">
                  Tidak ada berita yang cocok dengan "{query}"
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  Coba cari kata kunci seperti Premier League, Champions League, La Liga, atau Transfer.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-zinc-100">
                {matchedArticles.map((article) => (
                  <button
                    key={article.id}
                    type="button"
                    onClick={() => {
                      onClose();
                      onNavigate({ name: 'article', id: article.id });
                    }}
                    className="group flex w-full items-start justify-between gap-4 py-3 text-left transition-colors hover:bg-zinc-50/70"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-xs text-zinc-500">
                        <span className="font-semibold text-[#E53935]">
                          {article.category}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{article.publishedAt}</span>
                      </div>
                      <p className="mt-1 text-sm font-semibold text-[#111111] group-hover:text-[#E53935] transition-colors line-clamp-2">
                        {article.title}
                      </p>
                    </div>
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-zinc-400 group-hover:text-[#E53935] transition-colors" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
