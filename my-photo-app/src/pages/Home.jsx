// ==================== IMPORTS ====================
// React hooks for managing component state and side effects
import { useState, useEffect } from "react";
// Router hook for programmatic navigation between pages
import { useNavigate } from "react-router-dom";
// Import our custom CSS styles for this page
import "../styles/Home.css";

/**
 * Home Component - Landing page / Homepage
 * 
 * This is the main entry point of the website featuring:
 * - Full-screen hero section with background image
 * - Service offerings showcase
 * - Featured photography portfolio preview
 * - Client testimonials
 * - Instagram feed integration
 * - Call-to-action sections
 * - Statistics/achievements counter
 * 
 * @returns {JSX.Element} Rendered Home page component
 */
export default function Home() {
  // ==================== HOOKS ====================
  
  /**
   * useNavigate hook - allows programmatic navigation to other pages
   * Example: navigate('/about') will take user to the About page
   */
  const navigate = useNavigate();
  
  /**
   * isLoaded state - tracks if page has finished loading
   * Used to trigger entrance animations for smooth visual experience
   * Initial value: false (page hasn't loaded yet)
   */
  const [isLoaded, setIsLoaded] = useState(false);
  
  /**
   * activeTestimonial state - tracks which testimonial is currently displayed
   * Used for the testimonial carousel/slider
   * Initial value: 0 (shows first testimonial)
   */
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  /**
   * stats state - animated counter values for statistics section
   * Tracks current count for each statistic as it animates
   * Initial values: all start at 0
   */
  const [stats, setStats] = useState({
    projects: 0,      // Completed photography projects
    clients: 0,       // Happy clients served
    awards: 0,        // Awards and recognitions received
    experience: 0,    // Years of professional experience
  });

  // ==================== EFFECTS ====================
  
  /**
   * useEffect - Triggers page load animation
   * Runs once when component first mounts
   * 
   * Sets isLoaded to true after small delay, which triggers CSS animations
   * via the .loaded class being added to the page container
   * 
   * The empty dependency array [] means this only runs once on mount
   */
  useEffect(() => {
    // Small 100ms delay ensures smooth animation trigger
    setTimeout(() => {
      setIsLoaded(true); // Page is now loaded, trigger animations
    }, 100);
  }, []); // Empty array = run once on mount

  /**
   * useEffect - Scroll to top when page loads
   * 
   * When user navigates to Home page, this ensures they start
   * at the top of the page (not scrolled down from previous page)
   */
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to x=0, y=0 (top-left corner)
  }, []); // Empty array = run once on mount

  /**
   * useEffect - Animated statistics counter
   * 
   * Animates the statistics numbers from 0 to their target values
   * Creates a smooth counting effect over 2 seconds
   * Only runs when isLoaded becomes true
   */
  useEffect(() => {
    // Only run animation if page is loaded
    if (isLoaded) {
      // Target values for each statistic
      const targetStats = {
        projects: 500,    // Target: 500 projects
        clients: 350,     // Target: 350 clients
        awards: 25,       // Target: 25 awards
        experience: 10,   // Target: 10 years
      };

      // Animation duration in milliseconds (2 seconds)
      const duration = 2000;
      // How often to update the counter (every 20ms = 50 times per second)
      const increment = 20;
      // How many steps in the animation (2000ms / 20ms = 100 steps)
      const steps = duration / increment;

      /**
       * setInterval - Runs counter update function repeatedly
       * Updates stats every 20ms until target values are reached
       */
      const timer = setInterval(() => {
        // Update each stat by incrementing toward target
        setStats((prevStats) => {
          // Create new stats object (don't mutate previous state)
          const newStats = { ...prevStats };
          // Flag to track if all stats have reached their targets
          let allComplete = true;

          // Loop through each statistic and increment it
          Object.keys(targetStats).forEach((key) => {
            // If current value is less than target, increment it
            if (newStats[key] < targetStats[key]) {
              // Calculate increment amount (target / total steps)
              newStats[key] = Math.min(
                newStats[key] + Math.ceil(targetStats[key] / steps),
                targetStats[key]
              );
              allComplete = false; // Still animating
            }
          });

          // If all stats reached target, stop the animation
          if (allComplete) {
            clearInterval(timer); // Stop the interval
          }

          return newStats; // Return updated stats
        });
      }, increment); // Run every 20ms

      // Cleanup function - stops timer when component unmounts
      return () => clearInterval(timer);
    }
  }, [isLoaded]); // Run when isLoaded changes to true

  /**
   * useEffect - Auto-rotate testimonials
   * 
   * Automatically changes testimonial every 5 seconds
   * Creates a carousel effect without user interaction
   * Only runs when page is loaded
   */
  useEffect(() => {
    if (isLoaded) {
      // Set up interval to change testimonial every 5 seconds
      const interval = setInterval(() => {
        // Move to next testimonial, or loop back to first
        setActiveTestimonial((prev) => 
          // If at last testimonial, go to 0, otherwise increment
          prev === testimonials.length - 1 ? 0 : prev + 1
        );
      }, 5000); // 5000ms = 5 seconds

      // Cleanup function - stops interval when component unmounts
      return () => clearInterval(interval);
    }
  }, [isLoaded]); // Run when isLoaded changes

  // ==================== DATA ====================
  
  /**
   * services - Array of photography services offered
   * Each service has icon, title, description, and associated features
   * Displayed in the services section as feature cards
   */
  const services = [
    {
      icon: "🏔️",                          // Emoji icon for visual interest
      title: "Landscape Photography",      // Service name
      description: "Capturing the breathtaking beauty of God's creation, from majestic mountains to serene seascapes.", // Service description
      features: [                          // List of specific features
        "National Parks & Wilderness",
        "Golden Hour Sessions",
        "Aerial Drone Photography",
        "Fine Art Prints Available",
      ],
    },
    {
      icon: "👥",
      title: "Portrait & Family",
      description: "Creating timeless portraits that capture the authentic personality and emotion of individuals and families.",
      features: [
        "Individual & Family Sessions",
        "Studio or Outdoor Settings",
        "Professional Retouching",
        "Digital & Print Packages",
      ],
    },
    {
      icon: "💍",
      title: "Wedding Photography",
      description: "Documenting your special day with artistry and authenticity, preserving memories that last forever.",
      features: [
        "Full Day Coverage",
        "Engagement Sessions",
        "Second Shooter Available",
        "Custom Wedding Albums",
      ],
    },
    {
      icon: "🎉",
      title: "Event Photography",
      description: "Professional coverage of corporate events, celebrations, and special occasions with attention to detail.",
      features: [
        "Corporate Events",
        "Parties & Celebrations",
        "Live Action Shots",
        "Fast Turnaround Time",
      ],
    },
  ];

  /**
   * featuredWork - Array of featured photography portfolio items
   * Showcases best work with images, titles, and categories
   * Displayed in the portfolio preview section
   */
  const featuredWork = [
    {
      id: 1,                                      // Unique identifier
      image: "/images/gallery/landscape-1.jpg",   // Path to image file
      title: "Mountain Majesty",                  // Photo title
      category: "Landscape",                      // Photo category/type
      description: "Sunrise over the Rocky Mountains", // Brief description
    },
    {
      id: 2,
      image: "/images/gallery/portrait-1.jpg",
      title: "Golden Hour",
      category: "Portrait",
      description: "Natural light portrait session",
    },
    {
      id: 3,
      image: "/images/gallery/wedding-1.jpg",
      title: "Forever Begins",
      category: "Wedding",
      description: "Intimate wedding ceremony",
    },
    {
      id: 4,
      image: "/images/gallery/nature-1.jpg",
      title: "Autumn Serenity",
      category: "Nature",
      description: "Fall colors in New England",
    },
    {
      id: 5,
      image: "/images/gallery/event-1.jpg",
      title: "Corporate Excellence",
      category: "Event",
      description: "Annual company gala",
    },
    {
      id: 6,
      image: "/images/gallery/landscape-2.jpg",
      title: "Coastal Dreams",
      category: "Landscape",
      description: "Pacific Coast sunset",
    },
  ];

  /**
   * testimonials - Array of client testimonials/reviews
   * Each testimonial includes quote, client name, and type of service
   * Displayed in a rotating carousel with auto-play
   */
  const testimonials = [
    {
      id: 1,                              // Unique identifier
      quote: "Elena captured our wedding day with such artistry and grace. Every photo tells a story and brings back the emotions of that special day.", // Client's testimonial text
      author: "Sarah & Michael Thompson", // Client name(s)
      service: "Wedding Photography",     // Type of service they used
      rating: 5,                          // Star rating (out of 5)
    },
    {
      id: 2,
      quote: "Her landscape photography is absolutely stunning. Elena has an incredible eye for composition and light. Our family room has never looked better!",
      author: "Jennifer Martinez",
      service: "Landscape Photography",
      rating: 5,
    },
    {
      id: 3,
      quote: "We hired Elena for our family portraits and couldn't be happier. She made everyone feel comfortable and captured our family's personality perfectly.",
      author: "David Chen",
      service: "Family Portrait",
      rating: 5,
    },
    {
      id: 4,
      quote: "Professional, creative, and so easy to work with. Elena photographed our corporate event and delivered exceptional results. Highly recommended!",
      author: "Amanda Wilson, Tech Corp",
      service: "Event Photography",
      rating: 5,
    },
  ];

  // ==================== EVENT HANDLERS ====================
  
  /**
   * Handler: Navigate to services/about page
   * Called when user clicks "View All Services" button
   */
  const handleServicesClick = () => {
    navigate("/about"); // Navigate to About page which has services info
  };

  /**
   * Handler: Navigate to gallery page
   * Called when user clicks "View Full Portfolio" or image thumbnails
   */
  const handleGalleryClick = () => {
    navigate("/gallery"); // Navigate to Gallery page
  };

  /**
   * Handler: Navigate to contact page
   * Called when user clicks any "Book a Session" or "Contact" buttons
   */
  const handleContactClick = () => {
    navigate("/contact"); // Navigate to Contact page
  };

  /**
   * Handler: Change active testimonial
   * Called when user clicks testimonial navigation dots
   * @param {number} index - Index of testimonial to show
   */
  const handleTestimonialChange = (index) => {
    setActiveTestimonial(index); // Update active testimonial state
  };

  // ==================== RENDER ====================
  
  return (
    // Main page container - gets 'loaded' class when ready for animations
    <div className={`home-page ${isLoaded ? "loaded" : ""}`}>
      
      {/* ==================== HERO SECTION ==================== */}
      {/* Full-screen banner with large background image and main message */}
      <section className="hero-section">
        {/* Background image container */}
        <div className="hero-background">
          <img
            // ✅ Hero background image - full-screen landscape photo
            // This should be a high-quality, inspiring landscape or portrait
            src="/images/hero/home-hero.jpg"
            alt="Elena Ramsey Photography - Capturing Life's Beautiful Moments"
            className="hero-bg-image"
            loading="eager" // Load immediately (not lazy) since it's first thing users see
            // Fallback image handling if main image fails to load
            onError={(e) => {
              // Try alternative file names if primary doesn't exist
              const fallbacks = [
                '/images/hero/hero.jpg',
                '/images/hero/main.jpg',
                '/images/hero/about-hero.jpg' // Use about hero as fallback
              ];
              const currentSrc = e.target.src;
              const nextFallback = fallbacks.find(src => !currentSrc.includes(src));
              if (nextFallback) {
                e.target.src = nextFallback; // Switch to fallback image
              }
            }}
          />
          {/* Dark gradient overlay - improves text readability over image */}
          <div className="hero-overlay"></div>
        </div>

        {/* Hero content - text and buttons overlaid on image */}
        <div className="hero-content">
          {/* Small label above main heading */}
          <span className="hero-label">Elena Ramsey Photography</span>
          
          {/* Main headline - largest text on page */}
          <h1 className="hero-title">
            Capturing Life's<br />Beautiful Moments
          </h1>
          
          {/* Subheading - supporting text under main title */}
          <p className="hero-subtitle">
            Professional photography services specializing in landscapes, portraits,
            and events. Creating timeless images that tell your unique story.
          </p>

          {/* Call-to-action buttons */}
          <div className="hero-buttons">
            {/* Primary button - main action we want users to take */}
            <button 
              className="btn-hero-primary"
              onClick={handleContactClick}
              aria-label="Book a photography session with Elena"
            >
              <span>Book a Session</span>
              {/* Right arrow icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Secondary button - alternative action */}
            <button 
              className="btn-hero-secondary"
              onClick={handleGalleryClick}
              aria-label="View Elena's photography portfolio"
            >
              <span>View Portfolio</span>
            </button>
          </div>

          {/* Scroll indicator - bouncing arrow pointing down */}
          <div className="scroll-indicator">
            <span>Scroll to explore</span>
            {/* Down arrow icon with bounce animation */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 5v14M5 12l7 7 7-7" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </section>

      {/* ==================== STATISTICS SECTION ==================== */}
      {/* Animated counters showing achievements and experience */}
      <section className="stats-section">
        <div className="stats-container">
          {/* Individual stat - Projects completed */}
          <div className="stat-item">
            {/* Large animated number */}
            <div className="stat-number">{stats.projects}+</div>
            {/* Label below number */}
            <div className="stat-label">Projects Completed</div>
          </div>

          {/* Individual stat - Happy clients */}
          <div className="stat-item">
            <div className="stat-number">{stats.clients}+</div>
            <div className="stat-label">Happy Clients</div>
          </div>

          {/* Individual stat - Awards won */}
          <div className="stat-item">
            <div className="stat-number">{stats.awards}+</div>
            <div className="stat-label">Awards Won</div>
          </div>

          {/* Individual stat - Years of experience */}
          <div className="stat-item">
            <div className="stat-number">{stats.experience}+</div>
            <div className="stat-label">Years Experience</div>
          </div>
        </div>
      </section>

      {/* ==================== SERVICES SECTION ==================== */}
      {/* Showcase of photography services offered */}
      <section className="services-section">
        {/* Section header */}
        <div className="section-header">
          <span className="section-label">Services</span>
          <h2 className="section-title">What I Offer</h2>
          <p className="section-description">
            Professional photography services tailored to capture your most precious moments
            and showcase the beauty of God's creation.
          </p>
        </div>

        {/* Grid of service cards */}
        <div className="services-grid">
          {/* Map through services array to create service cards */}
          {services.map((service, index) => (
            // Individual service card
            <div 
              key={index}
              className="service-card"
              // Staggered animation delay for smooth entrance
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Service icon - large emoji at top */}
              <div className="service-icon">{service.icon}</div>
              
              {/* Service title */}
              <h3 className="service-title">{service.title}</h3>
              
              {/* Service description paragraph */}
              <p className="service-description">{service.description}</p>
              
              {/* List of service features */}
              <ul className="service-features">
                {/* Map through features array for this service */}
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>
                    {/* Checkmark icon before each feature */}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              {/* Learn more button */}
              <button 
                className="btn-service"
                onClick={handleContactClick}
                aria-label={`Learn more about ${service.title}`}
              >
                Learn More
              </button>
            </div>
          ))}
        </div>

        {/* View all services button centered below cards */}
        <div className="section-cta">
          <button 
            className="btn-view-all"
            onClick={handleServicesClick}
            aria-label="View all photography services"
          >
            View All Services
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </section>

      {/* ==================== FEATURED WORK SECTION ==================== */}
      {/* Portfolio preview with best photography samples */}
      <section className="featured-section">
        {/* Section header */}
        <div className="section-header">
          <span className="section-label">Portfolio</span>
          <h2 className="section-title">Featured Work</h2>
          <p className="section-description">
            A curated selection of my favorite photographs showcasing various
            styles and subjects.
          </p>
        </div>

        {/* Masonry grid of portfolio images */}
        <div className="featured-grid">
          {/* Map through featuredWork array to create image cards */}
          {featuredWork.map((work, index) => (
            // Individual portfolio item card
            <div
              key={work.id}
              className="featured-item"
              // Staggered animation delay
              style={{ animationDelay: `${index * 80}ms` }}
              // Click handler to navigate to full gallery
              onClick={handleGalleryClick}
              // Accessibility: make clickable and keyboard accessible
              role="button"
              tabIndex={0}
              // Handle Enter key press for keyboard navigation
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleGalleryClick();
                }
              }}
            >
              {/* Image container with aspect ratio preservation */}
              <div className="featured-image-wrapper">
                <img
                  src={work.image}
                  alt={work.title}
                  className="featured-image"
                  loading="lazy" // Lazy load images below the fold
                  // Fallback to placeholder if image doesn't exist
                  onError={(e) => {
                    e.target.src = '/images/gallery/placeholder.jpg';
                  }}
                />
                {/* Hover overlay with details */}
                <div className="featured-overlay">
                  {/* Category badge */}
                  <span className="featured-category">{work.category}</span>
                  {/* Photo title */}
                  <h3 className="featured-title">{work.title}</h3>
                  {/* Photo description */}
                  <p className="featured-description">{work.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View full portfolio button */}
        <div className="section-cta">
          <button 
            className="btn-view-all"
            onClick={handleGalleryClick}
            aria-label="View full photography portfolio"
          >
            View Full Portfolio
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </section>

      {/* ==================== TESTIMONIALS SECTION ==================== */}
      {/* Client reviews and feedback carousel */}
      <section className="testimonials-section">
        {/* Section header */}
        <div className="section-header">
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">What Clients Say</h2>
          <p className="section-description">
            Don't just take my word for it - hear from some of my amazing clients.
          </p>
        </div>

        {/* Testimonial carousel container */}
        <div className="testimonials-container">
          {/* Individual testimonial - only active one is visible */}
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              // Show only active testimonial, hide others
              className={`testimonial-item ${
                index === activeTestimonial ? "active" : ""
              }`}
            >
              {/* Star rating display */}
              <div className="testimonial-rating">
                {/* Create array of 5 stars, fill based on rating */}
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    // Fill star if index is less than rating
                    fill={i < testimonial.rating ? "currentColor" : "none"}
                    stroke="currentColor"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>

              {/* Quote icon - decorative */}
              <svg className="quote-icon" width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
              </svg>

              {/* Testimonial quote text */}
              <p className="testimonial-quote">"{testimonial.quote}"</p>

              {/* Client information */}
              <div className="testimonial-author">
                {/* Client name */}
                <div className="author-name">{testimonial.author}</div>
                {/* Service type they used */}
                <div className="author-service">{testimonial.service}</div>
              </div>
            </div>
          ))}

          {/* Navigation dots for testimonials */}
          <div className="testimonial-dots">
            {/* Create dot for each testimonial */}
            {testimonials.map((_, index) => (
              <button
                key={index}
                // Highlight active dot
                className={`dot ${index === activeTestimonial ? "active" : ""}`}
                onClick={() => handleTestimonialChange(index)}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      {/* Final call-to-action encouraging users to book */}
      <section className="cta-section">
        <div className="cta-content">
          {/* Large heading */}
          <h2 className="cta-title">Ready to Capture Your Story?</h2>
          
          {/* Description paragraph */}
          <p className="cta-description">
            Let's work together to create beautiful, timeless photographs that you'll
            treasure forever. Whether it's a special event, family portrait, or
            breathtaking landscape, I'm here to bring your vision to life.
          </p>

          {/* Action buttons */}
          <div className="cta-buttons">
            {/* Primary CTA button */}
            <button 
              className="btn-cta-primary"
              onClick={handleContactClick}
              aria-label="Get in touch with Elena for photography services"
            >
              Get In Touch
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Secondary button - view services */}
            <button 
              className="btn-cta-secondary"
              onClick={handleServicesClick}
              aria-label="View all photography services"
            >
              View Services
            </button>
          </div>

          {/* Contact information badges */}
          <div className="cta-info">
            {/* Phone badge */}
            <div className="info-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" strokeWidth="2"/>
              </svg>
              <span>(555) 123-4567</span>
            </div>

            {/* Email badge */}
            <div className="info-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeWidth="2"/>
                <path d="M22 6l-10 7L2 6" strokeWidth="2"/>
              </svg>
              <span>elena@elenaramsey.com</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}