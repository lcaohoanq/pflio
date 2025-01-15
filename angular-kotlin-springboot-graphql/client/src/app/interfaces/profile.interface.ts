export type SocialLink = {
  type: string;
  url: string;
  iconUrl: string;
}

export type Profile = {
  name: string;
  avatarUrl: string;
  githubAccount: string;
  role: string;
  socialLinks: SocialLink[];
}

export type GetProfileResponse = {
  data: {
    getProfile: Profile;
  };
};
