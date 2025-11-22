import { ENV } from "~/shared/env";

const UNSPLASH_ROOT = "https://api.unsplash.com";
const CLIENT_ID = ENV.UNSPLASH_ACCESS_KEY;

export type UnsplashSortOrder =
  | "latest"
  | "oldest"
  | "popular"
  | "views"
  | "downloads";

export interface UnsplashPhoto {
  id: string;
  slug: string;
  description: string | null;
  alt_description: string | null;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    small_s3?: string;
  };
  links: {
    self: string;
    html: string;
    download: string;
    download_location: string;
  };
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  created_at: string;
  updated_at: string;
  promoted_at: string | null;
  likes: number; // This is the view/engagement count!
  liked_by_user: boolean;
  current_user_collections: any[];
  sponsorship: any | null;
  topic_submissions: Record<string, any>;
  asset_type: string;
  user: {
    id: string;
    username: string;
    name: string;
    first_name: string;
    last_name: string;
    twitter_username: string | null;
    portfolio_url: string | null;
    bio: string | null;
    location: string | null;
    links: {
      self: string;
      html: string;
      photos: string;
      likes: string;
      portfolio: string;
    };
    profile_image: {
      small: string;
      medium: string;
      large: string;
    };
    instagram_username: string | null;
    total_collections: number;
    total_likes: number;
    total_photos: number;
    total_promoted_photos: number;
    accepted_tos: boolean;
    for_hire: boolean;
    social: {
      instagram_username: string | null;
      portfolio_url: string | null;
      twitter_username: string | null;
      paypal_email: string | null;
    };
  };
}

export interface UnsplashApiResponse {
  photos: UnsplashPhoto[];
  total: number;
  error?: string;
}

export const fetchUserPhotos = async (
  username: string = "lcaohoanq",
  perPage: number = 10,
  orderBy: UnsplashSortOrder = "latest",
): Promise<UnsplashApiResponse> => {
  try {
    // Build URL with order_by parameter (Unsplash API supports: latest, oldest, popular)
    let url = `${UNSPLASH_ROOT}/users/${username}/photos?per_page=${perPage}`;

    // Add order_by parameter if supported by API
    if (orderBy === "latest" || orderBy === "oldest" || orderBy === "popular") {
      url += `&order_by=${orderBy}`;
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Client-ID ${CLIENT_ID}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const photos: UnsplashPhoto[] = await response.json();

    // Apply client-side sorting for options not supported by API
    let sortedPhotos = [...photos];
    if (orderBy === "views" || orderBy === "downloads") {
      // Sort by likes (engagement/views) in descending order
      sortedPhotos.sort((a, b) => b.likes - a.likes);
    }

    return {
      photos: sortedPhotos,
      total: sortedPhotos.length,
    };
  } catch (error) {
    console.error("Error fetching Unsplash photos:", error);
    return {
      photos: [],
      total: 0,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
