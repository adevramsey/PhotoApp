import { useCallback, useState } from "react";

/**
 * PhotoDropzone - Drag & drop file upload component
 * Features:
 * - Multiple file upload
 * - File type validation (images only)
 * - File size validation
 * - Visual drag feedback
 * - Error handling with messages
 * - Accessibility support
 */
export default function PhotoDropzone({ 
  onFilesAdded, 
  maxFiles = 50, 
  maxSizeMB = 10,
  acceptedFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);
  const [dragCounter, setDragCounter] = useState(0);

  /**
   * Validate files
   */
  const validateFiles = useCallback((files) => {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    const validFiles = [];
    const errors = [];

    files.forEach((file) => {
      // Check file type
      if (!acceptedFormats.some(format => file.type.startsWith(format.split('/')[0]))) {
        errors.push(`${file.name} is not a valid image format`);
        return;
      }

      // Check file size
      if (file.size > maxSizeBytes) {
        errors.push(`${file.name} exceeds ${maxSizeMB}MB size limit`);
        return;
      }

      // Check for duplicates (basic name check)
      if (validFiles.some(f => f.name === file.name && f.size === file.size)) {
        errors.push(`${file.name} is a duplicate`);
        return;
      }

      validFiles.push(file);
    });

    return { validFiles, errors };
  }, [maxSizeMB, acceptedFormats]);

  /**
   * Handle drop event
   */
  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      setIsDragging(false);
      setDragCounter(0);
      setError(null);

      const files = Array.from(e.dataTransfer.files);
      
      if (files.length === 0) {
        setError("No files detected. Please try again.");
        return;
      }

      if (files.length > maxFiles) {
        setError(`Maximum ${maxFiles} files allowed. You selected ${files.length} files.`);
        return;
      }

      const { validFiles, errors } = validateFiles(files);

      if (errors.length > 0) {
        setError(errors.slice(0, 3).join(", ") + (errors.length > 3 ? ` ...and ${errors.length - 3} more` : ''));
      }

      if (validFiles.length > 0) {
        onFilesAdded(validFiles);
        
        // Clear error after successful upload
        if (errors.length === 0) {
          setError(null);
        }
      } else if (errors.length > 0) {
        // All files failed validation
        setError("No valid files to upload. " + errors[0]);
      }
    },
    [onFilesAdded, maxFiles, validateFiles]
  );

  /**
   * Handle file input change
   */
  const handleFileInput = (e) => {
    setError(null);
    const files = Array.from(e.target.files);

    if (files.length === 0) return;

    if (files.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed. You selected ${files.length} files.`);
      e.target.value = ""; // Reset input
      return;
    }

    const { validFiles, errors } = validateFiles(files);

    if (errors.length > 0) {
      setError(errors.slice(0, 3).join(", ") + (errors.length > 3 ? ` ...and ${errors.length - 3} more` : ''));
    }

    if (validFiles.length > 0) {
      onFilesAdded(validFiles);
      
      if (errors.length === 0) {
        setError(null);
      }
    }

    // Reset input to allow re-selecting same files
    e.target.value = "";
  };

  /**
   * Handle drag over
   */
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  /**
   * Handle drag enter
   */
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setDragCounter(prev => prev + 1);
    
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  /**
   * Handle drag leave
   */
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setDragCounter(prev => {
      const newCount = prev - 1;
      if (newCount === 0) {
        setIsDragging(false);
      }
      return newCount;
    });
  };

  /**
   * Clear error
   */
  const clearError = () => {
    setError(null);
  };

  return (
    <div className="dropzone-container">
      <div
        className={`dropzone ${isDragging ? 'dragging' : ''} ${error ? 'error' : ''}`}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        role="button"
        tabIndex={0}
        aria-label="Upload photos"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            document.getElementById('file-input')?.click();
          }
        }}
      >
        <input
          type="file"
          accept={acceptedFormats.join(',')}
          multiple
          id="file-input"
          hidden
          onChange={handleFileInput}
          aria-label="File input"
        />

        <label htmlFor="file-input" className="dropzone-content">
          {isDragging ? (
            <>
              <svg className="dropzone-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="dropzone-title">Drop photos here!</p>
              <p className="dropzone-subtitle">Release to upload</p>
            </>
          ) : (
            <>
              <svg className="dropzone-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="dropzone-title">
                <strong>Drag & drop photos here</strong>
              </p>
              <p className="dropzone-subtitle">or click to browse your files</p>
              <div className="dropzone-specs">
                <div className="spec-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Up to {maxFiles} files</span>
                </div>
                <div className="spec-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13 2v7h7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Max {maxSizeMB}MB each</span>
                </div>
                <div className="spec-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
                    <path d="M21 15l-5-5L5 21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>JPG, PNG, GIF, WebP</span>
                </div>
              </div>
            </>
          )}
        </label>
      </div>

      {/* Error Message */}
      {error && (
        <div className="dropzone-error" role="alert">
          <div className="error-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" strokeWidth="2"/>
              <path d="M12 8v4M12 16h.01" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>{error}</span>
          </div>
          <button
            className="error-close"
            onClick={clearError}
            aria-label="Close error"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}