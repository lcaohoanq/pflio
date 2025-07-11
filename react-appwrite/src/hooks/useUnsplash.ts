import { useState, useEffect, useRef, useCallback } from "react";
import {
  fetchUserPhotos,
  UnsplashPhoto,
  UnsplashApiResponse,
  UnsplashSortOrder,
} from "~/apis/unsplash.apis";

export interface UseUnsplashConfig {
  username?: string;
  perPage?: number;
  enabled?: boolean;
  refetchInterval?: number;
  cacheTime?: number;
  orderBy?: UnsplashSortOrder;
}

export interface UseUnsplashResult {
  photos: UnsplashPhoto[];
  loading: boolean;
  error: string | null;
  total: number;
  refetch: () => Promise<void>;
  isSuccess: boolean;
  isError: boolean;
}

interface CacheEntry {
  data: UnsplashApiResponse;
  timestamp: number;
}

// Cache storage for requests
const cache = new Map<string, CacheEntry>();

export const useUnsplash = ({
  username = "lcaohoanq",
  perPage = 30,
  enabled = true,
  refetchInterval,
  cacheTime = 5 * 60 * 1000, // 5 minutes default cache
  orderBy = "latest",
}: UseUnsplashConfig = {}): UseUnsplashResult => {
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState<number>(0);

  const abortControllerRef = useRef<AbortController | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Generate cache key
  const getCacheKey = useCallback(() => {
    return `unsplash_${username}_${perPage}_${orderBy}`;
  }, [username, perPage, orderBy]);

  // Check if cached data is valid
  const getCachedData = useCallback((): UnsplashApiResponse | null => {
    const cacheKey = getCacheKey();
    const cached = cache.get(cacheKey);

    if (!cached) return null;

    const now = Date.now();
    if (now - cached.timestamp > cacheTime) {
      cache.delete(cacheKey);
      return null;
    }

    return cached.data;
  }, [getCacheKey, cacheTime]);

  // Cache data
  const setCachedData = useCallback(
    (data: UnsplashApiResponse) => {
      const cacheKey = getCacheKey();
      cache.set(cacheKey, {
        data,
        timestamp: Date.now(),
      });
    },
    [getCacheKey],
  );

  // Fetch photos function
  const fetchPhotos = useCallback(
    async (useCache: boolean = true): Promise<void> => {
      if (!enabled) return;

      // Check cache first
      if (useCache) {
        const cachedData = getCachedData();
        if (cachedData) {
          setPhotos(cachedData.photos);
          setTotal(cachedData.total);
          setError(cachedData.error || null);
          setLoading(false);
          return;
        }
      }

      // Cancel previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();
      setLoading(true);
      setError(null);

      try {
        const response = await fetchUserPhotos(username, perPage, orderBy);

        // Check if request was aborted
        if (abortControllerRef.current?.signal.aborted) {
          return;
        }

        if (response.error) {
          setError(response.error);
          setPhotos([]);
          setTotal(0);
        } else {
          setPhotos(response.photos);
          setTotal(response.total);
          setError(null);

          // Cache successful response
          setCachedData(response);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch photos";
        console.error("❌ Unsplash fetch error:", errorMessage);

        if (abortControllerRef.current?.signal.aborted) {
          return; // Don't set error for aborted requests
        }

        setError(errorMessage);
        setPhotos([]);
        setTotal(0);
      } finally {
        if (!abortControllerRef.current?.signal.aborted) {
          setLoading(false);
        }
      }
    },
    [enabled, username, perPage, orderBy, getCachedData, setCachedData],
  );

  // Refetch function (bypasses cache)
  const refetch = useCallback(async (): Promise<void> => {
    await fetchPhotos(false);
  }, [fetchPhotos]);

  // Initial fetch
  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  // Setup interval refetching
  useEffect(() => {
    if (refetchInterval && enabled) {
      intervalRef.current = setInterval(() => {
        fetchPhotos();
      }, refetchInterval);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [refetchInterval, enabled, fetchPhotos]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const isSuccess = !loading && !error && photos.length > 0;
  const isError = !loading && !!error;

  return {
    photos,
    loading,
    error,
    total,
    refetch,
    isSuccess,
    isError,
  };
};

// Utility hook to convert Unsplash photos to CircularGallery format
export const useUnsplashForGallery = (config?: UseUnsplashConfig) => {
  const { photos, loading, error, ...rest } = useUnsplash(config);

  const galleryItems = photos.map((photo) => ({
    image: photo.urls.regular, // Use regular size for good balance of quality/performance
    text:
      photo.alt_description ||
      photo.description ||
      `Photo by ${photo.user.name}`,
  }));

  return {
    items: galleryItems,
    photos,
    loading,
    error,
    ...rest,
  };
};
