import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePhotoStore } from "../hooks/usePhotoStore.jsx";
import { useToast } from "../hooks/useToast.js";
import ReviewPhotoCard from "../components/ReviewPhotoCard.jsx";
import "../styles/review.css";

/**
 * Review Page - Edit photo metadata before upload
 * Features:
 * - Edit title, description, category, tags for each photo
 * - Bulk edit capabilities
 * - Confirm photos for upload
 * - Remove photos
 * - Navigate back to upload
 */
export default function Review() {
  const navigate = useNavigate();
  const { 
    stagedPhotos, 
    updatePhoto, 
    removePhoto, 
    confirmAllPhotos,
    clearStaged,
    bulkUpdatePhotos 
  } = usePhotoStore();
  const { success, error: showError, warning } = useToast();

  const [selectedPhotos, setSelectedPhotos] = useState(new Set());
  const [bulkEditMode, setBulkEditMode] = useState(false);
  const [bulkCategory, setBulkCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if no photos
  useEffect(() => {
    if (stagedPhotos.length === 0) {
      warning("No photos to review");
      navigate("/upload");
    }
  }, [stagedPhotos.length, navigate, warning]);

  /**
   * Handle photo update
   */
  const handlePhotoUpdate = (photoId, updates) => {
    updatePhoto(photoId, updates);
  };

  /**
   * Remove photo from review
   */
  const handleRemovePhoto = (photoId) => {
    const photo = stagedPhotos.find(p => p.id === photoId);
    if (window.confirm(`Remove "${photo?.title || photo?.metadata?.name}"?`)) {
      removePhoto(photoId);
      success("Photo removed");
      
      // Remove from selection
      setSelectedPhotos(prev => {
        const newSet = new Set(prev);
        newSet.delete(photoId);
        return newSet;
      });
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
   * Apply bulk category update
   */
  const handleBulkCategoryUpdate = () => {
    if (selectedPhotos.size === 0) {
      warning("No photos selected");
      return;
    }

    if (!bulkCategory) {
      warning("Please select a category");
      return;
    }

    const updates = Array.from(selectedPhotos).map(id => ({
      id,
      category: bulkCategory
    }));

    bulkUpdatePhotos(updates);
    success(`Category "${bulkCategory}" applied to ${selectedPhotos.size} photos`);
    setBulkCategory("");
    setSelectedPhotos(new Set());
    setBulkEditMode(false);
  };

  /**
   * Validate all photos before submission
   */
  const validatePhotos = () => {
    const errors = [];

    stagedPhotos.forEach((photo, index) => {
      if (!photo.title || photo.title.trim() === "") {
        errors.push(`Photo ${index + 1}: Title is required`);
      }
      if (!photo.category) {
        errors.push(`Photo ${index + 1}: Category is required`);
      }
    });

    return errors;
  };

  /**
   * Confirm and submit photos
   */
  const handleConfirmAndUpload = async () => {
    const errors = validatePhotos();

    if (errors.length > 0) {
      showError(`Please fix the following:\n${errors.slice(0, 3).join("\n")}${errors.length > 3 ? `\n...and ${errors.length - 3} more` : ''}`);
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate upload delay (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      confirmAllPhotos();
      success(`${stagedPhotos.length} photos ready for upload!`);
      
      // Navigate to gallery or upload confirmation page
      navigate("/gallery");
      
      // TODO: Replace with actual API upload
      // await uploadPhotosToServer(stagedPhotos);
      
    } catch (error) {
      showError("Failed to process photos. Please try again.");
      console.error("Upload error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Go back to upload page
   */
  const handleBack = () => {
    if (window.confirm("Go back to upload? Your edits will be preserved.")) {
      navigate("/upload");
    }
  };

  /**
   * Cancel and clear all
   */
  const handleCancel = () => {
    if (window.confirm("Cancel and remove all photos? This cannot be undone.")) {
      clearStaged();
      navigate("/upload");
    }
  };

  if (stagedPhotos.length === 0) {
    return null; // Will redirect
  }

  return (
    <div className="review-page">
      {/* Header */}
      <header className="review-header">
        <div className="container">
          <div className="review-header-content">
            <div className="review-header-text">
              <h1 className="review-title">Review & Edit Photos</h1>
              <p className="review-subtitle">
                Add titles, descriptions, categories, and tags before uploading
              </p>
            </div>

            <div className="review-progress">
              <span className="progress-count">
                {stagedPhotos.filter(p => p.title && p.category).length} of {stagedPhotos.length}
              </span>
              <span className="progress-label">Complete</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container">
        {/* Toolbar */}
        <div className="review-toolbar">
          <div className="toolbar-left">
            <button
              className={`btn-select-all ${selectedPhotos.size === stagedPhotos.length ? 'active' : ''}`}
              onClick={handleSelectAll}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                {selectedPhotos.size === stagedPhotos.length ? (
                  <path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                ) : (
                  <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2"/>
                )}
              </svg>
              {selectedPhotos.size > 0 ? `${selectedPhotos.size} selected` : 'Select All'}
            </button>

            {selectedPhotos.size > 0 && (
              <button
                className="btn-bulk-edit"
                onClick={() => setBulkEditMode(!bulkEditMode)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Bulk Edit
              </button>
            )}
          </div>

          <div className="toolbar-right">
            <span className="photos-count">
              {stagedPhotos.length} photo{stagedPhotos.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Bulk Edit Panel */}
        {bulkEditMode && selectedPhotos.size > 0 && (
          <div className="bulk-edit-panel">
            <div className="bulk-edit-content">
              <h3 className="bulk-edit-title">
                Apply to {selectedPhotos.size} selected photo{selectedPhotos.size !== 1 ? 's' : ''}
              </h3>
              
              <div className="bulk-edit-form">
                <div className="form-group">
                  <label htmlFor="bulk-category">Category</label>
                  <select
                    id="bulk-category"
                    value={bulkCategory}
                    onChange={(e) => setBulkCategory(e.target.value)}
                    className="form-select"
                  >
                    <option value="">Select Category</option>
                    <option value="landscape">Landscape</option>
                    <option value="portrait">Portrait</option>
                    <option value="wedding">Wedding</option>
                    <option value="event">Event</option>
                  </select>
                </div>

                <div className="bulk-edit-actions">
                  <button
                    className="btn-secondary"
                    onClick={() => {
                      setBulkEditMode(false);
                      setBulkCategory("");
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn-primary"
                    onClick={handleBulkCategoryUpdate}
                    disabled={!bulkCategory}
                  >
                    Apply Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Photo Cards Grid */}
        <div className="review-grid">
          {stagedPhotos.map((photo, index) => (
            <ReviewPhotoCard
              key={photo.id}
              photo={photo}
              index={index}
              selected={selectedPhotos.has(photo.id)}
              onToggleSelect={togglePhotoSelection}
              onUpdate={handlePhotoUpdate}
              onRemove={handleRemovePhoto}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="review-actions">
          <div className="actions-left">
            <button
              className="btn-text"
              onClick={handleBack}
              disabled={isSubmitting}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M19 12H5M12 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Upload
            </button>

            <button
              className="btn-text btn-danger"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel All
            </button>
          </div>

          <button
            className="btn-primary btn-large"
            onClick={handleConfirmAndUpload}
            disabled={isSubmitting || stagedPhotos.length === 0}
          >
            {isSubmitting ? (
              <>
                <div className="btn-spinner" />
                Uploading...
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Upload {stagedPhotos.length} Photo{stagedPhotos.length !== 1 ? 's' : ''}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}