import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { SiteNavigationItem } from '../site-navigation/site-navigation';
import { SiteFooterComponent } from './site-footer';

const SITE_LINKS = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Projects',
    path: '/projects',
  },
  {
    label: 'Experience',
    path: '/experience',
  },
  {
    label: 'Writing',
    path: '/blog',
  },
  {
    label: 'Contact',
    path: '/contact',
  },
  {
    label: 'GitHub↗— opens in a new tab',
    path: 'https://github.com/Danyaell',
  },
  {
    label: 'LinkedIn↗— opens in a new tab',
    path: 'https://www.linkedin.com/in/danyaell-martinez-ortiz',
  },
  {
    label: 'Leetcode↗— opens in a new tab',
    path: 'https://leetcode.com/u/Danyaell/',
  },
] as const satisfies readonly SiteNavigationItem[];

describe('SiteFooterComponent', () => {
  let component: SiteFooterComponent;
  let fixture: ComponentFixture<SiteFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteFooterComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SiteFooterComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the shared navigation items in order', () => {
    const links = Array.from(
      fixture.nativeElement.querySelectorAll('nav a') as NodeListOf<HTMLAnchorElement>,
    );

    expect(links).toHaveLength(SITE_LINKS.length);

    expect(links.map((link) => link.textContent?.trim())).toEqual(
      SITE_LINKS.map((item) => item.label),
    );

    expect(links.map((link) => link.getAttribute('href'))).toEqual(
      SITE_LINKS.map((item) => item.path),
    );
  });

  it('renders the shared navigation items in order', () => {
    const links = Array.from(
      fixture.nativeElement.querySelectorAll('nav a') as NodeListOf<HTMLAnchorElement>,
    );

    expect(links).toHaveLength(SITE_LINKS.length);

    expect(links.map((link) => link.textContent?.trim())).toEqual(
      SITE_LINKS.map((item) => item.label),
    );

    expect(links.map((link) => link.getAttribute('href'))).toEqual(
      SITE_LINKS.map((item) => item.path),
    );
  });

  it('renders secure external social links', () => {
    const links = Array.from(
      fixture.nativeElement.querySelectorAll('nav a') as NodeListOf<HTMLAnchorElement>,
    );

    expect(links).toHaveLength(SITE_LINKS.length);

    for (const link of links) {
      const relValues = new Set(link.rel.split(/\s+/));

      if (link.href.includes('github.com') || link.href.includes('linkedin.com')) {
        expect(link.target).toBe('_blank');
        expect(relValues.has('noopener')).toBe(true);
        expect(relValues.has('noreferrer')).toBe(true);
      }
    }
  });

  it('links to GitHub and LinkedIn', () => {
    const socialLinks = Array.from(
      fixture.nativeElement.querySelectorAll('nav a') as NodeListOf<HTMLAnchorElement>,
    );

    const urls = socialLinks.map((link) => link.href);

    expect(urls.some((url) => url.includes('github.com'))).toBe(true);
    expect(urls.some((url) => url.includes('linkedin.com'))).toBe(true);
  });

  it('renders the current year', () => {
    const footer = fixture.nativeElement.querySelector('footer') as HTMLElement;

    expect(footer.textContent).toContain(String(new Date().getFullYear()));
  });

  it('renders the professional identity', () => {
    const footer = fixture.nativeElement.querySelector('footer') as HTMLElement;

    expect(footer.textContent).toContain('Danyaell Martinez Ortiz');
    expect(footer.textContent).toContain('Full-Stack Engineer');
    expect(footer.textContent).toContain(
      'I build reliable web products with Java, Angular, and React.',
    );
  });
});
