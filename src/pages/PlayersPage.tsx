import { ArrowRight, Info } from 'lucide-react';
import { useState } from 'react';
import { ClubBadge } from '../components/ClubBadge';
import { EditorialImage } from '../components/EditorialImage';
import { findClubByName } from '../data/matches';
import { PLAYERS } from '../data/players';
import { PageRoute, PlayerProfile } from '../types/football';

interface PlayersPageProps {
  onNavigate: (route: PageRoute) => void;
}

const POSITIONS: ('Semua' | PlayerProfile['position'])[] = [
  'Semua',
  'Penyerang',
  'Gelandang',
  'Bek',
];

export function PlayersPage({ onNavigate }: PlayersPageProps) {
  const [selectedPosition, setSelectedPosition] = useState<
    'Semua' | PlayerProfile['position']
  >('Semua');

  const filteredPlayers =
    selectedPosition === 'Semua'
      ? PLAYERS
      : PLAYERS.filter((p) => p.position === selectedPosition);

  return (
    <main className="min-h-[75vh] bg-white py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Halaman */}
        <div className="border-b border-zinc-200 pb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-[#E53935]">
            Pemanduan Bakat &amp; Profil
          </p>
          <div className="mt-2 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111111]">
                Sorotan Pemain
              </h1>
              <p className="mt-2 max-w-2xl text-sm sm:text-base text-zinc-600">
                Profil mendalam pemain kunci, talenta muda potensial, dan
                catatan performa dari berbagai liga top Eropa.
              </p>
            </div>

            <div className="inline-flex items-center gap-1.5 text-xs text-zinc-500">
              <Info className="h-3.5 w-3.5 text-[#E53935]" />
              <span>Catatan: Data statistik dan jadwal diperbarui secara berkala (November 2026).</span>
            </div>
          </div>

          {/* Filter Posisi */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {POSITIONS.map((pos) => {
              const active = selectedPosition === pos;
              return (
                <button
                  key={pos}
                  type="button"
                  onClick={() => setSelectedPosition(pos)}
                  className={`rounded-lg px-4 py-2 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                    active
                      ? 'bg-[#E53935] text-white'
                      : 'bg-zinc-100 text-[#18181B] hover:bg-zinc-200'
                  }`}
                >
                  {pos === 'Semua' ? 'Semua Posisi' : pos}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid Pemain */}
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          {filteredPlayers.map((player) => (
            <article
              key={player.id}
              className="group grid grid-cols-1 sm:grid-cols-12 overflow-hidden rounded-xl border border-zinc-200 bg-white transition-shadow hover:shadow-md"
            >
              <div className="sm:col-span-5">
                <EditorialImage
                  src={player.image}
                  alt={`${player.name} — ${player.club}`}
                  aspectClassName="aspect-square sm:aspect-auto sm:h-full w-full"
                  imgClassName="object-top transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="sm:col-span-7 flex flex-col justify-between p-6">
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold uppercase tracking-wider text-[#E53935]">
                      {player.position} · #{player.squadNumber}
                    </span>
                    <span className="text-zinc-500">{player.league}</span>
                  </div>

                  <h2 className="mt-2 text-2xl font-bold text-[#111111]">
                    {player.name}
                  </h2>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs font-medium text-zinc-500">
                    {(() => {
                      const clubInfo = findClubByName(player.club);
                      return clubInfo ? <ClubBadge club={clubInfo} size="xs" /> : null;
                    })()}
                    <span>
                      {player.club} · {player.nationality} · Usia {player.age}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                    {player.summary}
                  </p>
                </div>

                <div className="mt-6">
                  {/* Strip Statistik Contoh */}
                  <div className="grid grid-cols-4 gap-2 rounded-lg bg-[#F7F7F8] p-3 text-center">
                    <div>
                      <div className="font-mono text-sm font-bold tabular-nums text-[#111111]">
                        {player.stats.appearances}
                      </div>
                      <div className="text-[11px] text-zinc-500">Main</div>
                    </div>
                    <div>
                      <div className="font-mono text-sm font-bold tabular-nums text-[#111111]">
                        {player.stats.goals}
                      </div>
                      <div className="text-[11px] text-zinc-500">Gol</div>
                    </div>
                    <div>
                      <div className="font-mono text-sm font-bold tabular-nums text-[#111111]">
                        {player.stats.assists}
                      </div>
                      <div className="text-[11px] text-zinc-500">Assist</div>
                    </div>
                    <div>
                      <div className="font-mono text-sm font-bold tabular-nums text-[#E53935]">
                        {player.stats.rating}
                      </div>
                      <div className="text-[11px] text-zinc-500">Rating</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      onNavigate({ name: 'article', id: player.articleId })
                    }
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#111111] transition-colors hover:text-[#E53935]"
                  >
                    <span>Baca Artikel Profil</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
