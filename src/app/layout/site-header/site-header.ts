import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { SITE_NAVIGATION_ITEMS } from '../site-navigation/site-navigation';

@Component({
  selector: 'dml-site-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './site-header.html',
  host: {
    '(document:keydown.escape)': 'handleEscape()',
  },
})
export class SiteHeaderComponent {
  protected readonly navigationItems = SITE_NAVIGATION_ITEMS;
  protected readonly isMenuOpen = signal(false);

  private readonly menuButton = viewChild<ElementRef<HTMLButtonElement>>('menuButton');

  protected toggleMenu(): void {
    this.isMenuOpen.update((isOpen) => !isOpen);
  }

  protected closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  protected handleEscape(): void {
    if (!this.isMenuOpen()) {
      return;
    }

    this.closeMenu();
    this.menuButton()?.nativeElement.focus();
  }
}
