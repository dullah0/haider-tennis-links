import avatar from '../assets/final.png'

export interface LinkCard {
  id: string;
  label: string;           // Text shown on the card
  url: string;             // Full URL (https://...)
  platform: Platform;      // Used for icon + colour accent
  description?: string;    // Optional short subtitle line
  badge?: string;          // Optional badge e.g. "NEW" | "LIVE"
  comingSoon?: boolean;    // Renders card as disabled with a "Coming Soon" badge
  enabled: boolean;        // Set false to hide without deleting
}

export type Platform =
  | 'youtube'
  | 'tiktok'
  | 'instagram'
  | 'patreon'
  | 'merch'
  | 'twitter'
  | 'website'
  | 'email'
  | 'custom';

export interface SiteConfig {
  name: string;            // Channel / brand name
  handle: string;          // e.g. "@HaiderTennisClub"
  tagline: string;         // Short line under name
  avatarUrl?: string;      // Optional – URL to profile photo
  links: LinkCard[];
}

// ──────────────────────────────────────────────
//  YOUR CONFIGURATION – edit everything below
// ──────────────────────────────────────────────

const config: SiteConfig = {
  name: 'Haider Tennis Club',
  handle: '@HaiderTennisClub',
  tagline: 'Welcome to the club! 🎾',
  avatarUrl: avatar,

  links: [
    {
      id: 'youtube',
      label: 'Watch on YouTube',
      url: 'https://youtube.com/@HaiderTennisClub',
      platform: 'youtube',
      description: 'Long form videos coming soon!',
      badge: 'NEW VIDEO',
      enabled: true,
    },
    {
      id: 'tiktok',
      label: 'Follow on TikTok',
      url: 'https://tiktok.com/@HaiderTennisClub',
      platform: 'tiktok',
      description: 'Just random stuff',
      enabled: true,
    },
    {
      id: 'instagram',
      label: 'Instagram',
      url: 'https://instagram.com/HaiderTennisClub',
      platform: 'instagram',
      description: 'Hardcore reels',
      enabled: true,
    },
    {
      id: 'merch',
      label: 'Shop Merch',
      url: 'https://merch.haidertennis.com',
      platform: 'merch',
      description: 'The internets best tennis clothing',
      enabled: true,
      comingSoon: true,
    },
    {
      id: 'contact',
      label: 'Contact',
      url: 'mailto:haidertennisclub@gmail.com',
      platform: 'email',
      description: 'For collaborations and partnerships',
      enabled: true,
    },
    // ── Add more cards below ──────────────────
    // {
    //   id: 'my-course',
    //   label: 'Tennis Masterclass',
    //   url: 'https://your-course-link.com',
    //   platform: 'custom',
    //   description: 'My step-by-step beginner course',
    //   badge: 'LAUNCH',
    //   enabled: true,
    // },
  ],
};

export default config;