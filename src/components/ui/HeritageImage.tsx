import React, { useState, useEffect } from 'react';
import { Landmark } from 'lucide-react';

interface HeritageImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackIconSize?: number;
  containerClassName?: string;
}

export default function HeritageImage({ 
  src, 
  alt, 
  className = '', 
  fallbackIconSize = 48,
  containerClassName = '',
  ...props 
}: HeritageImageProps) {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (src !== imgSrc) {
      setImgSrc(src);
      setHasError(false);
      setIsLoading(true);
    }
  }, [src, imgSrc]);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const showFallback = hasError || !imgSrc;

  return (
    <div className={`relative overflow-hidden bg-white/5 ${containerClassName} ${className}`}>
      {/* Loading Skeleton */}
      {isLoading && !showFallback && (
        <div className="absolute inset-0 bg-white/5 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-heritage-orange border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Actual Image */}
      {!showFallback && (
        <img
          src={imgSrc}
          alt={alt || "Heritage Place"}
          className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className}`}
          onError={handleError}
          onLoad={handleLoad}
          loading="lazy"
          {...props}
        />
      )}

      {/* Fallback View */}
      {showFallback && (
        <div className={`w-full h-full flex flex-col items-center justify-center text-cream/40 bg-white/5 border border-white/10 ${className}`}>
          <Landmark size={fallbackIconSize} className="mb-2 opacity-50" />
          <span className="text-xs font-semibold uppercase tracking-wider">Heritage Image</span>
        </div>
      )}
    </div>
  );
}
