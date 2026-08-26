import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { PROJECTS } from '../../projects/projects.data';
import { HomeFeaturedProjectsComponent } from './home-featured-projects';

describe('HomeFeaturedProjectsComponent', () => {
  let fixture: ComponentFixture<HomeFeaturedProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeFeaturedProjectsComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeFeaturedProjectsComponent);
    fixture.detectChanges();

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the projects marked as featured', () => {
    const expectedProjects = PROJECTS.filter((project) => project.featured);

    const cards = fixture.nativeElement.querySelectorAll('dml-project-card');

    expect(cards).toHaveLength(expectedProjects.length);

    const renderedTitles = Array.from(fixture.nativeElement.querySelectorAll('h3')).map((heading) =>
      (heading as HTMLElement).textContent?.trim(),
    );

    expect(renderedTitles).toEqual(expectedProjects.map((project) => project.name));
  });

  it('should link to the complete projects page', () => {
    const link = fixture.nativeElement.querySelector('a[href="/projects"]');

    expect(link).not.toBeNull();
  });

  it('should provide an accessible section heading', () => {
    const section = fixture.nativeElement.querySelector('section');
    const heading = fixture.nativeElement.querySelector('#featured-projects-title');

    expect(section?.getAttribute('aria-labelledby')).toBe('featured-projects-title');

    expect(heading).not.toBeNull();
  });

  it('should not prioritize project images below the fold', () => {
    const images = Array.from(fixture.nativeElement.querySelectorAll('img')) as HTMLImageElement[];

    for (const image of images) {
      expect(image.getAttribute('fetchpriority')).not.toBe('high');
    }
  });
});
