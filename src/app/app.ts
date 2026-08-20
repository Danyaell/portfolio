import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  NgZone,
  viewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteHeaderComponent } from './layout/site-header/site-header';
import { SiteFooterComponent } from './layout/site-footer/site-footer';

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

  constructor() {
    afterNextRender(() => {
      this.initializePointerEffect();
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
