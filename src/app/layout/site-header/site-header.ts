import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE_NAVIGATION_ITEMS } from '../site-navigation/site-navigation';

@Component({
  selector: 'dml-site-header',
  imports: [RouterLink],
  templateUrl: './site-header.html',
})
export class SiteHeaderComponent {
  protected readonly navigationItems = SITE_NAVIGATION_ITEMS;
}
