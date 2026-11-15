export type PageRoute =
  | { name: 'home' }
  | { name: 'news'; initialCategory?: string }
  | { name: 'matches'; initialCompetition?: string }
  | { name: 'premier-league' }
  | { name: 'champions-league' }
  | { name: 'players' }
  | { name: 'about' }
  | { name: 'article'; id: string };

export type NewsCategory =
  | 'Premier League'
  | 'Champions League'
  | 'La Liga'
  | 'Serie A'
  | 'Bundesliga'
  | 'Transfer'
  | 'Internasional'
  | 'Pemain';

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: NewsCategory;
  publishedAt: string;
  readTime: string;
  author: {
    name: string;
    role: string;
  };
  image: string;
  imageCaption: string;
  featured?: boolean;
  breaking?: boolean;
  pullQuote?: string;
  content: string[];
  tags: string[];
  relatedIds: string[];
}

export type CompetitionName =
  | 'Premier League'
  | 'Champions League'
  | 'La Liga'
  | 'Serie A'
  | 'Bundesliga';

export interface ClubInfo {
  name: string;
  shortName: string;
  primaryColor: string;
  secondaryColor: string;
  logoUrl?: string;
}

export interface MatchFixture {
  id: string;
  competition: CompetitionName;
  matchweek: string;
  status: 'upcoming' | 'finished';
  dateLabel: string;
  timeUtc: string;
  venue: string;
  home: ClubInfo;
  away: ClubInfo;
  homeScore?: number;
  awayScore?: number;
  linkedArticleId?: string;
}

export interface LeagueStandingRow {
  position: number;
  club: ClubInfo;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalDiff: string;
  points: number;
}

export interface PlayerProfile {
  id: string;
  name: string;
  club: string;
  league: string;
  position: 'Penyerang' | 'Gelandang' | 'Bek';
  nationality: string;
  age: number;
  squadNumber: number;
  image: string;
  summary: string;
  scoutingNote: string;
  stats: {
    appearances: number;
    goals: number;
    assists: number;
    rating: string;
  };
  articleId: string;
}

export interface InstagramHighlight {
  id: string;
  caption: string;
  category: string;
  dateLabel: string;
  image: string;
  instagramUrl: string;
  likesLabel: string;
}

export interface CompetitionCoverageItem {
  id: string;
  name: CompetitionName;
  shortTag: string;
  region: string;
  summary: string;
  articleCountLabel: string;
  routeTarget: 'premier-league' | 'champions-league' | 'news';
  filterCategory: NewsCategory;
}
