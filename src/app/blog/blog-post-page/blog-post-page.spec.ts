import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BLOG_POSTS } from '../../generated/blog-posts';
import { BlogPostPageComponent } from './blog-post-page';
import { SITE_ORIGIN } from '../../seo/seo.config';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

describe('BlogPostPageComponent', () => {
  let component: BlogPostPageComponent;
  let fixture: ComponentFixture<BlogPostPageComponent>;
  let title: Title;
  let meta: Meta;
  let document: Document;
  let post: (typeof BLOG_POSTS)[0];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogPostPageComponent],
    }).compileComponents();

    title = TestBed.inject(Title);
    meta = TestBed.inject(Meta);
    document = TestBed.inject(DOCUMENT);

    fixture = TestBed.createComponent(BlogPostPageComponent);
    component = fixture.componentInstance;

    post = BLOG_POSTS[0];

    if (!post) {
      throw new Error('BlogPostPageComponent test requires at least one generated post.');
    }

    fixture.componentRef.setInput('slug', post.slug);

    fixture.detectChanges();

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the post title', () => {
    expect(title.getTitle()).toBe(`${post.title} | Danyaell Martinez`);

    expect(meta.getTag("name='description'")?.content).toBe(post.summary);

    expect(meta.getTag("property='og:type'")?.content).toBe('article');

    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      `${SITE_ORIGIN}/blog/${post.slug}`,
    );
  });
});
