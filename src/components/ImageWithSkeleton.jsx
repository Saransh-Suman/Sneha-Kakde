import React, { useState, useRef, useEffect } from 'react';

export default function ImageWithSkeleton({
  src,
  alt = '',
  className = '',
  containerClassName = '',
  onClick,
  draggable = false,
  loading = 'lazy',
  style = {},
  darkSkeleton = false,
  onLoad
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    // If the image is already cached by the browser
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [src]);

  const handleImageLoad = (e) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  const handleImageError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  const hasExplicitOverflow = containerClassName.includes('overflow-');

  return (
    <div className={`relative ${hasExplicitOverflow ? '' : 'overflow-hidden'} ${containerClassName}`} onClick={onClick}>
      {/* Animated Skeleton Shimmer Placeholder */}
      {!isLoaded && !hasError && (
        <div
          className={`absolute inset-0 z-10 skeleton-shimmer ${
            darkSkeleton
              ? 'bg-neutral-800'
              : 'bg-stone-200/80'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer" />
        </div>
      )}

      {/* Fallback on Error */}
      {hasError ? (
        <div className="w-full h-full min-h-[160px] flex items-center justify-center bg-neutral-100 text-neutral-400 text-xs font-semibold p-4 text-center">
          <span>Failed to load image</span>
        </div>
      ) : (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          draggable={draggable}
          style={style}
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={`${className} transition-opacity duration-500 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
}
