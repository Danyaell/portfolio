import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, extname, resolve } from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

const contentDirectory = resolve('src/content/posts');
const outputFile = resolve('src/app/generated/blog-posts.ts');

const requiredFields = ['title', 'slug', 'summary', 'publishedAt', 'tags'];
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const files = (await readdir(contentDirectory)).filter((file) => extname(file) === '.md').sort();

const posts = [];

for (const file of files) {
  const source = await readFile(resolve(contentDirectory, file), 'utf8');
  const { data, content } = matter(source);

  if (data.draft === true) {
    continue;
  }

  for (const field of requiredFields) {
    if (data[field] === undefined || data[field] === null || data[field] === '') {
      throw new Error(`${file}: missing required field "${field}"`);
    }
  }

  if (!slugPattern.test(String(data.slug))) {
    throw new Error(`${file}: invalid slug "${data.slug}"`);
  }

  if (!Array.isArray(data.tags) || data.tags.length === 0) {
    throw new Error(`${file}: "tags" must be a non-empty array`);
  }

  const publishedAt =
    data.publishedAt instanceof Date
      ? data.publishedAt.toISOString().slice(0, 10)
      : String(data.publishedAt);

  const html = await marked.parse(content.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, ''), {
    gfm: true,
    breaks: false,
  });

  posts.push({
    title: String(data.title),
    slug: String(data.slug),
    summary: String(data.summary),
    publishedAt,
    tags: data.tags.map(String),
    html,
    ...(data.coverImage ? { coverImage: String(data.coverImage) } : {}),
    ...(data.githubUrl ? { githubUrl: String(data.githubUrl) } : {}),
    ...(data.linkedinUrl ? { linkedinUrl: String(data.linkedinUrl) } : {}),
  });
}

const seenSlugs = new Set();

for (const post of posts) {
  if (seenSlugs.has(post.slug)) {
    throw new Error(`Duplicate blog slug: "${post.slug}"`);
  }

  seenSlugs.add(post.slug);
}

posts.sort((left, right) => right.publishedAt.localeCompare(left.publishedAt));

const generatedSource = `// This file is generated. Do not edit manually.
import type { BlogPost } from '../blog/blog-post';

export const BLOG_POSTS = ${JSON.stringify(posts, null, 2)} as const satisfies readonly BlogPost[];
`;

await mkdir(dirname(outputFile), { recursive: true });
await writeFile(outputFile, generatedSource, 'utf8');

console.log(`Generated ${posts.length} blog post(s).`);
