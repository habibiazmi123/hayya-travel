"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type LoadingImageProps = ImageProps & { fallbackLabel?: string };

export function LoadingImage({ className = "", fallbackLabel = "Gambar tidak tersedia", onLoad, onError, ...props }: LoadingImageProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");
  const { alt, ...imageProps } = props;

  return (
    <span className={`loading-image ${status === "loaded" ? "is-loaded" : ""} ${status === "error" ? "is-error" : ""}`}>
      {status === "loading" ? <span className="loading-image-skeleton" aria-hidden="true" /> : null}
      {status === "error" ? <span className="loading-image-fallback" role="img" aria-label={fallbackLabel}>{fallbackLabel}</span> : null}
      {status !== "error" ? (
        <Image
          {...imageProps}
          alt={alt}
          className={className}
          onLoad={(event) => { setStatus("loaded"); onLoad?.(event); }}
          onError={(event) => { setStatus("error"); onError?.(event); }}
        />
      ) : null}
    </span>
  );
}
