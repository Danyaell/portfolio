import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SOCIAL_LINKS } from '../../layout/site-navigation/site-navigation';
import { ContactPageComponent } from './contact-page';

describe('ContactPageComponent', () => {
  let fixture: ComponentFixture<ContactPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactPageComponent);
    fixture.detectChanges();

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the contact heading and message', () => {
    const heading = fixture.nativeElement.querySelector('h1');

    const text = fixture.nativeElement.textContent;

    expect(heading?.textContent).toContain('Get in touch');
    expect(text).toContain('open to full-stack opportunities');
  });

  it('should not render placeholder content', () => {
    expect(fixture.nativeElement.textContent).not.toContain('contact-page works!');
  });

  it('should render LinkedIn from the shared source', () => {
    const linkedIn = SOCIAL_LINKS.find((link) => link.label === 'LinkedIn');

    expect(linkedIn).toBeDefined();

    const link: HTMLAnchorElement | null = fixture.nativeElement.querySelector(
      `a[href="${linkedIn?.path}"]`,
    );

    expect(link).not.toBeNull();
    expect(link?.getAttribute('target')).toBe('_blank');
    expect(link?.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('should render GitHub from the shared source', () => {
    const github = SOCIAL_LINKS.find((link) => link.label === 'GitHub');

    expect(github).toBeDefined();

    const link = fixture.nativeElement.querySelector(`a[href="${github?.path}"]`);

    expect(link).not.toBeNull();
  });

  it('should provide an accessible section heading', () => {
    const section = fixture.nativeElement.querySelector('section');

    const heading = fixture.nativeElement.querySelector('#contact-page-title');

    expect(section?.getAttribute('aria-labelledby')).toBe('contact-page-title');

    expect(heading).not.toBeNull();
  });
});
