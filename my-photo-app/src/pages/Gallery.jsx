import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import '../styles/Gallery.css';

/**
 * Gallery Component - Image portfolio with filtering and lightbox
 * Features: Category filtering, masonry grid, lightbox modal, lazy loading
 */

// Mock gallery data - Replace with actual images
const galleryImages = [
  // Landscape
  { id: 1, src: '/images/gallery/garden.jpeg', category: 'landscape', title: 'Denver Botanical Garden', alt: 'Denver Botanical Garden' },
  { id: 2, src: '/images/gallery/miami_sunset.jpeg', category: 'landscape', title: 'Ocean Sunset', alt: 'Stunning ocean sunset view' },
  { id: 3, src: '/images/gallery/mountain_lake.jpeg', category: 'landscape', title: 'Remote lake in Colorado mountains', alt: 'Remote lake in Colorado mountains' },
  { id: 4, src: '/images/gallery/sunrise_red.jpeg', category: 'landscape', title: 'Red sunrise from my appartment', alt: 'Red sunrise from my appartment' },
  //{ id: 5, src: '/images/gallery/landscape-5.jpeg', category: 'landscape', title: 'Northern Lights', alt: 'Aurora borealis over mountains' },
  
  // Portrait
  // { id: 7, src: '/images/gallery/portrait-1.jpg', category: 'portrait', title: 'Natural Beauty', alt: 'Natural light portrait' },
  // { id: 8, src: '/images/gallery/portrait-2.jpg', category: 'portrait', title: 'Studio Session', alt: 'Professional studio portrait' },
  // { id: 9, src: '/images/gallery/portrait-3.jpg', category: 'portrait', title: 'Family Moments', alt: 'Family portrait session' },
  // { id: 10, src: '/images/gallery/portrait-4.jpg', category: 'portrait', title: 'Senior Photos', alt: 'High school senior portraits' },
  // { id: 11, src: '/images/gallery/portrait-5.jpg', category: 'portrait', title: 'Headshots', alt: 'Professional business headshots' },
  // { id: 12, src: '/images/gallery/portrait-6.jpg', category: 'portrait', title: 'Maternity', alt: 'Beautiful maternity portraits' },
  
  // Wedding
  // { id: 13, src: '/images/gallery/wedding-1.jpg', category: 'wedding', title: 'First Dance', alt: 'Wedding first dance moment' },
  // { id: 14, src: '/images/gallery/wedding-2.jpg', category: 'wedding', title: 'Ceremony', alt: 'Wedding ceremony photography' },
  // { id: 15, src: '/images/gallery/wedding-3.jpg', category: 'wedding', title: 'Details', alt: 'Wedding detail shots' },
  // { id: 16, src: '/images/gallery/wedding-4.jpg', category: 'wedding', title: 'Reception', alt: 'Wedding reception celebration' },
  // { id: 17, src: '/images/gallery/wedding-5.jpg', category: 'wedding', title: 'Portraits', alt: 'Bride and groom portraits' },
  // { id: 18, src: '/images/gallery/wedding-6.jpg', category: 'wedding', title: 'Celebration', alt: 'Wedding celebration moments' },
  
  // Other
  { id: 19, src: '/images/gallery/11_14_25.jpeg', category: 'other', title: 'Note in the sand', alt: 'Note in the sand' },
  { id: 20, src: '/images/gallery/Bible_and_sunrise.jpeg', category: 'other', title: 'Bible and sunrise', alt: 'Bible and sunrise' },
  { id: 21, src: '/images/gallery/cokes.jpeg', category: 'other', title: 'Cokes', alt: 'Cokes' },
  { id: 22, src: '/images/gallery/hands_and_rose.jpeg', category: 'other', title: 'Hands and Rose', alt: 'Hands and Rose' },
  { id: 23, src: '/images/gallery/night_lights.jpeg', category: 'other', title: 'Night lights', alt: 'Night lights' },
  { id: 24, src: '/images/gallery/tacos_and_pretty.jpeg', category: 'other', title: 'Feed me tacos and tell me I\'m pretty', alt: 'Feed me tacos and tell me I\'m pretty' },
];

const categories = [
  { id: 'all', label: 'All Photos', count: galleryImages.length },
  { id: 'landscape', label: 'Landscapes', count: galleryImages.filter(img => img.category === 'landscape').length },
  { id: 'portrait', label: 'Portraits', count: galleryImages.filter(img => img.category === 'portrait').length },
  { id: 'wedding', label: 'Weddings', count: galleryImages.filter(img => img.category === 'wedding').length },
  { id: 'other', label: 'Other', count: galleryImages.filter(img => img.category === 'other').length },
];

export default function Gallery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState({});

  const filteredImages = activeCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const category = searchParams.get('category');
    if (category && categories.find(cat => cat.id === category)) {
      setActiveCategory(category);
    }
  }, [searchParams]);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    if (categoryId === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: categoryId });
    }
  };

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  const handleKeyDown = (e) => {
    if (!lightboxOpen) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') goToNext();
    if (e.key === 'ArrowLeft') goToPrevious();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, currentImageIndex]);

  const handleImageLoad = (imageId) => {
    setImagesLoaded(prev => ({ ...prev, [imageId]: true }));
  };

  return (
    <div className="gallery-page">
      {/* Hero Section */}
      <section className="gallery-hero">
        <div className="gallery-hero-content">
          <p className="gallery-hero-subtitle">Portfolio</p>
          <h1 className="gallery-hero-title">My Work</h1>
          <p className="gallery-hero-description">
            A curated collection of my favorite captures across landscapes, portraits, 
            weddings, and events. Each image tells a unique story.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="gallery-filter">
        <div className="gallery-filter-container">
          <div className="filter-buttons">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category.id)}
              >
                <span className="filter-label">{category.label}</span>
                <span className="filter-count">{category.count}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="gallery-grid-section">
        <div className="gallery-grid-container">
          <div className="gallery-grid">
            {filteredImages.map((image, index) => (
              <div 
                key={image.id} 
                className={`gallery-item ${imagesLoaded[image.id] ? 'loaded' : 'loading'}`}
                onClick={() => openLightbox(index)}
              >
                <div className="gallery-item-inner">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    loading="lazy"
                    onLoad={() => handleImageLoad(image.id)}
                  />
                  <div className="gallery-item-overlay">
                    <div className="gallery-item-content">
                      <h3 className="gallery-item-title">{image.title}</h3>
                      <span className="gallery-item-category">
                        {categories.find(cat => cat.id === image.category)?.label}
                      </span>
                    </div>
                    <div className="gallery-item-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="gallery-empty">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth="2"/>
                <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="2"/>
                <path d="M21 15l-5-5L5 21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3>No images found</h3>
              <p>Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button className="lightbox-close" onClick={closeLightbox} aria-label="Close lightbox">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Previous Button */}
            <button 
              className="lightbox-nav lightbox-prev" 
              onClick={goToPrevious}
              aria-label="Previous image"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Image */}
            <div className="lightbox-image-container">
              <img 
                src={filteredImages[currentImageIndex]?.src} 
                alt={filteredImages[currentImageIndex]?.alt}
                className="lightbox-image"
              />
            </div>

            {/* Next Button */}
            <button 
              className="lightbox-nav lightbox-next" 
              onClick={goToNext}
              aria-label="Next image"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 18l6-6-6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Image Info */}
            <div className="lightbox-info">
              <h3 className="lightbox-title">{filteredImages[currentImageIndex]?.title}</h3>
              <p className="lightbox-counter">
                {currentImageIndex + 1} / {filteredImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}