export interface BlogPost {
  readonly title: string;
  readonly slug: string;
  readonly summary: string;
  readonly publishedAt: string;
  readonly tags: readonly string[];
  readonly html: string;
  readonly coverImage?: string;
  readonly githubUrl?: string;
  readonly linkedinUrl?: string;
}
