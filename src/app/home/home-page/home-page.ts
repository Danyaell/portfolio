import { Component } from '@angular/core';

import { HomeEngineeringCapabilitiesComponent } from '../home-engineering-capabilities/home-engineering-capabilities';
import { HomeEvidenceStripComponent } from '../home-evidence-strip/home-evidence-strip';
import { HomeFeaturedProjectsComponent } from '../home-featured-projects/home-featured-projects';
import { HomeHeroComponent } from '../home-hero/home-hero';
import { HomeExperiencePreviewComponent } from '../home-experience-preview/home-experience-preview';
import { HomeWritingPreviewComponent } from '../home-writing-peview/home-writing-preview';
import { HomeContactCtaComponent } from '../home-contact-cta/home-contact-cta';

@Component({
  selector: 'dml-home-page',
  imports: [
    HomeHeroComponent,
    HomeEvidenceStripComponent,
    HomeFeaturedProjectsComponent,
    HomeEngineeringCapabilitiesComponent,
    HomeExperiencePreviewComponent,
    HomeWritingPreviewComponent,
    HomeContactCtaComponent,
  ],
  templateUrl: './home-page.html',
  host: {
    class: 'block w-full',
  },
})
export class HomePageComponent {}
