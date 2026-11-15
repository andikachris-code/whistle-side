import { ChevronRight, Pause, Play } from 'lucide-react';
import { useState } from 'react';
import { ARTICLES } from '../data/articles';
import { PageRoute } from '../types/football';

interface BreakingTickerProps {
  onNavigate: (route: PageRoute) => void;
}

export function BreakingTicker({ onNavigate }: BreakingTickerProps) {
  const [paused, setPaused] = useState(false);
  const breakingStories = ARTICLES.filter((a) => a.breaking);

  return (
    <section
      aria-label="Kabar Terkini Sepak Bola"
      className="border-b border-zinc-800 bg-[#111111] text-white"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
        <span className="shrink-0 bg-[#E53935] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white rounded-sm">
          Kabar Terkini
        </span>

        <div className="relative flex-1 overflow-hidden">
          <div className={`animate-ticker items-center gap-8 ${paused ? 'paused' : ''}`}>
            {[...breakingStories, ...breakingStories].map((story, idx) => (
              <button
                key={`${story.id}-${idx}`}
                type="button"
                onClick={() => onNavigate({ name: 'article', id: story.id })}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-100 transition-colors hover:text-[#E53935] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span className="text-[#E53935] font-semibold">{story.category}</span>
                <span className="text-zinc-500" aria-hidden="true">/</span>
                <span>{story.title}</span>
                <ChevronRight className="h-3.5 w-3.5 text-zinc-500" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          className="hidden sm:inline-flex h-7 w-7 shrink-0 items-center justify-center rounded border border-zinc-700 text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
          aria-label={paused ? 'Lanjutkan kabar terkini' : 'Jeda kabar terkini'}
          title={paused ? 'Lanjutkan teks berjalan' : 'Jeda teks berjalan'}
        >
          {paused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
        </button>
      </div>
    </section>
  );
}
