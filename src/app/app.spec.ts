import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { expectNoAxeViolations } from '../testing/axe';

import { Component } from '@angular/core';
import { provideRouter, Router } from '@angular/router';

@Component({
  template: '<h1>Test page</h1>',
})
class TestPageComponent {}

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
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
        ]),
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);

    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should create the shades', () => {
    const fixture = TestBed.createComponent(App);

    fixture.detectChanges();

    const ambient = fixture.nativeElement.querySelector('.app-ambient');

    const grid = fixture.nativeElement.querySelector('.app-grid');

    expect(ambient).not.toBeNull();
    expect(grid).not.toBeNull();

    expect(ambient.getAttribute('aria-hidden')).toBe('true');
    expect(grid.getAttribute('aria-hidden')).toBe('true');
  });

  it('should have no detectable accessibility violations', async () => {
    const fixture = TestBed.createComponent(App);

    fixture.detectChanges();
    await fixture.whenStable();

    await expectNoAxeViolations(fixture.nativeElement);
  });

  it('should provide a skip link to focusable main content', () => {
    const fixture = TestBed.createComponent(App);

    fixture.detectChanges();

    const skipLink: HTMLAnchorElement | null =
      fixture.nativeElement.querySelector('a[href="#main-content"]');

    const main: HTMLElement | null = fixture.nativeElement.querySelector('#main-content');

    expect(skipLink).not.toBeNull();
    expect(main).not.toBeNull();
    expect(main?.getAttribute('tabindex')).toBe('-1');
  });

  it('should focus main content after route navigation', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);

    fixture.detectChanges();
    await fixture.whenStable();

    /*
     * Ensure that the initial navigation has completed.
     * If TestBed already performed it, navigating to the
     * current URL is effectively harmless.
     */
    await router.navigateByUrl('/');

    fixture.detectChanges();
    await fixture.whenStable();

    const main: HTMLElement | null = fixture.nativeElement.querySelector('#main-content');

    expect(main).not.toBeNull();

    await router.navigateByUrl('/projects');

    fixture.detectChanges();
    await fixture.whenStable();

    expect(router.url).toBe('/projects');
    expect(document.activeElement).toBe(main);
  });
});
