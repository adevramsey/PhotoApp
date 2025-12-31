import { useState, useRef, useEffect } from "react";

/**
 * ReviewPhotoCard - Individual photo card with editing capabilities
 * Features:
 * - Editable title, description, category, tags
 * - Real-time validation
 * - Visual feedback for completion status
 * - Character counters
 * - Tag management
 */
export default function ReviewPhotoCard({ 
  photo, 
  index, 
  selected,
  onToggleSelect,
  onUpdate, 
  onRemove 
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localData, setLocalData] = useState({
    title: photo.title || "",
    description: photo.description || "",
    category: photo.category || "",
    tags: photo.tags || []
  });
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState({});
  
  const titleInputRef = useRef(null);

  // Auto-expand first card
  useEffect(() => {
    if (index === 0 && !photo.title) {
      setIsExpanded(true);
    }
  }, [index, photo.title]);

  /**
   * Validate field
   */
  const validateField = (field, value) => {
    const newErrors = { ...errors };

    switch (field) {
      case "title":
        if (!value || value.trim().length < 3) {
          newErrors.title = "Title must be at least 3 characters";
        } else if (value.length > 100) {
          newErrors.title = "Title must be less than 100 characters";
        } else {
          delete newErrors.title;
        }
        break;

      case "description":
        if (value && value.length > 500) {
          newErrors.description = "Description must be less than 500 characters";
        } else {
          delete newErrors.description;
        }
        break;

      case "category":
        if (!value) {
          newErrors.category = "Category is required";
        } else {
          delete newErrors.category;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle input change with validation
   */
  const handleChange = (field, value) => {
    setLocalData(prev => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  /**
   * Handle blur - save to store
   */
  const handleBlur = (field) => {
    const value = localData[field];
    if (validateField(field, value)) {
      onUpdate(photo.id, { [field]: value });
    }
  };

  /**
   * Add tag
   */
  const handleAddTag = (e) => {
    e.preventDefault();
    
    const tag = tagInput.trim().toLowerCase();
    
    if (!tag) return;
    
    if (localData.tags.includes(tag)) {
      setErrors(prev => ({ ...prev, tags: "Tag already exists" }));
      return;
    }

    if (localData.tags.length >= 10) {
      setErrors(prev => ({ ...prev, tags: "Maximum 10 tags allowed" }));
      return;
    }

    const newTags = [...localData.tags, tag];
    setLocalData(prev => ({ ...prev, tags: newTags }));
    onUpdate(photo.id, { tags: newTags });
    setTagInput("");
    setErrors(prev => ({ ...prev, tags: undefined }));
  };

  /**
   * Remove tag
   */
  const handleRemoveTag = (tagToRemove) => {
    const newTags = localData.tags.filter(tag => tag !== tagToRemove);
    setLocalData(prev => ({ ...prev, tags: newTags }));
    onUpdate(photo.id, { tags: newTags });
  };

  /**
   * Toggle card expansion
   */
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded && titleInputRef.current) {
      setTimeout(() => titleInputRef.current?.focus(), 100);
    }
  };

  /**
   * Check if card is complete
   */
  const isComplete = localData.title.trim().length >= 3 && localData.category;

  /**
   * Format file size
   */
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className={`review-photo-card ${isExpanded ? 'expanded' : ''} ${selected ? 'selected' : ''} ${isComplete ? 'complete' : 'incomplete'}`}>
      {/* Card Header */}
      <div className="card-header">
        {/* Checkbox */}
        <div className="card-checkbox">
          <input
            type="checkbox"
            checked={selected}
            onChange={() => onToggleSelect(photo.id)}
            aria-label={`Select photo ${index + 1}`}
          />
        </div>

        {/* Thumbnail */}
        <div className="card-thumbnail" onClick={toggleExpanded}>
          <img
            src={photo.previewUrl}
            alt={localData.title || photo.metadata.name}
            loading="lazy"
          />
          <div className="thumbnail-overlay">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              {isExpanded ? (
                <path d="M5 15l7-7 7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              ) : (
                <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              )}
            </svg>
          </div>
        </div>

        {/* Quick Info */}
        <div className="card-quick-info" onClick={toggleExpanded}>
          <div className="quick-info-content">
            <h3 className="card-title">
              {localData.title || photo.metadata.name}
            </h3>
            <p className="card-meta">
              <span>{formatFileSize(photo.metadata.size)}</span>
              <span className="meta-divider">•</span>
              <span>{photo.metadata.type.split('/')[1].toUpperCase()}</span>
              {localData.category && (
                <>
                  <span className="meta-divider">•</span>
                  <span className="category-badge">{localData.category}</span>
                </>
              )}
            </p>
          </div>

          {/* Status Badge */}
          <div className={`status-badge ${isComplete ? 'complete' : 'incomplete'}`}>
            {isComplete ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 4L12 14.01l-3-3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Complete
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                  <path d="M12 8v4M12 16h.01" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Incomplete
              </>
            )}
          </div>
        </div>

        {/* Remove Button */}
        <button
          className="card-remove-btn"
          onClick={() => onRemove(photo.id)}
          aria-label="Remove photo"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="card-body">
          <form className="edit-form" onSubmit={(e) => e.preventDefault()}>
            {/* Title */}
            <div className="form-group">
              <label htmlFor={`title-${photo.id}`} className="form-label required">
                Title
                <span className="char-count">
                  {localData.title.length}/100
                </span>
              </label>
              <input
                ref={titleInputRef}
                id={`title-${photo.id}`}
                type="text"
                className={`form-input ${errors.title ? 'error' : ''}`}
                value={localData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                onBlur={() => handleBlur('title')}
                placeholder="Enter a descriptive title"
                maxLength={100}
                required
              />
              {errors.title && (
                <span className="form-error">{errors.title}</span>
              )}
            </div>

            {/* Description */}
            <div className="form-group">
              <label htmlFor={`description-${photo.id}`} className="form-label">
                Description
                <span className="char-count">
                  {localData.description.length}/500
                </span>
              </label>
              <textarea
                id={`description-${photo.id}`}
                className={`form-textarea ${errors.description ? 'error' : ''}`}
                value={localData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                onBlur={() => handleBlur('description')}
                placeholder="Add a description (optional)"
                rows={3}
                maxLength={500}
              />
              {errors.description && (
                <span className="form-error">{errors.description}</span>
              )}
            </div>

            {/* Category */}
            <div className="form-group">
              <label htmlFor={`category-${photo.id}`} className="form-label required">
                Category
              </label>
              <select
                id={`category-${photo.id}`}
                className={`form-select ${errors.category ? 'error' : ''}`}
                value={localData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                onBlur={() => handleBlur('category')}
                required
              >
                <option value="">Select a category</option>
                <option value="landscape">Landscape</option>
                <option value="portrait">Portrait</option>
                <option value="wedding">Wedding</option>
                <option value="event">Event</option>
              </select>
              {errors.category && (
                <span className="form-error">{errors.category}</span>
              )}
            </div>

            {/* Tags */}
            <div className="form-group">
              <label htmlFor={`tags-${photo.id}`} className="form-label">
                Tags
                <span className="tag-count">
                  {localData.tags.length}/10
                </span>
              </label>
              
              {/* Tag List */}
              {localData.tags.length > 0 && (
                <div className="tag-list">
                  {localData.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                      <button
                        type="button"
                        className="tag-remove"
                        onClick={() => handleRemoveTag(tag)}
                        aria-label={`Remove tag ${tag}`}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Tag Input */}
              <div className="tag-input-wrapper">
                <input
                  id={`tags-${photo.id}`}
                  type="text"
                  className="form-input"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAddTag(e);
                    }
                  }}
                  placeholder="Add tags (press Enter)"
                  disabled={localData.tags.length >= 10}
                />
                <button
                  type="button"
                  className="btn-add-tag"
                  onClick={handleAddTag}
                  disabled={!tagInput.trim() || localData.tags.length >= 10}
                  aria-label="Add tag"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 5v14M5 12h14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              
              {errors.tags && (
                <span className="form-error">{errors.tags}</span>
              )}
              
              <p className="form-hint">
                Add relevant keywords to make your photo easier to find
              </p>
            </div>

            {/* Action Buttons */}
            <div className="form-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={toggleExpanded}
              >
                Collapse
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}