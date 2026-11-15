import { Check, Instagram, Mail, MapPin, Send } from 'lucide-react';
import { FormEvent, useState } from 'react';
import {
  WHISTLE_SIDE_INSTAGRAM_URL,
  WHISTLE_SIDE_TIKTOK_URL,
} from '../data/social';
import { PageRoute } from '../types/football';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail('');
    setMessage('');
  };

  return (
    <footer
      id="contact-section"
      className="border-t border-zinc-800 bg-[#111111] text-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-5">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                onNavigate({ name: 'home' });
              }}
              className="inline-block rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E53935]"
            >
              <BrandLogo variant="light" size="md" />
            </a>

            <p className="max-w-sm text-sm leading-relaxed text-zinc-300">
              Whistle Side adalah platform media digital sepak bola modern untuk
              para penggemar—menyajikan liputan editorial tajam, jadwal
              pertandingan, dan sorotan pemain dari Premier League hingga panggung Eropa.
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={WHISTLE_SIDE_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:border-[#E53935] hover:bg-[#E53935]"
              >
                <Instagram className="h-4 w-4" />
                <span>Instagram</span>
              </a>

              <a
                href={WHISTLE_SIDE_TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:border-[#E53935] hover:bg-[#E53935]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.81a8.26 8.26 0 0 0 4.76 1.5V6.87a4.84 4.84 0 0 1-1-.18Z" />
                </svg>
                <span>TikTok</span>
              </a>
            </div>
          </div>

          {/* Navigation & Coverage Column */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Navigasi
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Beranda', route: { name: 'home' } as PageRoute },
                { label: 'Berita Terbaru', route: { name: 'news' } as PageRoute },
                { label: 'Pusat Pertandingan', route: { name: 'matches' } as PageRoute },
                { label: 'Premier League', route: { name: 'premier-league' } as PageRoute },
                { label: 'Champions League', route: { name: 'champions-league' } as PageRoute },
                { label: 'Pemain', route: { name: 'players' } as PageRoute },
                { label: 'Tentang Kami', route: { name: 'about' } as PageRoute },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => onNavigate(link.route)}
                    className="text-zinc-300 transition-colors hover:text-[#E53935]"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info Column */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Kontak &amp; Meja Redaksi
            </h3>
            <div className="space-y-3 text-sm text-zinc-300">
              <div className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#E53935]" />
                <div>
                  <p className="font-semibold text-white">Redaksi &amp; Berita</p>
                  <a
                    href="mailto:editorial@whistleside.com"
                    className="text-zinc-300 hover:text-white underline decoration-zinc-600 underline-offset-4"
                  >
                    editorial@whistleside.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#E53935]" />
                <div>
                  <p className="font-semibold text-white">Kerja Sama</p>
                  <a
                    href="mailto:partners@whistleside.com"
                    className="text-zinc-300 hover:text-white underline decoration-zinc-600 underline-offset-4"
                  >
                    partners@whistleside.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#E53935]" />
                <p className="text-zinc-400">
                  Meja Redaksi Digital · Jakarta &amp; London
                </p>
              </div>
            </div>
          </div>

          {/* Quick Contact Message Form */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Kirim Pesan ke Redaksi
            </h3>
            {submitted ? (
              <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Check className="h-4 w-4 text-[#E53935]" />
                  <span>Pesan terkirim</span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
                  Terima kasih telah menghubungi tim redaksi Whistle Side.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-3 text-xs font-semibold text-[#E53935] hover:underline"
                >
                  Kirim pesan lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2.5">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Alamat email Anda"
                  aria-label="Alamat email Anda"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs text-white placeholder:text-zinc-500 focus:border-[#E53935] focus:outline-none"
                />
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Kirim ide liputan atau pesan singkat..."
                  aria-label="Pesan untuk Whistle Side"
                  className="w-full resize-none rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs text-white placeholder:text-zinc-500 focus:border-[#E53935] focus:outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#E53935] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#c62828]"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Kirim Pesan</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Copyright & Editorial Update Notice */}
        <div className="mt-12 flex flex-col gap-3 border-t border-zinc-800 pt-6 text-xs text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Whistle Side Media. Hak cipta dilindungi undang-undang.</p>
          <p className="text-zinc-500">
            Data statistik, jadwal, dan klasemen diperbarui secara berkala (November 2026).
          </p>
        </div>
      </div>
    </footer>
  );
}
