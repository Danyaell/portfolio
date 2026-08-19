export interface SiteNavigationItem {
  readonly label: string;
  readonly path: string;
}

export const SITE_NAVIGATION_ITEMS = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Projects',
    path: '/projects',
  },
  {
    label: 'Experience',
    path: '/experience',
  },
  {
    label: 'Writing',
    path: '/blog',
  },
  {
    label: 'Contact',
    path: '/contact',
  },
] as const satisfies readonly SiteNavigationItem[];