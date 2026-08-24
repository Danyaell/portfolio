import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEngineeringCapabilitiesComponent } from './home-engineering-capabilities';

describe('HomeEngineeringCapabilitiesComponent', () => {
  let fixture: ComponentFixture<HomeEngineeringCapabilitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeEngineeringCapabilitiesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeEngineeringCapabilitiesComponent);

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render three engineering areas', () => {
    const areaList: HTMLUListElement | null = fixture.nativeElement.querySelector(
      'ul[aria-label="Engineering capability areas"]',
    );

    expect(areaList).not.toBeNull();
    expect(areaList?.children).toHaveLength(3);
  });

  it('should render the three area headings', () => {
    const headings = Array.from(fixture.nativeElement.querySelectorAll('h3')).map((heading) =>
      (heading as HTMLElement).textContent?.trim(),
    );

    expect(headings).toEqual(['Backend & APIs', 'Frontend Development', 'Delivery & Reliability']);
  });

  it('should render six capabilities for every area', () => {
    const capabilityLists = fixture.nativeElement.querySelectorAll(
      'ul[aria-label$="technologies and practices"]',
    );

    expect(capabilityLists).toHaveLength(3);
  });

  it('should render the expected searchable keywords', () => {
    const text = fixture.nativeElement.textContent;

    const keywords = [
      'Java',
      'Spring Boot',
      'REST APIs',
      'SQL',
      'Microservices',
      'Angular',
      'React',
      'TypeScript',
      'State Management',
      'Accessibility',
      'CI/CD',
      'AWS ECS and S3',
      'Testcontainers',
      'Railway and Vercel',
      'Monitoring',
      'Production Incident Analysis',
    ];

    for (const keyword of keywords) {
      expect(text).toContain(keyword);
    }
  });

  it('should provide an accessible section heading', () => {
    const section: HTMLElement | null = fixture.nativeElement.querySelector('section');

    const heading: HTMLElement | null = fixture.nativeElement.querySelector(
      '#engineering-capabilities-title',
    );

    expect(section?.getAttribute('aria-labelledby')).toBe('engineering-capabilities-title');

    expect(heading).not.toBeNull();
  });

  it('should not render technologies as interactive controls', () => {
    expect(fixture.nativeElement.querySelectorAll('button')).toHaveLength(0);

    expect(fixture.nativeElement.querySelectorAll('a')).toHaveLength(0);
  });
});
