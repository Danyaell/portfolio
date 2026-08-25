import axe from 'axe-core';
import { expect } from 'vitest';

export async function expectNoAxeViolations(context: Element): Promise<void> {
  const results = await axe.run(context, {
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa'],
    },
    rules: {
      'color-contrast': {
        enabled: false,
      },
    },
  });

  const details = results.violations
    .map(
      (violation) =>
        `${violation.id}: ${violation.help}\n${violation.nodes
          .map((node) => `  ${node.target.join(' ')}`)
          .join('\n')}`,
    )
    .join('\n');

  expect(results.violations, details).toEqual([]);
}
