// ============================================================
//  HAIDER TENNIS CLUB – LINKS CONFIG
//  Edit this file to update your links page.
//  No other files need to be changed.
// ============================================================

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
  tagline: 'Tennis content, tips & community 🎾',
  // avatarUrl: 'https://your-image-url.com/avatar.jpg',

  links: [
    {
      id: 'youtube',
      label: 'Watch on YouTube',
      url: 'https://youtube.com/@HaiderTennisClub',
      platform: 'youtube',
      description: 'Tutorials, match analysis & vlogs',
      badge: 'NEW VIDEO',
      enabled: true,
    },
    {
      id: 'tiktok',
      label: 'Follow on TikTok',
      url: 'https://tiktok.com/@HaiderTennisClub',
      platform: 'tiktok',
      description: 'Short tips & match highlights',
      enabled: true,
    },
    {
      id: 'instagram',
      label: 'Instagram',
      url: 'https://instagram.com/HaiderTennisClub',
      platform: 'instagram',
      description: 'Behind the scenes & reels',
      enabled: true,
    },
    {
      id: 'patreon',
      label: 'Join the Club on Patreon',
      url: 'https://patreon.com/HaiderTennisClub',
      platform: 'patreon',
      description: 'Exclusive drills, live Q&As & more',
      badge: 'MEMBERS',
      enabled: true,
    },
    {
      id: 'merch',
      label: 'Shop Merch',
      url: 'https://merch.haidertennis.com',
      platform: 'merch',
      description: 'Rackets, tees & club gear',
      enabled: true,
      comingSoon: true,
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