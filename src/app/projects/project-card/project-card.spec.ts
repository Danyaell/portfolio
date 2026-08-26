import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import type { PortfolioProject } from '../project.model';
import { ProjectCardComponent } from './project-card';
import { expectNoAxeViolations } from '../../../testing/axe';

const PROJECT: PortfolioProject = {
  slug: 'example-project',
  name: 'Example Project',
  summary: 'A test project used to verify the featured project card.',
  role: 'Creator and Full-Stack Developer',
  stack: ['Angular', 'TypeScript'],
  highlights: ['Accessible interface.', 'Automated validation.'],
  featured: true,
  coverImage: '/images/projects/example.webp',
  coverImageAlt: 'Example project interface.',
  repositories: [
    {
      label: 'Project repository',
      url: 'https://github.com/Danyaell/example-project',
    },
  ],
};

describe('ProjectCardComponent', () => {
  let fixture: ComponentFixture<ProjectCardComponent>;

  function renderProject(project: PortfolioProject = PROJECT): HTMLElement {
    fixture.componentRef.setInput('project', project);
    fixture.detectChanges();

    return fixture.nativeElement;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectCardComponent);
  });

  it('should render the project content', () => {
    const element = renderProject();
    const image = element.querySelector('img');

    expect(element.querySelector('h3')?.textContent).toContain(PROJECT.name);

    expect(element.textContent).toContain(PROJECT.role);
    expect(element.textContent).toContain(PROJECT.summary);

    const stackItems = Array.from(
      element.querySelectorAll(`ul[aria-label="${PROJECT.name} technology stack"] > li`),
    ).map((item) => item.textContent?.trim());

    expect(stackItems).toEqual(PROJECT.stack);

    expect(image?.getAttribute('src')).toBe(PROJECT.coverImage);
    expect(image?.getAttribute('alt')).toBe(PROJECT.coverImageAlt);
  });

  it('should link to the project detail page', () => {
    fixture.componentRef.setInput('project', PROJECT);
    fixture.detectChanges();

    const link: HTMLAnchorElement | null = fixture.nativeElement.querySelector(
      'a[href="/projects/example-project"]',
    );

    expect(link).not.toBeNull();
  });

  it('should omit the live demo when liveUrl is absent', () => {
    const element = renderProject();

    expect(element.textContent).not.toContain('Live demo');
    expect(element.querySelector('a[target="_blank"]')).toBeNull();
  });

  it('should render a safe external live-demo link', () => {
    const liveUrl = 'https://example.com/project';

    const element = renderProject({
      ...PROJECT,
      liveUrl,
    });

    const link: HTMLAnchorElement | null = element.querySelector('a[target="_blank"]');

    expect(link?.getAttribute('href')).toBe(liveUrl);
    expect(link?.getAttribute('target')).toBe('_blank');
    expect(link?.getAttribute('rel')).toBe('noopener noreferrer');
    expect(link?.textContent).toContain('opens in a new tab');
  });

  it('should have no detectable accessibility violations', async () => {
    fixture.componentRef.setInput('project', PROJECT);
    fixture.detectChanges();
    await fixture.whenStable();

    await expectNoAxeViolations(fixture.nativeElement);
  });

  it('should lazy-load the image by default', () => {
    const element = renderProject();
    const image: HTMLImageElement | null = element.querySelector('img');

    expect(image?.getAttribute('loading')).toBe('lazy');
    expect(image?.getAttribute('fetchpriority')).toBe('auto');
  });

  it('should prioritize the image when requested', () => {
    fixture.componentRef.setInput('project', PROJECT);
    fixture.componentRef.setInput('imagePriority', true);

    fixture.detectChanges();

    const image: HTMLImageElement | null = fixture.nativeElement.querySelector('img');

    expect(image?.getAttribute('loading')).toBe('eager');
    expect(image?.getAttribute('fetchpriority')).toBe('high');
  });
});
