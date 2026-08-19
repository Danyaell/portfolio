import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { SITE_NAVIGATION_ITEMS } from '../site-navigation/site-navigation';
import { SiteFooterComponent } from './site-footer';

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
});
