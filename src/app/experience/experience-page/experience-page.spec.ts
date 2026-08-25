import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EXPERIENCES } from '../experience.data';
import { ExperiencePageComponent } from './experience-page';

describe('ExperiencePageComponent', () => {
  let fixture: ComponentFixture<ExperiencePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperiencePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperiencePageComponent);

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render every experience from the shared source', () => {
    const entries = fixture.nativeElement.querySelectorAll(
      'ol[aria-label="Complete professional experience"] > li',
    );

    expect(entries).toHaveLength(EXPERIENCES.length);
  });

  it('should include the social service experience', () => {
    const socialService = EXPERIENCES.find(
      (experience) => experience.engagementType === 'Social Service',
    );

    expect(socialService).toBeDefined();
    expect(fixture.nativeElement.textContent).toContain(socialService?.company);
  });

  it('should render consistent date labels', () => {
    const text = fixture.nativeElement.textContent;

    for (const experience of EXPERIENCES) {
      expect(text).toContain(experience.period);
    }
  });
});
