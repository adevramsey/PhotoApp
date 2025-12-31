import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PhotoDropzone from "../components/PhotoDropzone.jsx";
import { usePhotoStore } from "../hooks/usePhotoStore.jsx";
import { useToast } from "../hooks/useToast.js";
import "../styles/upload.css";

/**
 * Upload Page - Main photo upload interface
 * Features:
 * - Drag & drop file upload
 * - Multiple file selection
 * - Preview thumbnails
 * - Remove individual photos
 * - Clear all photos
 * - Validation and error handling
 */
export default function Upload() {
  const navigate = useNavigate();
  const { 
    stagedPhotos, 
    addStagedPhotos, 
    removePhoto, 
    clearStaged,
    stagedCount 
  } = usePhotoStore();
  const { success, error: showError, warning } = useToast();
  
  const [isUploading, setIsUploading] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState(new Set());

  // Show warning when leaving page with unsaved photos
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (stagedPhotos.length > 0) {
        e.preventDefault();
        e.returnValue = "You have unsaved photos. Are you sure you want to leave?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [stagedPhotos.length]);

  /**
   * Handle new files added from dropzone
   */
  const handleFilesAdded = async (files) => {
    setIsUploading(true);
    
    try {
      const added = await addStagedPhotos(files);
      success(`${files.length} photo${files.length > 1 ? 's' : ''} added successfully!`);
      console.log("Photos added:", added);
    } catch (err) {
      showError("Failed to process photos. Please try again.");
      console.error("Upload error:", err);
    } finally {
      setIsUploading(false);
    }
  };

  /**
   * Remove single photo
   */
  const handleRemovePhoto = (photoId) => {
    const photo = stagedPhotos.find(p => p.id === photoId);
    removePhoto(photoId);
    setSelectedPhotos(prev => {
      const newSet = new Set(prev);
      newSet.delete(photoId);
      return newSet;
    });
    success(`"${photo?.metadata?.name || 'Photo'}" removed`);
  };

  /**
   * Clear all staged photos with confirmation
   */
  const handleClearAll = () => {
    if (window.confirm(`Remove all ${stagedPhotos.length} photos? This cannot be undone.`)) {
      clearStaged();
      setSelectedPhotos(new Set());
      warning("All photos removed");
    }
  };

  /**
   * Toggle photo selection
   */
  const togglePhotoSelection = (photoId) => {
    setSelectedPhotos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(photoId)) {
        newSet.delete(photoId);
      } else {
        newSet.add(photoId);
      }
      return newSet;
    });
  };

  /**
   * Select all photos
   */
  const handleSelectAll = () => {
    if (selectedPhotos.size === stagedPhotos.length) {
      setSelectedPhotos(new Set());
    } else {
      setSelectedPhotos(new Set(stagedPhotos.map(p => p.id)));
    }
  };

  /**
   * Remove selected photos
   */
  const handleRemoveSelected = () => {
    if (selectedPhotos.size === 0) {
      warning("No photos selected");
      return;
    }

    if (window.confirm(`Remove ${selectedPhotos.size} selected photos?`)) {
      selectedPhotos.forEach(id => removePhoto(id));
      setSelectedPhotos(new Set());
      success(`${selectedPhotos.size} photos removed`);
    }
  };

  /**
   * Proceed to review page
   */
  const handleProceedToReview = () => {
    if (stagedPhotos.length === 0) {
      showError("Please add at least one photo to continue");
      return;
    }
    navigate("/review");
  };

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

  /**
   * Calculate total size of staged photos
   */
  const getTotalSize = () => {
    const total = stagedPhotos.reduce((sum, photo) => sum + photo.metadata.size, 0);
    return formatFileSize(total);
  };

  return (
    <div className="upload-page">
      {/* Header Section */}
      <header className="upload-header">
        <div className="container">
          <div className="upload-header-content">
            <div className="upload-header-text">
              <h1 className="upload-title">Upload Photos</h1>
              <p className="upload-subtitle">
                Add your best shots. You can review and edit metadata before saving to your gallery.
              </p>
            </div>

            {stagedPhotos.length > 0 && (
              <div className="upload-stats">
                <div className="stat-item">
                  <span className="stat-value">{stagedPhotos.length}</span>
                  <span className="stat-label">Photos</span>
                </div>
                <div className="stat-divider" />
                <div className="stat-item">
                  <span className="stat-value">{getTotalSize()}</span>
                  <span className="stat-label">Total Size</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="container">
        {/* Upload Dropzone */}
        <section className="upload-dropzone-section">
          <PhotoDropzone 
            onFilesAdded={handleFilesAdded}
            maxFiles={50}
            maxSizeMB={10}
          />
        </section>

        {/* Loading State */}
        {isUploading && (
          <div className="upload-loading">
            <div className="loading-spinner" />
            <p className="loading-text">Processing photos...</p>
          </div>
        )}

        {/* Preview Grid */}
        {stagedPhotos.length > 0 && (
          <section className="upload-preview-section">
            {/* Toolbar */}
            <div className="preview-toolbar">
              <div className="toolbar-left">
                <button
                  className={`btn-select-all ${selectedPhotos.size === stagedPhotos.length ? 'active' : ''}`}
                  onClick={handleSelectAll}
                  aria-label={selectedPhotos.size === stagedPhotos.length ? 'Deselect all' : 'Select all'}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    {selectedPhotos.size === stagedPhotos.length ? (
                      <path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    ) : (
                      <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2"/>
                    )}
                  </svg>
                  {selectedPhotos.size > 0 
                    ? `${selectedPhotos.size} selected` 
                    : 'Select All'
                  }
                </button>

                {selectedPhotos.size > 0 && (
                  <button
                    className="btn-remove-selected"
                    onClick={handleRemoveSelected}
                    aria-label={`Remove ${selectedPhotos.size} selected photos`}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Remove Selected
                  </button>
                )}
              </div>

              <button
                className="btn-clear-all"
                onClick={handleClearAll}
                aria-label="Clear all photos"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Clear All
              </button>
            </div>

            {/* Photo Grid */}
            <div className="preview-grid">
              {stagedPhotos.map((photo, index) => (
                <div 
                  key={photo.id} 
                  className={`preview-card ${selectedPhotos.has(photo.id) ? 'selected' : ''}`}
                >
                  {/* Checkbox */}
                  <div className="preview-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedPhotos.has(photo.id)}
                      onChange={() => togglePhotoSelection(photo.id)}
                      aria-label={`Select ${photo.metadata.name}`}
                    />
                  </div>

                  {/* Image */}
                  <div className="preview-image-wrapper">
                    <img
                      src={photo.previewUrl}
                      alt={photo.metadata.name}
                      className="preview-image"
                      loading="lazy"
                    />
                    
                    {/* Remove Button */}
                    <button
                      className="preview-remove-btn"
                      onClick={() => handleRemovePhoto(photo.id)}
                      aria-label={`Remove ${photo.metadata.name}`}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>

                    {/* Photo Number Badge */}
                    <span className="preview-number">{index + 1}</span>
                  </div>

                  {/* Photo Info */}
                  <div className="preview-info">
                    <p className="preview-filename" title={photo.metadata.name}>
                      {photo.metadata.name}
                    </p>
                    <p className="preview-details">
                      <span>{formatFileSize(photo.metadata.size)}</span>
                      <span className="preview-divider">•</span>
                      <span>{photo.metadata.type.split('/')[1].toUpperCase()}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="upload-actions">
              <button
                className="btn-secondary"
                onClick={() => navigate("/")}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M19 12H5M12 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Cancel
              </button>
              
              <button
                className="btn-primary"
                onClick={handleProceedToReview}
              >
                Review & Edit ({stagedPhotos.length})
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </section>
        )}

        {/* Empty State */}
        {!isUploading && stagedPhotos.length === 0 && (
          <div className="upload-empty-state">
            <svg className="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth="2"/>
              <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
              <path d="M21 15l-5-5L5 21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h2 className="empty-state-title">No Photos Yet</h2>
            <p className="empty-state-text">
              Drag and drop photos above or click to browse your files
            </p>
            <ul className="empty-state-tips">
              <li>✓ Upload up to 50 photos at once</li>
              <li>✓ Supported formats: JPG, PNG, GIF, WebP</li>
              <li>✓ Maximum file size: 10MB per photo</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}