import { DatePipe } from '@angular/common';
import { Component, computed, effect, inject, input } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { BLOG_POSTS } from '../../generated/blog-posts';
import { SeoService } from '../../seo/seo.service';

@Component({
  selector: 'dml-blog-post-page',
  imports: [DatePipe],
  templateUrl: './blog-post-page.html',
  host: {
    class: 'block w-full',
  },
})
export class BlogPostPageComponent {
  private readonly title = inject(Title);
  private readonly seo = inject(SeoService);

  readonly slug = input.required<string>();

  protected readonly post = computed(() =>
    BLOG_POSTS.find((candidate) => candidate.slug === this.slug()),
  );

  constructor() {
    effect(() => {
      const post = this.post();
      const routePath = `/blog/${this.slug()}`;

      if (!post) {
        const pageTitle = 'Article not found | Danyaell Martinez';

        this.title.setTitle(pageTitle);
        this.seo.useDefaults(pageTitle, routePath);

        return;
      }

      const pageTitle = `${post.title} | Danyaell Martinez`;

      this.title.setTitle(pageTitle);

      this.seo.updatePage(
        {
          title: pageTitle,
          description: post.summary,
          type: 'article',
        },
        routePath,
      );
    });
  }
}
