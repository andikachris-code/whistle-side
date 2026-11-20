import lamineYamalActionImg from '../assets/players/lamine-yamal-action.jpg';
import lennartKarlActionImg from '../assets/players/lennart-karl-action.jpg';
import pauCubarsiActionImg from '../assets/players/pau-cubarsi-action.jpg';
import warrenZaireEmeryActionImg from '../assets/players/warren-zaire-emery-action.jpg';
import { PhotoJournalismItem } from '../types/football';
import { MEDIA_IMAGES } from './media';

export const PHOTO_JOURNALISM_ITEMS: PhotoJournalismItem[] = [
  {
    id: 'pj-lamine-yamal',
    title: 'Lamine Yamal Memimpin Serangan Spanyol Saat Menghadapi Prancis',
    caption:
      'Penyerang sayap muda Spanyol dan FC Barcelona, Lamine Yamal (nomor punggung 19), mengamati pergerakan lini tengah dalam pertandingan internasional melawan Prancis pada Juli 2026.',
    category: 'Aksi Pertandingan',
    dateLabel: '14 Juli 2026',
    location: 'Laga Internasional Prancis vs Spanyol',
    image: lamineYamalActionImg,
    photographer: 'Bryan Berlin',
    source: 'Wikimedia Commons',
    license: 'CC BY-SA 4.0',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:Lamine_Yamal_France_v_Spain_7.24.26-057.jpg',
    needsCompletion: false,
    linkedArticleId: 'profil-lamine-yamal',
    featured: true,
  },
  {
    id: 'pj-warren-zaire-emery',
    title: 'Warren Zaïre-Emery Mengawal Ruang Mesin Timnas Prancis',
    caption:
      'Gelandang Paris Saint-Germain, Warren Zaïre-Emery, beraksi menjaga keseimbangan lini tengah saat memperkuat Timnas Prancis dalam duel internasional kontra Maroko.',
    category: 'Aksi Pertandingan',
    dateLabel: '9 Juli 2026',
    location: 'Laga Internasional Prancis vs Maroko',
    image: warrenZaireEmeryActionImg,
    photographer: 'Bryan Berlin',
    source: 'Wikimedia Commons',
    license: 'CC BY-SA 4.0',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:Warren_Zaire-Emery_France_v_Morocco_9_July_2026-051.jpg',
    needsCompletion: false,
    linkedArticleId: 'profil-warren-zaire-emery',
  },
  {
    id: 'pj-pau-cubarsi',
    title: 'Ketenangan Pau Cubarsí Mengatur Garis Pertahanan Spanyol',
    caption:
      'Bek tengah jebolan La Masia, Pau Cubarsí (nomor punggung 22), berkoordinasi menjaga area kotak penalti dan garis pertahanan saat laga internasional Prancis melawan Spanyol.',
    category: 'Profil Pemain',
    dateLabel: '14 Juli 2026',
    location: 'Laga Internasional Prancis vs Spanyol',
    image: pauCubarsiActionImg,
    photographer: 'Bryan Berlin',
    source: 'Wikimedia Commons',
    license: 'CC BY-SA 4.0',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:Pau_Cubarsi_France_v_Spain_7.24.26-116.jpg',
    needsCompletion: false,
    linkedArticleId: 'profil-pau-cubarsi',
  },
  {
    id: 'pj-lennart-karl',
    title: 'Selebrasi Gol Talenta Muda Bayern Munich Lennart Karl',
    caption:
      'Gelandang serang muda Bayern Munich, Lennart Karl, merentangkan tangan merayakan gol dalam pertandingan kompetitif bersama Die Roten sebelum menembus rotasi tim senior.',
    category: 'Profil Pemain',
    dateLabel: 'Arsip 2025/26',
    location: 'Kompetisi Domestik Jerman',
    image: lennartKarlActionImg,
    source: 'Attacking Football / Yahoo Sports',
    sourceUrl:
      'https://sports.yahoo.com/remember-name-lennart-karl-bayern-143400778.html',
    needsCompletion: true,
    completionNote:
      'Nama fotografer asli dan detail lisensi foto perlu dilengkapi oleh redaksi Whistle Side.',
    linkedArticleId: 'profil-lennart-karl',
  },
  {
    id: 'pj-epl-midfield-press',
    title: 'Intensitas Pressing Lini Tengah di Bawah Lampu Stadion Inggris',
    caption:
      'Visualisasi editorial duel tempo tinggi di lini tengah yang menggambarkan dinamika counter-pressing klub papan atas Premier League pada paruh pertama musim 2026/27.',
    category: 'Taktik & Lapangan',
    dateLabel: '15 November 2026',
    location: 'Arsip Ilustrasi Editorial Whistle Side',
    image: MEDIA_IMAGES.heroPremierLeague,
    source: 'Ilustrasi Editorial Whistle Side',
    needsCompletion: true,
    completionNote:
      'Foto ilustrasi internal — dapat diganti dengan foto liputan lapangan beserta kredit fotografer resmi oleh redaksi.',
    linkedArticleId: 'premier-league-high-press-evolution',
  },
  {
    id: 'pj-ucl-night',
    title: 'Atmosfer Malam Eropa pada Fase Liga UEFA Champions League',
    caption:
      'Visualisasi suasana stadion di bawah sorot lampu malam jelang pertandingan fase liga UEFA Champions League yang kini menuntut ketajaman selisih gol.',
    category: 'Atmosfer Stadion',
    dateLabel: '14 November 2026',
    location: 'Arsip Ilustrasi Editorial Whistle Side',
    image: MEDIA_IMAGES.championsLeagueNight,
    source: 'Ilustrasi Editorial Whistle Side',
    needsCompletion: true,
    completionNote:
      'Foto ilustrasi internal — kredit fotografer liputan asli perlu dilengkapi apabila diganti dengan dokumentasi pertandingan resmi.',
    linkedArticleId: 'champions-league-knockout-nights',
  },
  {
    id: 'pj-derby-celebration',
    title: 'Ledakan Emosi Gol Menit Akhir di Laga Derbi Eropa',
    caption:
      'Visualisasi momen selebrasi di sudut lapangan yang menggambarkan tingginya intensitas fase injury time dalam pertandingan derbi papan atas Eropa.',
    category: 'Atmosfer Stadion',
    dateLabel: '11 November 2026',
    location: 'Arsip Ilustrasi Editorial Whistle Side',
    image: MEDIA_IMAGES.europeanDerbyCelebration,
    source: 'Ilustrasi Editorial Whistle Side',
    needsCompletion: true,
    completionNote:
      'Foto ilustrasi internal — kredit fotografer dan tanggal pemotretan lapangan perlu dilengkapi redaksi bila menggunakan arsip pers.',
    linkedArticleId: 'late-comebacks-european-derbies',
  },
  {
    id: 'pj-touchline-tactics',
    title: 'Instruksi Taktis dari Area Teknis Pinggir Lapangan',
    caption:
      'Visualisasi situasi pinggir lapangan saat staf pelatih melakukan penyesuaian struktur build-up dan substitusi taktis sebelum menit ke-60.',
    category: 'Taktik & Lapangan',
    dateLabel: '12 November 2026',
    location: 'Arsip Ilustrasi Editorial Whistle Side',
    image: MEDIA_IMAGES.tacticalManagerTouchline,
    source: 'Ilustrasi Editorial Whistle Side',
    needsCompletion: true,
    completionNote:
      'Foto ilustrasi internal — kredit fotografer asli perlu dilengkapi oleh redaksi Whistle Side jika diganti foto dokumentasi.',
    linkedArticleId: 'touchline-managers-winter-run',
  },
];
