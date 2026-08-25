import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { EXPERIENCES } from '../../experience/experience.data';
import { HomeExperiencePreviewComponent } from './home-experience-preview';
import { ProfessionalExperience } from '../../experience/experience.model';

describe('HomeExperiencePreviewComponent', () => {
  let fixture: ComponentFixture<HomeExperiencePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeExperiencePreviewComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeExperiencePreviewComponent);

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render exactly the featured experiences', () => {
    const expectedExperiences = EXPERIENCES.filter((experience) => experience.featured);

    const list = fixture.nativeElement.querySelector(
      'ol[aria-label="Featured professional experience"]',
    );

    expect(list).not.toBeNull();
    expect(list?.children).toHaveLength(expectedExperiences.length);

    expect(expectedExperiences).toHaveLength(3);
  });

  it('should not render social service experience', () => {
    const socialService = EXPERIENCES.find(
      (experience) => experience.engagementType === 'Social Service',
    );

    expect(socialService).toBeDefined();
    expect(fixture.nativeElement.textContent).not.toContain(socialService?.role);
  });

  it('should render contextual and verifiable content', () => {
    const expectedExperiences: readonly ProfessionalExperience[] = EXPERIENCES.filter(
      (experience) => experience.featured,
    );

    const text = fixture.nativeElement.textContent ?? '';

    for (const experience of expectedExperiences) {
      expect(text).toContain(experience.company);

      if (experience.client) {
        expect(text).toContain(experience.client);
      }

      expect(text).toContain(experience.role);
      expect(text).toContain(experience.period);
      expect(text).toContain(experience.summary);
      expect(text).toContain(experience.achievements[0]);
    }
  });

  it('should render no more than five technologies per experience', () => {
    const technologyLists = fixture.nativeElement.querySelectorAll(
      'ul[aria-label$="key technologies"]',
    );

    expect(technologyLists).toHaveLength(3);

    for (const list of technologyLists) {
      expect(list.children.length).toBeLessThanOrEqual(5);
    }
  });

  it('should provide an accessible section heading', () => {
    const section = fixture.nativeElement.querySelector('section');

    const heading = fixture.nativeElement.querySelector('#experience-preview-title');

    expect(section?.getAttribute('aria-labelledby')).toBe('experience-preview-title');

    expect(heading).not.toBeNull();
  });

  it('should link to the complete experience page', () => {
    const link: HTMLAnchorElement | null =
      fixture.nativeElement.querySelector('a[href="/experience"]');

    expect(link).not.toBeNull();
    expect(link?.textContent).toContain('View full experience');
  });
});
