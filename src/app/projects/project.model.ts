export interface ProjectRepository {
  readonly label: string;
  readonly url: string;
}

export interface PortfolioProject {
  readonly slug: string;
  readonly name: string;
  readonly summary: string;
  readonly role: string;
  readonly stack: readonly string[];
  readonly highlights: readonly string[];
  readonly featured: boolean;
  readonly coverImage: string;
  readonly coverImageWidth: number;
  readonly coverImageHeight: number;
  readonly coverImageAlt: string;
  readonly liveUrl?: string;
  readonly repositories: readonly ProjectRepository[];
}
