import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import type { PortfolioProject } from '../project.model';

@Component({
  selector: 'dml-project-card',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './project-card.html',
  host: {
    class: 'block h-full',
  },
})
export class ProjectCardComponent {
  readonly project = input.required<PortfolioProject>();
  readonly imagePriority = input(false);
}
