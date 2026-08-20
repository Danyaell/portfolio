import { Component } from '@angular/core';
import { HomeHeroComponent } from "../home-hero/home-hero";

@Component({
  selector: 'dml-home-page',
  imports: [HomeHeroComponent],
  templateUrl: './home-page.html',
})
export class HomePageComponent {}
