import { useEffect, useState } from "react";

// Session storage key prefix
const CACHE_KEY_PREFIX = "img_cache_";
const CACHE_TIMESTAMP_PREFIX = "img_timestamp_";

// Cache duration in milliseconds (session-based, will clear on browser close)
const CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 hours as fallback

/**
 * Custom hook to cache images in session storage
 * @param {string} imageUrl - The URL of the image to cache
 * @returns {Object} - { cachedUrl, isLoading, error }
 */
export const useImageCache = (imageUrl) => {
  const [cachedUrl, setCachedUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!imageUrl) {
      setIsLoading(false);
      return;
    }

    const cacheKey = CACHE_KEY_PREFIX + imageUrl;
    const timestampKey = CACHE_TIMESTAMP_PREFIX + imageUrl;

    // Check if image is already cached in session storage
    const checkCache = () => {
      try {
        const cachedData = sessionStorage.getItem(cacheKey);
        const timestamp = sessionStorage.getItem(timestampKey);

        if (cachedData && timestamp) {
          const age = Date.now() - parseInt(timestamp);

          // If cache is still valid, use it
          if (age < CACHE_DURATION) {
            setCachedUrl(cachedData);
            setIsLoading(false);
            return true;
          } else {
            // Cache expired, remove it
            sessionStorage.removeItem(cacheKey);
            sessionStorage.removeItem(timestampKey);
          }
        }
        return false;
      } catch (err) {
        console.error("Error reading from session storage:", err);
        return false;
      }
    };

    // If cache hit, we're done
    if (checkCache()) {
      return;
    }

    // Otherwise, load the image and cache it
    const loadAndCacheImage = async () => {
      try {
        setIsLoading(true);

        // For local images, just use the URL directly
        if (imageUrl.startsWith("/")) {
          setCachedUrl(imageUrl);
          setIsLoading(false);
          return;
        }

        // For remote images, fetch and convert to blob URL
        const response = await fetch(imageUrl);
        if (!response.ok) throw new Error("Failed to load image");

        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        // Try to cache in session storage (will fail for large images)
        try {
          sessionStorage.setItem(cacheKey, blobUrl);
          sessionStorage.setItem(timestampKey, Date.now().toString());
        } catch (storageError) {
          // Session storage full or quota exceeded - just use the blob URL without caching
          console.warn(
            "Failed to cache image in session storage:",
            storageError
          );
        }

        setCachedUrl(blobUrl);
        setError(null);
      } catch (err) {
        console.error("Error loading image:", err);
        setError(err);
        // Fallback to original URL if caching fails
        setCachedUrl(imageUrl);
      } finally {
        setIsLoading(false);
      }
    };

    loadAndCacheImage();

    // Cleanup blob URLs on unmount
    return () => {
      if (cachedUrl && cachedUrl.startsWith("blob:")) {
        URL.revokeObjectURL(cachedUrl);
      }
    };
  }, [imageUrl]);

  return { cachedUrl: cachedUrl || imageUrl, isLoading, error };
};

/**
 * Preload and cache multiple images
 * @param {Array<string>} imageUrls - Array of image URLs to preload
 */
export const preloadImages = (imageUrls) => {
  imageUrls.forEach((url) => {
    if (!url) return;

    const cacheKey = CACHE_KEY_PREFIX + url;
    const timestampKey = CACHE_TIMESTAMP_PREFIX + url;

    // Check if already cached
    const cachedData = sessionStorage.getItem(cacheKey);
    if (cachedData) return;

    // For local images, preload using Image object
    if (url.startsWith("/")) {
      const img = new Image();
      img.src = url;
      return;
    }

    // For remote images, fetch and cache
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        try {
          sessionStorage.setItem(cacheKey, blobUrl);
          sessionStorage.setItem(timestampKey, Date.now().toString());
        } catch (err) {
          console.warn("Failed to cache preloaded image:", err);
        }
      })
      .catch((err) => console.error("Error preloading image:", err));
  });
};

/**
 * Clear image cache from session storage
 */
export const clearImageCache = () => {
  try {
    const keys = Object.keys(sessionStorage);
    keys.forEach((key) => {
      if (
        key.startsWith(CACHE_KEY_PREFIX) ||
        key.startsWith(CACHE_TIMESTAMP_PREFIX)
      ) {
        const value = sessionStorage.getItem(key);
        if (value && value.startsWith("blob:")) {
          URL.revokeObjectURL(value);
        }
        sessionStorage.removeItem(key);
      }
    });
  } catch (err) {
    console.error("Error clearing image cache:", err);
  }
};
