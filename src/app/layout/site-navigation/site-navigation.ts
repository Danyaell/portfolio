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

export const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    path: 'https://github.com/Danyaell',
  },
  {
    label: 'LinkedIn',
    path: 'https://www.linkedin.com/in/danyaell-martinez-ortiz',
  },
  {
    label: 'Leetcode',
    path: 'https://leetcode.com/u/Danyaell/',
  },
] as const satisfies readonly SiteNavigationItem[];
