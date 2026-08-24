import { Component } from '@angular/core';

interface EngineeringArea {
  readonly title: string;
  readonly description: string;
  readonly capabilities: readonly string[];
}

const ENGINEERING_AREAS = [
  {
    title: 'Backend & APIs',
    description:
      'I build and support scalable service-oriented solutions with clear API contracts, validation, relational data and automated tests.',
    capabilities: [
      'Java',
      'Spring Boot',
      'Node.js',
      'Express.js',
      'REST APIs',
      'MySQL',
      'MongoDB',
      'Microservices',
      'Validation and Testing',
    ],
  },
  {
    title: 'Frontend Development',
    description:
      'I develop accessible, responsive interfaces with component-based architectures, predictable state and accessibility in mind.',
    capabilities: [
      'Angular',
      'React',
      'TypeScript',
      'JavaScript',
      'RxJS',
      'State Management',
      'Responsive UI',
      'Accessibility',
    ],
  },
  {
    title: 'Delivery & Reliability',
    description:
      'I ship and support applications through automated pipelines, cloud platforms, monitoring and production incident analysis.',
    capabilities: [
      'CI/CD',
      'AWS ECS and S3',
      'Testcontainers',
      'Vitest',
      'Docker',
      'Railway and Vercel',
      'Monitoring',
      'GitHub Actions',
      'Production Incident Analysis',
    ],
  },
] as const satisfies readonly EngineeringArea[];

@Component({
  selector: 'dml-home-engineering-capabilities',
  templateUrl: './home-engineering-capabilities.html',
  host: {
    class: 'block w-full',
  },
})
export class HomeEngineeringCapabilitiesComponent {
  protected readonly engineeringAreas = ENGINEERING_AREAS;
}
