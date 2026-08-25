import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { Meta } from '@angular/platform-browser';

import { SOCIAL_PROFILE_URLS } from '../layout/site-navigation/site-navigation';
import { HOME_SEO, SITE_DESCRIPTION, SITE_ORIGIN } from './seo.config';
import { SeoService } from './seo.service';

describe('SeoService', () => {
  let service: SeoService;
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeoService],
    });

    service = TestBed.inject(SeoService);
    meta = TestBed.inject(Meta);
    document = TestBed.inject(DOCUMENT);

    originalTitle = document.title;
    originalManagedElements = captureManagedHeadElements();

    clearManagedHeadElements();
  });

  afterEach(() => {
    restoreOriginalHead();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should update standard metadata', () => {
    service.updatePage(HOME_SEO, '/');

    expect(meta.getTag("name='description'")?.content).toBe(HOME_SEO.description);

    expect(meta.getTag("property='og:title'")?.content).toBe(HOME_SEO.title);

    expect(meta.getTag("property='og:description'")?.content).toBe(HOME_SEO.description);

    expect(meta.getTag("property='og:type'")?.content).toBe(HOME_SEO.type);

    expect(meta.getTag("property='og:site_name'")?.content).toBe('Danyaell Martinez');
  });

  it('should update Twitter metadata', () => {
    service.updatePage(HOME_SEO, '/');

    expect(meta.getTag("name='twitter:title'")?.content).toBe(HOME_SEO.title);

    expect(meta.getTag("name='twitter:description'")?.content).toBe(HOME_SEO.description);

    /*
     * The large image card is enabled once an
     * absolute image URL can be generated.
     */
    expect(meta.getTag("name='twitter:card'")?.content).toBe('summary');
  });

  it('should not duplicate metadata when applied more than once', () => {
    service.updatePage(HOME_SEO, '/');
    service.updatePage(HOME_SEO, '/');

    expect(document.head.querySelectorAll('meta[name="description"]')).toHaveLength(1);

    expect(document.head.querySelectorAll('meta[property="og:title"]')).toHaveLength(1);

    expect(document.head.querySelectorAll('meta[name="twitter:title"]')).toHaveLength(1);

    expect(document.head.querySelectorAll('script#person-structured-data')).toHaveLength(1);
  });

  it('should omit domain-dependent metadata while the site origin is unknown', () => {
    expect(SITE_ORIGIN).toBeNull();

    service.updatePage(HOME_SEO, '/');

    expect(document.head.querySelector('link[rel="canonical"]')).toBeNull();

    expect(meta.getTag("property='og:url'")).toBeNull();

    expect(meta.getTag("property='og:image'")).toBeNull();

    expect(meta.getTag("name='twitter:image'")).toBeNull();
  });

  it('should remove stale domain-dependent metadata when the site origin is unknown', () => {
    const canonical = document.createElement('link');

    canonical.rel = 'canonical';
    canonical.href = 'https://preview.example.com/';

    document.head.appendChild(canonical);

    meta.addTag(
      {
        property: 'og:url',
        content: 'https://preview.example.com/',
      },
      true,
    );

    meta.addTag(
      {
        property: 'og:image',
        content: 'https://preview.example.com/image.png',
      },
      true,
    );

    meta.addTag(
      {
        name: 'twitter:image',
        content: 'https://preview.example.com/image.png',
      },
      true,
    );

    service.updatePage(HOME_SEO, '/');

    expect(document.head.querySelector('link[rel="canonical"]')).toBeNull();

    expect(meta.getTag("property='og:url'")).toBeNull();

    expect(meta.getTag("property='og:image'")).toBeNull();

    expect(meta.getTag("name='twitter:image'")).toBeNull();
  });

  it('should add Person structured data', () => {
    service.updatePage(HOME_SEO, '/');

    const script = document.head.querySelector<HTMLScriptElement>('script#person-structured-data');

    expect(script).not.toBeNull();
    expect(script?.type).toBe('application/ld+json');

    const person = JSON.parse(script?.textContent ?? '{}') as {
      readonly '@context'?: string;
      readonly '@type'?: string;
      readonly name?: string;
      readonly jobTitle?: string;
      readonly sameAs?: readonly string[];
      readonly url?: string;
      readonly '@id'?: string;
    };

    expect(person['@context']).toBe('https://schema.org');

    expect(person['@type']).toBe('Person');
    expect(person.name).toBe('Danyaell Martinez Ortiz');

    expect(person.jobTitle).toBe('Full-Stack Developer');

    expect(person.sameAs).toEqual(
      expect.arrayContaining([SOCIAL_PROFILE_URLS.github, SOCIAL_PROFILE_URLS.linkedIn]),
    );

    /*
     * These values should not be generated until
     * the final domain exists.
     */
    expect(person.url).toBeUndefined();
    expect(person['@id']).toBeUndefined();
  });

  it('should remove Person structured data when the next page does not request it', () => {
    service.updatePage(HOME_SEO, '/');

    expect(document.head.querySelector('script#person-structured-data')).not.toBeNull();

    service.useDefaults('Projects | Danyaell Martinez', '/projects');

    expect(document.head.querySelector('script#person-structured-data')).toBeNull();
  });

  it('should apply default metadata to routes without specific SEO data', () => {
    service.useDefaults('Projects | Danyaell Martinez', '/projects');

    expect(meta.getTag("name='description'")?.content).toBe(SITE_DESCRIPTION);

    expect(meta.getTag("property='og:title'")?.content).toBe('Projects | Danyaell Martinez');

    expect(meta.getTag("property='og:description'")?.content).toBe(SITE_DESCRIPTION);

    expect(meta.getTag("property='og:type'")?.content).toBe('website');

    expect(meta.getTag("name='twitter:title'")?.content).toBe('Projects | Danyaell Martinez');
  });
});
