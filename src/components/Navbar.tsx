import { Menu, Search, X } from 'lucide-react';
import { useState } from 'react';
import { PageRoute } from '../types/football';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  onOpenSearch: () => void;
  onScrollToContact: () => void;
}

const NAV_ITEMS: { label: string; route: PageRoute; key: PageRoute['name'] }[] = [
  { label: 'Beranda', route: { name: 'home' }, key: 'home' },
  { label: 'Berita', route: { name: 'news' }, key: 'news' },
  { label: 'Pertandingan', route: { name: 'matches' }, key: 'matches' },
  { label: 'Premier League', route: { name: 'premier-league' }, key: 'premier-league' },
  { label: 'Champions League', route: { name: 'champions-league' }, key: 'champions-league' },
  { label: 'Pemain', route: { name: 'players' }, key: 'players' },
  { label: 'Tentang Kami', route: { name: 'about' }, key: 'about' },
];

export function Navbar({
  currentRoute,
  onNavigate,
  onOpenSearch,
  onScrollToContact,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (route: PageRoute) => {
    setMobileOpen(false);
    onNavigate(route);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        {/* Brand Zone */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNav({ name: 'home' });
          }}
          className="flex items-center shrink-0 rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E53935]"
          aria-label="Beranda Whistle Side"
        >
          <BrandLogo variant="dark" size="md" />
        </a>

        {/* Desktop Nav Zone */}
        <nav
          aria-label="Navigasi Utama"
          className="hidden lg:flex items-center gap-5 xl:gap-6"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = currentRoute.name === item.key;
            return (
              <a
                key={item.key}
                href={`#${item.key}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNav(item.route);
                }}
                className={`relative py-1 text-sm font-semibold whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E53935] ${
                  isActive
                    ? 'text-[#E53935]'
                    : 'text-[#18181B] hover:text-[#E53935]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    className="absolute inset-x-0 -bottom-[19px] h-[2px] bg-[#E53935]"
                    aria-hidden="true"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Zone */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenSearch}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 bg-white text-[#111111] transition-colors duration-150 hover:border-[#111111] hover:bg-[#111111] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E53935]"
            aria-label="Cari artikel dan pemain"
            title="Cari di Whistle Side"
          >
            <Search className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 bg-white text-[#111111] transition-colors duration-150 hover:bg-zinc-100 lg:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E53935]"
            aria-label={mobileOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="border-t border-zinc-200 bg-white px-4 py-4 lg:hidden">
          <nav aria-label="Navigasi Seluler" className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = currentRoute.name === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => handleNav(item.route)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#E53935] text-white'
                      : 'text-[#18181B] hover:bg-zinc-100'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
            <div className="my-2 border-t border-zinc-200" />
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onScrollToContact();
              }}
              className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-semibold text-[#18181B] hover:bg-zinc-100"
            >
              <span>Kontak</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
