import { Info } from 'lucide-react';
import { useMemo, useState } from 'react';
import { MatchCard } from '../components/MatchCard';
import { SAMPLE_MATCHES } from '../data/matches';
import { CompetitionName, PageRoute } from '../types/football';

interface MatchesPageProps {
  initialCompetition?: string;
  onNavigate: (route: PageRoute) => void;
}

const COMP_FILTERS: ('Semua' | CompetitionName)[] = [
  'Semua',
  'Premier League',
  'Champions League',
  'La Liga',
  'Serie A',
  'Bundesliga',
];

export function MatchesPage({
  initialCompetition,
  onNavigate,
}: MatchesPageProps) {
  const validInitial =
    initialCompetition &&
    COMP_FILTERS.includes(initialCompetition as CompetitionName)
      ? (initialCompetition as CompetitionName)
      : 'Semua';

  const [statusFilter, setStatusFilter] = useState<'all' | 'upcoming' | 'finished'>(
    'all'
  );
  const [compFilter, setCompFilter] = useState<'Semua' | CompetitionName>(
    validInitial
  );

  const filteredMatches = useMemo(() => {
    return SAMPLE_MATCHES.filter((match) => {
      const statusOk = statusFilter === 'all' || match.status === statusFilter;
      const compOk = compFilter === 'Semua' || match.competition === compFilter;
      return statusOk && compOk;
    });
  }, [statusFilter, compFilter]);

  return (
    <main className="min-h-[75vh] bg-[#F7F7F8] py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header & Keterangan Pembaruan */}
        <div className="border-b border-zinc-200 pb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-[#E53935]">
            Jadwal &amp; Papan Skor (WIB)
          </p>
          <h1 className="mt-1 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111111]">
            Pusat Pertandingan
          </h1>

          <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-zinc-200 bg-white p-4 text-xs sm:text-sm text-zinc-700">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#E53935]" />
            <p>
              Catatan: Data statistik dan jadwal diperbarui secara berkala (November 2026).
            </p>
          </div>

          {/* Kontrol Filter */}
          <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Tab Status Pertandingan */}
            <div className="flex flex-wrap sm:inline-flex w-full sm:w-fit gap-1 rounded-lg border border-zinc-200 bg-white p-1">
              {[
                { key: 'all', label: 'Semua Pertandingan' },
                { key: 'upcoming', label: 'Jadwal Mendatang' },
                { key: 'finished', label: 'Hasil Terbaru' },
              ].map((tab) => {
                const active = statusFilter === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() =>
                      setStatusFilter(tab.key as 'all' | 'upcoming' | 'finished')
                    }
                    className={`rounded-md px-3.5 py-2 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                      active
                        ? 'bg-[#111111] text-white'
                        : 'text-zinc-600 hover:text-[#111111]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Filter Kompetisi */}
            <div className="flex flex-wrap items-center gap-2">
              {COMP_FILTERS.map((comp) => {
                const active = compFilter === comp;
                return (
                  <button
                    key={comp}
                    type="button"
                    onClick={() => setCompFilter(comp)}
                    className={`rounded-lg px-3.5 py-2 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                      active
                        ? 'bg-[#E53935] text-white'
                        : 'border border-zinc-200 bg-white text-[#18181B] hover:border-zinc-400'
                    }`}
                  >
                    {comp === 'Semua' ? 'Semua Kompetisi' : comp}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Grid Pertandingan */}
        {filteredMatches.length === 0 ? (
          <div className="my-12 rounded-xl border border-zinc-200 bg-white p-10 text-center">
            <p className="text-base font-bold text-[#111111]">
              Tidak ada pertandingan pada filter ini
            </p>
            <p className="mt-1 text-sm text-zinc-600">
              Coba pilih Semua Pertandingan atau Semua Kompetisi.
            </p>
            <button
              type="button"
              onClick={() => {
                setStatusFilter('all');
                setCompFilter('Semua');
              }}
              className="mt-4 rounded-lg bg-[#111111] px-4 py-2 text-xs font-semibold text-white hover:bg-[#E53935]"
            >
              Tampilkan Semua Pertandingan
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredMatches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
