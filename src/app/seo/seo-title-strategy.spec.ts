import { DOCUMENT } from '@angular/common';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { provideRouter, type Routes, TitleStrategy } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { HOME_SEO, PROJECTS_SEO, SITE_DESCRIPTION, SITE_NAME, SITE_ORIGIN } from './seo.config';
import { SeoTitleStrategy } from './seo-title-strategy';

@Component({
  selector: 'dml-seo-home-test-page',
  template: '<h1>Home</h1>',
})
class HomeTestPageComponent {}

@Component({
  selector: 'dml-seo-projects-test-page',
  template: '<h1>Projects</h1>',
})
class ProjectsTestPageComponent {}

@Component({
  selector: 'dml-seo-untitled-test-page',
  template: '<h1>Untitled page</h1>',
})
class UntitledTestPageComponent {}

const PROJECTS_TITLE = 'Projects | Danyaell Martinez';

const TEST_ROUTES: Routes = [
  {
    path: '',
    component: HomeTestPageComponent,
    title: HOME_SEO.title,
    data: {
      seo: HOME_SEO,
    },
  },
  {
    path: 'projects',
    component: ProjectsTestPageComponent,
    title: PROJECTS_SEO.title,
    data: {
      seo: PROJECTS_SEO,
    },
  },
  {
    path: 'untitled',
    component: UntitledTestPageComponent,
  },
];

describe('SeoTitleStrategy', () => {
  let title: Title;
  let meta: Meta;
  let document: Document;

  let originalTitle: string;
  let originalManagedElements: Element[];

  const managedSelectors = [
    'meta[name="description"]',
    'meta[property="og:title"]',
    'meta[property="og:description"]',
    'meta[property="og:type"]',
    'meta[property="og:site_name"]',
    'meta[property="og:url"]',
    'meta[property="og:image"]',
    'meta[property="og:image:width"]',
    'meta[property="og:image:height"]',
    'meta[property="og:image:alt"]',
    'meta[name="twitter:card"]',
    'meta[name="twitter:title"]',
    'meta[name="twitter:description"]',
    'meta[name="twitter:image"]',
    'meta[name="twitter:image:alt"]',
    'link[rel="canonical"]',
    'script#person-structured-data',
  ] as const;

  function clearManagedHeadElements(): void {
    for (const selector of managedSelectors) {
      document.head.querySelectorAll(selector).forEach((element) => element.remove());
    }
  }

  function captureManagedHeadElements(): Element[] {
    return managedSelectors.flatMap((selector) =>
      Array.from(
        document.head.querySelectorAll(selector),
        (element) => element.cloneNode(true) as Element,
      ),
    );
  }

  function restoreOriginalHead(): void {
    clearManagedHeadElements();

    for (const element of originalManagedElements) {
      document.head.appendChild(element);
    }

    document.title = originalTitle;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeTestPageComponent, ProjectsTestPageComponent, UntitledTestPageComponent],
      providers: [
        provideRouter(TEST_ROUTES),
        {
          provide: TitleStrategy,
          useClass: SeoTitleStrategy,
        },
      ],
    }).compileComponents();

    title = TestBed.inject(Title);
    meta = TestBed.inject(Meta);
    document = TestBed.inject(DOCUMENT);

    originalTitle = document.title;
    originalManagedElements = captureManagedHeadElements();

    clearManagedHeadElements();
  });

  afterEach(() => {
    restoreOriginalHead();
  });

  it('should register the custom title strategy', () => {
    const strategy = TestBed.inject(TitleStrategy);

    expect(strategy).toBeInstanceOf(SeoTitleStrategy);
  });

  it('should apply the Home title and route metadata', async () => {
    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl('/');

    expect(title.getTitle()).toBe(HOME_SEO.title);

    expect(meta.getTag("name='description'")?.content).toBe(HOME_SEO.description);

    expect(meta.getTag("property='og:title'")?.content).toBe(HOME_SEO.title);

    expect(meta.getTag("property='og:description'")?.content).toBe(HOME_SEO.description);

    expect(meta.getTag("property='og:type'")?.content).toBe(HOME_SEO.type);

    expect(meta.getTag("name='twitter:title'")?.content).toBe(HOME_SEO.title);

    expect(document.head.querySelector('script#person-structured-data')).not.toBeNull();
  });

  it('should use default metadata for a route without specific SEO data', async () => {
    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl('/projects');

    expect(title.getTitle()).toBe(PROJECTS_TITLE);

    expect(meta.getTag("name='description'")?.content).toBe(PROJECTS_SEO.description);

    expect(meta.getTag("property='og:title'")?.content).toBe(PROJECTS_TITLE);

    expect(meta.getTag("property='og:description'")?.content).toBe(PROJECTS_SEO.description);

    expect(meta.getTag("property='og:type'")?.content).toBe('website');

    expect(document.head.querySelector('script#person-structured-data')).toBeNull();
  });

  it('should fall back to the site name when a route has no title', async () => {
    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl('/untitled');

    expect(title.getTitle()).toBe(SITE_NAME);

    expect(meta.getTag("property='og:title'")?.content).toBe(SITE_NAME);

    expect(meta.getTag("name='description'")?.content).toBe(SITE_DESCRIPTION);
  });

  it('should remove Home structured data after navigating to another page', async () => {
    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl('/');

    expect(document.head.querySelector('script#person-structured-data')).not.toBeNull();

    await harness.navigateByUrl('/projects');

    expect(document.head.querySelector('script#person-structured-data')).toBeNull();

    expect(title.getTitle()).toBe(PROJECTS_TITLE);
  });

  it('should update metadata when navigating between routes', async () => {
    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl('/');

    expect(meta.getTag("property='og:title'")?.content).toBe(HOME_SEO.title);

    await harness.navigateByUrl('/projects');

    expect(meta.getTag("property='og:title'")?.content).toBe(PROJECTS_TITLE);

    await harness.navigateByUrl('/');

    expect(meta.getTag("property='og:title'")?.content).toBe(HOME_SEO.title);

    expect(title.getTitle()).toBe(HOME_SEO.title);

    expect(meta.getTag("name='description'")?.content).toBe(HOME_SEO.description);

    expect(meta.getTag("property='og:title'")?.content).toBe(HOME_SEO.title);

    expect(meta.getTag("property='og:url'")?.content).toBe(`${SITE_ORIGIN}/`);
  });

  it('should not duplicate metadata after multiple navigations', async () => {
    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl('/');
    await harness.navigateByUrl('/projects');
    await harness.navigateByUrl('/');

    expect(document.head.querySelectorAll('meta[name="description"]')).toHaveLength(1);

    expect(document.head.querySelectorAll('meta[property="og:title"]')).toHaveLength(1);

    expect(document.head.querySelectorAll('meta[property="og:description"]')).toHaveLength(1);

    expect(document.head.querySelectorAll('meta[name="twitter:title"]')).toHaveLength(1);

    expect(document.head.querySelectorAll('script#person-structured-data')).toHaveLength(1);
  });
});
