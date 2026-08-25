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

export const SOCIAL_PROFILE_URLS = {
  github: 'https://github.com/Danyaell',
  linkedIn: 'https://www.linkedin.com/in/danyaell-martinez-ortiz',
  leetCode: 'https://leetcode.com/u/Danyaell/',
} as const;

export const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    path: SOCIAL_PROFILE_URLS.github,
  },
  {
    label: 'LinkedIn',
    path: SOCIAL_PROFILE_URLS.linkedIn,
  },
  {
    label: 'Leetcode',
    path: SOCIAL_PROFILE_URLS.leetCode,
  },
] as const satisfies readonly SiteNavigationItem[];
