export type MatchStatus = 'SCHEDULED' | 'LIVE' | 'IN_PLAY' | 'PAUSED' | 'FINISHED' | 'POSTPONED' | 'CANCELLED' | 'SUSPENDED' | 'AWARDED';

export interface Team {
  id: string;
  name: string;
  shortName?: string;
  abbreviation?: string;
  logo?: string;
  country?: string;
}

export interface Competition {
  id: string;
  name: string;
  abbreviation?: string;
  slug: string;
  country?: string;
  logo?: string;
  season?: number | string;
}

export interface Match {
  id: string;
  competition: Competition;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number | null;
  awayScore: number | null;
  status: MatchStatus;
  minute?: string | number | null;
  date: string; // ISO
  time?: string;
  venue?: string;
  events?: MatchEvent[];
  stats?: MatchStats;
}

export interface MatchEvent {
  id?: string;
  type: 'GOAL' | 'YELLOW_CARD' | 'RED_CARD' | 'SUBSTITUTION' | 'PENALTY' | 'OWN_GOAL' | 'VAR' | string;
  minute: number | string;
  team?: 'home' | 'away';
  player?: string;
  assist?: string;
  detail?: string;
}

export interface MatchStats {
  possession?: { home: number; away: number };
  shots?: { home: number; away: number };
  shotsOnTarget?: { home: number; away: number };
  corners?: { home: number; away: number };
  fouls?: { home: number; away: number };
  offsides?: { home: number; away: number };
  yellowCards?: { home: number; away: number };
  redCards?: { home: number; away: number };
}

export interface StandingEntry {
  position: number;
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export interface Scorer {
  player: {
    id?: string;
    name: string;
    photo?: string;
  };
  team: Team;
  goals: number;
  assists?: number;
  matches?: number;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary?: string;
  image?: string;
  source: string;
  date: string;
  category: string;
  url?: string;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
  cached?: boolean;
}
