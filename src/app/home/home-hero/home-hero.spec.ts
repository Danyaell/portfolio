import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeHeroComponent } from './home-hero';
import { provideRouter } from '@angular/router';

describe('HomeHeroComponent', () => {
  let component: HomeHeroComponent;
  let fixture: ComponentFixture<HomeHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeHeroComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeHeroComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
