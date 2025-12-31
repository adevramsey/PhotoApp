import { useState } from "react";
import BlurImage from "./BlurImage.jsx";

/**
 * PhotoCard - Display photo in gallery with hover effects
 * Features:
 * - Progressive image loading with blur effect
 * - Hover overlay with metadata
 * - Category badge
 * - Click to open lightbox
 * - Like/favorite functionality (optional)
 */
export default function PhotoCard({ photo, onClick, showActions = false, onDelete }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  /**
   * Handle delete with confirmation
   */
  const handleDelete = async (e) => {
    e.stopPropagation();
    
    if (window.confirm(`Delete "${photo.title}"? This cannot be undone.`)) {
      setIsDeleting(true);
      try {
        await onDelete?.(photo.id);
      } catch (error) {
        console.error("Delete failed:", error);
        setIsDeleting(false);
      }
    }
  };

  /**
   * Toggle like status
   */
  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    // TODO: Save to backend
  };

  /**
   * Get category display name
   */
  const getCategoryLabel = (category) => {
    const labels = {
      landscape: "Landscape",
      portrait: "Portrait",
      wedding: "Wedding",
      event: "Event"
    };
    return labels[category] || category;
  };

  /**
   * Get category color
   */
  const getCategoryColor = (category) => {
    const colors = {
      landscape: "#10b981",
      portrait: "#3b82f6",
      wedding: "#ec4899",
      event: "#f59e0b"
    };
    return colors[category] || "#6b7280";
  };

  return (
    <div 
      className={`photo-card ${isDeleting ? 'deleting' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {/* Image Container */}
      <div className="photo-card-image">
        <BlurImage
          src={photo.url || photo.previewUrl}
          alt={photo.title || photo.metadata?.name || 'Photo'}
          className="card-image"
        />

        {/* Category Badge */}
        {photo.category && (
          <span 
            className="category-badge"
            style={{ backgroundColor: getCategoryColor(photo.category) }}
          >
            {getCategoryLabel(photo.category)}
          </span>
        )}

        {/* Hover Overlay */}
        <div className="photo-card-overlay">
          <div className="overlay-content">
            <h3 className="overlay-title">{photo.title || 'Untitled'}</h3>
            
            {photo.description && (
              <p className="overlay-description">
                {photo.description.length > 100 
                  ? `${photo.description.substring(0, 100)}...` 
                  : photo.description
                }
              </p>
            )}

            {photo.tags && photo.tags.length > 0 && (
              <div className="overlay-tags">
                {photo.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="overlay-tag">
                    #{tag}
                  </span>
                ))}
                {photo.tags.length > 3 && (
                  <span className="overlay-tag-more">
                    +{photo.tags.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {showActions && (
            <div className="overlay-actions">
              <button
                className={`action-btn btn-like ${isLiked ? 'liked' : ''}`}
                onClick={handleLike}
                aria-label={isLiked ? 'Unlike photo' : 'Like photo'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <button
                className="action-btn btn-delete"
                onClick={handleDelete}
                disabled={isDeleting}
                aria-label="Delete photo"
              >
                {isDeleting ? (
                  <div className="btn-spinner" />
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer (Optional) */}
      <div className="photo-card-footer">
        <p className="card-title" title={photo.title}>
          {photo.title || 'Untitled'}
        </p>
        
        {photo.createdAt && (
          <p className="card-date">
            {new Date(photo.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </p>
        )}
      </div>
    </div>
  );
}