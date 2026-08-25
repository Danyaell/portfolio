export interface ProfessionalExperience {
  readonly company: string;
  readonly client?: string;
  readonly engagementType?:
    'Employment' | 'Social Service' | 'Institutional Project' | 'Internship';
  readonly role: string;
  readonly period: string;
  readonly location?: string;
  readonly summary: string;
  readonly achievements: readonly [string, ...string[]];
  readonly technologies: readonly [string, ...string[]];
  readonly featured: boolean;
}
