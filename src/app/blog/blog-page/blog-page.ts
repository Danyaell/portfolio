import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import type { BlogPost } from '../blog-post';
import { BLOG_POSTS } from '../../generated/blog-posts';

@Component({
  selector: 'dml-blog-page',
  imports: [RouterLink, DatePipe],
  templateUrl: './blog-page.html',
  host: {
    class: 'block w-full',
  },
})
export class BlogPageComponent {
  protected readonly posts: readonly BlogPost[] = BLOG_POSTS;
}
