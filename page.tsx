'use client';

import { useState, useEffect, useCallback } from 'react';
import Header from '../../components/Header';
import MatchCard from '../../components/MatchCard';
import EmptyState from '../../components/EmptyState';
import type { Match, Team, Competition } from '../../lib/types';
import { Search as SearchIcon } from 'lucide-react';
import Link from 'next/link';

export default function SearchPage() {
  const [q, setQ] = useState('');
  const [results, setResults] = useState<{ matches: Match[]; teams: Team[]; competitions: Competition[] }>({
    matches: [],
    teams: [],
    competitions: [],
  });
  const [loading, setLoading] = useState(false);

  const doSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults({ matches: [], teams: [], competitions: [] });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const json = await res.json();
      setResults(json.data || { matches: [], teams: [], competitions: [] });
    } catch {
      setResults({ matches: [], teams: [], competitions: [] });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => doSearch(q), 300);
    return () => clearTimeout(t);
  }, [q, doSearch]);

  const hasResults = results.matches.length + results.teams.length + results.competitions.length > 0;

  return (
    <div className="min-h-full">
      <Header title="Recherche" />
      <div className="px-4 pt-3 pb-6">
        <div className="relative mb-4">
          <SearchIcon size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Équipe, joueur, compétition, match..."
            className="w-full bg-[var(--card)] border border-[var(--border)] rounded-2xl pl-10 pr-4 py-3 text-sm outline-none focus:border-blue-500/50"
          />
        </div>

        {loading && <p className="text-xs text-[var(--muted)] mb-3">Recherche...</p>}

        {!q.trim() ? (
          <EmptyState message="Recherchez une équipe, une compétition ou un match." />
        ) : !hasResults && !loading ? (
          <EmptyState message="Aucun résultat." sub="Essayez un autre terme." />
        ) : (
          <div className="space-y-5">
            {results.competitions.length > 0 && (
              <section>
                <h3 className="text-xs font-bold uppercase text-[var(--muted)] mb-2">Compétitions</h3>
                <div className="space-y-2">
                  {results.competitions.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/competition/${c.slug}`}
                      className="block glass rounded-xl px-4 py-3 text-sm font-medium hover:border-blue-500/30"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </section>
            )}
            {results.teams.length > 0 && (
              <section>
                <h3 className="text-xs font-bold uppercase text-[var(--muted)] mb-2">Équipes</h3>
                <div className="space-y-2">
                  {results.teams.map((t) => (
                    <div key={t.id || t.name} className="flex items-center gap-3 glass rounded-xl px-4 py-3">
                      {t.logo && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={t.logo} alt="" className="w-7 h-7 object-contain" />
                      )}
                      <span className="text-sm font-medium">{t.name}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
            {results.matches.length > 0 && (
              <section>
                <h3 className="text-xs font-bold uppercase text-[var(--muted)] mb-2">Matchs</h3>
                <div className="space-y-2.5">
                  {results.matches.map((m) => (
                    <MatchCard key={m.id} match={m} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
