import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { SITE_NAVIGATION_ITEMS } from '../site-navigation/site-navigation';
import { SiteHeaderComponent } from './site-header';

describe('SiteHeaderComponent', () => {
  let component: SiteHeaderComponent;
  let fixture: ComponentFixture<SiteHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteHeaderComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SiteHeaderComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the shared navigation items in order', () => {
    const links = Array.from(fixture.nativeElement.querySelectorAll('nav a') as NodeListOf<HTMLAnchorElement>);

    expect(links).toHaveLength(SITE_NAVIGATION_ITEMS.length);

    expect(links.map((link) => link.textContent?.trim())).toEqual(
      SITE_NAVIGATION_ITEMS.map((item) => item.label),
    );

    expect(links.map((link) => link.getAttribute('href'))).toEqual(
      SITE_NAVIGATION_ITEMS.map((item) => item.path),
    );
  });
});
