export type OAuthService = {
  service?: "discord" | "spotify";
  data: { [key: string]: any };
};

export interface Post {
  id: string;
  created_at: number;
  title: string;
  description?: string;
  content: string;
  hidden?: boolean;
  views?: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  epoch: string[];
  platforms: string[];
  tags: string[];
  technologies: string[];
  collaborators: string[];
  links: {
    label: string;
    source: string;
  }[];
  at?: string;
  status: ProjectStatus;
}

export enum ProjectStatus {
  ACTIVE = 0,
  WORKING,
  PAUSED,
  DEPRECATED,
  UNKNOWN,
}
