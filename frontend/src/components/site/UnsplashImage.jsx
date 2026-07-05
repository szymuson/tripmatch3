import React from "react";
import { useUnsplashPhoto } from "../../hooks/useUnsplashPhoto";

export const UnsplashImage = ({
  imageKey,
  query,
  fallbackSrc,
  alt,
  className = "",
  containerClassName = "relative w-full h-full",
  width = 1100,
  height,
  fit,
  candidateCount,
  selector,
  refresh = false,
  showCredit = true,
  enabled = true,
}) => {
  const { src, credit } = useUnsplashPhoto({
    imageKey,
    query,
    fallbackSrc,
    width,
    height,
    fit,
    candidateCount,
    selector,
    refresh,
    enabled,
  });
  const imageClassName = `block w-full h-full object-cover object-center ${className}`.trim();

  return (
    <div className={containerClassName}>
      <img src={src || fallbackSrc} alt={alt} className={imageClassName} />
      {showCredit && credit && (
        <div className="absolute bottom-2 left-2 right-2 bg-[#2A2624]/55 text-[#F4EFE6]/90 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.08em] leading-tight backdrop-blur-sm">
          Photo by{" "}
          <a href={credit.photographerUrl} target="_blank" rel="noreferrer" className="underline decoration-[#F4EFE6]/45 underline-offset-2">
            {credit.photographerName}
          </a>{" "}
          on{" "}
          <a href={credit.unsplashUrl} target="_blank" rel="noreferrer" className="underline decoration-[#F4EFE6]/45 underline-offset-2">
            Unsplash
          </a>
        </div>
      )}
    </div>
  );
};
