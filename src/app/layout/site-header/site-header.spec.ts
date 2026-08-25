import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

import { SITE_NAVIGATION_ITEMS } from '../site-navigation/site-navigation';
import { SiteHeaderComponent } from './site-header';
import { Component } from '@angular/core';
import { expectNoAxeViolations } from '../../../testing/axe';

@Component({
  template: '',
})
class TestPageComponent {}

describe('SiteHeaderComponent', () => {
  let component: SiteHeaderComponent;
  let fixture: ComponentFixture<SiteHeaderComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteHeaderComponent],
      providers: [
        provideRouter([
          {
            path: '',
            pathMatch: 'full',
            component: TestPageComponent,
          },
          {
            path: 'projects',
            component: TestPageComponent,
          },
          {
            path: 'blog',
            component: TestPageComponent,
          },
          {
            path: 'blog/:slug',
            component: TestPageComponent,
          },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SiteHeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

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

    expect(links).toHaveLength(SITE_NAVIGATION_ITEMS.length);

    expect(links.map((link) => link.textContent?.trim())).toEqual(
      SITE_NAVIGATION_ITEMS.map((item) => item.label),
    );

    expect(links.map((link) => link.getAttribute('href'))).toEqual(
      SITE_NAVIGATION_ITEMS.map((item) => item.path),
    );
  });

  it('toggles the mobile navigation', () => {
    const button = fixture.nativeElement.querySelector(
      'button[aria-controls="primary-navigation"]',
    ) as HTMLButtonElement;

    const navigation = fixture.nativeElement.querySelector('#primary-navigation') as HTMLElement;

    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(navigation.classList.contains('hidden')).toBe(true);

    button.click();
    fixture.detectChanges();

    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(navigation.classList.contains('hidden')).toBe(false);
  });

  it('marks the current section accessibly', async () => {
    await router.navigateByUrl('/projects');
    fixture.detectChanges();
    await fixture.whenStable();

    const navigation = fixture.nativeElement.querySelector('#primary-navigation') as HTMLElement;

    const homeLink = navigation.querySelector('a[href="/"]') as HTMLAnchorElement | null;

    const projectsLink = navigation.querySelector(
      'a[href="/projects"]',
    ) as HTMLAnchorElement | null;

    expect(homeLink?.hasAttribute('aria-current')).toBe(false);
    expect(projectsLink?.getAttribute('aria-current')).toBe('page');
  });

  it('keeps Writing active on a blog post', async () => {
    await router.navigateByUrl('/blog/example-post');
    fixture.detectChanges();
    await fixture.whenStable();

    const writingLink = fixture.nativeElement.querySelector(
      'a[href="/blog"]',
    ) as HTMLAnchorElement | null;

    expect(writingLink?.getAttribute('aria-current')).toBe('page');
  });

  it('closes the menu with Escape and restores focus', () => {
    const button = fixture.nativeElement.querySelector(
      'button[aria-controls="primary-navigation"]',
    ) as HTMLButtonElement;

    button.click();
    fixture.detectChanges();

    document.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
      }),
    );

    fixture.detectChanges();

    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(button);
  });

  it('should remain accessible when the menu changes state', async () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector(
      'button[aria-controls="primary-navigation"]',
    );

    await expectNoAxeViolations(fixture.nativeElement);

    button.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(button.getAttribute('aria-expanded')).toBe('true');

    await expectNoAxeViolations(fixture.nativeElement);

    document.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
      }),
    );

    fixture.detectChanges();
    await fixture.whenStable();

    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(button);

    await expectNoAxeViolations(fixture.nativeElement);
  });
});
