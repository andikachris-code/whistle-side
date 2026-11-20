import { AuthorProfile } from '../types/football';
import { CREATOR_ASSETS } from './media';

export const AUTHORS: AuthorProfile[] = [
  {
    id: 'andika-chris-ardiansyah',
    name: 'Andika Chris Ardiansyah',
    role: 'Founder, Creator & Editor-in-Chief Whistle Side',
    shortBio:
      'Pendiri dan pengelola redaksi Whistle Side yang berfokus pada liputan sepak bola Eropa, analisis taktik modern, profil pemain muda, serta pengembangan jurnalisme olahraga digital.',
    fullBio: [
      'Berangkat dari ketertarikan terhadap dunia sepak bola, Andika membangun Whistle Side sebagai ruang digital untuk berbagi informasi, cerita, dan perspektif menarik seputar sepak bola.',
      'Sebagai penanggung jawab redaksi sekaligus penulis utama, ia berfokus menyajikan berita sepak bola yang terstruktur, objektif, dan mematuhi kaidah jurnalistik online—mulai dari kejelasan unsur 5W+1H hingga transparansi sumber informasi dan atribusi foto.',
      'Melalui Whistle Side, ia ingin menghadirkan pengalaman menikmati sepak bola dengan cara yang lebih informatif dan relevan bagi generasi pembaca digital masa kini.',
    ],
    avatar: CREATOR_ASSETS.portrait,
    focusAreas: [
      'Premier League',
      'UEFA Champions League',
      'Analisis Taktik',
      'Profil Pemain Muda',
      'Bursa Transfer Eropa',
    ],
    instagramUrl: 'https://www.instagram.com/andikacris_a/',
    email: 'editorial@whistleside.com',
    location: 'Indonesia · Meja Redaksi Digital Whistle Side',
  },
];

export function getAuthorById(id: string): AuthorProfile | undefined {
  return AUTHORS.find((author) => author.id === id);
}
