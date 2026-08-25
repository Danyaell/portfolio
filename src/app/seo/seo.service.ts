import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';

import { type PageSeoMetadata, SITE_DESCRIPTION, SITE_NAME, SITE_ORIGIN } from './seo.config';
import { SOCIAL_PROFILE_URLS } from '../layout/site-navigation/site-navigation';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);

  updatePage(metadata: PageSeoMetadata, routePath: string): void {
    this.updateNameTag('description', metadata.description);

    this.updatePropertyTag('og:title', metadata.title);

    this.updatePropertyTag('og:description', metadata.description);

    this.updatePropertyTag('og:type', metadata.type);

    this.updatePropertyTag('og:site_name', SITE_NAME);

    this.updateNameTag('twitter:title', metadata.title);

    this.updateNameTag('twitter:description', metadata.description);

    this.updateAbsoluteUrls(metadata, routePath);

    this.updateStructuredData(metadata);
  }

  useDefaults(title: string, routePath: string): void {
    this.updatePage(
      {
        title,
        description: SITE_DESCRIPTION,
        type: 'website',
      },
      routePath,
    );
  }

  private updateNameTag(name: string, content: string): void {
    this.meta.updateTag(
      {
        name,
        content,
      },
      `name='${name}'`,
    );
  }

  private updatePropertyTag(property: string, content: string): void {
    this.meta.updateTag(
      {
        property,
        content,
      },
      `property='${property}'`,
    );
  }

  private updateAbsoluteUrls(metadata: PageSeoMetadata, routePath: string): void {
    if (!SITE_ORIGIN) {
      this.removeDomainDependentMetadata();
      this.updateNameTag('twitter:card', 'summary');
      return;
    }

    const canonicalUrl = new URL(this.normalizeRoutePath(routePath), SITE_ORIGIN).toString();

    this.updateCanonical(canonicalUrl);

    this.updatePropertyTag('og:url', canonicalUrl);

    if (metadata.imagePath) {
      const imageUrl = new URL(metadata.imagePath, SITE_ORIGIN).toString();

      this.updatePropertyTag('og:image', imageUrl);

      this.updatePropertyTag('og:image:width', '1200');

      this.updatePropertyTag('og:image:height', '630');

      if (metadata.imageAlt) {
        this.updatePropertyTag('og:image:alt', metadata.imageAlt);
      }

      this.updateNameTag('twitter:card', 'summary_large_image');

      this.updateNameTag('twitter:image', imageUrl);

      if (metadata.imageAlt) {
        this.updateNameTag('twitter:image:alt', metadata.imageAlt);
      }
    } else {
      this.removeImageMetadata();
      this.updateNameTag('twitter:card', 'summary');
    }
  }

  private normalizeRoutePath(routePath: string): string {
    const [path] = routePath.split(/[?#]/);

    return path || '/';
  }

  private removeDomainDependentMetadata(): void {
    this.removeCanonical();

    this.meta.removeTag("property='og:url'");

    this.removeImageMetadata();
  }

  private removeImageMetadata(): void {
    this.meta.removeTag("property='og:image'");
    this.meta.removeTag("property='og:image:width'");
    this.meta.removeTag("property='og:image:height'");
    this.meta.removeTag("property='og:image:alt'");

    this.meta.removeTag("name='twitter:image'");
    this.meta.removeTag("name='twitter:image:alt'");
  }

  private updateCanonical(url: string): void {
    let canonical = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    if (!canonical) {
      canonical = this.document.createElement('link');

      canonical.setAttribute('rel', 'canonical');
      this.document.head.appendChild(canonical);
    }

    canonical.setAttribute('href', url);
  }

  private removeCanonical(): void {
    this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.remove();
  }

  private updateStructuredData(metadata: PageSeoMetadata): void {
    if (metadata.structuredData !== 'person') {
      this.removePersonStructuredData();
      return;
    }

    const person = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Danyaell Martinez Ortiz',
      alternateName: 'Danyaell Martinez',
      jobTitle: 'Full-Stack Developer',
      description: SITE_DESCRIPTION,
      homeLocation: {
        '@type': 'Place',
        name: 'Mexico City, Mexico',
      },
      knowsAbout: [
        'Java',
        'Spring Boot',
        'Angular',
        'React',
        'TypeScript',
        'REST APIs',
        'Software Development',
      ],
      sameAs: [SOCIAL_PROFILE_URLS.github, SOCIAL_PROFILE_URLS.linkedIn],
      ...(SITE_ORIGIN
        ? {
            url: SITE_ORIGIN,
            '@id': `${SITE_ORIGIN}/#person`,
          }
        : {}),
    };

    let script = this.document.head.querySelector<HTMLScriptElement>('#person-structured-data');

    if (!script) {
      script = this.document.createElement('script');

      script.id = 'person-structured-data';
      script.type = 'application/ld+json';

      this.document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(person).replace(/</g, '\\u003c');
  }

  private removePersonStructuredData(): void {
    this.document.head.querySelector<HTMLScriptElement>('#person-structured-data')?.remove();
  }
}
