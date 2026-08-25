import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComponent } from './home-page';
import { provideRouter } from '@angular/router';
import { BLOG_POSTS } from '../../generated/blog-posts';
import { PROJECTS } from '../../projects/projects.data';
import { expectNoAxeViolations } from '../../../testing/axe';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the Home sections in order', () => {
    const children = Array.from(fixture.nativeElement.children) as HTMLElement[];

    expect(children[0]?.tagName.toLowerCase()).toBe('dml-home-hero');

    expect(children[1]?.tagName.toLowerCase()).toBe('dml-home-evidence-strip');

    expect(children[2]?.tagName.toLowerCase()).toBe('dml-home-featured-projects');

    expect(children[3]?.tagName.toLowerCase()).toBe('dml-home-engineering-capabilities');

    expect(children[4]?.tagName.toLowerCase()).toBe('dml-home-experience-preview');

    expect(children[5]?.tagName.toLowerCase()).toBe('dml-home-writing-preview');

    expect(children[6]?.tagName.toLowerCase()).toBe('dml-home-contact-cta');
  });

  it('should contain exactly one level-one heading', () => {
    expect(fixture.nativeElement.querySelectorAll('h1')).toHaveLength(1);
  });

  it('should render one primary heading with the value proposition', () => {
    const headings = fixture.nativeElement.querySelectorAll('h1');

    expect(headings).toHaveLength(1);
    expect(headings[0]?.textContent).toMatch(/reliable products across the stack/i);
  });

  it('should render the primary calls to action', () => {
    const links = Array.from(
      fixture.nativeElement.querySelectorAll('a[href]'),
    ) as HTMLAnchorElement[];

    const expectations = [
      {
        label: 'View selected work',
        href: '/projects',
      },
      {
        label: 'Explore my experience',
        href: '/experience',
      },
      {
        label: 'View all projects',
        href: '/projects',
      },
      {
        label: 'View full experience',
        href: '/experience',
      },
      {
        label: 'Get in touch',
        href: '/contact',
      },
    ];

    for (const expectation of expectations) {
      const link = links.find((candidate) => candidate.textContent?.includes(expectation.label));

      expect(link).toBeDefined();
      expect(link?.getAttribute('href')).toBe(expectation.href);
    }

    const writingSection = fixture.nativeElement.querySelector(
      'section[aria-labelledby="latest-writing-title"]',
    );

    if (BLOG_POSTS.length > 0) {
      expect(writingSection).not.toBeNull();
      const writingLink = links.find((link) => link.textContent?.includes('View all writing'));

      expect(writingLink?.getAttribute('href')).toBe('/blog');
    } else {
      expect(writingSection).toBeNull();
    }

    const requiredSectionIds = [
      'hero-title',
      'professional-evidence-title',
      'featured-projects-title',
      'engineering-capabilities-title',
      'experience-preview-title',
      'home-contact-title',
    ];

    for (const id of requiredSectionIds) {
      const section = fixture.nativeElement.querySelector(`section[aria-labelledby="${id}"]`);

      expect(section).not.toBeNull();
    }
  });

  it('should render featured projects from the shared source', () => {
    const expectedProjects = PROJECTS.filter((project) => project.featured);

    const cards = Array.from(
      fixture.nativeElement.querySelectorAll('dml-home-featured-projects dml-project-card'),
    ) as HTMLElement[];

    expect(cards).toHaveLength(expectedProjects.length);

    const renderedNames = cards.map((card) => card.querySelector('h3')?.textContent?.trim());

    expect(renderedNames).toEqual(expectedProjects.map((project) => project.name));
  });

  it('should have no detectable accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement);
  });
});
