import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import type { PortfolioProject } from '../project.model';
import { PROJECTS } from '../projects.data';
import { ProjectsPageComponent } from './projects-page';

describe('ProjectsPageComponent', () => {
  let component: ProjectsPageComponent;
  let fixture: ComponentFixture<ProjectsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsPageComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsPageComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render one accessible Projects heading', () => {
    const pageSection: HTMLElement | null = fixture.nativeElement.querySelector(
      'section[aria-labelledby="projects-page-title"]',
    );

    const headings: NodeListOf<HTMLHeadingElement> = fixture.nativeElement.querySelectorAll('h1');

    expect(pageSection).not.toBeNull();
    expect(headings).toHaveLength(1);
    expect(headings[0]?.id).toBe('projects-page-title');
    expect(headings[0]?.textContent?.trim()).toBe('Projects');
  });

  it('should associate the project collection with its heading', () => {
    const collectionSection: HTMLElement | null = fixture.nativeElement.querySelector(
      'section[aria-labelledby="selected-work-title"]',
    );

    const heading: HTMLHeadingElement | null =
      fixture.nativeElement.querySelector('#selected-work-title');

    expect(collectionSection).not.toBeNull();
    expect(heading).not.toBeNull();
    expect(heading?.tagName).toBe('H2');
    expect(heading?.textContent?.trim()).toBe('Selected work');
  });

  it('should render every project through ProjectCardComponent', () => {
    const cards: NodeListOf<HTMLElement> =
      fixture.nativeElement.querySelectorAll('dml-project-card');

    expect(cards).toHaveLength(PROJECTS.length);
  });

  it('should render projects as a semantic list', () => {
    const list: HTMLUListElement | null = fixture.nativeElement.querySelector(
      'section[aria-labelledby="selected-work-title"] ul',
    );

    const items = list?.querySelectorAll(':scope > li');

    expect(list).not.toBeNull();
    expect(items).toHaveLength(PROJECTS.length);
  });

  it('should preserve the project order defined by PROJECTS', () => {
    const renderedNames = Array.from(
      fixture.nativeElement.querySelectorAll(
        'dml-project-card h3',
      ) as NodeListOf<HTMLHeadingElement>,
      (heading) => heading.textContent?.trim(),
    );

    expect(renderedNames).toEqual(PROJECTS.map((project) => project.name));
  });

  it('should render one walkthrough link for every project', () => {
    const walkthroughLinks = Array.from(
      fixture.nativeElement.querySelectorAll(
        'dml-project-card a[href^="/projects/"]',
      ) as NodeListOf<HTMLAnchorElement>,
      (link) => link.getAttribute('href'),
    );

    expect(walkthroughLinks).toEqual(PROJECTS.map((project) => `/projects/${project.slug}`));
  });

  it('should expose the complete shared project collection', () => {
    const page = component as unknown as {
      readonly projects: readonly PortfolioProject[];
    };

    expect(page.projects).toBe(PROJECTS);
  });

  it('should not render placeholder or empty-state copy', () => {
    const text = fixture.nativeElement.textContent;

    expect(text).not.toContain('projects-page works!');
    expect(text).not.toContain('Coming soon');
  });
});
