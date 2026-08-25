import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { BLOG_POSTS } from '../../generated/blog-posts';
import { BlogPageComponent } from './blog-page';

describe('BlogPageComponent', () => {
  let fixture: ComponentFixture<BlogPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogPageComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogPageComponent);
    fixture.detectChanges();

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render every generated blog post', () => {
    const articles = fixture.nativeElement.querySelectorAll('article');

    expect(articles).toHaveLength(BLOG_POSTS.length);
  });

  it('should render links from the shared source', () => {
    const links = Array.from(
      fixture.nativeElement.querySelectorAll('article h2 a'),
    ) as HTMLAnchorElement[];

    expect(links.map((link) => link.getAttribute('href'))).toEqual(
      BLOG_POSTS.map((post) => `/blog/${post.slug}`),
    );
  });

  it('should render post metadata', () => {
    const text = fixture.nativeElement.textContent;

    for (const post of BLOG_POSTS) {
      expect(text).toContain(post.title);
      expect(text).toContain(post.summary);

      for (const tag of post.tags) {
        expect(text).toContain(tag);
      }
    }
  });

  it('should expose machine-readable dates', () => {
    const times = Array.from(fixture.nativeElement.querySelectorAll('time')) as HTMLTimeElement[];

    expect(times.map((time) => time.getAttribute('datetime'))).toEqual(
      BLOG_POSTS.map((post) => post.publishedAt),
    );
  });

  it('should not contain placeholder content', () => {
    expect(fixture.nativeElement.textContent).not.toContain('blog-page works!');

    expect(fixture.nativeElement.textContent).not.toContain('Coming soon');
  });
});
