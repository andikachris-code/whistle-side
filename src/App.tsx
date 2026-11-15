import { useCallback, useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { SearchModal } from './components/SearchModal';
import { AboutPage } from './pages/AboutPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { CompetitionPage } from './pages/CompetitionPage';
import { HomePage } from './pages/HomePage';
import { MatchesPage } from './pages/MatchesPage';
import { NewsPage } from './pages/NewsPage';
import { PlayersPage } from './pages/PlayersPage';
import { PageRoute } from './types/football';

function parseHashToRoute(): PageRoute {
  const raw = window.location.hash.replace(/^#/, '');
  if (!raw || raw === 'home') return { name: 'home' };
  if (raw === 'news') return { name: 'news' };
  if (raw === 'matches') return { name: 'matches' };
  if (raw === 'premier-league') return { name: 'premier-league' };
  if (raw === 'champions-league') return { name: 'champions-league' };
  if (raw === 'players') return { name: 'players' };
  if (raw === 'about') return { name: 'about' };
  if (raw.startsWith('article/')) {
    const id = raw.slice('article/'.length);
    if (id) return { name: 'article', id };
  }
  return { name: 'home' };
}

function routeToHash(route: PageRoute): string {
  if (route.name === 'article') return `#article/${route.id}`;
  return `#${route.name}`;
}

export default function App() {
  const [route, setRoute] = useState<PageRoute>(() => parseHashToRoute());
  const [searchOpen, setSearchOpen] = useState(false);

  const navigate = useCallback((nextRoute: PageRoute) => {
    setRoute(nextRoute);
    const targetHash = routeToHash(nextRoute);
    if (window.location.hash !== targetHash) {
      window.history.pushState(null, '', targetHash);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const onRouteChange = () => {
      setRoute(parseHashToRoute());
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('hashchange', onRouteChange);
    window.addEventListener('popstate', onRouteChange);
    return () => {
      window.removeEventListener('hashchange', onRouteChange);
      window.removeEventListener('popstate', onRouteChange);
    };
  }, []);

  const scrollToContact = useCallback(() => {
    const el = document.getElementById('contact-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-white text-[#18181B]">
      <Navbar
        currentRoute={route}
        onNavigate={navigate}
        onOpenSearch={() => setSearchOpen(true)}
        onScrollToContact={scrollToContact}
      />

      <div className="flex-1">
        {route.name === 'home' && <HomePage onNavigate={navigate} />}
        {route.name === 'news' && (
          <NewsPage
            key={route.initialCategory || 'all'}
            initialCategory={route.initialCategory}
            onNavigate={navigate}
          />
        )}
        {route.name === 'matches' && (
          <MatchesPage
            key={route.initialCompetition || 'all'}
            initialCompetition={route.initialCompetition}
            onNavigate={navigate}
          />
        )}
        {route.name === 'premier-league' && (
          <CompetitionPage
            competition="Premier League"
            onNavigate={navigate}
          />
        )}
        {route.name === 'champions-league' && (
          <CompetitionPage
            competition="Champions League"
            onNavigate={navigate}
          />
        )}
        {route.name === 'players' && <PlayersPage onNavigate={navigate} />}
        {route.name === 'about' && (
          <AboutPage
            onNavigate={navigate}
            onScrollToContact={scrollToContact}
          />
        )}
        {route.name === 'article' && (
          <ArticleDetailPage
            key={route.id}
            articleId={route.id}
            onNavigate={navigate}
          />
        )}
      </div>

      <Footer onNavigate={navigate} />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={navigate}
      />
    </div>
  );
}
