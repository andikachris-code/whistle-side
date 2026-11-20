import { ArrowRight, ArrowUpRight, Instagram, User } from 'lucide-react';
import { EditorialImage } from '../components/EditorialImage';
import { CREATOR_ASSETS } from '../data/media';
import { WHISTLE_SIDE_INSTAGRAM_URL } from '../data/social';
import { EditorialRubric, PageRoute } from '../types/football';

interface AboutPageProps {
  onNavigate: (route: PageRoute) => void;
  onScrollToContact: () => void;
}

const CREATOR_PROFILE = {
  eyebrow: 'The Mind Behind Whistle Side',
  fullName: 'Andika Chris Ardiansyah',
  position: 'Founder & Creator of Whistle Side',
  authorId: 'andika-chris-ardiansyah',
  instagramUrl: 'https://www.instagram.com/andikacris_a/',
  portraitSrc: CREATOR_ASSETS.portrait,
  quote:
    'Sepak bola bukan cuma soal siapa yang menang atau kalah. Ada cerita, emosi, drama, dan banyak hal menarik di balik setiap pertandingan.',
  biography: [
    'Berangkat dari ketertarikan terhadap dunia sepak bola, Andika membangun Whistle Side sebagai ruang digital untuk berbagi informasi, cerita, dan perspektif menarik seputar sepak bola.',
    'Melalui Whistle Side, ia ingin menghadirkan pengalaman menikmati sepak bola dengan cara yang lebih seru, informatif, dan relevan dengan generasi sekarang.',
    'Bukan sekadar mengikuti skor pertandingan, tetapi juga memahami cerita dan dinamika di baliknya.',
    'Karena bagi Andika, menikmati sepak bola bukan hanya tentang menonton 90 menit pertandingan. Ada banyak cerita yang layak untuk diketahui.',
  ],
} as const;

const EDITORIAL_RUBRICS: {
  code: string;
  name: string;
  description: string;
  route: PageRoute;
}[] = [
  {
    code: '01',
    name: 'Berita Sepak Bola',
    description:
      'Laporan perkembangan terbaru sepak bola Inggris dan Eropa, hasil laga penting, hingga dinamika bursa transfer secara lugas dan terverifikasi.',
    route: { name: 'news', initialRubric: 'Berita Sepak Bola' as EditorialRubric },
  },
  {
    code: '02',
    name: 'Liga dan Kompetisi',
    description:
      'Liputan mendalam Premier League, UEFA Champions League, La Liga, Serie A, dan Bundesliga lengkap dengan klasemen serta jadwal berkala.',
    route: { name: 'news', initialRubric: 'Liga dan Kompetisi' as EditorialRubric },
  },
  {
    code: '03',
    name: 'Klub',
    description:
      'Sorotan dinamika internal klub papan atas Eropa, strategi skuad, dan arah manajemen pelatih di sepanjang musim.',
    route: { name: 'news', initialRubric: 'Klub' as EditorialRubric },
  },
  {
    code: '04',
    name: 'Profil Pemain',
    description:
      'Feature mendalam dan rekam performa pemain muda terbaik dunia serta tokoh sentral yang membentuk arah kompetisi.',
    route: { name: 'news', initialRubric: 'Profil Pemain' as EditorialRubric },
  },
  {
    code: '05',
    name: 'Analisis dan Opini',
    description:
      'Bedah taktik, struktur permainan, tren pressing modern, dan pembacaan konteks sepak bola yang tetap terpisah jelas dari hard news.',
    route: { name: 'news', initialRubric: 'Analisis dan Opini' as EditorialRubric },
  },
  {
    code: '06',
    name: 'Foto Jurnalistik',
    description:
      'Galeri visual sepak bola dengan keterangan foto bergaya jurnalistik dan pencantuman kredit fotografer serta sumber secara transparan.',
    route: { name: 'news', initialRubric: 'Foto Jurnalistik' },
  },
];

const EDITORIAL_PRINCIPLES = [
  {
    number: '01',
    title: 'Akurasi & Kelengkapan 5W + 1H',
    detail:
      'Setiap laporan disusun dengan struktur piramida terbalik yang jelas—dimulai dari teras berita yang kuat hingga ringkasan unsur Apa, Siapa, Kapan, Di Mana, Mengapa, dan Bagaimana.',
  },
  {
    number: '02',
    title: 'Transparansi Sumber & Atribusi Foto',
    detail:
      'Whistle Side mencantumkan sumber informasi, tautan referensi asli, serta kredit fotografer dan lisensi foto secara jujur tanpa merekayasa kutipan atau atribusi.',
  },
  {
    number: '03',
    title: 'Independen & Anti-Clickbait',
    detail:
      'Judul berita ditulis lugas sesuai isi laporan. Konten berita langsung (hard news) dipisahkan secara jelas dari feature maupun analisis dan opini redaksi.',
  },
  {
    number: '04',
    title: 'Koreksi Terbuka & Hak Jawab',
    detail:
      'Setiap pembaruan atau koreksi pada artikel ditandai dengan waktu pembaruan resmi, dan pembaca dapat mengirimkan masukan atau klarifikasi melalui meja redaksi.',
  },
];

export function AboutPage({ onNavigate, onScrollToContact }: AboutPageProps) {
  return (
    <main className="min-h-[75vh] bg-white py-10 sm:py-14">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-wider text-[#E53935]">
          Tentang Whistle Side
        </p>
        <h1 className="mt-2 text-3xl sm:text-5xl font-extrabold tracking-tight text-[#111111]">
          Dibangun untuk Generasi Baru Penggemar Sepak Bola.
        </h1>
        <p className="mt-4 max-w-3xl text-base sm:text-lg leading-relaxed text-zinc-600">
          Whistle Side adalah platform media digital sepak bola independen yang
          mengulas Premier League Inggris, UEFA Champions League, liga top
          Eropa, pemain muda potensial, serta dinamika transfer—ditulis secara
          ringkas, tajam, dan berpegang pada standar jurnalistik online.
        </p>

        {/* Pilar Liputan */}
        <section className="mt-10 grid grid-cols-1 gap-8 border-t border-zinc-200 pt-10 md:grid-cols-3">
          <div>
            <p className="font-mono text-xs font-bold text-[#E53935]">01</p>
            <h2 className="mt-2 text-lg font-bold text-[#111111]">
              Premier League &amp; Eropa
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Liputan terfokus dari kasta tertinggi Inggris, malam UEFA
              Champions League, La Liga, Serie A, hingga Bundesliga tanpa judul
              palsu atau clickbait.
            </p>
          </div>

          <div>
            <p className="font-mono text-xs font-bold text-[#E53935]">02</p>
            <h2 className="mt-2 text-lg font-bold text-[#111111]">
              Cerita Berbasis Pemain
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Profil mendalam, analisis peran taktik di lapangan, serta sorotan
              bintang muda U-21 bersama para pemain utama klub top Eropa.
            </p>
          </div>

          <div>
            <p className="font-mono text-xs font-bold text-[#E53935]">03</p>
            <h2 className="mt-2 text-lg font-bold text-[#111111]">
              Cepat &amp; Ramah Ponsel
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Dirancang untuk pembaca muda dan penggemar sepak bola modern yang
              mengikuti setiap pekan pertandingan dari desktop maupun ponsel.
            </p>
          </div>
        </section>

        {/* Visi & Misi Media */}
        <section
          aria-labelledby="visi-misi-heading"
          className="mt-14 border-t border-zinc-200 pt-12"
        >
          <p className="text-xs font-bold uppercase tracking-wider text-[#E53935]">
            Arah &amp; Identitas Media
          </p>
          <h2
            id="visi-misi-heading"
            className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#111111]"
          >
            Visi &amp; Misi Whistle Side
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 bg-[#F7F7F8] p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-[#E53935]">
                Visi
              </p>
              <p className="mt-3 text-base font-bold leading-snug text-[#111111]">
                Menjadi rujukan media digital sepak bola berbahasa Indonesia
                yang kredibel, tajam secara editorial, dan mudah diakses oleh
                generasi pembaca digital.
              </p>
              <p className="mt-2.5 text-sm leading-relaxed text-zinc-600">
                Whistle Side hadir untuk membawa pembaca melampaui sekadar skor
                akhir—memahami konteks taktik, cerita pemain, dan dinamika
                kompetisi Eropa secara bertanggung jawab.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-[#E53935]">
                Misi
              </p>
              <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-zinc-700">
                <li>
                  1. Menyajikan berita, profil pemain, dan analisis sepak bola
                  yang terstruktur sesuai kaidah jurnalistik online (5W+1H).
                </li>
                <li>
                  2. Menjaga transparansi sumber informasi, referensi eksternal,
                  dan atribusi kredit foto di setiap konten publikasi.
                </li>
                <li>
                  3. Menghadirkan pengalaman baca yang bersih, cepat, responsif,
                  dan bebas dari sensasionalisme clickbait.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Fokus Pemberitaan & Rubrikasi */}
        <section
          aria-labelledby="rubrikasi-heading"
          className="mt-14 border-t border-zinc-200 pt-12"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#E53935]">
                Fokus Pemberitaan
              </p>
              <h2
                id="rubrikasi-heading"
                className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#111111]"
              >
                Enam Rubrik Utama Redaksi
              </h2>
            </div>
            <p className="text-xs text-zinc-500">
              Pilih rubrik untuk langsung membuka arsip liputan
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {EDITORIAL_RUBRICS.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => onNavigate(item.route)}
                className="group flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-5 text-left transition-all duration-150 hover:-translate-y-0.5 hover:border-[#111111]"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-[#E53935]">
                    {item.code}
                  </span>
                  <h3 className="mt-2 text-base font-bold text-[#111111] transition-colors group-hover:text-[#E53935]">
                    {item.name}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-zinc-600">
                    {item.description}
                  </p>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#111111] group-hover:text-[#E53935]">
                  <span>Buka Rubrik</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Nilai & Prinsip Editorial */}
        <section
          aria-labelledby="prinsip-editorial-heading"
          className="mt-14 border-t border-zinc-200 pt-12"
        >
          <p className="text-xs font-bold uppercase tracking-wider text-[#E53935]">
            Pedoman Kerja Redaksi
          </p>
          <h2
            id="prinsip-editorial-heading"
            className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#111111]"
          >
            Nilai &amp; Prinsip Editorial
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {EDITORIAL_PRINCIPLES.map((principle) => (
              <div
                key={principle.number}
                className="rounded-xl border border-zinc-200 bg-[#F7F7F8] p-5"
              >
                <p className="font-mono text-xs font-bold text-[#E53935]">
                  {principle.number}
                </p>
                <h3 className="mt-1.5 text-base font-bold text-[#111111]">
                  {principle.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-zinc-600">
                  {principle.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Meet the Creator — Profil Pendiri Whistle Side */}
        <section
          aria-labelledby="meet-the-creator-heading"
          className="mt-14 border-t border-zinc-200 pt-12"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
            {/* Foto Potret Kreator (Kiri di Desktop, Atas di Mobile) */}
            <div className="lg:col-span-5">
              <div className="relative h-full overflow-hidden rounded-xl border border-zinc-200 bg-[#111111]">
                <EditorialImage
                  src={CREATOR_PROFILE.portraitSrc}
                  alt={`${CREATOR_PROFILE.fullName} — ${CREATOR_PROFILE.position}`}
                  aspectClassName="aspect-[3/4] h-full w-full"
                  imgClassName="object-cover object-[50%_75%]"
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/75 via-black/30 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                  <span className="font-semibold tracking-wide">
                    Whistle Side
                  </span>
                  <span className="font-mono text-zinc-300">
                    @andikacris_a
                  </span>
                </div>
              </div>
            </div>

            {/* Informasi & Biografi Kreator (Kanan di Desktop, Bawah di Mobile) */}
            <div className="lg:col-span-7 flex flex-col justify-between rounded-xl border border-zinc-200 bg-[#F7F7F8] p-6 sm:p-8 lg:p-10">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#E53935]">
                  {CREATOR_PROFILE.eyebrow}
                </p>

                <h2
                  id="meet-the-creator-heading"
                  className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#111111]"
                >
                  {CREATOR_PROFILE.fullName}
                </h2>

                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-700">
                  <span
                    className="inline-block h-1.5 w-6 bg-[#E53935]"
                    aria-hidden="true"
                  />
                  <span>{CREATOR_PROFILE.position}</span>
                </div>

                {/* Biografi */}
                <div className="mt-6 space-y-3.5 text-sm sm:text-[15px] leading-relaxed text-zinc-700">
                  {CREATOR_PROFILE.biography.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                {/* Kutipan Personal */}
                <blockquote className="mt-7 border-y border-zinc-300 py-5">
                  <p className="text-base sm:text-lg font-bold leading-snug text-[#111111]">
                    “{CREATOR_PROFILE.quote}”
                  </p>
                  <footer className="mt-2 text-xs font-semibold uppercase tracking-wider text-[#E53935]">
                    {CREATOR_PROFILE.fullName}
                  </footer>
                </blockquote>
              </div>

              {/* Tombol Instagram Kreator & Halaman Profil Penulis */}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href={CREATOR_PROFILE.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-lg bg-[#E53935] px-5 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#c62828] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
                >
                  <Instagram className="h-4 w-4" />
                  <span>Kenali Lebih Dekat</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>

                <button
                  type="button"
                  onClick={() =>
                    onNavigate({ name: 'author', id: CREATOR_PROFILE.authorId })
                  }
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-[#111111] transition-colors duration-150 hover:border-[#111111]"
                >
                  <User className="h-4 w-4 text-[#E53935]" />
                  <span>Profil Penulis &amp; Artikel</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Strip Aksi */}
        <section className="mt-12 flex flex-col gap-4 rounded-xl bg-[#111111] p-6 sm:p-8 text-white sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold">Terhubung dengan Whistle Side</h2>
            <p className="mt-1 text-sm text-zinc-300">
              Kirim masukan liputan, hak jawab, ajukan kolaborasi redaksi, atau
              ikuti akun resmi kami di Instagram.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onScrollToContact}
              className="inline-flex items-center gap-2 rounded-lg bg-[#E53935] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#c62828]"
            >
              <span>Hubungi Redaksi</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

            <a
              href={WHISTLE_SIDE_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:border-white"
            >
              <Instagram className="h-3.5 w-3.5" />
              <span>Instagram</span>
            </a>

            <button
              type="button"
              onClick={() => onNavigate({ name: 'news' })}
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2.5 text-xs font-semibold text-zinc-200 transition-colors hover:text-white"
            >
              <span>Baca Berita Terbaru</span>
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
