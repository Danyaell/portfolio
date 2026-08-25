import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { SOCIAL_LINKS } from '../../layout/site-navigation/site-navigation';
import { HomeContactCtaComponent } from './home-contact-cta';
import { expectNoAxeViolations } from '../../../testing/axe';

describe('HomeContactCtaComponent', () => {
  let fixture: ComponentFixture<HomeContactCtaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeContactCtaComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeContactCtaComponent);

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the closing message', () => {
    const text = fixture.nativeElement.textContent;

    expect(text).toContain('Let’s build something useful.');

    expect(text).toContain('open to full-stack opportunities');
  });

  it('should link to the contact page', () => {
    const link: HTMLAnchorElement | null =
      fixture.nativeElement.querySelector('a[href="/contact"]');

    expect(link).not.toBeNull();
    expect(link?.textContent).toContain('Get in touch');
  });

  it('should link to LinkedIn from the shared source', () => {
    const linkedIn = SOCIAL_LINKS.find((link) => link.label === 'LinkedIn');

    expect(linkedIn).toBeDefined();

    const link: HTMLAnchorElement | null = fixture.nativeElement.querySelector(
      `a[href="${linkedIn?.path}"]`,
    );

    expect(link).not.toBeNull();
    expect(link?.getAttribute('target')).toBe('_blank');
    expect(link?.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('should provide an accessible section heading', () => {
    const section = fixture.nativeElement.querySelector('section');

    const heading = fixture.nativeElement.querySelector('#home-contact-title');

    expect(section?.getAttribute('aria-labelledby')).toBe('home-contact-title');

    expect(heading).not.toBeNull();
  });

  it('should not contain a form', () => {
    expect(fixture.nativeElement.querySelector('form')).toBeNull();
  });

  it('should have no detectable accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement);
  });
});
