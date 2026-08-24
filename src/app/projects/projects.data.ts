import type { PortfolioProject } from './project.model';

export const PROJECTS = [
  {
    slug: 'maverick-labs',
    name: 'Maverick Labs',
    summary:
      'A route-planning and analysis application for the Mega Man X series, backed by a Java and Spring Boot API with a React client.',
    role: 'Creator and Full-Stack Engineer',
    stack: ['Java 21', 'Spring Boot', 'MySQL', 'Flyway', 'Testcontainers', 'React', 'TypeScript'],
    highlights: [
      'Rule-based route difficulty and backtracking analysis.',
      'Spring Boot, MySQL, Flyway and Testcontainers.',
      'React, TypeScript and accessible drag-and-drop interactions.',
      'CI/CD deployments through Railway and Vercel.',
    ],
    featured: true,
    coverImage: '/images/projects/maverick-labs.webp',
    coverImageAlt:
      'Maverick Labs route builder showing a Mega Man X boss order and route analysis.',
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
    role: 'Creator and Frontend Engineer',
    stack: ['Angular 22', 'TypeScript', 'Tailwind CSS 4', 'Angular SSG', 'Markdown'],
    highlights: [
      'Angular 22 standalone architecture.',
      'Tailwind 4 semantic design tokens.',
      'Markdown-to-SSG content pipeline.',
      'GitHub Actions validation.',
    ],
    featured: true,
    coverImage: '/images/projects/portfolio.webp',
    coverImageAlt: 'Danyaell Martínez portfolio home page using the Midnight Violet design system.',
    repositories: [
      {
        label: 'Project repository',
        url: 'https://github.com/Danyaell/portfolio',
      },
    ],
  },
] as const satisfies readonly PortfolioProject[];
