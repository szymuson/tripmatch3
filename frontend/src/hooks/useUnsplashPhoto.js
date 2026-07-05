import { useEffect, useState } from "react";
import {
  getUnsplashCredit,
  getUnsplashPhotoUrl,
  isUnsplashEnabled,
  resolveUnsplashImage,
} from "../services/unsplashApi";

export const useUnsplashPhoto = ({
  imageKey,
  query,
  fallbackSrc,
  width = 1100,
  height,
  fit,
  candidateCount = 1,
  selector,
  refresh = false,
  enabled = true,
}) => {
  const [photoState, setPhotoState] = useState({
    src: fallbackSrc,
    credit: null,
    source: "fallback",
  });

  useEffect(() => {
    let active = true;
    setPhotoState({ src: fallbackSrc, credit: null, source: "fallback" });

    if (!enabled || !isUnsplashEnabled || !imageKey || !query) return undefined;

    resolveUnsplashImage({
      key: imageKey,
      query,
      perPage: candidateCount,
      selector,
      targetWidth: width,
      targetHeight: height,
      refresh,
    })
      .then((data) => {
        const photo = data?.photo;
        const src = getUnsplashPhotoUrl(photo, { width, height, fit });
        if (!active || !src) return;
        setPhotoState({
          src,
          credit: getUnsplashCredit(photo),
          source: data?.source || "unsplash",
        });
      })
      .catch(() => {
        if (!active) return;
        setPhotoState({ src: fallbackSrc, credit: null, source: "fallback" });
      });

    return () => {
      active = false;
    };
  }, [candidateCount, enabled, fallbackSrc, fit, height, imageKey, query, refresh, selector, width]);

  return photoState;
};
