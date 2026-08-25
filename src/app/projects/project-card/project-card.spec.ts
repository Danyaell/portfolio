import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import type { PortfolioProject } from '../project.model';
import { ProjectCardComponent } from './project-card';

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectCardComponent);
  });

  it('should render the project content', () => {
    fixture.componentRef.setInput('project', PROJECT);
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    const image = element.querySelector('img');

    expect(element.querySelector('h3')?.textContent).toContain(PROJECT.name);
    expect(element.textContent).toContain(PROJECT.summary);
    expect(element.textContent).toContain('Angular');
    expect(element.textContent).toContain('Accessible interface.');

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

  it('should not render a live demo link when liveUrl is absent', () => {
    fixture.componentRef.setInput('project', PROJECT);
    fixture.detectChanges();

    const externalLink = fixture.nativeElement.querySelector('a[target="_blank"]');

    expect(externalLink).toBeNull();
  });

  it('should render a safe external link when liveUrl is provided', () => {
    fixture.componentRef.setInput('project', {
      ...PROJECT,
      liveUrl: 'https://example.com',
    });

    fixture.detectChanges();

    const externalLink: HTMLAnchorElement | null =
      fixture.nativeElement.querySelector('a[target="_blank"]');

    expect(externalLink?.href).toBe('https://example.com/');
    expect(externalLink?.getAttribute('rel')).toBe('noopener noreferrer');
  });
});
