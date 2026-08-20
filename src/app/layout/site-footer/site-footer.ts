import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SITE_NAVIGATION_ITEMS, SOCIAL_LINKS } from '../site-navigation/site-navigation';

@Component({
  selector: 'dml-site-footer',
  imports: [RouterLink],
  templateUrl: './site-footer.html',
})
export class SiteFooterComponent {
  protected readonly currentYear = new Date().getFullYear();

  protected readonly navigationItems = SITE_NAVIGATION_ITEMS;

  protected readonly socialLinks = SOCIAL_LINKS;

  protected readonly availabilityMessage: string | null = 'Open to full-stack opportunities';
}
