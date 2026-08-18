import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';
import { BLOG_POSTS } from './generated/blog-posts';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.None,
    async getPrerenderParams() {
      return BLOG_POSTS.map(({ slug }) => ({ slug }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
