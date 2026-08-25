export interface PageSeoMetadata {
  readonly title: string;
  readonly description: string;
  readonly type: 'website' | 'article' | 'profile';
  readonly imagePath?: string;
  readonly imageAlt?: string;
  readonly structuredData?: 'person';
}

export const SITE_ORIGIN: string | null = null;

export const SITE_NAME = 'Danyaell Martinez';

export const SITE_DESCRIPTION =
  'Full-stack developer based in Mexico City, building reliable web products with Java, Spring Boot, Angular, React, and TypeScript.';

export const SITE_THEME_COLOR = '#080b16';

export const HOME_SEO = {
  title: 'Danyaell Martinez | Full-Stack Developer',
  description: SITE_DESCRIPTION,
  type: 'profile',
  imagePath: '/images/social/danyaell-martinez-og.png',
  imageAlt: 'Danyaell Martinez, Full-Stack developer building reliable web products.',
  structuredData: 'person',
} as const satisfies PageSeoMetadata;
