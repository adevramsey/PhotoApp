/**
 * LoadingSkeleton Component - Animated placeholder while content loads
 * 
 * Provides visual feedback during async operations with shimmer effect
 * 
 * @param {Object} props - Component props
 * @param {string} props.variant - Type of skeleton: 'card', 'text', 'image', 'circle'
 * @param {number} props.count - Number of skeleton items to render
 * @param {string} props.width - Custom width (CSS value)
 * @param {string} props.height - Custom height (CSS value)
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} Loading skeleton component
 */
export default function LoadingSkeleton({ 
  variant = 'card', 
  count = 1, 
  width, 
  height,
  className = '' 
}) {
  
  /**
   * Render individual skeleton based on variant
   */
  const renderSkeleton = (index) => {
    const baseClass = `skeleton skeleton-${variant}`;
    const style = {
      width: width || undefined,
      height: height || undefined,
    };

    switch (variant) {
      case 'card':
        // Full card skeleton with image and text areas
        return (
          <div key={index} className={`${baseClass} ${className}`} style={style}>
            <div className="skeleton-image"></div>
            <div className="skeleton-content">
              <div className="skeleton-title"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-text short"></div>
            </div>
          </div>
        );

      case 'image':
        // Simple image placeholder
        return (
          <div key={index} className={`${baseClass} ${className}`} style={style}></div>
        );

      case 'text':
        // Text line placeholder
        return (
          <div key={index} className={`${baseClass} ${className}`} style={style}></div>
        );

      case 'circle':
        // Circular placeholder (for avatars, profile pics)
        return (
          <div key={index} className={`${baseClass} ${className}`} style={style}></div>
        );

      case 'gallery':
        // Gallery grid skeleton
        return (
          <div key={index} className={`${baseClass} ${className}`}>
            <div className="skeleton-image"></div>
            <div className="skeleton-overlay">
              <div className="skeleton-text"></div>
            </div>
          </div>
        );

      default:
        return (
          <div key={index} className={`${baseClass} ${className}`} style={style}></div>
        );
    }
  };

  // Render multiple skeletons if count > 1
  return (
    <>
      {Array.from({ length: count }, (_, index) => renderSkeleton(index))}
    </>
  );
}