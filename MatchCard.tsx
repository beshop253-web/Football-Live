'use client';

import Link from 'next/link';
import type { Match } from '../lib/types';
import clsx from 'clsx';

function formatTime(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  } catch {
    return '';
  }
}

function TeamLogo({ src, name }: { src?: string; name: string }) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={name} className="w-8 h-8 object-contain rounded-full bg-white/5" loading="lazy" />
    );
  }
  return (
    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
}

export default function MatchCard({ match, compact = false }: { match: Match; compact?: boolean }) {
  const isLive = match.status === 'LIVE';
  const isFinished = match.status === 'FINISHED';
  const scoreHome = match.homeScore ?? '-';
  const scoreAway = match.awayScore ?? '-';

  return (
    <Link
      href={`/match/${encodeURIComponent(match.id)}`}
      className={clsx(
        'block glass glass-hover rounded-2xl p-3.5 transition-all active:scale-[0.98]',
        'animate-fade-in'
      )}
    >
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-xs text-[var(--muted)] font-medium truncate max-w-[60%]">
          {match.competition.name}
        </span>
        {isLive ? (
          <span className="live-badge flex items-center gap-1.5 text-xs font-bold text-red-400 bg-red-500/15 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            LIVE {match.minute ? `${match.minute}` : ''}
          </span>
        ) : isFinished ? (
          <span className="text-xs text-[var(--muted)]">Terminé</span>
        ) : (
          <span className="text-xs text-[var(--accent)] font-medium">{formatTime(match.date)}</span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 flex items-center gap-2.5 min-w-0">
          <TeamLogo src={match.homeTeam.logo} name={match.homeTeam.name} />
          <span className="text-sm font-semibold truncate">{match.homeTeam.name}</span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 px-2">
          <span className={clsx('text-lg font-bold tabular-nums', isLive && 'text-white')}>
            {isFinished || isLive || match.homeScore !== null ? scoreHome : ''}
          </span>
          <span className="text-[var(--muted)] text-sm">-</span>
          <span className={clsx('text-lg font-bold tabular-nums', isLive && 'text-white')}>
            {isFinished || isLive || match.awayScore !== null ? scoreAway : ''}
          </span>
        </div>

        <div className="flex-1 flex items-center gap-2.5 min-w-0 justify-end">
          <span className="text-sm font-semibold truncate text-right">{match.awayTeam.name}</span>
          <TeamLogo src={match.awayTeam.logo} name={match.awayTeam.name} />
        </div>
      </div>
    </Link>
  );
}
