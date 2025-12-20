// ==================== IMPORTS ====================
// React hooks for component state and side effects
import { useState, useEffect, useCallback, useRef } from "react";

// Import CSS styles for this page
import "../styles/Gallery.css";

// Import loading skeleton component
import LoadingSkeleton from '../components/LoadingSkeleton';
import '../styles/LoadingSkeleton.css';

// Import blur-up image component
import BlurImage from '../components/BlurImage';
import '../styles/BlurImage.css';

// Import scroll animation hooks
import { useScrollAnimation, useStaggeredAnimation } from '../hooks/useScrollAnimation';

/**
 * Gallery Component - Photo portfolio page with filtering and lightbox
 * 
 * Features:
 * - Category-based filtering with smooth transitions
 * - Masonry grid layout with responsive design
 * - Lightbox modal for full-size viewing with details
 * - Image navigation (previous/next) with keyboard support
 * - Blur-up progressive image loading
 * - Scroll-triggered animations and parallax effects
 * - Loading skeletons for better perceived performance
 * - Toast notifications for user feedback
 * - Accessibility features (ARIA labels, keyboard navigation)
 * 
 * @param {Object} props - Component props
 * @param {Function} props.showSuccessToast - Show success notification
 * @param {Function} props.showErrorToast - Show error notification
 * @param {Function} props.showInfoToast - Show info notification
 * @returns {JSX.Element} Gallery page component
 */
export default function Gallery({ showSuccessToast, showErrorToast, showInfoToast }) {
  // ==================== STATE MANAGEMENT ====================
  
  /**
   * isLoaded state - tracks page load status
   * Used to trigger entrance animations after component mounts
   */
  const [isLoaded, setIsLoaded] = useState(false);

  /**
   * isLoading state - tracks data fetching
   * Shows loading skeletons while images are being fetched
   */
  const [isLoading, setIsLoading] = useState(true);

  /**
   * activeCategory state - currently selected filter
   * Controls which photos are displayed in the gallery
   */
  const [activeCategory, setActiveCategory] = useState("all");

  /**
   * selectedImage state - currently viewed image in lightbox
   * null when lightbox is closed, contains image object when open
   */
  const [selectedImage, setSelectedImage] = useState(null);

  /**
   * isLightboxOpen state - lightbox visibility
   * Controls modal open/close state with animation
   */
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  /**
   * scrollY state - current scroll position
   * Used for parallax effects on hero section
   */
  const [scrollY, setScrollY] = useState(0);

  // Ref for lightbox container (for click outside detection)
  const lightboxRef = useRef(null);

  // ==================== SCROLL ANIMATION HOOKS ====================
  
  /**
   * Scroll animations for different sections
   * Trigger animations when elements enter viewport
   */
  const heroAnimation = useScrollAnimation({ threshold: 0.2 });
  const filtersAnimation = useScrollAnimation({ threshold: 0.3 });
  
  /**
   * Staggered animation hook for gallery items
   * Each item animates with a 50ms delay from the previous
   */
  const { getStyle } = useStaggeredAnimation(50);

  // ==================== DATA ====================
  
  /**
   * categories - Array of filter options
   * Defines available gallery categories with counts
   */
  const categories = [
    { id: "all", label: "All Photos", count: 24 },
    { id: "landscape", label: "Landscapes", count: 8 },
    { id: "portrait", label: "Portraits", count: 6 },
    { id: "wedding", label: "Weddings", count: 5 },
    { id: "event", label: "Events", count: 5 },
  ];

  /**
   * galleryImages - Array of all portfolio images
   * 
   * TODO: Replace with API call to fetch images from backend
   * Example API endpoint: GET /api/gallery/images
   * 
   * Each image object contains:
   * - id: Unique identifier
   * - category: Category for filtering
   * - title: Image title
   * - description: Detailed description
   * - image: Full-resolution image URL
   * - thumbnail: Low-resolution thumbnail for blur-up loading
   * - location: Where photo was taken
   * - camera: Camera model used
   * - lens: Lens used
   * - settings: Camera settings (aperture, shutter, ISO)
   */
  const galleryImages = [
    // ==================== LANDSCAPE PHOTOGRAPHY ====================
    {
      id: 1,
      category: "landscape",
      title: "Mountain Sunrise",
      description: "Golden hour light painting the peaks of Mount Hood",
      image: "/images/gallery/landscape-01.jpg",
      thumbnail: "/images/gallery/thumbs/landscape-01.jpg",
      location: "Mount Hood, Oregon",
      camera: "Canon EOS R5",
      lens: "RF 24-70mm f/2.8",
      settings: "f/8, 1/250s, ISO 100",
    },
    {
      id: 2,
      category: "landscape",
      title: "Coastal Sunset",
      description: "Dramatic waves crashing against the rocky Oregon coast",
      image: "/images/gallery/landscape-02.jpg",
      thumbnail: "/images/gallery/thumbs/landscape-02.jpg",
      location: "Cannon Beach, Oregon",
      camera: "Canon EOS R5",
      lens: "RF 15-35mm f/2.8",
      settings: "f/11, 1/60s, ISO 200",
    },
    {
      id: 3,
      category: "landscape",
      title: "Forest Cathedral",
      description: "Ancient trees reaching toward filtered sunlight",
      image: "/images/gallery/landscape-03.jpg",
      thumbnail: "/images/gallery/thumbs/landscape-03.jpg",
      location: "Columbia River Gorge",
      camera: "Canon EOS R5",
      lens: "RF 24-105mm f/4",
      settings: "f/5.6, 1/125s, ISO 400",
    },
    {
      id: 4,
      category: "landscape",
      title: "Desert Dreams",
      description: "Sand dunes creating natural abstract patterns",
      image: "/images/gallery/landscape-04.jpg",
      thumbnail: "/images/gallery/thumbs/landscape-04.jpg",
      location: "Great Sand Dunes, Colorado",
      camera: "Canon EOS R5",
      lens: "RF 70-200mm f/2.8",
      settings: "f/11, 1/500s, ISO 100",
    },
    {
      id: 5,
      category: "landscape",
      title: "Alpine Reflection",
      description: "Mirror-like lake reflecting snow-capped peaks",
      image: "/images/gallery/landscape-05.jpg",
      thumbnail: "/images/gallery/thumbs/landscape-05.jpg",
      location: "Trillium Lake, Oregon",
      camera: "Canon EOS R5",
      lens: "RF 24-70mm f/2.8",
      settings: "f/11, 1/125s, ISO 200",
    },
    {
      id: 6,
      category: "landscape",
      title: "Waterfall Wonder",
      description: "Multnomah Falls in its full spring glory",
      image: "/images/gallery/landscape-06.jpg",
      thumbnail: "/images/gallery/thumbs/landscape-06.jpg",
      location: "Multnomah Falls, Oregon",
      camera: "Canon EOS R5",
      lens: "RF 15-35mm f/2.8",
      settings: "f/16, 2s, ISO 100",
    },
    {
      id: 7,
      category: "landscape",
      title: "Autumn Gold",
      description: "Fall colors painting the Columbia River Gorge",
      image: "/images/gallery/landscape-07.jpg",
      thumbnail: "/images/gallery/thumbs/landscape-07.jpg",
      location: "Columbia River Gorge",
      camera: "Canon EOS R5",
      lens: "RF 24-105mm f/4",
      settings: "f/8, 1/250s, ISO 200",
    },
    {
      id: 8,
      category: "landscape",
      title: "Starry Night",
      description: "Milky Way over Crater Lake",
      image: "/images/gallery/landscape-08.jpg",
      thumbnail: "/images/gallery/thumbs/landscape-08.jpg",
      location: "Crater Lake, Oregon",
      camera: "Canon EOS R5",
      lens: "RF 15-35mm f/2.8",
      settings: "f/2.8, 20s, ISO 3200",
    },

    // ==================== PORTRAIT PHOTOGRAPHY ====================
    {
      id: 9,
      category: "portrait",
      title: "Natural Light Portrait",
      description: "Capturing authentic moments in golden hour",
      image: "/images/gallery/portrait-01.jpg",
      thumbnail: "/images/gallery/thumbs/portrait-01.jpg",
      location: "Portland, Oregon",
      camera: "Canon EOS R5",
      lens: "RF 85mm f/1.2",
      settings: "f/1.8, 1/500s, ISO 100",
    },
    {
      id: 10,
      category: "portrait",
      title: "Family Moments",
      description: "Genuine connections and joyful interactions",
      image: "/images/gallery/portrait-02.jpg",
      thumbnail: "/images/gallery/thumbs/portrait-02.jpg",
      location: "Washington Park, Portland",
      camera: "Canon EOS R5",
      lens: "RF 50mm f/1.2",
      settings: "f/2.8, 1/320s, ISO 200",
    },
    {
      id: 11,
      category: "portrait",
      title: "Senior Portrait",
      description: "Celebrating graduation with style",
      image: "/images/gallery/portrait-03.jpg",
      thumbnail: "/images/gallery/thumbs/portrait-03.jpg",
      location: "Pearl District, Portland",
      camera: "Canon EOS R5",
      lens: "RF 85mm f/1.2",
      settings: "f/1.8, 1/640s, ISO 100",
    },
    {
      id: 12,
      category: "portrait",
      title: "Maternity Glow",
      description: "Celebrating the beauty of expectant mothers",
      image: "/images/gallery/portrait-04.jpg",
      thumbnail: "/images/gallery/thumbs/portrait-04.jpg",
      location: "Studio Session",
      camera: "Canon EOS R5",
      lens: "RF 50mm f/1.2",
      settings: "f/2.0, 1/250s, ISO 400",
    },
    {
      id: 13,
      category: "portrait",
      title: "Professional Headshot",
      description: "Corporate portraits with personality",
      image: "/images/gallery/portrait-05.jpg",
      thumbnail: "/images/gallery/thumbs/portrait-05.jpg",
      location: "Studio Session",
      camera: "Canon EOS R5",
      lens: "RF 85mm f/1.2",
      settings: "f/2.8, 1/200s, ISO 200",
    },
    {
      id: 14,
      category: "portrait",
      title: "Couple's Session",
      description: "Love and connection captured naturally",
      image: "/images/gallery/portrait-06.jpg",
      thumbnail: "/images/gallery/thumbs/portrait-06.jpg",
      location: "Forest Park, Portland",
      camera: "Canon EOS R5",
      lens: "RF 50mm f/1.2",
      settings: "f/1.8, 1/400s, ISO 100",
    },

    // ==================== WEDDING PHOTOGRAPHY ====================
    {
      id: 15,
      category: "wedding",
      title: "First Look",
      description: "Emotional moment before the ceremony",
      image: "/images/gallery/wedding-01.jpg",
      thumbnail: "/images/gallery/thumbs/wedding-01.jpg",
      location: "The Allison Inn, Newberg",
      camera: "Canon EOS R5",
      lens: "RF 50mm f/1.2",
      settings: "f/2.0, 1/320s, ISO 400",
    },
    {
      id: 16,
      category: "wedding",
      title: "Ceremony Vows",
      description: "Promises exchanged under open sky",
      image: "/images/gallery/wedding-02.jpg",
      thumbnail: "/images/gallery/thumbs/wedding-02.jpg",
      location: "Vista Hills Vineyard",
      camera: "Canon EOS R5",
      lens: "RF 70-200mm f/2.8",
      settings: "f/2.8, 1/500s, ISO 200",
    },
    {
      id: 17,
      category: "wedding",
      title: "Reception Dance",
      description: "Celebration and joy on the dance floor",
      image: "/images/gallery/wedding-03.jpg",
      thumbnail: "/images/gallery/thumbs/wedding-03.jpg",
      location: "The Sentinel Hotel",
      camera: "Canon EOS R5",
      lens: "RF 24-70mm f/2.8",
      settings: "f/2.8, 1/200s, ISO 1600",
    },
    {
      id: 18,
      category: "wedding",
      title: "Golden Hour Portraits",
      description: "Newlyweds bathed in sunset light",
      image: "/images/gallery/wedding-04.jpg",
      thumbnail: "/images/gallery/thumbs/wedding-04.jpg",
      location: "Ponzi Vineyards",
      camera: "Canon EOS R5",
      lens: "RF 85mm f/1.2",
      settings: "f/1.8, 1/640s, ISO 100",
    },
    {
      id: 19,
      category: "wedding",
      title: "Detail Shots",
      description: "Beautiful wedding day details",
      image: "/images/gallery/wedding-05.jpg",
      thumbnail: "/images/gallery/thumbs/wedding-05.jpg",
      location: "The Nines Hotel",
      camera: "Canon EOS R5",
      lens: "RF 100mm f/2.8 Macro",
      settings: "f/4, 1/160s, ISO 400",
    },

    // ==================== EVENT PHOTOGRAPHY ====================
    {
      id: 20,
      category: "event",
      title: "Corporate Gala",
      description: "Professional event coverage",
      image: "/images/gallery/event-01.jpg",
      thumbnail: "/images/gallery/thumbs/event-01.jpg",
      location: "Portland Art Museum",
      camera: "Canon EOS R5",
      lens: "RF 24-70mm f/2.8",
      settings: "f/2.8, 1/250s, ISO 1600",
    },
    {
      id: 21,
      category: "event",
      title: "Birthday Celebration",
      description: "Milestone moments and happy faces",
      image: "/images/gallery/event-02.jpg",
      thumbnail: "/images/gallery/thumbs/event-02.jpg",
      location: "Private Residence",
      camera: "Canon EOS R5",
      lens: "RF 35mm f/1.8",
      settings: "f/2.8, 1/200s, ISO 800",
    },
    {
      id: 22,
      category: "event",
      title: "Concert Photography",
      description: "Capturing energy and performance",
      image: "/images/gallery/event-03.jpg",
      thumbnail: "/images/gallery/thumbs/event-03.jpg",
      location: "Crystal Ballroom",
      camera: "Canon EOS R5",
      lens: "RF 70-200mm f/2.8",
      settings: "f/2.8, 1/500s, ISO 3200",
    },
    {
      id: 23,
      category: "event",
      title: "Charity Fundraiser",
      description: "Community coming together for a cause",
      image: "/images/gallery/event-04.jpg",
      thumbnail: "/images/gallery/thumbs/event-04.jpg",
      location: "Governor Hotel",
      camera: "Canon EOS R5",
      lens: "RF 24-70mm f/2.8",
      settings: "f/2.8, 1/320s, ISO 1600",
    },
    {
      id: 24,
      category: "event",
      title: "Product Launch",
      description: "Corporate event and brand activation",
      image: "/images/gallery/event-05.jpg",
      thumbnail: "/images/gallery/thumbs/event-05.jpg",
      location: "The Hi-Lo Hotel",
      camera: "Canon EOS R5",
      lens: "RF 35mm f/1.8",
      settings: "f/2.0, 1/250s, ISO 800",
    },
  ];

  // ==================== COMPUTED VALUES ====================
  
  /**
   * filteredImages - Images matching active category
   * Filters gallery based on selected category
   */
  const filteredImages = activeCategory === "all" 
    ? galleryImages 
    : galleryImages.filter((img) => img.category === activeCategory);

  // Calculate parallax offset for hero section
  const parallaxOffset = scrollY * 0.5;

  // ==================== EFFECTS ====================
  
  // Initial load animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Load gallery images - FIXED: Only show toast once
  useEffect(() => {
    let isMounted = true;

    const loadTimer = setTimeout(() => {
      if (isMounted) {
        setIsLoading(false);
        // Only show toast if the function exists and component is mounted
        if (showInfoToast && typeof showInfoToast === 'function') {
          showInfoToast('Gallery loaded successfully');
        }
      }
    }, 1500);

    return () => {
      isMounted = false;
      clearTimeout(loadTimer);
    };
  }, []); // ✅ EMPTY DEPENDENCY ARRAY - only runs once on mount

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lightbox keyboard navigation
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e) => {
      switch (e.key) {
        case "Escape":
          closeLightbox();
          break;
        case "ArrowLeft":
          navigatePrevious();
          break;
        case "ArrowRight":
          navigateNext();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, selectedImage]); // ✅ Proper dependencies

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLightboxOpen]);

  // ==================== EVENT HANDLERS ====================
  
  /**
   * Handler: Change active category filter
   * Updates displayed images based on category selection
   * 
   * @param {string} categoryId - ID of selected category
   */
  const handleCategoryChange = useCallback((categoryId) => {
    setActiveCategory(categoryId);
    
    // Scroll to gallery grid
    const galleryGrid = document.querySelector('.gallery-grid');
    if (galleryGrid) {
      galleryGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Show info toast
    if (showInfoToast) {
      const category = categories.find(cat => cat.id === categoryId);
      if (category) {
        showInfoToast(`Showing ${category.label}`);
      }
    }
  }, [categories, showInfoToast]);

  /**
   * Handler: Open image in lightbox
   * Displays full-size image with details
   * 
   * @param {Object} image - Image object to display
   */
  const openLightbox = useCallback((image) => {
    setSelectedImage(image);
    setIsLightboxOpen(true);
  }, []);

  /**
   * Handler: Close lightbox
   * Returns to gallery grid view
   */
  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
    setTimeout(() => {
      setSelectedImage(null);
    }, 300); // Wait for exit animation
  }, []);

  /**
   * Handler: Navigate to previous image
   * Shows previous image in filtered images array
   */
  const navigatePrevious = useCallback(() => {
    if (!selectedImage) return;

    const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage.id);
    const previousIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    setSelectedImage(filteredImages[previousIndex]);
  }, [selectedImage, filteredImages]);

  /**
   * Handler: Navigate to next image
   * Shows next image in filtered images array
   */
  const navigateNext = useCallback(() => {
    if (!selectedImage) return;

    const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage.id);
    const nextIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    setSelectedImage(filteredImages[nextIndex]);
  }, [selectedImage, filteredImages]);

  /**
   * Handler: Click outside lightbox to close
   * Closes lightbox when clicking backdrop
   * 
   * @param {Event} e - Click event
   */
  const handleLightboxBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      closeLightbox();
    }
  }, [closeLightbox]);

  // ==================== RENDER ====================
  
  return (
    <div className={`gallery-page ${isLoaded ? "loaded" : ""}`}>
      
      {/* ==================== HERO SECTION WITH PARALLAX ==================== */}
      <section 
        className={`gallery-hero ${heroAnimation.isVisible ? 'animate-in' : ''}`}
        ref={heroAnimation.elementRef}
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      >
        <div className="hero-content">
          <span className="hero-label">Portfolio</span>
          <h1 className="hero-title">Photo Gallery</h1>
          <p className="hero-subtitle">
            Explore my collection of captured moments, from breathtaking landscapes
            to intimate portraits. Each image tells a unique story.
          </p>
        </div>
        
        {/* Decorative gradient overlay */}
        <div className="hero-gradient"></div>
      </section>

      {/* ==================== FILTERS SECTION WITH ANIMATION ==================== */}
      <section 
        className={`filters-section ${filtersAnimation.isVisible ? 'animate-in' : ''}`}
        ref={filtersAnimation.elementRef}
      >
        <div className="filters-container">
          <div className="filters-header">
            <h2 className="filters-title">Browse by Category</h2>
            <p className="filters-description">
              {filteredImages.length} {filteredImages.length === 1 ? 'photo' : 'photos'}
            </p>
          </div>

          <div className="filters-buttons">
            {categories.map((category, index) => (
              <button
                key={category.id}
                className={`filter-btn ${activeCategory === category.id ? "active" : ""}`}
                onClick={() => handleCategoryChange(category.id)}
                aria-label={`Filter by ${category.label}`}
                style={getStyle(index)}
              >
                <span className="filter-label">{category.label}</span>
                <span className="filter-count">{category.count}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== GALLERY GRID WITH BLUR-UP ==================== */}
      <section className="gallery-section">
        <div className="gallery-container">
          
          {/* Loading State - Show skeletons while images load */}
          {isLoading ? (
            <div className="gallery-grid">
              <LoadingSkeleton variant="gallery" count={12} />
            </div>
          ) : (
            /* Gallery Grid - Display filtered images */
            <div className="gallery-grid">
              {filteredImages.map((image, index) => (
                <GalleryItem
                  key={image.id}
                  image={image}
                  index={index}
                  onOpen={openLightbox}
                  style={getStyle(index)}
                />
              ))}
            </div>
          )}

          {/* Empty State - Show when no images match filter */}
          {!isLoading && filteredImages.length === 0 && (
            <div className="gallery-empty">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2"/>
                <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
                <path d="M21 15l-5-5L5 21" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <h3 className="empty-title">No photos found</h3>
              <p className="empty-description">
                Try selecting a different category to view more images.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ==================== LIGHTBOX MODAL ==================== */}
      {isLightboxOpen && selectedImage && (
        <div
          className={`lightbox ${isLightboxOpen ? "open" : ""}`}
          onClick={handleLightboxBackdropClick}
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          {/* Close button */}
          <button
            className="lightbox-close"
            onClick={closeLightbox}
            aria-label="Close image viewer"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Previous button */}
          <button
            className="lightbox-nav lightbox-prev"
            onClick={navigatePrevious}
            aria-label="Previous image"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Next button */}
          <button
            className="lightbox-nav lightbox-next"
            onClick={navigateNext}
            aria-label="Next image"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 18l6-6-6-6" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Lightbox content */}
          <div className="lightbox-content">
            {/* Main image */}
            <div className="lightbox-image-wrapper">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="lightbox-image"
                loading="eager"
              />
            </div>

            {/* Image details */}
            <div className="lightbox-details">
              <div className="lightbox-header">
                <span className="lightbox-category">{selectedImage.category}</span>
                <h2 className="lightbox-title">{selectedImage.title}</h2>
                <p className="lightbox-description">{selectedImage.description}</p>
              </div>

              <div className="lightbox-info">
                <div className="info-group">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" strokeWidth="2"/>
                    <circle cx="12" cy="10" r="3" strokeWidth="2"/>
                  </svg>
                  <span>{selectedImage.location}</span>
                </div>

                <div className="info-group">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" strokeWidth="2"/>
                    <circle cx="12" cy="13" r="4" strokeWidth="2"/>
                  </svg>
                  <span>{selectedImage.camera}</span>
                </div>

                <div className="info-group">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                    <path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span>{selectedImage.settings}</span>
                </div>
              </div>

              {/* Image counter */}
              <div className="lightbox-counter">
                <span>
                  {filteredImages.findIndex((img) => img.id === selectedImage.id) + 1} / {filteredImages.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

/**
 * GalleryItem Component - Individual gallery image with animations
 * 
 * Separate component for better performance and scroll animations
 * Uses BlurImage for progressive loading and intersection observer
 * 
 * @param {Object} props - Component props
 * @param {Object} props.image - Image data object
 * @param {number} props.index - Index for staggered animation
 * @param {Function} props.onOpen - Callback to open lightbox
 * @param {Object} props.style - Animation delay style
 * @returns {JSX.Element} Gallery item component
 */
function GalleryItem({ image, index, onOpen, style }) {
  // Scroll animation for this specific item
  const { elementRef, isVisible } = useScrollAnimation({ 
    threshold: 0.1,
    triggerOnce: true 
  });

  // Track hover state for enhanced interactions
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={elementRef}
      className={`gallery-item ${isVisible ? 'visible' : ''}`}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpen(image)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(image);
        }
      }}
    >
      <div className="gallery-image-wrapper">
        {/* Progressive blur-up image loading */}
        <BlurImage
          src={image.image}
          placeholder={image.thumbnail}
          alt={image.title}
          className="gallery-image"
        />

        {/* Enhanced overlay with gradient and content */}
        <div className={`gallery-overlay ${isHovered ? 'hovered' : ''}`}>
          <div className="overlay-gradient"></div>
          <div className="overlay-content">
            <span className="gallery-category">{image.category}</span>
            <h3 className="gallery-title">{image.title}</h3>
            <p className="gallery-description">{image.description}</p>
            
            {/* View full size button */}
            <button className="btn-view" aria-label={`View ${image.title}`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span>View Full Size</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}