import { Component, computed, effect, inject, input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import type { PortfolioProject } from '../project.model';
import { PROJECTS } from '../projects.data';
import { SeoService } from '../../seo/seo.service';

@Component({
  selector: 'dml-project-page',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './project-page.html',
  host: {
    class: 'block w-full',
  },
})
export class ProjectPageComponent {
  private readonly title = inject(Title);
  private readonly seo = inject(SeoService);
  readonly slug = input.required<string>();

  private readonly documentTitle = inject(Title);

  protected readonly project = computed<PortfolioProject | undefined>(() =>
    PROJECTS.find((candidate) => candidate.slug === this.slug()),
  );

  constructor() {
    effect(() => {
      const project = this.project();
      const routePath = `/projects/${this.slug()}`;

      if (!project) {
        const pageTitle = 'Project not found | Danyaell Martinez';

        this.title.setTitle(pageTitle);
        this.seo.useDefaults(pageTitle, routePath);

        return;
      }

      const pageTitle = `${project.name} | Danyaell Martinez`;

      this.title.setTitle(pageTitle);

      this.seo.updatePage(
        {
          title: pageTitle,
          description: project.summary,
          type: 'website',
          imagePath: project.coverImage,
          imageAlt: project.coverImageAlt,
        },
        routePath,
      );
    });
  }
}
