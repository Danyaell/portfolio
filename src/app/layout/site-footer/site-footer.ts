import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SITE_NAVIGATION_ITEMS } from '../site-navigation/site-navigation';

interface SocialLink {
  readonly label: string;
  readonly href: string;
}

@Component({
  selector: 'dml-site-footer',
  imports: [RouterLink],
  templateUrl: './site-footer.html',
})
export class SiteFooterComponent {
  protected readonly currentYear = new Date().getFullYear();

  protected readonly navigationItems = SITE_NAVIGATION_ITEMS;

  protected readonly socialLinks = [
    {
      label: 'GitHub',
      href: 'https://github.com/Danyaell',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/danyaell-martinez-ortiz',
    },
  ] as const satisfies readonly SocialLink[];

  protected readonly availabilityMessage: string | null = 'Open to full-stack opportunities';
}
