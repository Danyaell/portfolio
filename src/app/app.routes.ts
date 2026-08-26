import { HOME_SEO, PROJECTS_SEO, EXPERIENCE_SEO, BLOG_SEO, CONTACT_SEO } from './seo/seo.config';
import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: HOME_SEO.title,
    data: {
      seo: HOME_SEO,
    },
    loadComponent: () =>
      import('./home/home-page/home-page').then((module) => module.HomePageComponent),
  },
  {
    path: 'projects',
    title: PROJECTS_SEO.title,
    data: {
      seo: PROJECTS_SEO,
    },
    loadComponent: () =>
      import('./projects/projects-page/projects-page').then(
        (module) => module.ProjectsPageComponent,
      ),
  },
  {
    path: 'projects/:slug',
    loadComponent: () =>
      import('./projects/project-page/project-page').then((module) => module.ProjectPageComponent),
  },
  {
    path: 'experience',
    title: EXPERIENCE_SEO.title,
    data: {
      seo: EXPERIENCE_SEO,
    },
    loadComponent: () =>
      import('./experience/experience-page/experience-page').then(
        (module) => module.ExperiencePageComponent,
      ),
  },
  {
    path: 'blog',
    title: BLOG_SEO.title,
    data: {
      seo: BLOG_SEO,
    },
    loadComponent: () =>
      import('./blog/blog-page/blog-page').then((module) => module.BlogPageComponent),
  },
  {
    path: 'blog/:slug',
    loadComponent: () =>
      import('./blog/blog-post-page/blog-post-page').then((module) => module.BlogPostPageComponent),
  },
  {
    path: 'contact',
    title: CONTACT_SEO.title,
    data: {
      seo: CONTACT_SEO,
    },
    loadComponent: () =>
      import('./contact/contact-page/contact-page').then((module) => module.ContactPageComponent),
  },
  {
    path: '**',
    title: 'Page not found | Danyaell Martinez',
    loadComponent: () =>
      import('./not-found/not-found-page/not-found-page').then(
        (module) => module.NotFoundPageComponent,
      ),
  },
];
