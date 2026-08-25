import { Routes } from '@angular/router';
import { HOME_SEO } from './seo/seo.config';

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
    title: 'Projects | Danyaell Martinez',
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
    title: 'Experience | Danyaell Martinez',
    loadComponent: () =>
      import('./experience/experience-page/experience-page').then(
        (module) => module.ExperiencePageComponent,
      ),
  },
  {
    path: 'blog',
    title: 'Writing | Danyaell Martinez',
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
    title: 'Contact | Danyaell Martinez',
    loadComponent: () =>
      import('./contact/contact-page/contact-page').then((module) => module.ContactPageComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./not-found/not-found-page/not-found-page').then(
        (module) => module.NotFoundPageComponent,
      ),
  },
];
