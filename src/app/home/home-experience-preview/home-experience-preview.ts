import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { EXPERIENCES } from '../../experience/experience.data';
import type { ProfessionalExperience } from '../../experience/experience.model';

interface ExperiencePreviewItem {
  readonly experience: ProfessionalExperience;
  readonly keyAchievement: string;
  readonly keyTechnologies: readonly string[];
}

const KEY_TECHNOLOGY_LIMIT = 5;

@Component({
  selector: 'dml-home-experience-preview',
  imports: [RouterLink],
  templateUrl: './home-experience-preview.html',
  host: {
    class: 'block w-full',
  },
})
export class HomeExperiencePreviewComponent {
  protected readonly experiencePreviews: readonly ExperiencePreviewItem[] = EXPERIENCES.filter(
    (experience) => experience.featured,
  ).map((experience) => ({
    experience,
    keyAchievement: experience.achievements[0],
    keyTechnologies: experience.technologies.slice(0, KEY_TECHNOLOGY_LIMIT),
  }));
}
