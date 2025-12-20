import { useState, useEffect } from 'react';
import '../styles/BlurImage.css';

/**
 * BlurImage Component - Progressive image loading with blur effect
 * 
 * Loads a tiny placeholder first, then smoothly transitions to full image
 * Creates a Medium-style blur-up effect for better perceived performance
 * 
 * @param {Object} props - Component props
 * @param {string} props.src - Full-resolution image source
 * @param {string} props.placeholder - Low-resolution placeholder (optional)
 * @param {string} props.alt - Image alt text for accessibility
 * @param {string} props.className - Additional CSS classes
 * @param {Function} props.onLoad - Callback when image loads
 * @param {Function} props.onError - Callback when image fails to load
 * @returns {JSX.Element} Progressive image component
 */
export default function BlurImage({ 
  src, 
  placeholder,
  alt = '', 
  className = '',
  onLoad,
  onError,
  ...props 
}) {
  const [imageSrc, setImageSrc] = useState(placeholder || src);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Create image loader
    const img = new Image();
    
    img.onload = () => {
      setImageSrc(src);
      setImageLoading(false);
      if (onLoad) onLoad();
    };

    img.onerror = () => {
      setImageError(true);
      setImageLoading(false);
      if (onError) onError();
    };

    // Start loading full image
    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, onLoad, onError]);

  return (
    <div className={`blur-image-wrapper ${className}`}>
      <img
        src={imageSrc}
        alt={alt}
        className={`blur-image ${imageLoading ? 'loading' : 'loaded'} ${imageError ? 'error' : ''}`}
        {...props}
      />
      {imageLoading && !imageError && (
        <div className="blur-image-loader">
          <div className="loader-spinner"></div>
        </div>
      )}
      {imageError && (
        <div className="blur-image-error">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" strokeWidth="2"/>
            <circle cx="12" cy="13" r="4" strokeWidth="2"/>
            <path d="M18 6L6 18" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <p>Failed to load image</p>
        </div>
      )}
    </div>
  );
}