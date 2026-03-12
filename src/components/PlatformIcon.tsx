import React from 'react';
import type { Platform } from '../config/links';

const icons: Record<Platform, React.ReactElement> = {
  youtube: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/>
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M19.6 3.3a4.6 4.6 0 0 1-4.5-4.3h-3.3v13.5a2.7 2.7 0 1 1-2.7-2.7c.3 0 .5 0 .8.1V6.4A6 6 0 1 0 15.7 12V7.7a7.9 7.9 0 0 0 4.6 1.5V5.9a4.6 4.6 0 0 1-0.7-.6z"/>
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8 0 3.2 0 3.6-.1 4.8-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1-3.2 0-3.6 0-4.8-.1-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12c0-3.2 0-3.6.1-4.8.1-3.3 1.7-4.8 4.9-4.9 1.2-.1 1.6-.1 4.8-.1zm0-2.2C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12c0 3.3 0 3.7.1 4.9.2 4.4 2.6 6.8 7 7C8.3 24 8.7 24 12 24c3.3 0 3.7 0 4.9-.1 4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9 0-3.3 0-3.7-.1-4.9C23.7 2.7 21.3.3 16.9.1 15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4A6.2 6.2 0 0 0 12 5.8zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z"/>
    </svg>
  ),
  patreon: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M14.8 2.2a7.2 7.2 0 1 0 0 14.4 7.2 7.2 0 0 0 0-14.4zM2 21.8h3.6V2.2H2v19.6z"/>
    </svg>
  ),
  merch: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M20.5 7l-1.5-4H5L3.5 7l-.5 1v1a2 2 0 0 0 1 1.7V20a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9.3A2 2 0 0 0 21 9V8l-.5-1zm-1.5 2a.5.5 0 0 1-1 0V8h1v1zm-3.5 0a.5.5 0 0 1-1 0V8h1v1zm-3.5 0a.5.5 0 0 1-1 0V8h1v1zm-3.5 0a.5.5 0 0 1-1 0V8h1v1zM6 6.5l1-2.5h10l1 2.5H6z"/>
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M18.2 2h3.4l-7.5 8.5L23 22h-6.9l-5.4-7-6.2 7H1.1l8-9.1L1 2h7l4.9 6.5L18.2 2zm-1.2 18h1.9L7.2 4H5.1l11.9 16z"/>
    </svg>
  ),
  website: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1 17.9c-3.9-.5-7-3.9-7-7.9 0-.6.1-1.2.2-1.8L9 15v1c0 1.1.9 2 2 2v1.9zm6.9-2.5c-.3-.8-1-1.4-1.9-1.4h-1v-3c0-.6-.4-1-1-1H8v-2h2c.6 0 1-.4 1-1V7h2c1.1 0 2-.9 2-2v-.4c2.9 1.2 5 4 5 7.4 0 2.1-.8 4-2.1 5.4z"/>
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
  ),
  custom: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M3.9 12c0-1.7 1.4-3.1 3.1-3.1h4V7H7C4.2 7 2 9.2 2 12s2.2 5 5 5h4v-1.9H7c-1.7 0-3.1-1.4-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.7 0 3.1 1.4 3.1 3.1s-1.4 3.1-3.1 3.1h-4V17h4c2.8 0 5-2.2 5-5s-2.2-5-5-5z"/>
    </svg>
  ),
};

interface Props {
  platform: Platform;
}

export default function PlatformIcon({ platform }: Props) {
  return icons[platform] ?? icons.custom;
}