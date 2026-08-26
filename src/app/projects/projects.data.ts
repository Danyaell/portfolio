import type { PortfolioProject } from './project.model';

export const PROJECTS = [
  {
    slug: 'maverick-labs',
    name: 'Maverick Labs',
    summary:
      'A route-planning and analysis application for the Mega Man X series, backed by a Java and Spring Boot API with a React client.',
    role: 'Creator and Full-Stack Developer',
    stack: ['Java 21', 'Spring Boot', 'MySQL', 'Flyway', 'Testcontainers', 'React', 'TypeScript'],
    highlights: [
      'Rule-based route difficulty and backtracking analysis.',
      'Accessible UX/UI and interactions.',
      'CI/CD deployments through Railway and Vercel.',
    ],
    featured: true,
    coverImage: '/images/projects/maverick-labs.webp',
    coverImageWidth: 1600,
    coverImageHeight: 1000,
    coverImageAlt: 'Maverick Labs route builder.',
    liveUrl: 'https://maverick-labs-fe.vercel.app',
    repositories: [
      {
        label: 'Frontend repository',
        url: 'https://github.com/Danyaell/maverick-labs-fe',
      },
      {
        label: 'Backend repository',
        url: 'https://github.com/Danyaell/maverick-labs-be',
      },
    ],
  },
  {
    slug: 'portfolio',
    name: 'Portfolio',
    summary:
      'A statically generated Angular portfolio with a semantic design system, local Markdown content and automated validation.',
    role: 'Creator and Frontend Developer',
    stack: ['Angular 22', 'TypeScript', 'Tailwind CSS 4', 'Angular SSG', 'Markdown'],
    highlights: ['Markdown-to-SSG content pipeline.', 'GitHub Actions validation.'],
    featured: true,
    coverImage: '/images/projects/portfolio.webp',
    coverImageWidth: 1600,
    coverImageHeight: 1000,
    coverImageAlt: 'Danyaell Martinez portfolio home page using the Midnight Violet design system.',
    repositories: [
      {
        label: 'Project repository',
        url: 'https://github.com/Danyaell/portfolio',
      },
    ],
  },
] as const satisfies readonly PortfolioProject[];
