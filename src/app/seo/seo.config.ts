export interface PageSeoMetadata {
  readonly title: string;
  readonly description: string;
  readonly type: 'website' | 'article' | 'profile';
  readonly imagePath?: string;
  readonly imageAlt?: string;
  readonly structuredData?: 'person';
}

export const SITE_ORIGIN = 'https://danyaell-martinez.vercel.app';

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

export const PROJECTS_SEO = {
  title: 'Projects | Danyaell Martinez',
  description:
    'Selected full-stack applications demonstrating product, frontend, backend, testing and delivery decisions.',
  type: 'website',
} as const satisfies PageSeoMetadata;

export const EXPERIENCE_SEO = {
  title: 'Experience | Danyaell Martinez',
  description: 'Overview of Danyaell Martinez’s professional experience and accomplishments.',
  type: 'website',
} as const satisfies PageSeoMetadata;

export const BLOG_SEO = {
  title: 'Writing | Danyaell Martinez',
  description: 'Insights, tutorials, and updates from Danyaell Martinez on full-stack development.',
  type: 'website',
} as const satisfies PageSeoMetadata;

export const CONTACT_SEO = {
  title: 'Contact | Danyaell Martinez',
  description:
    'Get in touch with Danyaell Martinez for full-stack development inquiries and collaborations.',
  type: 'website',
} as const satisfies PageSeoMetadata;
