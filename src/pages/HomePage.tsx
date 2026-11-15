import { ArrowRight, ArrowUpRight, Info, Instagram } from 'lucide-react';
import { ArticleCard } from '../components/ArticleCard';
import { BreakingTicker } from '../components/BreakingTicker';
import { ClubBadge } from '../components/ClubBadge';
import { EditorialImage } from '../components/EditorialImage';
import { MatchCard } from '../components/MatchCard';
import { ARTICLES } from '../data/articles';
import { findClubByName, SAMPLE_MATCHES } from '../data/matches';
import { PLAYERS } from '../data/players';
import {
  COMPETITION_COVERAGE,
  INSTAGRAM_HIGHLIGHTS,
  WHISTLE_SIDE_INSTAGRAM_URL,
} from '../data/social';
import { PageRoute } from '../types/football';

interface HomePageProps {
  onNavigate: (route: PageRoute) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const leadStory = ARTICLES[0];
  const secondaryStories = ARTICLES.slice(1, 5);
  const latestGrid = ARTICLES.slice(1, 7);
  const previewMatches = SAMPLE_MATCHES.slice(0, 4);
  const spotlightPlayers = PLAYERS.slice(0, 3);

  return (
    <main>
      {/* Kabar Terkini Ticker */}
      <BreakingTicker onNavigate={onNavigate} />

      {/* Bagian Hero Editorial */}
      <section className="mx-auto max-w-7xl px-4 pt-6 pb-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
          {/* Berita Utama Hero */}
          <div className="lg:col-span-8">
            <article className="group relative flex h-full min-h-[380px] sm:min-h-[460px] flex-col justify-end overflow-hidden rounded-xl bg-[#111111]">
              <img
                src={leadStory.image}
                alt={leadStory.title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/15"
                aria-hidden="true"
              />

              <div className="relative z-10 p-6 sm:p-8 lg:p-10 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-zinc-200">
                  <span className="font-bold uppercase tracking-wider text-[#E53935]">
                    {leadStory.category}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{leadStory.publishedAt}</span>
                  <span aria-hidden="true">·</span>
                  <span>{leadStory.readTime}</span>
                </div>

                <h1 className="mt-3 text-2xl sm:text-3xl lg:text-[2.45rem] font-extrabold leading-[1.15] tracking-tight text-white">
                  {leadStory.title}
                </h1>

                <p className="mt-3 text-sm sm:text-base leading-relaxed text-zinc-200 line-clamp-2">
                  {leadStory.excerpt}
                </p>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() =>
                      onNavigate({ name: 'article', id: leadStory.id })
                    }
                    className="inline-flex items-center gap-2 rounded-lg bg-[#E53935] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#c62828] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </article>
          </div>

          {/* Kolom Berita Utama */}
          <aside className="lg:col-span-4 flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-5">
            <div>
              <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#111111]">
                  Berita Utama
                </h2>
                <button
                  type="button"
                  onClick={() => onNavigate({ name: 'news' })}
                  className="text-xs font-semibold text-[#E53935] hover:underline"
                >
                  Semua Berita
                </button>
              </div>

              <div className="mt-4 space-y-4">
                {secondaryStories.map((story) => (
                  <ArticleCard
                    key={story.id}
                    article={story}
                    variant="compact"
                    onSelect={(id) => onNavigate({ name: 'article', id })}
                  />
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Berita Terbaru */}
      <section className="border-t border-zinc-200 bg-white py-12 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-zinc-200 pb-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#E53935]">
                Meja Redaksi
              </p>
              <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
                Berita Terbaru
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate({ name: 'news' })}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#111111] transition-colors hover:text-[#E53935]"
            >
              <span>Jelajahi Semua Artikel</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestGrid.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onSelect={(id) => onNavigate({ name: 'article', id })}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pusat Pertandingan */}
      <section className="border-t border-zinc-200 bg-[#F7F7F8] py-12 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-zinc-200 pb-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#E53935]">
                Jadwal &amp; Hasil
              </p>
              <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
                Pusat Pertandingan
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-600">
                <Info className="h-3.5 w-3.5 text-[#E53935]" />
                <span>Catatan: Data statistik dan jadwal diperbarui secara berkala (November 2026).</span>
              </div>
              <button
                type="button"
                onClick={() => onNavigate({ name: 'matches' })}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#111111] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#E53935]"
              >
                <span>Lihat Pusat Pertandingan</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {previewMatches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Liputan Kompetisi */}
      <section className="border-t border-zinc-200 bg-white py-12 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-zinc-200 pb-4">
            <p className="text-xs font-bold uppercase tracking-wider text-[#E53935]">
              Liga &amp; Turnamen
            </p>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
              Liputan Kompetisi
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {COMPETITION_COVERAGE.map((comp) => (
              <button
                key={comp.id}
                type="button"
                onClick={() => {
                  if (comp.routeTarget === 'premier-league') {
                    onNavigate({ name: 'premier-league' });
                  } else if (comp.routeTarget === 'champions-league') {
                    onNavigate({ name: 'champions-league' });
                  } else {
                    onNavigate({
                      name: 'news',
                      initialCategory: comp.filterCategory,
                    });
                  }
                }}
                className="group flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-5 text-left transition-all duration-150 hover:-translate-y-0.5 hover:border-[#111111] hover:bg-[#111111] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E53935]"
              >
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold tracking-wider text-[#E53935]">
                      {comp.shortTag}
                    </span>
                    <span className="text-zinc-500 group-hover:text-zinc-400">
                      {comp.region}
                    </span>
                  </div>
                  <h3 className="mt-3 text-base font-bold text-[#111111] group-hover:text-white">
                    {comp.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-600 group-hover:text-zinc-300">
                    {comp.summary}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-3 text-xs font-semibold text-[#111111] group-hover:border-zinc-800 group-hover:text-white">
                  <span>{comp.articleCountLabel}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#E53935]" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Sorotan Pemain */}
      <section className="border-t border-zinc-200 bg-[#111111] py-12 sm:py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-zinc-800 pb-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#E53935]">
                Profil &amp; Performa
              </p>
              <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Sorotan Pemain
              </h2>
            </div>

            <button
              type="button"
              onClick={() => onNavigate({ name: 'players' })}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-colors hover:text-[#E53935]"
            >
              <span>Semua Profil Pemain</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {spotlightPlayers.map((player) => (
              <article
                key={player.id}
                className="group flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-[#18181B]"
              >
                <div className="relative">
                  <EditorialImage
                    src={player.image}
                    alt={`${player.name} — ${player.club}`}
                    aspectClassName="aspect-[4/5] w-full"
                    imgClassName="object-top transition-transform duration-300 ease-out group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#18181B] via-[#18181B]/60 to-transparent"
                    aria-hidden="true"
                  />
                  <div className="absolute bottom-3 left-5 right-5 flex items-baseline justify-between">
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#E53935]">
                      {player.position} · #{player.squadNumber}
                    </span>
                    <span className="font-mono text-xs text-zinc-300 tabular-nums">
                      {player.league}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5 pt-2">
                  <h3 className="text-xl font-bold text-white">
                    {player.name}
                  </h3>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs font-medium text-zinc-400">
                    {(() => {
                      const clubInfo = findClubByName(player.club);
                      return clubInfo ? <ClubBadge club={clubInfo} size="xs" /> : null;
                    })()}
                    <span>
                      {player.club} · {player.nationality} · Usia {player.age}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                    {player.summary}
                  </p>

                  <div className="mt-auto pt-5 flex items-center justify-between border-t border-zinc-800">
                    <span className="font-mono text-xs text-zinc-400 tabular-nums">
                      {player.stats.goals} Gol · {player.stats.assists} Assist
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        onNavigate({ name: 'article', id: player.articleId })
                      }
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E53935] transition-colors hover:text-white"
                    >
                      <span>Baca Selengkapnya</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Sorotan Instagram Whistle Side */}
      <section className="border-t border-zinc-200 bg-white py-12 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-zinc-200 pb-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#E53935]">
                Media Sosial
              </p>
              <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
                Ikuti Keseruan Whistle Side di Instagram
              </h2>
            </div>

            <a
              href={WHISTLE_SIDE_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#E53935] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-[#c62828] whitespace-nowrap shrink-0"
            >
              <Instagram className="h-4 w-4" />
              <span>Ikuti Kami</span>
            </a>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {INSTAGRAM_HIGHLIGHTS.map((post) => (
              <a
                key={post.id}
                href={post.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all duration-150 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md"
              >
                <div className="relative">
                  <EditorialImage
                    src={post.image}
                    alt={post.caption}
                    aspectClassName="aspect-[4/3] w-full"
                    imgClassName="transition-transform duration-300 ease-out group-hover:scale-105"
                  />
                  <span className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-black/75 text-white">
                    <Instagram className="h-4 w-4" />
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-center justify-between text-xs text-zinc-500">
                    <span className="font-semibold text-[#E53935]">
                      {post.category}
                    </span>
                    <span>{post.dateLabel}</span>
                  </div>
                  <p className="mt-2 text-sm font-semibold leading-snug text-[#111111] group-hover:text-[#E53935] transition-colors line-clamp-2">
                    {post.caption}
                  </p>
                  <div className="mt-auto pt-3 flex items-center justify-between text-xs text-zinc-500">
                    <span>{post.likesLabel}</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-[#111111]">
                      Lihat Postingan
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
