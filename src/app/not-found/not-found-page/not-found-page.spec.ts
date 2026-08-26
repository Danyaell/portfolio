import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { NotFoundPageComponent } from './not-found-page';

describe('NotFoundPageComponent', () => {
  let component: NotFoundPageComponent;
  let fixture: ComponentFixture<NotFoundPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundPageComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundPageComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should link back to Home', () => {
    const link: HTMLAnchorElement | null = fixture.nativeElement.querySelector('a[href="/"]');

    expect(link).not.toBeNull();
  });

  it('should link to Projects', () => {
    const link: HTMLAnchorElement | null =
      fixture.nativeElement.querySelector('a[href="/projects"]');

    expect(link).not.toBeNull();
  });

  it('should render an accessible page heading', () => {
    const section: HTMLElement | null = fixture.nativeElement.querySelector(
      'section[aria-labelledby="not-found-title"]',
    );

    const headings: NodeListOf<HTMLHeadingElement> = fixture.nativeElement.querySelectorAll('h1');

    expect(section).not.toBeNull();
    expect(headings).toHaveLength(1);
    expect(headings[0]?.id).toBe('not-found-title');
    expect(headings[0]?.textContent?.trim()).toBe('Page not found');
  });
});
