import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SOCIAL_LINKS } from '../../layout/site-navigation/site-navigation';

@Component({
  selector: 'dml-home-hero',
  imports: [RouterLink],
  templateUrl: './home-hero.html',
})
export class HomeHeroComponent {
  protected readonly socialLinks = SOCIAL_LINKS;
}
