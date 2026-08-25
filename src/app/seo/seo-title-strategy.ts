import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  type ActivatedRouteSnapshot,
  type RouterStateSnapshot,
  TitleStrategy,
} from '@angular/router';

import type { PageSeoMetadata } from './seo.config';
import { SeoService } from './seo.service';
import { SITE_NAME } from './seo.config';

@Injectable()
export class SeoTitleStrategy extends TitleStrategy {
  private readonly documentTitle = inject(Title);
  private readonly seo = inject(SeoService);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const title = this.buildTitle(snapshot) ?? SITE_NAME;

    this.documentTitle.setTitle(title);

    const route = this.findDeepestPrimaryRoute(snapshot.root);

    const metadata = route.data['seo'] as PageSeoMetadata | undefined;

    if (metadata) {
      this.seo.updatePage(
        {
          ...metadata,
          title,
        },
        snapshot.url,
      );

      return;
    }

    this.seo.useDefaults(title, snapshot.url);
  }

  private findDeepestPrimaryRoute(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
    let current = route;

    while (current.firstChild) {
      current = current.firstChild;
    }

    return current;
  }
}
