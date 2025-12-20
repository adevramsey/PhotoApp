import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import '../styles/Navbar.css';

/**
 * Navbar Component - Main navigation bar with mobile menu
 * 
 * Features:
 * - Sticky header with scroll effects
 * - Glassmorphism background on scroll
 * - Mobile hamburger menu with animations
 * - Active link highlighting
 * - Smooth transitions
 * - Logo branding
 * - Call-to-action button
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isMobileMenuOpen - Mobile menu open state
 * @param {Function} props.onMobileMenuToggle - Toggle mobile menu
 * @param {Function} props.onMobileMenuClose - Close mobile menu
 * @returns {JSX.Element} Navbar component
 */
export default function Navbar({ 
  isMobileMenuOpen = false, 
  onMobileMenuToggle, 
  onMobileMenuClose 
}) {
  // ==================== STATE ====================
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const location = useLocation();
  const navRef = useRef(null);

  // ==================== SCROLL EFFECTS ====================
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Add background when scrolled past 50px
          setIsScrolled(currentScrollY > 50);

          // Hide navbar on scroll down, show on scroll up
          if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setShowNavbar(false);
          } else {
            setShowNavbar(true);
          }

          setLastScrollY(currentScrollY);
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // ==================== MOBILE MENU CLOSE ON ROUTE CHANGE ====================
  useEffect(() => {
    if (onMobileMenuClose) {
      onMobileMenuClose();
    }
    window.scrollTo(0, 0);
  }, [location.pathname, onMobileMenuClose]);

  // ==================== CLICK OUTSIDE TO CLOSE ====================
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen && 
        navRef.current && 
        !navRef.current.contains(event.target)
      ) {
        if (onMobileMenuClose) {
          onMobileMenuClose();
        }
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen, onMobileMenuClose]);

  // ==================== ESCAPE KEY TO CLOSE ====================
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        if (onMobileMenuClose) {
          onMobileMenuClose();
        }
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isMobileMenuOpen, onMobileMenuClose]);

  // ==================== NAVIGATION LINKS ====================
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact' },
  ];

  // ==================== RENDER ====================
  return (
    <>
      {/* Mobile Menu Backdrop */}
      <div 
        className={`nav-backdrop ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={onMobileMenuClose}
        aria-hidden="true"
      />

      {/* Main Navigation */}
      <nav 
        ref={navRef}
        className={`navbar ${isScrolled ? 'scrolled' : ''} ${showNavbar ? 'visible' : 'hidden'}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="navbar-container">
          
          {/* ==================== LOGO ==================== */}
          <Link 
            to="/" 
            className="navbar-logo"
            aria-label="Elena Ramsey Photography - Home"
          >
            <div className="logo-icon">
              <svg 
                width="32" 
                height="32" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor"
              >
                <rect 
                  x="3" 
                  y="3" 
                  width="18" 
                  height="18" 
                  rx="2" 
                  strokeWidth="2"
                />
                <circle 
                  cx="12" 
                  cy="12" 
                  r="4" 
                  strokeWidth="2"
                />
                <line 
                  x1="3" 
                  y1="9" 
                  x2="21" 
                  y2="9" 
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div className="logo-text">
              <span className="logo-name">Elena Ramsey</span>
              <span className="logo-subtitle">Photography</span>
            </div>
          </Link>

          {/* ==================== DESKTOP NAVIGATION ==================== */}
          <div className="navbar-menu">
            <ul className="navbar-links">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink 
                    to={link.path}
                    className={({ isActive }) => 
                      `nav-link ${isActive ? 'active' : ''}`
                    }
                  >
                    <span className="nav-link-text">{link.label}</span>
                    <span className="nav-link-indicator" aria-hidden="true"></span>
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Call-to-Action Button */}
            <Link to="/contact" className="btn-primary navbar-cta">
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor"
              >
                <path 
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                  strokeWidth="2"
                />
              </svg>
              <span>Book Now</span>
            </Link>
          </div>

          {/* ==================== MOBILE MENU TOGGLE ==================== */}
          <button
            className={`navbar-toggle ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={onMobileMenuToggle}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="toggle-line toggle-line-1"></span>
            <span className="toggle-line toggle-line-2"></span>
            <span className="toggle-line toggle-line-3"></span>
          </button>

        </div>

        {/* ==================== MOBILE MENU ==================== */}
        <div 
          id="mobile-menu"
          className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}
          aria-hidden={!isMobileMenuOpen}
        >
          <div className="mobile-menu-content">
            
            {/* Mobile Navigation Links */}
            <ul className="mobile-nav-links">
              {navLinks.map((link, index) => (
                <li 
                  key={link.path}
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    transitionDelay: `${index * 0.05}s` 
                  }}
                >
                  <NavLink 
                    to={link.path}
                    className={({ isActive }) => 
                      `mobile-nav-link ${isActive ? 'active' : ''}`
                    }
                    onClick={onMobileMenuClose}
                  >
                    <span className="mobile-link-text">{link.label}</span>
                    <svg 
                      className="mobile-link-arrow"
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor"
                    >
                      <path 
                        d="M9 18l6-6-6-6" 
                        strokeWidth="2" 
                        strokeLinecap="round"
                      />
                    </svg>
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Mobile CTA Button */}
            <div className="mobile-cta">
              <Link 
                to="/contact" 
                className="btn-primary mobile-cta-btn"
                onClick={onMobileMenuClose}
              >
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor"
                >
                  <path 
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                    strokeWidth="2"
                  />
                </svg>
                <span>Book a Session</span>
              </Link>
            </div>

            {/* Mobile Footer Info */}
            <div className="mobile-footer">
              <p className="mobile-footer-text">
                Capturing life's beautiful moments
              </p>
              <div className="mobile-social">
                <a 
                  href="https://instagram.com/elenaramseyphotography" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="mobile-social-link"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="2" y="2" width="20" height="20" rx="5" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="4" strokeWidth="2"/>
                    <circle cx="17.5" cy="6.5" r="1.5"/>
                  </svg>
                </a>
                <a 
                  href="https://facebook.com/elenaramseyphotography" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="mobile-social-link"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a 
                  href="https://pinterest.com/elenaramseyphotography" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Pinterest"
                  className="mobile-social-link"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>

          </div>
        </div>

      </nav>
    </>
  );
}