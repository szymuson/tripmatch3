const DEFAULT_UTM_SOURCE = "TripMatch";

const backendUrl = (process.env.REACT_APP_BACKEND_URL || "").replace(/\/$/, "");
const unsplashEnabled = process.env.REACT_APP_UNSPLASH_ENABLED === "true";
const utmSource = process.env.REACT_APP_UNSPLASH_UTM_SOURCE || DEFAULT_UTM_SOURCE;
const imageCache = new Map();

export const isUnsplashEnabled = unsplashEnabled;

const withUtm = (url) => {
  if (!url) return "";
  const next = new URL(url);
  next.searchParams.set("utm_source", utmSource);
  next.searchParams.set("utm_medium", "referral");
  return next.toString();
};

const requestUnsplash = async (path, params = {}) => {
  if (!unsplashEnabled) {
    throw new Error("Unsplash integration is disabled");
  }

  const url = new URL(`${backendUrl}/api/unsplash${path}`, window.location.origin);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });

  const response = await fetch(url.toString(), {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Unsplash request failed with ${response.status}`);
  }

  return response.json();
};

export const resolveUnsplashImage = async ({
  key,
  query,
  perPage = 1,
  orientation = "landscape",
  contentFilter = "high",
  selector,
  targetWidth,
  targetHeight,
  refresh = false,
}) => {
  const selectorParam = selector ? JSON.stringify(selector) : undefined;
  const cacheKey = JSON.stringify({ key, query, perPage, orientation, contentFilter, selector: selectorParam, targetWidth, targetHeight });
  if (!refresh && imageCache.has(cacheKey)) return imageCache.get(cacheKey);

  const promise = requestUnsplash("/image", {
    key,
    query,
    per_page: perPage,
    orientation,
    content_filter: contentFilter,
    selector: selectorParam,
    target_width: targetWidth,
    target_height: targetHeight,
    refresh: refresh ? "true" : undefined,
  });

  if (!refresh) imageCache.set(cacheKey, promise);
  return promise;
};

export const getUnsplashPhotoUrl = (photo, { width = 1100, height, quality = 80, fit = "crop" } = {}) => {
  const rawUrl = photo?.urls?.raw || photo?.urls?.regular;
  if (!rawUrl) return "";

  const url = new URL(rawUrl);
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", fit);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality));
  if (height) url.searchParams.set("h", String(height));
  return url.toString();
};

export const getUnsplashCredit = (photo) => {
  if (!photo?.user) return null;
  return {
    photographerName: photo.user.name,
    photographerUrl: withUtm(photo.user.links?.html),
    unsplashUrl: withUtm("https://unsplash.com"),
  };
};
