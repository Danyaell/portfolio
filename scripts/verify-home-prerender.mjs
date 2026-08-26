import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import { JSDOM } from 'jsdom';

const expectedTitle = 'Danyaell Martinez | Full-Stack Developer';
const expectedOrigin = 'https://danyaell-martinez.vercel.app';

const expectedHomeUrl = `${expectedOrigin}/`;

const expectedSocialImageUrl = `${expectedOrigin}/images/social/danyaell-martinez-og.png`;
const expectedDescription =
  'Full-stack developer based in Mexico City, building reliable web products with Java, Spring Boot, Angular, React, and TypeScript.';

const html = await readFile('dist/portfolio/browser/index.html', 'utf8');

await readFile('dist/portfolio/browser/images/social/danyaell-martinez-og.png');

const document = new JSDOM(html).window.document;
const main = document.querySelector('main');

assert.ok(main, 'Expected a main element');

const heading = main.querySelector('h1');

assert.ok(heading, 'Expected a rendered Hero h1');

assert.ok(heading.textContent.trim().length > 0, 'Expected a non-empty Hero h1');

assert.match(main.textContent, /reliable products across the stack/i);

assert.equal(document.title, expectedTitle);

assert.equal(
  document.querySelector('meta[name="description"]')?.getAttribute('content'),
  expectedDescription,
);

assert.equal(
  document.querySelector('meta[property="og:title"]')?.getAttribute('content'),
  expectedTitle,
);

assert.equal(document.querySelectorAll('meta[name="description"]').length, 1);

assert.equal(document.querySelectorAll('meta[property="og:title"]').length, 1);

assert.ok(document.querySelector('meta[name="twitter:card"]'), 'Expected Twitter card metadata');

const structuredDataScript = document.querySelector('script#person-structured-data');

assert.ok(structuredDataScript, 'Expected Person JSON-LD');

const person = JSON.parse(structuredDataScript.textContent ?? '{}');

assert.equal(person['@context'], 'https://schema.org');
assert.equal(person['@type'], 'Person');

assert.equal(person.name, 'Danyaell Martinez Ortiz');

assert.equal(person.jobTitle, 'Full-Stack Developer');

assert.deepEqual(person.sameAs, [
  'https://github.com/Danyaell',
  'https://www.linkedin.com/in/danyaell-martinez-ortiz',
]);

assert.equal(person.url, expectedOrigin);
assert.equal(person['@id'], `${expectedOrigin}/#person`);

assert.equal(
  document.querySelector('meta[property="og:description"]')?.getAttribute('content'),
  expectedDescription,
);

assert.equal(
  document.querySelector('meta[name="twitter:title"]')?.getAttribute('content'),
  expectedTitle,
);

assert.equal(
  document.querySelector('meta[name="twitter:description"]')?.getAttribute('content'),
  expectedDescription,
);

assert.equal(
  document.querySelector('meta[name="theme-color"]')?.getAttribute('content'),
  '#080b16',
);

assert.equal(
  document.querySelector('meta[name="twitter:card"]')?.getAttribute('content'),
  'summary_large_image',
);

assert.equal(
  document.querySelector('meta[name="twitter:image"]')?.getAttribute('content'),
  expectedSocialImageUrl,
);

const mainLinks = Array.from(main.querySelectorAll('a[href]'), (link) => link.getAttribute('href'));

for (const path of ['/projects', '/experience', '/contact']) {
  assert.ok(mainLinks.includes(path), `Expected main link to ${path}`);
}

assert.equal(
  document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
  expectedHomeUrl,
);

assert.equal(
  document.querySelector('meta[property="og:url"]')?.getAttribute('content'),
  expectedHomeUrl,
);

assert.equal(
  document.querySelector('meta[property="og:image"]')?.getAttribute('content'),
  expectedSocialImageUrl,
);

assert.equal(
  document.querySelector('meta[property="og:image:width"]')?.getAttribute('content'),
  '1200',
);

assert.equal(
  document.querySelector('meta[property="og:image:height"]')?.getAttribute('content'),
  '630',
);

assert.equal(
  document.querySelector('meta[property="og:image:alt"]')?.getAttribute('content'),
  'Danyaell Martinez, Full-Stack developer building reliable web products.',
);
