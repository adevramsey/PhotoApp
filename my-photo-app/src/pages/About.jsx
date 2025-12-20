// ==================== IMPORTS ====================
// React hooks for managing component state and side effects
import { useState, useEffect } from "react";
// Router hook for programmatic navigation between pages
import { useNavigate } from "react-router-dom";
// Import our custom CSS styles for this page
import "../styles/About.css";

/**
 * About Component - Personal biography and story page
 * 
 * This page tells Elena's photography story with:
 * - Hero section with personal photo
 * - Biography text with timeline
 * - Skills and specialties showcase
 * - Photography philosophy section
 * - Call-to-action for bookings
 * - Award/recognition badges
 * - Social media links
 * 
 * @returns {JSX.Element} Rendered About page component
 */
export default function About() {
  // ==================== HOOKS ====================
  
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("story");

  // ==================== EFFECTS ====================
  
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ==================== DATA ====================
  
  const timeline = [
    {
      year: "2014",
      title: "First Camera",
      description: "Received my first DSLR camera as a gift and discovered my passion for capturing God's creation.",
    },
    {
      year: "2016",
      title: "Professional Start",
      description: "Started my professional photography journey, focusing on landscapes and nature photography.",
    },
    {
      year: "2018",
      title: "Studio Opening",
      description: "Opened my first photography studio and expanded into portrait and event photography.",
    },
    {
      year: "2020",
      title: "Award Recognition",
      description: "Received multiple awards for landscape photography and published work in national magazines.",
    },
    {
      year: "2023",
      title: "International Exhibitions",
      description: "Showcased work in galleries across the United States and participated in international exhibitions.",
    },
  ];

  const skills = [
    {
      name: "Landscape Photography",
      level: 95,
      icon: "🏔️",
    },
    {
      name: "Portrait Photography",
      level: 90,
      icon: "👤",
    },
    {
      name: "Event Photography",
      level: 85,
      icon: "🎉",
    },
    {
      name: "Photo Editing",
      level: 92,
      icon: "✨",
    },
    {
      name: "Studio Lighting",
      level: 88,
      icon: "💡",
    },
    {
      name: "Nature & Wildlife",
      level: 93,
      icon: "🦋",
    },
  ];

  const values = [
    {
      icon: "🙏",
      title: "Faith-Centered",
      description: "Every photograph is an opportunity to showcase God's incredible artistry in our world.",
    },
    {
      icon: "🎨",
      title: "Artistic Vision",
      description: "Combining technical expertise with creative storytelling to create timeless images.",
    },
    {
      icon: "💖",
      title: "Authentic Moments",
      description: "Capturing genuine emotions and natural beauty without forced poses or artificial elements.",
    },
    {
      icon: "🌟",
      title: "Excellence",
      description: "Committed to delivering the highest quality work with attention to every detail.",
    },
  ];

  const equipment = [
    {
      category: "Cameras",
      items: ["Canon EOS R5", "Canon EOS 5D Mark IV", "Sony A7R IV"],
    },
    {
      category: "Lenses",
      items: [
        "Canon RF 15-35mm f/2.8L",
        "Canon RF 24-70mm f/2.8L",
        "Canon RF 70-200mm f/2.8L",
        "Canon RF 100-500mm f/4.5-7.1L",
      ],
    },
    {
      category: "Lighting",
      items: [
        "Profoto B10 Plus",
        "Godox AD600Pro",
        "Various reflectors and modifiers",
      ],
    },
    {
      category: "Accessories",
      items: [
        "Multiple tripods and monopods",
        "ND and polarizing filters",
        "DJI Mavic 3 drone",
      ],
    },
  ];

  // ==================== EVENT HANDLERS ====================
  
  const handleContactClick = () => {
    navigate("/contact");
  };

  const handleGalleryClick = () => {
    navigate("/gallery");
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // ==================== RENDER ====================
  
  return (
    <div className={`about-page ${isLoaded ? "loaded" : ""}`}>
      
      {/* ==================== HERO SECTION ==================== */}
      {/* Large background banner with Elena's photo */}
      <section className="about-hero">
        <div className="hero-image-wrapper">
          <img
            // ✅ UPDATED: Reference your actual hero image
            // This looks for: public/images/hero/[any-image-file]
            // The browser will find the first image in that folder
            src="/images/hero/about.jpg"
            alt="Elena Ramsey - Professional Photographer"
            className="hero-image"
            loading="eager"
            // Fallback if image fails to load
            onError={(e) => {
              // If about-hero.jpg doesn't exist, try other common names
              const fallbacks = [
                '/images/hero/about.png',
                '/images/hero/about-hero.jpg',
                '/images/hero/about-hero.png'
              ];
              const currentSrc = e.target.src;
              const nextFallback = fallbacks.find(src => !currentSrc.includes(src));
              if (nextFallback) {
                e.target.src = nextFallback;
              }
            }}
          />
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-content">
          <span className="hero-label">About Me</span>
          <h1 className="hero-title">Elena Ramsey</h1>
          <p className="hero-subtitle">
            Professional Photographer & Visual Storyteller
          </p>
          <p className="hero-description">
            With over 10 years of experience capturing the beauty of God's creation,
            I specialize in landscape, portrait, and event photography. Each image
            tells a story of grace, wonder, and the extraordinary beauty found in
            everyday moments.
          </p>

          <div className="hero-actions">
            <button 
              className="btn-primary"
              onClick={handleContactClick}
              aria-label="Contact Elena for photography services"
            >
              <span>Book a Session</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>

            <button 
              className="btn-secondary"
              onClick={handleGalleryClick}
              aria-label="View Elena's photography portfolio"
            >
              <span>View Portfolio</span>
            </button>
          </div>
        </div>
      </section>

      {/* ==================== STORY SECTION ==================== */}
      {/* Biography text with portrait photo */}
      <section className="story-section">
        <div className="story-content">
          <div className="story-text">
            <span className="section-label">My Story</span>
            <h2 className="section-title">
              A Journey Through the Lens
            </h2>
            
            <div className="story-paragraphs">
              <p>
                My love for photography began with a simple walk through nature.
                I was captivated by the way light filtered through the trees,
                creating patterns and shadows that seemed almost divine. That moment
                sparked a passion that would shape my life's work.
              </p>
              
              <p>
                Over the years, I've had the privilege of capturing countless
                moments—from breathtaking landscapes that showcase God's handiwork
                to intimate portraits that reveal the beauty of human emotion. Each
                photograph is more than just an image; it's a testament to the
                extraordinary beauty that surrounds us every day.
              </p>
              
              <p>
                My approach is deeply rooted in authenticity and faith. I believe
                that the best photographs come from genuine moments, not forced
                poses. Whether I'm photographing a wedding, a family portrait, or
                a majestic landscape, my goal is always the same: to capture the
                essence of the moment and create images that will be treasured
                for generations.
              </p>
              
              <p>
                When I'm not behind the camera, you can find me exploring new
                hiking trails, spending time with my family, or mentoring aspiring
                photographers. I believe in giving back to the community and sharing
                the knowledge I've gained throughout my journey.
              </p>
            </div>
          </div>

          <div className="story-image">
            <div className="image-frame">
              <img 
                // ✅ UPDATED: Reference your actual portrait image
                // This looks for: public/images/about/[any-image-file]
                src="/images/about/portrait.jpg"
                alt="Elena Ramsey with camera"
                loading="lazy"
                // Fallback if image fails to load
                onError={(e) => {
                  const fallbacks = [
                    '/images/about/about.jpg',
                    '/images/about/elena.jpg',
                    '/images/about/profile.jpg',
                    '/images/hero/about-hero.jpg' // Use hero as last resort
                  ];
                  const currentSrc = e.target.src;
                  const nextFallback = fallbacks.find(src => !currentSrc.includes(src));
                  if (nextFallback) {
                    e.target.src = nextFallback;
                  }
                }}
              />
              <div className="image-quote">
                <svg className="quote-icon" width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
                </svg>
                <p>
                  "Every photograph is a piece of art waiting to be discovered"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== TIMELINE SECTION ==================== */}
      <section className="timeline-section">
        <div className="timeline-header">
          <span className="section-label">Journey</span>
          <h2 className="section-title">My Photography Timeline</h2>
          <p className="section-description">
            Key milestones that have shaped my career and artistic vision
          </p>
        </div>

        <div className="timeline">
          {timeline.map((item, index) => (
            <div 
              key={index} 
              className="timeline-item"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="timeline-year">{item.year}</div>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== SKILLS SECTION ==================== */}
      <section className="skills-section">
        <div className="skills-header">
          <span className="section-label">Expertise</span>
          <h2 className="section-title">Skills & Specialties</h2>
          <p className="section-description">
            Areas where I excel and continue to grow as a photographer
          </p>
        </div>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div 
              key={index} 
              className="skill-item"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="skill-header">
                <span className="skill-icon">{skill.icon}</span>
                <span className="skill-name">{skill.name}</span>
              </div>
              
              <div className="skill-bar-container">
                <div 
                  className="skill-bar-fill"
                  style={{ 
                    width: `${skill.level}%`,
                    animationDelay: `${index * 100 + 300}ms`
                  }}
                ></div>
              </div>
              
              <span className="skill-percentage">{skill.level}%</span>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== EXPERIENCE TABS SECTION ==================== */}
      <section className="experience-section">
        <div className="tabs-nav">
          <button
            className={`tab-btn ${activeTab === "story" ? "active" : ""}`}
            onClick={() => handleTabChange("story")}
          >
            <span className="tab-icon">📖</span>
            <span>My Story</span>
          </button>
          
          <button
            className={`tab-btn ${activeTab === "approach" ? "active" : ""}`}
            onClick={() => handleTabChange("approach")}
          >
            <span className="tab-icon">🎯</span>
            <span>Approach</span>
          </button>
          
          <button
            className={`tab-btn ${activeTab === "equipment" ? "active" : ""}`}
            onClick={() => handleTabChange("equipment")}
          >
            <span className="tab-icon">📷</span>
            <span>Equipment</span>
          </button>
        </div>

        <div className="tabs-content">
          {activeTab === "story" && (
            <div className="tab-panel fade-in">
              <h3>How It All Began</h3>
              <p>
                My journey into photography started unexpectedly during a family
                vacation to Yosemite National Park. I borrowed my father's old
                film camera and was immediately captivated by the process of
                composing a shot, waiting for the perfect light, and the
                anticipation of seeing the developed photos.
              </p>
              <p>
                That experience ignited a passion that led me to study photography
                formally, intern with established photographers, and eventually
                start my own practice. Each step of the journey has taught me
                something valuable about the craft, the business, and most
                importantly, about people and their stories.
              </p>
              <p>
                Today, I'm grateful to work with clients who trust me to document
                their most precious moments and to capture the beauty of nature
                that continues to inspire me daily.
              </p>
            </div>
          )}

          {activeTab === "approach" && (
            <div className="tab-panel fade-in">
              <h3>My Photography Philosophy</h3>
              <p>
                I believe that the best photographs are born from authenticity.
                Rather than heavily staged scenes, I prefer to work with natural
                light and genuine emotions. This approach creates images that
                feel timeless and true to the moment.
              </p>
              
              <ul className="approach-list">
                <li>
                  <strong>Natural Light First:</strong> I prioritize working with
                  available light whenever possible, using artificial lighting only
                  to enhance, never to overpower.
                </li>
                <li>
                  <strong>Storytelling Focus:</strong> Every session is about
                  telling your unique story, not following a generic template.
                </li>
                <li>
                  <strong>Collaborative Process:</strong> I work closely with
                  clients to understand their vision and bring it to life.
                </li>
                <li>
                  <strong>Minimal Post-Processing:</strong> While I edit all photos
                  professionally, I aim to get it right in-camera first.
                </li>
                <li>
                  <strong>Respect for Subjects:</strong> Whether photographing
                  people or nature, I approach each subject with respect and care.
                </li>
              </ul>
            </div>
          )}

          {activeTab === "equipment" && (
            <div className="tab-panel fade-in">
              <h3>Professional Equipment</h3>
              <p>
                I invest in high-quality, professional-grade equipment to ensure
                the best possible results for my clients. Here's an overview of
                my main gear:
              </p>
              
              <div className="equipment-grid">
                {equipment.map((category, index) => (
                  <div key={index} className="equipment-category">
                    <h4>{category.category}</h4>
                    <ul>
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              <p className="equipment-note">
                * Equipment is regularly updated and maintained to ensure optimal
                performance and reliability for every shoot.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ==================== VALUES SECTION ==================== */}
      <section className="values-section">
        <div className="values-header">
          <span className="section-label">Values</span>
          <h2 className="section-title">What Drives My Work</h2>
          <p className="section-description">
            The principles that guide every photograph I take
          </p>
        </div>

        <div className="values-grid">
          {values.map((value, index) => (
            <div 
              key={index} 
              className="value-card"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="value-icon">{value.icon}</div>
              <h3 className="value-title">{value.title}</h3>
              <p className="value-description">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== AWARDS SECTION ==================== */}
      <section className="awards-section">
        <div className="awards-content">
          <span className="section-label">Recognition</span>
          <h2 className="section-title">Awards & Features</h2>
          
          <div className="awards-grid">
            <div className="award-item">
              <div className="award-icon">🏆</div>
              <h4>Photography Magazine</h4>
              <p>Featured Photographer 2023</p>
            </div>
            
            <div className="award-item">
              <div className="award-icon">⭐</div>
              <h4>Nature Photography Award</h4>
              <p>First Place - Landscapes 2022</p>
            </div>
            
            <div className="award-item">
              <div className="award-icon">📸</div>
              <h4>International Exhibition</h4>
              <p>New York Gallery Showcase 2023</p>
            </div>
            
            <div className="award-item">
              <div className="award-icon">🌟</div>
              <h4>Client Choice Award</h4>
              <p>5-Star Rating (200+ Reviews)</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Let's Create Something Beautiful</h2>
          <p className="cta-description">
            Ready to capture your special moments or showcase the beauty of
            your surroundings? I'd love to hear about your vision and discuss
            how we can bring it to life through photography.
          </p>
          
          <div className="cta-actions">
            <button className="btn-cta-primary" onClick={handleContactClick}>
              Schedule a Consultation
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            
            <button className="btn-cta-secondary" onClick={handleGalleryClick}>
              Browse Portfolio
            </button>
          </div>
          
          <div className="cta-badges">
            <div className="badge">
              <span className="badge-icon">✓</span>
              <span>10+ Years Experience</span>
            </div>
            <div className="badge">
              <span className="badge-icon">✓</span>
              <span>500+ Happy Clients</span>
            </div>
            <div className="badge">
              <span className="badge-icon">✓</span>
              <span>Award-Winning Work</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}