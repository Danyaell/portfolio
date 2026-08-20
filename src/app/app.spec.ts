import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);

    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should create the shades', () => {
    const fixture = TestBed.createComponent(App);

    fixture.detectChanges();

    const ambient = fixture.nativeElement.querySelector('.app-ambient');

    const grid = fixture.nativeElement.querySelector('.app-grid');

    expect(ambient).not.toBeNull();
    expect(grid).not.toBeNull();

    expect(ambient.getAttribute('aria-hidden')).toBe('true');
    expect(grid.getAttribute('aria-hidden')).toBe('true');
  });
});
