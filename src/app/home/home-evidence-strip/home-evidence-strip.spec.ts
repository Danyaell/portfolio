import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeEvidenceStripComponent } from './home-evidence-strip';

describe('HomeEvidenceStripComponent', () => {
  let fixture: ComponentFixture<HomeEvidenceStripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeEvidenceStripComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeEvidenceStripComponent);
    fixture.detectChanges();

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render four evidence items in a semantic list', () => {
    const list = fixture.nativeElement.querySelector('ul') as HTMLUListElement | null;

    expect(list).not.toBeNull();
    expect(list?.querySelectorAll('li')).toHaveLength(4);
  });

  it('should render the expected evidence', () => {
    const text = fixture.nativeElement.textContent;

    expect(text).toContain('Professional evidence');
    expect(text).toContain('5+ years');
    expect(text).toContain('Building production software');
    expect(text).toContain('Fintech and retail media');
    expect(text).toContain('Experience  Java/Spring Boot');
    expect(text).toContain('Java/Spring Boot');
    expect(text).toContain('Cloud delivery');
    expect(text).toContain('CI/CD');
  });

  it('should associate the section with its heading', () => {
    const section = fixture.nativeElement.querySelector('section') as HTMLElement | null;

    expect(section?.getAttribute('aria-labelledby')).toBe('professional-evidence-title');

    expect(fixture.nativeElement.querySelector('#professional-evidence-title')).not.toBeNull();
  });
});
