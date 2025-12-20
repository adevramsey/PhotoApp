import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

/**
 * Home Component - Main landing page
 * Features: Hero section, stats, services, features, and CTA
 */
export default function Home({ showSuccessToast, showErrorToast }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`home-page ${isLoaded ? 'loaded' : ''}`}>
      {/* Hero Section */}
      <section className="home-hero">
        <div className="hero-background">
          <img 
            src="/images/hero/home.jpg" 
            alt="Elena Ramsey Photography" 
            loading="eager"
          />
        </div>
        <div className="hero-overlay"></div>
        
        <div className="hero-content">
          <p className="hero-subtitle">Professional Photography Services</p>
          <h1 className="hero-title">Capturing Life's Beautiful Moments</h1>
          <p className="hero-description">
            Professional photography services specializing in landscapes, portraits, and events. 
            Creating timeless images that tell your unique story.
          </p>
          
          <div className="hero-cta">
            <Link to="/contact" className="btn-primary">
              <span>Book a Session</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link to="/gallery" className="btn-secondary">
              <span>View Portfolio</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>

        <div className="scroll-indicator">
          <span className="scroll-indicator-text">Scroll to explore</span>
          <svg className="scroll-indicator-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 5v14M19 12l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="home-stats">
        <div className="stats-container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Projects Completed</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">350+</span>
              <span className="stat-label">Happy Clients</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">25+</span>
              <span className="stat-label">Awards Won</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">10+</span>
              <span className="stat-label">Years Experience</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="home-services">
        <div className="services-background-pattern"></div>
        
        <div className="section-header">
          <p className="section-subtitle">Services</p>
          <h2 className="section-title">What I Offer</h2>
          <p className="section-description">
            Specialized photography services tailored to capture your most precious moments 
            with artistic excellence and professional quality.
          </p>
        </div>

        <div className="services-grid">
          {/* Landscape Photography */}
          <article className="service-card">
            <div className="service-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 3v18M3 12h18M7.8 7.8l8.4 8.4M7.8 16.2l8.4-8.4" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="service-title">Landscape Photography</h3>
            <p className="service-description">
              Breathtaking landscapes that capture the beauty of nature in stunning detail.
            </p>
            <ul className="service-features">
              <li>Golden hour sessions</li>
              <li>Panoramic compositions</li>
              <li>Fine art prints available</li>
              <li>Location scouting included</li>
            </ul>
            <Link to="/gallery?category=landscape" className="service-link">
              <span>Learn More</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </article>

          {/* Portrait & Family */}
          <article className="service-card">
            <div className="service-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="service-title">Portrait & Family</h3>
            <p className="service-description">
              Beautiful portraits that capture personality, emotion, and family connections.
            </p>
            <ul className="service-features">
              <li>Individual portraits</li>
              <li>Family sessions</li>
              <li>Professional retouching</li>
              <li>Studio or outdoor options</li>
            </ul>
            <Link to="/gallery?category=portrait" className="service-link">
              <span>Learn More</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </article>

          {/* Wedding Photography */}
          <article className="service-card">
            <div className="service-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="service-title">Wedding Photography</h3>
            <p className="service-description">
              Elegant wedding coverage capturing every precious moment of your special day.
            </p>
            <ul className="service-features">
              <li>Full day coverage</li>
              <li>Engagement sessions</li>
              <li>Custom albums</li>
              <li>Second photographer option</li>
            </ul>
            <Link to="/gallery?category=wedding" className="service-link">
              <span>Learn More</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </article>

          {/* Event Photography */}
          <article className="service-card">
            <div className="service-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="service-title">Event Photography</h3>
            <p className="service-description">
              Professional event coverage for corporate functions, parties, and celebrations.
            </p>
            <ul className="service-features">
              <li>Corporate events</li>
              <li>Birthday celebrations</li>
              <li>Quick turnaround</li>
              <li>Digital delivery</li>
            </ul>
            <Link to="/gallery?category=event" className="service-link">
              <span>Learn More</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </article>
        </div>
      </section>

      {/* Features Section */}
      <section className="home-features">
        <div className="features-container">
          <div className="section-header">
            <p className="section-subtitle">Why Choose Me</p>
            <h2 className="section-title">Professional Excellence</h2>
            <p className="section-description">
              Combining technical expertise with artistic vision to deliver exceptional photography services.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="13" r="4" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="feature-title">Professional Equipment</h3>
              <p className="feature-description">
                State-of-the-art cameras and lenses for the highest quality images.
              </p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="feature-title">Satisfaction Guaranteed</h3>
              <p className="feature-description">
                100% satisfaction guarantee or your money back, no questions asked.
              </p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="feature-title">Flexible Packages</h3>
              <p className="feature-description">
                Customizable packages to fit your budget and photography needs.
              </p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="feature-title">Fast Turnaround</h3>
              <p className="feature-description">
                Quick editing and delivery so you can enjoy your photos sooner.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="home-cta">
        <div className="cta-pattern"></div>
        <div className="cta-content">
          <h2 className="cta-title">Ready to Capture Your Story?</h2>
          <p className="cta-description">
            Let's create beautiful memories together. Book your session today and 
            experience professional photography that exceeds your expectations.
          </p>
          <Link to="/contact" className="cta-button">
            <span>Get Started Today</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}