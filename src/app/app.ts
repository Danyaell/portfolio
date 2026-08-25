import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  NgZone,
  viewChild,
} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SiteHeaderComponent } from './layout/site-header/site-header';
import { SiteFooterComponent } from './layout/site-footer/site-footer';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'dml-root',
  imports: [RouterOutlet, SiteHeaderComponent, SiteFooterComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  protected readonly POINTER_EFFECT_QUERY =
    '(hover: hover) and (pointer: fine) and ' + '(prefers-reduced-motion: no-preference)';
  private readonly destroyRef = inject(DestroyRef);
  private readonly ngZone = inject(NgZone);

  private readonly appShell = viewChild<ElementRef<HTMLElement>>('appShell');

  private readonly router = inject(Router);

  private readonly mainContent = viewChild<ElementRef<HTMLElement>>('mainContent');

  constructor() {
    this.initializeNavigationFocus();

    afterNextRender(() => {
      this.initializePointerEffect();
    });
  }

  private initializeNavigationFocus(): void {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        filter((event) => event.id > 1),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.mainContent()?.nativeElement.focus();
      });
  }

  private initializePointerEffect(): void {
    const shell = this.appShell()?.nativeElement;
    const mediaQuery = window.matchMedia?.(this.POINTER_EFFECT_QUERY);

    if (!shell || !mediaQuery?.matches) {
      return;
    }

    let pointerX = window.innerWidth * 0.5;
    let pointerY = window.innerHeight * 0.28;
    let frameId: number | null = null;

    const renderPointer = (): void => {
      shell.style.setProperty('--pointer-x', `${pointerX}px`);
      shell.style.setProperty('--pointer-y', `${pointerY}px`);

      frameId = null;
    };

    const handlePointerMove = (event: PointerEvent): void => {
      pointerX = event.clientX;
      pointerY = event.clientY;

      if (frameId === null) {
        frameId = window.requestAnimationFrame(renderPointer);
      }
    };

    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('pointermove', handlePointerMove, {
        passive: true,
      });
    });

    this.destroyRef.onDestroy(() => {
      window.removeEventListener('pointermove', handlePointerMove);

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    });
  }
}
