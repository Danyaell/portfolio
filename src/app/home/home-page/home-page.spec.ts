import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComponent } from './home-page';
import { provideRouter } from '@angular/router';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the hero followed by the evidence strip', () => {
    const children = Array.from(fixture.nativeElement.children) as HTMLElement[];

    expect(children[0]?.tagName.toLowerCase()).toBe('dml-home-hero');
    expect(children[1]?.tagName.toLowerCase()).toBe('dml-home-evidence-strip');
  });
});
