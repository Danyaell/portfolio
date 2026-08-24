import { Component } from '@angular/core';

const EVIDENCE_ITEMS = [
  {
    lead: '5+ years',
    detail: 'Building production software',
  },
  {
    lead: 'Fintech and retail media',
    detail: 'Experience',
  },
  {
    lead: 'Java/Spring Boot',
    detail: 'Angular/React',
  },
  {
    lead: 'Cloud delivery',
    detail: 'CI/CD',
  },
] as const;

@Component({
  selector: 'dml-home-evidence-strip',
  host: {
    class: 'block w-full',
  },
  template: `
    <section aria-labelledby="professional-evidence-title" class="w-full">
      <div class="site-container pb-12 md:pb-16 lg:pb-20">
        <h2 id="professional-evidence-title" class="sr-only">Professional evidence</h2>

        <ul
          class="grid grid-cols-1 gap-px overflow-hidden border-y border-border/60 bg-transparent backdrop-blur-sm md:grid-cols-2 lg:grid-cols-4"
        >
          @for (item of evidenceItems; track item.lead) {
            <li class="min-w-0 px-4 py-5 md:px-5 lg:px-6">
              <p class="font-semibold tracking-[-0.01em] text-ink">
                {{ item.lead }}
              </p>

              <p class="mt-1 text-secondary text-ink-muted">
                {{ item.detail }}
              </p>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
})
export class HomeEvidenceStripComponent {
  protected readonly evidenceItems = EVIDENCE_ITEMS;
}
