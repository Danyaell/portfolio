import { Component } from '@angular/core';
import { SITE_NAVIGATION_ITEMS } from '../../layout/site-navigation/site-navigation';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'dml-blog-page',
  imports: [RouterLink],
  templateUrl: './blog-page.html',
})
export class BlogPageComponent {
  protected readonly navigationItems = SITE_NAVIGATION_ITEMS;
}
