import { Component } from '@angular/core';

import { ProjectCardComponent } from '../project-card/project-card';
import type { PortfolioProject } from '../project.model';
import { PROJECTS } from '../projects.data';

@Component({
  selector: 'dml-projects-page',
  imports: [ProjectCardComponent],
  templateUrl: './projects-page.html',
  host: {
    class: 'block w-full',
  },
})
export class ProjectsPageComponent {
  protected readonly projects: readonly PortfolioProject[] = PROJECTS;
}
