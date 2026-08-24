import { describe, expect, it } from 'vitest';

import { PROJECTS } from './projects.data';

describe('PROJECTS', () => {
  it('should contain unique project slugs', () => {
    const slugs = PROJECTS.map((project) => project.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('should not contain placeholder summaries', () => {
    for (const project of PROJECTS) {
      expect(project.summary.trim().length).toBeGreaterThan(0);
      expect(project.summary).not.toContain('Descripción breve');
    }
  });

  it('should provide presentation-independent project content', () => {
    for (const project of PROJECTS) {
      expect(project.role.trim().length).toBeGreaterThan(0);
      expect(project.stack.length).toBeGreaterThan(0);
      expect(project.highlights.length).toBeGreaterThan(0);
      expect(project.coverImage).toMatch(/^\/images\/projects\//);
      expect(project.coverImageAlt.trim().length).toBeGreaterThan(0);
      expect(project.repositories.length).toBeGreaterThan(0);
    }
  });

  it('should contain featured projects for the Home page', () => {
    const featuredProjects = PROJECTS.filter((project) => project.featured);

    expect(featuredProjects.length).toBeGreaterThan(0);

    for (const project of featuredProjects) {
      expect(project.featured).toBe(true);
    }
  });

  it('should include the complete Maverick Labs content', () => {
    const project = PROJECTS.find(({ slug }) => slug === 'maverick-labs');

    expect(project).toBeDefined();
    expect(project?.summary).toContain('route-planning and analysis application');
    expect(project?.repositories).toHaveLength(2);
  });
});
