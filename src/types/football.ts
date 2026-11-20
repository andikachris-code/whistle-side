export type EditorialRubric =
  | 'Berita Sepak Bola'
  | 'Liga dan Kompetisi'
  | 'Klub'
  | 'Profil Pemain'
  | 'Analisis dan Opini';

export type NewsType = 'Hard News' | 'Soft News / Feature' | 'Analisis & Opini';

export type PageRoute =
  | { name: 'home' }
  | {
      name: 'news';
      initialCategory?: string;
      initialRubric?: EditorialRubric | 'Foto Jurnalistik';
    }
  | { name: 'matches'; initialCompetition?: string }
  | { name: 'premier-league' }
  | { name: 'champions-league' }
  | { name: 'players' }
  | { name: 'foto-jurnalistik' }
  | { name: 'author'; id: string }
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

export interface PhotoCredit {
  caption: string;
  photographer?: string;
  source?: string;
  license?: string;
  sourceUrl?: string;
  needsCompletion?: boolean;
  completionNote?: string;
}

export interface ArticleSource {
  name: string;
  type: 'Institusi Resmi' | 'Media' | 'Data Pertandingan' | 'Narasumber';
  url?: string;
  note?: string;
}

export interface ArticleFiveWOneH {
  what: string;
  who: string;
  when: string;
  where: string;
  why: string;
  how: string;
}

export interface AuthorProfile {
  id: string;
  name: string;
  role: string;
  shortBio: string;
  fullBio: string[];
  avatar?: string;
  focusAreas: string[];
  instagramUrl?: string;
  email: string;
  location: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: NewsCategory;
  rubric: EditorialRubric;
  newsType: NewsType;
  publishedAt: string;
  publishedTime: string;
  updatedAt?: string;
  readTime: string;
  author: {
    id: string;
    name: string;
    role: string;
  };
  image: string;
  imageCaption: string;
  photoCredit: PhotoCredit;
  sources: ArticleSource[];
  sourceCompletionNote?: string;
  interviewQuoteStatus: string;
  fiveWOneH: ArticleFiveWOneH;
  featured?: boolean;
  breaking?: boolean;
  pullQuote?: string;
  content: string[];
  tags: string[];
  relatedIds: string[];
}

export type PhotoJournalismCategory =
  | 'Aksi Pertandingan'
  | 'Profil Pemain'
  | 'Atmosfer Stadion'
  | 'Taktik & Lapangan';

export interface PhotoJournalismItem {
  id: string;
  title: string;
  caption: string;
  category: PhotoJournalismCategory;
  dateLabel: string;
  location: string;
  image: string;
  photographer?: string;
  source?: string;
  license?: string;
  sourceUrl?: string;
  needsCompletion?: boolean;
  completionNote?: string;
  linkedArticleId?: string;
  featured?: boolean;
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
