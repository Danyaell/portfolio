import { Component } from '@angular/core';
import { PROJECTS } from '../../projects/projects.data';
import type { PortfolioProject } from '../../projects/project.model';
import { RouterLink } from '@angular/router';
import { ProjectCardComponent } from '../../projects/project-card/project-card';

@Component({
  selector: 'dml-home-featured-projects',
  imports: [RouterLink, ProjectCardComponent],
  templateUrl: './home-featured-projects.html',
  host: {
    class: 'block w-full',
  },
})
export class HomeFeaturedProjectsComponent {
  protected readonly featuredProjects: readonly PortfolioProject[] = PROJECTS.filter(
    (project) => project.featured,
  );
}
