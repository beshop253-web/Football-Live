import type { Match, Competition, StandingEntry, Team, MatchStatus } from './types';

const API_BASE =
  process.env.FOOTBALL_API_BASE_URL || 'https://v3.football.api-sports.io';
const API_KEY = process.env.FOOTBALL_API_KEY || '';

export const LEAGUE_IDS = [
  { id: 39, slug: 'eng.1', name: 'Premier League', country: 'England' },
  { id: 140, slug: 'esp.1', name: 'La Liga', country: 'Spain' },
  { id: 135, slug: 'ita.1', name: 'Serie A', country: 'Italy' },
  { id: 78, slug: 'ger.1', name: 'Bundesliga', country: 'Germany' },
  { id: 61, slug: 'fra.1', name: 'Ligue 1', country: 'France' },
  { id: 94, slug: 'por.1', name: 'Liga Portugal', country: 'Portugal' },
  { id: 88, slug: 'ned.1', name: 'Eredivisie', country: 'Netherlands' },
  { id: 144, slug: 'bel.1', name: 'Belgian Pro League', country: 'Belgium' },
  { id: 179, slug: 'sco.1', name: 'Scottish Premiership', country: 'Scotland' },
  { id: 2, slug: 'uefa.champions', name: 'UEFA Champions League', country: 'Europe' },
  { id: 3, slug: 'uefa.europa', name: 'UEFA Europa League', country: 'Europe' },
  { id: 848, slug: 'uefa.europa.conf', name: 'UEFA Conference League', country: 'Europe' },
] as const;

export const LEAGUES = LEAGUE_IDS;

function isoDate(d = new Date()) {
  return d.toISOString().slice(0, 10);
}

function mapStatus(short: string | undefined): MatchStatus {
  const s = (short || '').toUpperCase();
  if (['1H', '2H', 'HT', 'ET', 'BT', 'P', 'LIVE'].includes(s)) return 'LIVE';
  if (['FT', 'AET', 'PEN'].includes(s)) return 'FINISHED';
  if (s === 'PST') return 'POSTPONED';
  if (s === 'CANC') return 'CANCELLED';
  if (s === 'SUSP') return 'SUSPENDED';
  return 'SCHEDULED';
}

async function apiGet(path: string, params: Record<string, string | number> = {}) {
  if (!API_KEY) {
    console.error('FOOTBALL_API_KEY missing');
    return null;
  }
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => qs.set(k, String(v)));
  const url = `${API_BASE}${path}?${qs.toString()}`;
  try {
    const res = await fetch(url, {
      headers: {
        'x-apisports-key': API_KEY,
        Accept: 'application/json',
      },
      next: { revalidate: 30 },
    });
    if (!res.ok) {
      console.error('API-Football error', res.status, path);
      return null;
    }
    const json = await res.json();
    return json.response ?? null;
  } catch (e) {
    console.error('API-Football fetch failed', e);
    return null;
  }
}

function mapFixture(f: any): Match {
  const league = f.league || {};
  const teams = f.teams || {};
  const goals = f.goals || {};
  return {
    id: String(f.fixture?.id ?? Math.random()),
    competition: {
      id: String(league.id ?? ''),
      name: league.name || 'Competition',
      slug: String(league.id ?? ''),
      country: league.country,
      logo: league.logo,
    },
    homeTeam: {
      id: String(teams.home?.id ?? ''),
      name: teams.home?.name || 'Home',
      logo: teams.home?.logo || '',
    },
    awayTeam: {
      id: String(teams.away?.id ?? ''),
      name: teams.away?.name || 'Away',
      logo: teams.away?.logo || '',
    },
    homeScore: goals.home == null ? null : Number(goals.home),
    awayScore: goals.away == null ? null : Number(goals.away),
    status: mapStatus(f.fixture?.status?.short),
    minute: f.fixture?.status?.elapsed != null ? String(f.fixture.status.elapsed) : undefined,
    date: f.fixture?.date || new Date().toISOString(),
    venue: f.fixture?.venue?.name || undefined,
  };
}

export async function getLeagues(): Promise<Competition[]> {
  return LEAGUE_IDS.map((l) => ({
    id: String(l.id),
    name: l.name,
    slug: l.slug,
    country: l.country,
  }));
}

export async function getTodayMatches(): Promise<Match[]> {
  const date = isoDate();
  const data = await apiGet('/fixtures', { date });
  if (!Array.isArray(data)) return [];
  const allowed = new Set(LEAGUE_IDS.map((l) => l.id));
  return data
    .filter((f: any) => allowed.has(f.league?.id))
    .map(mapFixture)
    .sort((a: Match, b: Match) => {
      if (a.status === 'LIVE' && b.status !== 'LIVE') return -1;
      if (b.status === 'LIVE' && a.status !== 'LIVE') return 1;
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
}

export async function getLiveMatches(): Promise<Match[]> {
  const data = await apiGet('/fixtures', { live: 'all' });
  if (!Array.isArray(data)) return [];
  const allowed = new Set(LEAGUE_IDS.map((l) => l.id));
  return data.filter((f: any) => allowed.has(f.league?.id)).map(mapFixture);
}

export async function getUpcomingMatches(days = 5): Promise<Match[]> {
  const from = isoDate();
  const toD = new Date();
  toD.setDate(toD.getDate() + days);
  const to = isoDate(toD);
  const results: Match[] = [];
  for (const l of LEAGUE_IDS.slice(0, 5)) {
    const data = await apiGet('/fixtures', {
      league: l.id,
      next: 10,
    });
    if (Array.isArray(data)) results.push(...data.map(mapFixture));
  }
  return results
    .filter((m) => m.status === 'SCHEDULED')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 40);
}

export async function getStandings(slugOrId: string): Promise<StandingEntry[]> {
  let leagueId = Number(slugOrId);
  if (!Number.isFinite(leagueId)) {
    const found = LEAGUE_IDS.find((l) => l.slug === slugOrId || String(l.id) === slugOrId);
    leagueId = found?.id ?? 39;
  }
  const season = new Date().getFullYear();
  let data = await apiGet('/standings', { league: leagueId, season });
  if (!Array.isArray(data) || !data.length) {
    data = await apiGet('/standings', { league: leagueId, season: season - 1 });
  }
  if (!Array.isArray(data) || !data[0]?.league?.standings) return [];
  const table = data[0].league.standings[0] || data[0].league.standings;
  if (!Array.isArray(table)) return [];
  return table.map((row: any) => ({
    position: row.rank,
    team: {
      id: String(row.team?.id ?? ''),
      name: row.team?.name || 'Team',
      logo: row.team?.logo || '',
    },
    played: row.all?.played ?? 0,
    won: row.all?.win ?? 0,
    drawn: row.all?.draw ?? 0,
    lost: row.all?.lose ?? 0,
    goalsFor: row.all?.goals?.for ?? 0,
    goalsAgainst: row.all?.goals?.against ?? 0,
    goalDifference: row.goalsDiff ?? 0,
    points: row.points ?? 0,
  }));
}

export async function search(query: string) {
  const q = query.toLowerCase().trim();
  if (!q) return { matches: [], teams: [] as Team[], competitions: [] as Competition[] };
  const [today, leagues] = await Promise.all([getTodayMatches(), getLeagues()]);
  const matches = today.filter(
    (m) =>
      m.homeTeam.name.toLowerCase().includes(q) ||
      m.awayTeam.name.toLowerCase().includes(q) ||
      m.competition.name.toLowerCase().includes(q)
  );
  const competitions = leagues.filter((c) => c.name.toLowerCase().includes(q));
  const teamMap = new Map<string, Team>();
  for (const m of today) {
    if (m.homeTeam.name.toLowerCase().includes(q)) teamMap.set(m.homeTeam.id, m.homeTeam);
    if (m.awayTeam.name.toLowerCase().includes(q)) teamMap.set(m.awayTeam.id, m.awayTeam);
  }
  return { matches, teams: Array.from(teamMap.values()), competitions };
}
