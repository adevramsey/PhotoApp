import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Page Components
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Toast Notification System
import { ToastContainer } from './components/Toast';
import { useToast } from './hooks/useToast';

// Global Styles
import './styles/App.css';

/**
 * App Component - Main application entry point
 */
function App() {
  // ==================== HOOKS ====================
  const location = useLocation();
  const { toasts, removeToast, success, error, warning, info } = useToast();
  
  // ==================== STATE MANAGEMENT ====================
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ==================== EFFECTS ====================
  
  // App initialization
  useEffect(() => {
    const initTimer = setTimeout(() => {
      setIsAppLoading(false);
    }, 500);
    return () => clearTimeout(initTimer);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    // Close mobile menu on route change
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Manage body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // ==================== EVENT HANDLERS ====================
  
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  // Toast helper functions with error handling
  const showSuccessToast = (message) => {
    if (message && typeof message === 'string') {
      success(message);
    }
  };

  const showErrorToast = (message) => {
    if (message && typeof message === 'string') {
      error(message);
    }
  };

  const showWarningToast = (message) => {
    if (message && typeof message === 'string') {
      warning(message);
    }
  };

  const showInfoToast = (message) => {
    if (message && typeof message === 'string') {
      info(message);
    }
  };

  // ==================== LOADING STATE ====================
  if (isAppLoading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading Elena Photography...</p>
      </div>
    );
  }

  // ==================== MAIN RENDER ====================
  return (
    <div className="app">
      
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Navigation */}
      <Navbar 
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={handleMobileMenuToggle}
        onMobileMenuClose={handleMobileMenuClose}
      />

      {/* Main Content */}
      <main className="main-content">
        <Routes>
          {/* Home Page */}
          <Route 
            path="/" 
            element={
              <Home 
                showSuccessToast={showSuccessToast}
                showErrorToast={showErrorToast}
              />
            } 
          />

          {/* About Page */}
          <Route 
            path="/about" 
            element={
              <About 
                showSuccessToast={showSuccessToast}
                showErrorToast={showErrorToast}
              />
            } 
          />

          {/* Gallery Page */}
          <Route 
            path="/gallery" 
            element={
              <Gallery 
                showSuccessToast={showSuccessToast}
                showErrorToast={showErrorToast}
                showInfoToast={showInfoToast}
              />
            } 
          />

          {/* Contact Page */}
          <Route 
            path="/contact" 
            element={
              <Contact 
                showSuccessToast={showSuccessToast}
                showErrorToast={showErrorToast}
              />
            } 
          />

          {/* 404 Not Found */}
          <Route 
            path="*" 
            element={
              <NotFoundPage />
            } 
          />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <ScrollToTopButton />

    </div>
  );
}

/**
 * NotFoundPage Component - 404 Error Page
 */
function NotFoundPage() {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-message">Page not found</p>
        <p className="not-found-description">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a href="/" className="btn-back-home">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M19 12H5M12 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Back to Home</span>
        </a>
      </div>
    </div>
  );
}

/**
 * ScrollToTopButton Component - Floating button to return to top
 */
function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      className="scroll-to-top-btn"
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor"
      >
        <path 
          d="M12 19V5M5 12l7-7 7 7" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default App;