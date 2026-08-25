import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import type { BlogPost } from '../../blog/blog-post';
import { BLOG_POSTS } from '../../generated/blog-posts';

const LATEST_POST_LIMIT = 2;

@Component({
  selector: 'dml-home-writing-preview',
  imports: [RouterLink, DatePipe],
  templateUrl: './home-writing-preview.html',
  host: {
    class: 'block w-full',
  },
})
export class HomeWritingPreviewComponent {
  protected readonly latestPosts: readonly BlogPost[] = BLOG_POSTS.slice(0, LATEST_POST_LIMIT);
}
