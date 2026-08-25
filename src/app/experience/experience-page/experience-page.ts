import { Component } from '@angular/core';

import { EXPERIENCES } from '../experience.data';
import type { ProfessionalExperience } from '../experience.model';

@Component({
  selector: 'dml-experience-page',
  templateUrl: './experience-page.html',
  host: {
    class: 'block w-full',
  },
})
export class ExperiencePageComponent {
  protected readonly experiences: readonly ProfessionalExperience[] = EXPERIENCES;
}
