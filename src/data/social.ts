import { CompetitionCoverageItem, InstagramHighlight } from '../types/football';
import { MEDIA_IMAGES } from './media';

export const WHISTLE_SIDE_INSTAGRAM_URL = 'https://www.instagram.com/whistleside.football/';
export const WHISTLE_SIDE_TIKTOK_URL = 'https://www.tiktok.com/@whistleside.football';

export const INSTAGRAM_HIGHLIGHTS: InstagramHighlight[] = [
  {
    id: 'ig-1',
    caption: 'Cara jebakan pressing 4 detik membalikkan duel besar Minggu malam.',
    category: 'Bedah Taktik',
    dateLabel: '15 Nov',
    image: MEDIA_IMAGES.heroPremierLeague,
    instagramUrl: WHISTLE_SIDE_INSTAGRAM_URL,
    likesLabel: '18,4 rb suka',
  },
  {
    id: 'ig-2',
    caption: 'Di bawah sorot lampu Madrid: mengapa selisih satu gol kini sangat berarti.',
    category: 'Malam UCL',
    dateLabel: '14 Nov',
    image: MEDIA_IMAGES.championsLeagueNight,
    instagramUrl: WHISTLE_SIDE_INSTAGRAM_URL,
    likesLabel: '24,1 rb suka',
  },
  {
    id: 'ig-3',
    caption: 'Kecepatan murni di tepi lapangan. Kembalinya era winger 1v1 di Eropa.',
    category: 'Fokus Pemain',
    dateLabel: '13 Nov',
    image: MEDIA_IMAGES.playerActionForward,
    instagramUrl: WHISTLE_SIDE_INSTAGRAM_URL,
    likesLabel: '15,9 rb suka',
  },
  {
    id: 'ig-4',
    caption: 'Selebrasi menit ke-89 di sudut lapangan. Tensi derbi Eropa tak pernah mengecewakan.',
    category: 'Kultur Matchday',
    dateLabel: '11 Nov',
    image: MEDIA_IMAGES.europeanDerbyCelebration,
    instagramUrl: WHISTLE_SIDE_INSTAGRAM_URL,
    likesLabel: '31,2 rb suka',
  },
];

export const COMPETITION_COVERAGE: CompetitionCoverageItem[] = [
  {
    id: 'comp-epl',
    name: 'Premier League',
    shortTag: 'EPL',
    region: 'Inggris',
    summary: 'Analisis perburuan gelar, pratinjau laga akhir pekan, dan dinamika skuad.',
    articleCountLabel: 'Kanal Utama',
    routeTarget: 'premier-league',
    filterCategory: 'Premier League',
  },
  {
    id: 'comp-ucl',
    name: 'Champions League',
    shortTag: 'UCL',
    region: 'Eropa',
    summary: 'Drama malam Eropa, kalkulasi fase liga, dan duel para raksasa benua.',
    articleCountLabel: 'Kanal Utama',
    routeTarget: 'champions-league',
    filterCategory: 'Champions League',
  },
  {
    id: 'comp-laliga',
    name: 'La Liga',
    shortTag: 'ESP',
    region: 'Spanyol',
    summary: 'Intensitas derbi Spanyol, kreativitas lini tengah, dan bintang muda akademi.',
    articleCountLabel: 'Berita & Laporan',
    routeTarget: 'news',
    filterCategory: 'La Liga',
  },
  {
    id: 'comp-seriea',
    name: 'Serie A',
    shortTag: 'ITA',
    region: 'Italia',
    summary: 'Evolusi taktik tiga bek, persaingan papan atas Milan, dan adu strategi pelatih.',
    articleCountLabel: 'Berita & Laporan',
    routeTarget: 'news',
    filterCategory: 'Serie A',
  },
  {
    id: 'comp-bundesliga',
    name: 'Bundesliga',
    shortTag: 'GER',
    region: 'Jerman',
    summary: 'Sepak bola transisi cepat, atmosfer tribune Jerman, dan bakat pressing muda.',
    articleCountLabel: 'Berita & Laporan',
    routeTarget: 'news',
    filterCategory: 'Bundesliga',
  },
];
