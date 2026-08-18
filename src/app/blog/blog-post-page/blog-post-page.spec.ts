import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BLOG_POSTS } from '../../generated/blog-posts';
import { BlogPostPageComponent } from './blog-post-page';

describe('BlogPostPageComponent', () => {
  let component: BlogPostPageComponent;
  let fixture: ComponentFixture<BlogPostPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogPostPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogPostPageComponent);
    component = fixture.componentInstance;

    const post = BLOG_POSTS[0];

    if (!post) {
      throw new Error('BlogPostPageComponent test requires at least one generated post.');
    }

    fixture.componentRef.setInput('slug', post.slug);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
