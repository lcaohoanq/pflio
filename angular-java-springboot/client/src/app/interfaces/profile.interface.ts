export interface SocialLink {
  type: string;
  url: string;
  iconUrl: string;
}

export interface Profile {
  name: string;
  avatarUrl: string;
  githubAccount: string;
  role: string;
  socialLinks: SocialLink[];
} 