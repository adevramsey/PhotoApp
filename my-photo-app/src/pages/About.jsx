import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/About.css';

/**
 * About Component - Professional biography and experience
 * Features: Hero section, bio, timeline, philosophy, awards, CTA
 */
export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-background">
          <img 
            src="/images/hero/home.png" 
            alt="Elena Ramsey - Photographer" 
            loading="eager"
          />
        </div>
        <div className="about-hero-overlay"></div>
        
        <div className="about-hero-content">
          <p className="about-hero-subtitle">About Me</p>
          <h1 className="about-hero-title">Elena Ramsey</h1>
          <p className="about-hero-tagline">
            Photographer & Visual Storyteller
          </p>
        </div>
      </section>

      {/* Biography Section */}
      <section className="about-bio">
        <div className="about-bio-container">
          <div className="about-bio-grid">
            <div className="about-bio-image">
              <img 
                src="/images/hero/about.png" 
                alt="Elena Ramsey Professional Portrait" 
                loading="lazy"
              />
              <div className="about-bio-image-border"></div>
            </div>
            
            <div className="about-bio-content">
              <p className="about-bio-subtitle">My Story</p>
              <h2 className="about-bio-title">Capturing Moments That Matter</h2>
              
              <div className="about-bio-text">
                <p>
                  Hello! I'm Elena Ramsey, someone who enjoys capturing natural moments. 
                  My journey into photography is a self-discovered interest with me an my camera.
                </p>
                
                <p>
                  God made this world beautiful. He is in every detail. My hobby is to capture
                  that beauty through a lens and share it with others.
                </p>
                
                <p>
                  Based in Denver, Colorado I especially enjoy mountains, sunets, forests, hikes,
                  and city visits.
                </p>
                
                <p>
                  My approach is simple: I focus on all natural light, candid moments, and
                  authentic emotions. I am purely a hobby photographer who loves what I do.
                  I would love to capture your special moments and create lasting memories
                  through my lens.
                </p>
              </div>

              <div className="about-bio-signature">
                <img src="/images/signature.png" alt="Elena Ramsey Signature" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="about-timeline">
        <div className="about-timeline-container">
          <div className="about-timeline-header">
            <p className="about-timeline-subtitle">Journey</p>
            <h2 className="about-timeline-title">My Photography Journey</h2>
            <p className="about-timeline-description">
              Capturing moments from wind up cameras.
            </p>
          </div>

          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <span className="timeline-year">2026</span>
                <h3 className="timeline-title">Going public!</h3>
                <p className="timeline-description">
                  Recognition? I have yet to share my creations, but I hope to start now. 
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <span className="timeline-year">2025</span>
                <h3 className="timeline-title">Husband builds an app</h3>
                <p className="timeline-description">
                  My husband is building an app for me to share what I capture.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <span className="timeline-year">2019</span>
                <h3 className="timeline-title">Full-Time Professional</h3>
                <p className="timeline-description">
                  Nope. But that would be neat!
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <span className="timeline-year">????</span>
                <h3 className="timeline-title">Award</h3>
                <p className="timeline-description">
                  This is a filler - the best award is from the Lord.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <span className="timeline-year">1987</span>
                <h3 className="timeline-title">The Beginning</h3>
                <p className="timeline-description">
                  I was born! So cool.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="about-philosophy">
        <div className="about-philosophy-container">
          <div className="about-philosophy-content">
            <p className="about-philosophy-subtitle">Philosophy</p>
            <h2 className="about-philosophy-title">
              My Approach to Photography
            </h2>
            <p className="about-philosophy-description">
              Photography is more than just capturing images—it's about preserving 
              emotions, telling stories, and creating art that stands the test of time.
            </p>

            <div className="philosophy-grid">
              <div className="philosophy-item">
                <div className="philosophy-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="philosophy-title">Authentic Moments</h3>
                <p className="philosophy-description">
                  I believe in capturing genuine emotions and real moments, not forced 
                  poses. The best photos happen when you're simply being yourself.
                </p>
              </div>

              <div className="philosophy-item">
                <div className="philosophy-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="3" strokeWidth="2"/>
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="philosophy-title">Natural Light</h3>
                <p className="philosophy-description">
                  Light is the essence of photography. I work with natural light whenever 
                  possible, creating images that feel warm, organic, and timeless.
                </p>
              </div>

              <div className="philosophy-item">
                <div className="philosophy-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="philosophy-title">Personal Connection</h3>
                <p className="philosophy-description">
                  Every client is unique. I take time to understand your vision, build 
                  trust, and create a comfortable environment for the best results.
                </p>
              </div>

              <div className="philosophy-item">
                <div className="philosophy-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="philosophy-title">Artistic Excellence</h3>
                <p className="philosophy-description">
                  I'm committed to delivering images that are not just technically perfect, 
                  but artistically compelling and emotionally resonant.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="about-awards">
        <div className="about-awards-container">
          <div className="about-awards-header">
            <p className="about-awards-subtitle">Recognition</p>
            <h2 className="about-awards-title">Awards & Achievements</h2>
          </div>

          <div className="awards-grid">
            <div className="award-item">
              <div className="award-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="8" r="6" strokeWidth="2"/>
                  <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="award-title">My husband's favorite photographer!</h3>
              <p className="award-organization">He spoils me.</p>
              <p className="award-year">2025</p>
            </div>

            <div className="award-item">
              <div className="award-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="8" r="6" strokeWidth="2"/>
                  <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="award-title">Torales-Leyva Photographer</h3>
              <p className="award-organization">They now capture moments!</p>
              <p className="award-year">2026 and beyond</p>
            </div>

            <div className="award-item">
              <div className="award-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="8" r="6" strokeWidth="2"/>
                  <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="award-title">Emerging Photographer</h3>
              <p className="award-organization">IIIIIIII'm comin up so you betta get this party started</p>
              <p className="award-year">2025</p>
            </div>

            <div className="award-item">
              <div className="award-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="8" r="6" strokeWidth="2"/>
                  <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="award-title">IPhone greatest</h3>
              <p className="award-organization">Personal IPhone Award</p>
              <p className="award-year">2020, 2022</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-stats">
        <div className="about-stats-container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Photos Taken</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Unaware Clients</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">25+</span>
              <span className="stat-label">Personal Awards Won</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">35+</span>
              <span className="stat-label">Years Experience...of living</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="about-cta-pattern"></div>
        <div className="about-cta-content">
          <h2 className="about-cta-title">Let's Create Something Beautiful Together</h2>
          <p className="about-cta-description">
            Ready to capture your special moments? I'd love to hear about your vision 
            and discuss how we can bring it to life through photography.
          </p>
          <div className="about-cta-buttons">
            <Link to="/contact" className="cta-button-primary">
              <span>Get in Touch</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link to="/gallery" className="cta-button-secondary">
              <span>View Portfolio</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}