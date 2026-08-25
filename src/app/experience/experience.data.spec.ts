import { describe, expect, it } from 'vitest';

import { EXPERIENCES } from './experience.data';

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

  it('should contain experiences featured on Home', () => {
    const featuredExperiences = EXPERIENCES.filter((experience) => experience.featured);

    expect(featuredExperiences.length).toBeGreaterThan(0);

    for (const experience of featuredExperiences) {
      expect(experience.featured).toBe(true);
    }
  });

  it('should include Kroger product development experience', () => {
    const experience = EXPERIENCES.find(({ company }) => company.includes('Kroger'));

    expect(experience).toBeDefined();
    expect(experience?.technologies).toContain('Angular');
    expect(experience?.technologies).toContain('TypeScript');
    expect(experience?.technologies).toContain('RxJS');
    expect(experience?.technologies).toContain('Signals');
    expect(experience?.achievements.join(' ')).toContain('Creative Advertising');
  });

  it('should include the Scotiabank incident reduction', () => {
    const experience = EXPERIENCES.find(
      ({ company, achievements }) =>
        company === 'Tech Mahindra' && achievements.join(' ').includes('Scotiabank'),
    );

    expect(experience).toBeDefined();
    expect(experience?.achievements.join(' ')).toContain('25% reduction');
  });
});
