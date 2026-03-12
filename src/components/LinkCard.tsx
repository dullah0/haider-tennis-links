import type { LinkCard as LinkCardType } from '../config/links';
import PlatformIcon from './PlatformIcon';

interface Props {
  card: LinkCardType;
}

export default function LinkCard({ card }: Props) {
  const isComingSoon = card.comingSoon === true;

  // Use a plain div (non-interactive) for coming-soon cards
  const Tag = isComingSoon ? 'div' : 'a';

  const linkProps = isComingSoon
    ? { className: 'link-card link-card--coming-soon', 'aria-disabled': true }
    : {
        className: 'link-card',
        href: card.url,
        target: '_blank',
        rel: 'noopener noreferrer',
        'aria-label': card.label,
      };

  return (
    <Tag {...(linkProps as any)}>
      {/* Platform icon */}
      <span className={`card-icon icon-${card.platform}`}>
        <PlatformIcon platform={card.platform} />
      </span>

      {/* Text */}
      <span className="card-text">
        <span className="card-label">{card.label}</span>
        {card.description && (
          <span className="card-description">{card.description}</span>
        )}
      </span>

      {/* Coming soon badge takes priority over regular badge */}
      {isComingSoon ? (
        <span className="card-badge--coming-soon">Coming Soon</span>
      ) : card.badge ? (
        <span className="card-badge">{card.badge}</span>
      ) : null}

      {/* Arrow – hidden for coming soon */}
      {!isComingSoon && (
        <svg
          className="card-arrow"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </Tag>
  );
}