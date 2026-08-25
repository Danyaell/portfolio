import { describe, expect, it } from 'vitest';

import { EXPERIENCES } from './experience.data';
import { ProfessionalExperience } from './experience.model';

describe('EXPERIENCES', () => {
  it('should contain professional experience entries', () => {
    expect(EXPERIENCES.length).toBeGreaterThan(0);
  });

  it('should contain unique company and period combinations', () => {
    const identities = EXPERIENCES.map(
      (experience) => `${experience.company}:${experience.period}`,
    );

    expect(new Set(identities).size).toBe(identities.length);
  });

  it('should provide complete experience content', () => {
    for (const experience of EXPERIENCES) {
      expect(experience.company.trim().length).toBeGreaterThan(0);
      expect(experience.role.trim().length).toBeGreaterThan(0);
      expect(experience.period.trim().length).toBeGreaterThan(0);
      expect(experience.summary.trim().length).toBeGreaterThan(0);
      expect(experience.achievements.length).toBeGreaterThan(0);
      expect(experience.technologies.length).toBeGreaterThan(0);
    }
  });

  it('should not contain duplicated technologies', () => {
    for (const experience of EXPERIENCES) {
      expect(new Set(experience.technologies).size).toBe(experience.technologies.length);
    }
  });

  it('should use consistent abbreviated date ranges', () => {
    const periodPattern =
      /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4} – (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4}$/;

    for (const experience of EXPERIENCES) {
      expect(experience.period).toMatch(periodPattern);
    }
  });

  it('should contain exactly three employment experiences featured on Home', () => {
    const featuredExperiences = EXPERIENCES.filter((experience) => experience.featured);

    expect(featuredExperiences).toHaveLength(3);

    for (const experience of featuredExperiences) {
      expect(['Institutional Project', 'Employment']).toContain(experience.engagementType);
    }
  });

  it('should include Kroger product development experience', () => {
    const experiences: readonly ProfessionalExperience[] = EXPERIENCES;

    const experience = experiences.find(({ client }) => client === '84.51° / Kroger Ad Platform');

    expect(experience).toBeDefined();
    expect(experience?.technologies).toContain('Angular');
    expect(experience?.technologies).toContain('TypeScript');
    expect(experience?.technologies).toContain('RxJS');
    expect(experience?.technologies).toContain('Signals');
    expect(experience?.achievements[0]).toContain('Creative Advertising');
  });

  it('should include the Scotiabank incident reduction', () => {
    const experiences: readonly ProfessionalExperience[] = EXPERIENCES;

    const experience = experiences.find(({ client }) => client === 'Scotiabank');

    expect(experience).toBeDefined();
    expect(experience?.achievements[0]).toContain('25% reduction');
  });
});
