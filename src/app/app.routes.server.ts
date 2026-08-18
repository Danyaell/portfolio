import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';

import { BLOG_POSTS } from './generated/blog-posts';
import { PROJECTS } from './projects/projects.data';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'projects/:slug',
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.None,
    async getPrerenderParams() {
      return PROJECTS.map(({ slug }) => ({ slug }));
    },
  },
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
