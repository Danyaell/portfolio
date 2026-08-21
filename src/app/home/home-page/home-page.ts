import { Component } from '@angular/core';
import { HomeHeroComponent } from '../home-hero/home-hero';
import { HomeEvidenceStripComponent } from '../home-evidence-strip/home-evidence-strip';

@Component({
  selector: 'dml-home-page',
  imports: [HomeHeroComponent, HomeEvidenceStripComponent],
  templateUrl: './home-page.html',
  host: {
    class: 'block w-full',
  },
})
export class HomePageComponent {}
