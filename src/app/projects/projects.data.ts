export interface PortfolioProject {
  readonly slug: string;
  readonly name: string;
  readonly summary: string;
}

export const PROJECTS = [
  {
    slug: 'maverick-labs',
    name: 'Maverick Labs',
    summary: 'Descripción breve del proyecto.',
  },
  {
    slug: 'portfolio-profesional',
    name: 'Portafolio profesional',
    summary: 'Portafolio desarrollado con Angular y Tailwind.',
  },
] as const satisfies readonly PortfolioProject[];
