import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SOCIAL_LINKS } from '../../layout/site-navigation/site-navigation';

@Component({
  selector: 'dml-home-contact-cta',
  imports: [RouterLink],
  templateUrl: './home-contact-cta.html',
  host: {
    class: 'block w-full',
  },
})
export class HomeContactCtaComponent {
  protected readonly linkedInProfile = SOCIAL_LINKS.find((link) => link.label === 'LinkedIn');
}
