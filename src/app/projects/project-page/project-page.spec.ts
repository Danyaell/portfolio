import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { PROJECTS } from '../projects.data';
import { ProjectPageComponent } from './project-page';
import { SITE_ORIGIN } from '../../seo/seo.config';

describe('ProjectPageComponent', () => {
  let component: ProjectPageComponent;
  let fixture: ComponentFixture<ProjectPageComponent>;
  let title: Title;

  let meta: Meta;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectPageComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectPageComponent);

    component = fixture.componentInstance;
    title = TestBed.inject(Title);
    meta = TestBed.inject(Meta);
  });

  function renderSlug(slug: string): void {
    fixture.componentRef.setInput('slug', slug);
    fixture.detectChanges();
  }

  it('should create', () => {
    renderSlug(PROJECTS[0].slug);

    expect(component).toBeTruthy();
  });

  it('should render a project from PROJECTS', () => {
    const project = PROJECTS[0];

    renderSlug(project.slug);

    const heading: HTMLHeadingElement | null =
      fixture.nativeElement.querySelector('#project-title');

    const image: HTMLImageElement | null = fixture.nativeElement.querySelector('img');

    expect(heading?.textContent?.trim()).toBe(project.name);

    expect(fixture.nativeElement.textContent).toContain(project.role);

    expect(fixture.nativeElement.textContent).toContain(project.summary);

    expect(image?.getAttribute('src')).toBe(project.coverImage);

    expect(image?.getAttribute('alt')).toBe(project.coverImageAlt);
  });

  it('should resolve every project by slug', () => {
    for (const project of PROJECTS) {
      renderSlug(project.slug);

      const heading: HTMLHeadingElement | null =
        fixture.nativeElement.querySelector('#project-title');

      expect(heading?.textContent?.trim()).toBe(project.name);
    }
  });

  it('should prioritize the project cover image', () => {
    renderSlug(PROJECTS[0].slug);

    const image: HTMLImageElement | null = fixture.nativeElement.querySelector('img');

    expect(image?.getAttribute('fetchpriority')).toBe('high');
    expect(image?.getAttribute('loading')).toBe('eager');
  });

  it('should render stack and highlights from the project data', () => {
    const project = PROJECTS[0];

    renderSlug(project.slug);

    const technologies = Array.from(
      fixture.nativeElement.querySelectorAll(
        'section[aria-labelledby="project-stack-title"] li',
      ) as NodeListOf<HTMLLIElement>,
      (item) => item.textContent?.trim(),
    );

    const highlights = Array.from(
      fixture.nativeElement.querySelectorAll(
        'section[aria-labelledby="project-highlights-title"] li',
      ) as NodeListOf<HTMLLIElement>,
      (item) => item.textContent?.trim(),
    );

    expect(technologies).toEqual([...project.stack]);
    expect(highlights).toEqual([...project.highlights]);
  });

  it('should render safe external project links', () => {
    const project = PROJECTS[0];

    renderSlug(project.slug);

    const links = Array.from(
      fixture.nativeElement.querySelectorAll('a[target="_blank"]') as NodeListOf<HTMLAnchorElement>,
    );

    const expectedUrls = [
      ...(project.liveUrl ? [project.liveUrl] : []),
      ...project.repositories.map((repository) => repository.url),
    ];

    expect(links.map((link) => link.getAttribute('href'))).toEqual(expectedUrls);

    for (const link of links) {
      expect(link.getAttribute('target')).toBe('_blank');

      expect(link.rel.split(' ')).toEqual(expect.arrayContaining(['noopener', 'noreferrer']));

      expect(link.textContent).toContain('opens in a new tab');
    }
  });

  it('should omit the live demo action when no liveUrl exists', () => {
    const project = PROJECTS.find(({ slug }) => slug === 'portfolio');

    if (!project) {
      throw new Error('The test requires the Portfolio project.');
    }

    expect(project).toBeDefined();

    renderSlug(project!.slug);

    const text = fixture.nativeElement.textContent;

    expect(text).not.toContain('Live demo');

    for (const repository of project!.repositories) {
      expect(text).toContain(repository.label);
    }
  });

  it('should set a project-specific document title', () => {
    const project = PROJECTS[0];

    renderSlug(project.slug);

    expect(title.getTitle()).toBe(`${project.name} | Danyaell Martinez`);
  });

  it('should update the title when the slug changes', () => {
    renderSlug(PROJECTS[0].slug);

    expect(title.getTitle()).toContain(PROJECTS[0].name);

    renderSlug(PROJECTS[1].slug);

    expect(title.getTitle()).toContain(PROJECTS[1].name);
  });

  it('should render an accessible not-found state for an unknown slug', () => {
    renderSlug('unknown-project');

    const section: HTMLElement | null = fixture.nativeElement.querySelector(
      'section[aria-labelledby="project-not-found-title"]',
    );

    const heading: HTMLHeadingElement | null = fixture.nativeElement.querySelector(
      '#project-not-found-title',
    );

    expect(section).not.toBeNull();

    expect(heading?.tagName).toBe('H1');

    expect(heading?.textContent?.trim()).toBe('Project not found');

    expect(fixture.nativeElement.querySelector('article')).toBeNull();

    expect(title.getTitle()).toBe('Project not found | Danyaell Martinez');
  });

  it('should link unknown projects back to the collection', () => {
    renderSlug('unknown-project');

    const link: HTMLAnchorElement | null =
      fixture.nativeElement.querySelector('a[href="/projects"]');

    expect(link).not.toBeNull();
    expect(link?.textContent).toContain('View all projects');
  });

  it('should not render placeholder content', () => {
    renderSlug(PROJECTS[0].slug);

    expect(fixture.nativeElement.textContent).not.toContain('project-page works!');
  });

  it('should apply project-specific metadata', () => {
    const project = PROJECTS[0];

    renderSlug(project.slug);

    expect(title.getTitle()).toBe(`${project.name} | Danyaell Martinez`);

    expect(meta.getTag("name='description'")?.content).toBe(project.summary);

    expect(meta.getTag("property='og:title'")?.content).toBe(`${project.name} | Danyaell Martinez`);

    expect(meta.getTag("property='og:url'")?.content).toBe(
      `${SITE_ORIGIN}/projects/${project.slug}`,
    );

    expect(meta.getTag("property='og:image'")?.content).toBe(`${SITE_ORIGIN}${project.coverImage}`);

    expect(meta.getTag("property='og:image:alt'")?.content).toBe(project.coverImageAlt);
  });
});
