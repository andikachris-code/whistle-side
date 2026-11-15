import { ArrowRight } from 'lucide-react';
import { MatchFixture, PageRoute } from '../types/football';
import { ClubBadge } from './ClubBadge';

interface MatchCardProps {
  match: MatchFixture;
  onNavigate?: (route: PageRoute) => void;
}

export function MatchCard({ match, onNavigate }: MatchCardProps) {
  const isFinished = match.status === 'finished';

  return (
    <div className="flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-4 sm:p-5 transition-colors hover:border-zinc-300">
      {/* Header Row: Competition & Date */}
      <div className="flex items-center justify-between gap-2 border-b border-zinc-100 pb-3 text-xs">
        <span className="font-semibold text-[#E53935] truncate">
          {match.competition}
        </span>
        <span className="font-mono tabular-nums text-zinc-500 whitespace-nowrap shrink-0">
          {match.dateLabel} · {match.timeUtc}
        </span>
      </div>

      {/* Matchup Rows */}
      <div className="my-4 space-y-3">
        {/* Home Team */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <ClubBadge club={match.home} size="sm" />
            <span className="text-sm font-semibold text-[#111111] truncate">
              {match.home.name}
            </span>
          </div>
          <span className="font-mono text-base font-bold tabular-nums text-[#111111]">
            {isFinished ? match.homeScore : '—'}
          </span>
        </div>

        {/* Away Team */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <ClubBadge club={match.away} size="sm" />
            <span className="text-sm font-semibold text-[#111111] truncate">
              {match.away.name}
            </span>
          </div>
          <span className="font-mono text-base font-bold tabular-nums text-[#111111]">
            {isFinished ? match.awayScore : '—'}
          </span>
        </div>
      </div>

      {/* Footer Row: Venue + Linked Story */}
      <div className="flex items-center justify-between gap-2 border-t border-zinc-100 pt-3 text-xs">
        <span className="text-zinc-500 truncate">
          {match.matchweek} · {match.venue}
        </span>
        {match.linkedArticleId && onNavigate && (
          <button
            type="button"
            onClick={() =>
              onNavigate({ name: 'article', id: match.linkedArticleId! })
            }
            className="inline-flex items-center gap-1 font-semibold text-[#111111] hover:text-[#E53935] whitespace-nowrap shrink-0"
          >
            {isFinished ? 'Laporan' : 'Pratinjau'}
            <ArrowRight className="h-3 w-3" />
          </button>
        )}
      </div>
    </div>
  );
}
