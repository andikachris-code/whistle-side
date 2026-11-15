import { ArrowRight, Info } from 'lucide-react';
import { ArticleCard } from '../components/ArticleCard';
import { ClubBadge } from '../components/ClubBadge';
import { MatchCard } from '../components/MatchCard';
import { ARTICLES } from '../data/articles';
import {
  CHAMPIONS_LEAGUE_DEMO_TABLE,
  PREMIER_LEAGUE_DEMO_TABLE,
  SAMPLE_MATCHES,
} from '../data/matches';
import { MEDIA_IMAGES } from '../data/media';
import { PageRoute } from '../types/football';

interface CompetitionPageProps {
  competition: 'Premier League' | 'Champions League';
  onNavigate: (route: PageRoute) => void;
}

export function CompetitionPage({
  competition,
  onNavigate,
}: CompetitionPageProps) {
  const isEPL = competition === 'Premier League';

  const heroImage = isEPL
    ? MEDIA_IMAGES.heroPremierLeague
    : MEDIA_IMAGES.championsLeagueNight;

  const description = isEPL
    ? 'Liputan lengkap Premier League Inggris: analisis perburuan gelar akhir pekan, pergeseran taktik pelatih, kabar skuad, serta jadwal pekan pertandingan.'
    : 'Sorotan UEFA Champions League: laga malam di bawah lampu sorot Eropa, peta persaingan fase liga, dan ulasan duel antarklub terbaik benua.';

  const compArticles = ARTICLES.filter((a) => a.category === competition);
  const relatedTransferOrPlayer = ARTICLES.filter(
    (a) => a.category !== competition
  ).slice(0, 3);
  const displayArticles = [...compArticles, ...relatedTransferOrPlayer].slice(
    0,
    6
  );

  const compMatches = SAMPLE_MATCHES.filter(
    (m) => m.competition === competition
  );
  const sidebarMatches = compMatches.slice(0, 4);

  const tableRows = isEPL
    ? PREMIER_LEAGUE_DEMO_TABLE
    : CHAMPIONS_LEAGUE_DEMO_TABLE;

  return (
    <main className="min-h-[75vh] bg-white">
      {/* Banner Kompetisi */}
      <section className="relative overflow-hidden bg-[#111111] text-white">
        <img
          src={heroImage}
          alt={competition}
          referrerPolicy="no-referrer"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/40"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-wider text-[#E53935]">
            {isEPL ? 'Inggris · Kasta Tertinggi' : 'Eropa · Kompetisi Antarklub'}
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            {competition}
          </h1>
          <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-zinc-200">
            {description}
          </p>
        </div>
      </section>

      {/* Konten Utama: Berita + Klasemen & Jadwal Contoh */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Kolom Kiri: Berita */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#111111]">
                Berita {competition}
              </h2>
              <button
                type="button"
                onClick={() =>
                  onNavigate({ name: 'news', initialCategory: competition })
                }
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#E53935] hover:underline"
              >
                <span>Saring di Berita</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {displayArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onSelect={(id) => onNavigate({ name: 'article', id })}
                />
              ))}
            </div>
          </div>

          {/* Kolom Kanan: Klasemen & Jadwal Contoh */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Klasemen */}
            <div className="rounded-xl border border-zinc-200 bg-white p-5">
              <div className="flex items-center justify-between gap-2 border-b border-zinc-200 pb-3">
                <h2 className="text-base font-bold text-[#111111]">
                  {isEPL ? 'Klasemen Premier League' : 'Klasemen League Phase'}
                </h2>
                <span className="text-[11px] font-semibold text-zinc-500 whitespace-nowrap shrink-0">
                  {isEPL ? '2026/27 · Pekan 10' : '2026/27 · MD4'}
                </span>
              </div>

              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-zinc-200 text-zinc-500">
                      <th className="py-2 pr-2 font-semibold">#</th>
                      <th className="py-2 pr-2 font-semibold">Klub</th>
                      <th className="py-2 px-1.5 text-right font-semibold">Main</th>
                      <th className="py-2 px-1.5 text-right font-semibold">SG</th>
                      <th className="py-2 pl-1.5 text-right font-semibold">Poin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {tableRows.map((row) => (
                      <tr key={row.position} className="hover:bg-zinc-50">
                        <td className="py-2.5 pr-2 font-mono font-bold tabular-nums text-zinc-600">
                          {row.position}
                        </td>
                        <td className="py-2.5 pr-2">
                          <div className="flex items-center gap-2">
                            <ClubBadge club={row.club} size="sm" />
                            <span className="font-semibold text-[#111111] truncate max-w-[125px]">
                              {row.club.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-2.5 px-1.5 text-right font-mono tabular-nums text-zinc-600">
                          {row.played}
                        </td>
                        <td className="py-2.5 px-1.5 text-right font-mono tabular-nums text-zinc-600">
                          {row.goalDiff}
                        </td>
                        <td className="py-2.5 pl-1.5 text-right font-mono font-bold tabular-nums text-[#111111]">
                          {row.points}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-3 flex items-center gap-1.5 text-[11px] text-zinc-500">
                <Info className="h-3.5 w-3.5 shrink-0 text-[#E53935]" />
                <span>Catatan: Data statistik dan jadwal diperbarui secara berkala (November 2026).</span>
              </p>
            </div>

            {/* Jadwal Kompetisi */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-[#111111]">
                  Jadwal {competition}
                </h2>
                <button
                  type="button"
                  onClick={() =>
                    onNavigate({
                      name: 'matches',
                      initialCompetition: competition,
                    })
                  }
                  className="text-xs font-semibold text-[#E53935] hover:underline"
                >
                  Semua Laga
                </button>
              </div>

              {sidebarMatches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
