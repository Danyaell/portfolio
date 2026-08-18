import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperiencePageComponent } from './experience-page';

describe('ExperiencePageComponent', () => {
  let component: ExperiencePageComponent;
  let fixture: ComponentFixture<ExperiencePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperiencePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperiencePageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
