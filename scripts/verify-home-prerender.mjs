import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import { JSDOM } from 'jsdom';

const html = await readFile('dist/portfolio/browser/index.html', 'utf8');

const document = new JSDOM(html).window.document;
const main = document.querySelector('main');

assert.ok(main, 'Expected a main element');

const heading = main.querySelector('h1');

assert.ok(heading, 'Expected a rendered Hero h1');

assert.ok(heading.textContent.trim().length > 0, 'Expected a non-empty Hero h1');

assert.match(main.textContent, /reliable products across the stack/i);

assert.equal(document.title, 'Danyaell Martinez | Full-Stack Developer');

assert.equal(
  document.querySelector('meta[name="description"]')?.getAttribute('content'),
  'Full-stack developer based in Mexico City, building reliable web products with Java, Spring Boot, Angular, React, and TypeScript.',
);

assert.equal(
  document.querySelector('meta[property="og:title"]')?.getAttribute('content'),
  'Danyaell Martinez | Full-Stack Developer',
);

assert.ok(document.querySelector('meta[name="twitter:card"]'), 'Expected Twitter card metadata');

assert.ok(document.querySelector('script[type="application/ld+json"]'), 'Expected Person JSON-LD');

const mainLinks = Array.from(main.querySelectorAll('a[href]'), (link) => link.getAttribute('href'));

for (const path of ['/projects', '/experience', '/contact']) {
  assert.ok(mainLinks.includes(path), `Expected main link to ${path}`);
}

/*
 * These must remain absent until SITE_ORIGIN is known.
 */
assert.equal(document.querySelector('link[rel="canonical"]'), null);

assert.equal(document.querySelector('meta[property="og:url"]'), null);

assert.equal(document.querySelector('meta[property="og:image"]'), null);
