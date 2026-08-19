import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SITE_NAVIGATION_ITEMS } from '../site-navigation/site-navigation';

@Component({
  selector: 'dml-site-footer',
  imports: [RouterLink],
  templateUrl: './site-footer.html',
})
export class SiteFooterComponent {
  protected readonly navigationItems = SITE_NAVIGATION_ITEMS;
}
