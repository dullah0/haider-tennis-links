import { useTennisCursor } from './hooks/useTennisCursor';
import TennisBalls from './components/TennisBalls';
import CourtLines from './components/CourtLines';
import LinkCard from './components/LinkCard';
import config from './config/links';

export default function App() {
  useTennisCursor();

  const activeLinks = config.links.filter((l) => l.enabled);

  return (
    <>
      {/* Atmospheric layers */}
      <CourtLines />
      <TennisBalls />

      {/* Main content */}
      <main className="page">
        {/* ── Header ── */}
        <header className="header">
          <div className="avatar-wrap">
            {config.avatarUrl ? (
              <img src={config.avatarUrl} alt={config.name} className="avatar" />
            ) : (
              <div className="avatar-placeholder" role="img" aria-label="Tennis ball">
                🎾
              </div>
            )}
            <span className="avatar-ring" aria-hidden="true" />
          </div>

          <h1 className="site-name">{config.name}</h1>
          <p className="site-handle">{config.handle}</p>

          <div className="divider" aria-hidden="true" />

          <p className="site-tagline">{config.tagline}</p>
        </header>

        {/* ── Link cards ── */}
        <nav className="links-container" aria-label="Social links">
          {activeLinks.map((card) => (
            <LinkCard key={card.id} card={card} />
          ))}
        </nav>

        {/* ── Footer ── */}
        <footer className="footer">
          <p>
            © {new Date().getFullYear()} {config.name} ·{' '}
            <a href={`https://HaiderTennisLinks.com`}>HaiderTennisLinks.com</a>
          </p>
        </footer>
      </main>
    </>
  );
}