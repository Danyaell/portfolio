import { Component } from '@angular/core';

import { SOCIAL_LINKS } from '../../layout/site-navigation/site-navigation';

@Component({
  selector: 'dml-contact-page',
  templateUrl: './contact-page.html',
  host: {
    class: 'block w-full',
  },
})
export class ContactPageComponent {
  protected readonly linkedInProfile = SOCIAL_LINKS.find((link) => link.label === 'LinkedIn');

  protected readonly githubProfile = SOCIAL_LINKS.find((link) => link.label === 'GitHub');
}
