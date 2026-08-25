import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { BLOG_POSTS } from '../../generated/blog-posts';
import { HomeWritingPreviewComponent } from './home-writing-preview';

describe('HomeWritingPreviewComponent', () => {
  let fixture: ComponentFixture<HomeWritingPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeWritingPreviewComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeWritingPreviewComponent);

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render at most two latest posts', () => {
    const expectedPosts = BLOG_POSTS.slice(0, 2);

    const articles = fixture.nativeElement.querySelectorAll('article');

    expect(articles).toHaveLength(expectedPosts.length);

    const titles = Array.from(fixture.nativeElement.querySelectorAll('h3')).map((heading) =>
      (heading as HTMLElement).textContent?.trim(),
    );

    expect(titles).toEqual(expectedPosts.map((post) => post.title));
  });

  it('should render metadata from BLOG_POSTS', () => {
    const expectedPosts = BLOG_POSTS.slice(0, 2);
    const text = fixture.nativeElement.textContent;

    for (const post of expectedPosts) {
      expect(text).toContain(post.title);
      expect(text).toContain(post.summary);

      for (const tag of post.tags) {
        expect(text).toContain(tag);
      }
    }
  });

  it('should link to each rendered post', () => {
    const expectedPosts = BLOG_POSTS.slice(0, 2);

    const links = Array.from(
      fixture.nativeElement.querySelectorAll('article h3 a'),
    ) as HTMLAnchorElement[];

    expect(links.map((link) => link.getAttribute('href'))).toEqual(
      expectedPosts.map((post) => `/blog/${post.slug}`),
    );
  });

  it('should expose machine-readable dates', () => {
    const expectedPosts = BLOG_POSTS.slice(0, 2);

    const times = Array.from(fixture.nativeElement.querySelectorAll('time')) as HTMLTimeElement[];

    expect(times.map((time) => time.getAttribute('datetime'))).toEqual(
      expectedPosts.map((post) => post.publishedAt),
    );
  });

  it('should provide an accessible section heading', () => {
    const section = fixture.nativeElement.querySelector('section');

    const heading = fixture.nativeElement.querySelector('#latest-writing-title');

    expect(section?.getAttribute('aria-labelledby')).toBe('latest-writing-title');

    expect(heading).not.toBeNull();
  });

  it('should not render placeholder content', () => {
    expect(fixture.nativeElement.textContent).not.toContain('Coming soon');
  });
});
