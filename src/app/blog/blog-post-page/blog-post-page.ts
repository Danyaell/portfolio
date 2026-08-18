import { Component, computed, input } from '@angular/core';
import { BLOG_POSTS } from '../../generated/blog-posts';

@Component({
  selector: 'dml-blog-post-page',
  imports: [],
  templateUrl: './blog-post-page.html',
})
export class BlogPostPageComponent {
  readonly slug = input.required<string>();

  protected readonly post = computed(() =>
    BLOG_POSTS.find((candidate) => candidate.slug === this.slug()),
  );
}
