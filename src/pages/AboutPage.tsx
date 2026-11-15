import { ArrowRight, ArrowUpRight, Instagram } from 'lucide-react';
import { EditorialImage } from '../components/EditorialImage';
import { CREATOR_ASSETS } from '../data/media';
import { WHISTLE_SIDE_INSTAGRAM_URL } from '../data/social';
import { PageRoute } from '../types/football';

interface AboutPageProps {
  onNavigate: (route: PageRoute) => void;
  onScrollToContact: () => void;
}

const CREATOR_PROFILE = {
  eyebrow: 'The Mind Behind Whistle Side',
  fullName: 'Andika Chris Ardiansyah',
  position: 'Founder & Creator of Whistle Side',
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
          ringkas, tajam, dan enak dibaca.
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
              Catatan pemandu bakat, analisis peran taktik di lapangan, serta
              sorotan bintang muda U-21 bersama para pemain utama klub top.
            </p>
          </div>

          <div>
            <p className="font-mono text-xs font-bold text-[#E53935]">03</p>
            <h2 className="mt-2 text-lg font-bold text-[#111111]">
              Cepat &amp; Ramah Ponsel
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Dirancang untuk pembaca usia 15–25 tahun yang mengikuti setiap
              pekan pertandingan langsung dari ponsel mereka.
            </p>
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
                  imgClassName="object-cover object-[50%_20%]"
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
                  <span className="inline-block h-1.5 w-6 bg-[#E53935]" aria-hidden="true" />
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

              {/* Tombol Instagram Kreator */}
              <div className="mt-7 flex flex-wrap items-center gap-4">
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
              </div>
            </div>
          </div>
        </section>

        {/* Strip Aksi */}
        <section className="mt-12 flex flex-col gap-4 rounded-xl bg-[#111111] p-6 sm:p-8 text-white sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold">Terhubung dengan Whistle Side</h2>
            <p className="mt-1 text-sm text-zinc-300">
              Kirim masukan liputan, ajukan kolaborasi redaksi, atau ikuti akun
              resmi kami di Instagram.
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
