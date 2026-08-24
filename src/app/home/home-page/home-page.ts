import { Component } from '@angular/core';

import { HomeEngineeringCapabilitiesComponent } from '../home-engineering-capabilities/home-engineering-capabilities';
import { HomeEvidenceStripComponent } from '../home-evidence-strip/home-evidence-strip';
import { HomeFeaturedProjectsComponent } from '../home-featured-projects/home-featured-projects';
import { HomeHeroComponent } from '../home-hero/home-hero';

@Component({
  selector: 'dml-home-page',
  imports: [
    HomeHeroComponent,
    HomeEvidenceStripComponent,
    HomeFeaturedProjectsComponent,
    HomeEngineeringCapabilitiesComponent,
  ],
  templateUrl: './home-page.html',
  host: {
    class: 'block w-full',
  },
})
export class HomePageComponent {}
