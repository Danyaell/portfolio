import { Component, computed, effect, inject, input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

import type { PortfolioProject } from '../project.model';
import { PROJECTS } from '../projects.data';

@Component({
  selector: 'dml-project-page',
  imports: [RouterLink],
  templateUrl: './project-page.html',
  host: {
    class: 'block w-full',
  },
})
export class ProjectPageComponent {
  readonly slug = input.required<string>();

  private readonly documentTitle = inject(Title);

  protected readonly project = computed<PortfolioProject | undefined>(() =>
    PROJECTS.find((candidate) => candidate.slug === this.slug()),
  );

  constructor() {
    effect(() => {
      const project = this.project();

      this.documentTitle.setTitle(
        project ? `${project.name} | Danyaell Martinez` : 'Project not found | Danyaell Martinez',
      );
    });
  }
}
