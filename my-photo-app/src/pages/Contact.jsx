// ==================== IMPORTS ====================
// React hooks for managing component state and side effects
import { useState, useEffect } from "react";
// Import our custom CSS styles for this page
import "../styles/Contact.css";

/**
 * Contact Component - Contact form and information page
 * 
 * This page allows visitors to get in touch featuring:
 * - Contact form with validation
 * - Multiple contact methods (email, phone, social)
 * - Business hours and location information
 * - Interactive map (optional)
 * - FAQ section
 * - Booking request form
 * 
 * @returns {JSX.Element} Rendered Contact page component
 */
export default function Contact() {
  // ==================== HOOKS ====================
  
  /**
   * isLoaded state - tracks if page has finished loading
   * Used to trigger entrance animations for smooth visual experience
   * Initial value: false (page hasn't loaded yet)
   */
  const [isLoaded, setIsLoaded] = useState(false);
  
  /**
   * formData state - stores all form field values
   * Tracks user input as they type in the contact form
   * Initial values: empty strings for all fields
   */
  const [formData, setFormData] = useState({
    name: "",           // User's full name
    email: "",          // User's email address
    phone: "",          // User's phone number (optional)
    service: "",        // Type of service they're interested in
    date: "",           // Preferred date for session (optional)
    budget: "",         // Budget range (optional)
    message: "",        // Main message/inquiry
  });

  /**
   * errors state - tracks validation errors for each field
   * Shows error messages when user submits invalid data
   * Initial values: empty strings (no errors)
   */
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  /**
   * isSubmitting state - tracks if form is currently being submitted
   * Prevents double-submission and shows loading indicator
   * Initial value: false (not submitting)
   */
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * submitStatus state - tracks submission result
   * Shows success or error message after form submission
   * Values: null (not submitted), 'success', or 'error'
   */
  const [submitStatus, setSubmitStatus] = useState(null);

  /**
   * activeTab state - tracks which contact method tab is active
   * Used for tabbed interface showing different contact options
   * Initial value: 'form' (shows contact form first)
   */
  const [activeTab, setActiveTab] = useState("form");

  // ==================== EFFECTS ====================
  
  /**
   * useEffect - Triggers page load animation
   * Runs once when component first mounts
   * 
   * Sets isLoaded to true after small delay, which triggers CSS animations
   * via the .loaded class being added to the page container
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
   * When user navigates to Contact page, this ensures they start
   * at the top of the page (not scrolled down from previous page)
   */
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to x=0, y=0 (top-left corner)
  }, []); // Empty array = run once on mount

  // ==================== DATA ====================
  
  /**
   * serviceOptions - Array of photography services for dropdown
   * Used in the service type select field in the contact form
   */
  const serviceOptions = [
    { value: "", label: "Select a service..." },        // Default placeholder
    { value: "landscape", label: "Landscape Photography" },
    { value: "portrait", label: "Portrait & Family" },
    { value: "wedding", label: "Wedding Photography" },
    { value: "event", label: "Event Photography" },
    { value: "other", label: "Other / Not Sure" },
  ];

  /**
   * budgetRanges - Array of budget options for dropdown
   * Helps qualify leads and set client expectations
   */
  const budgetRanges = [
    { value: "", label: "Select budget range..." },     // Default placeholder
    { value: "under-500", label: "Under $500" },
    { value: "500-1000", label: "$500 - $1,000" },
    { value: "1000-2500", label: "$1,000 - $2,500" },
    { value: "2500-5000", label: "$2,500 - $5,000" },
    { value: "5000-plus", label: "$5,000+" },
    { value: "flexible", label: "Flexible / Not Sure" },
  ];

  /**
   * contactMethods - Array of contact information
   * Displayed as contact method cards with icons
   */
  const contactMethods = [
    {
      icon: "📧",                                        // Email icon
      title: "Email",                                    // Method name
      value: "elena@elenaramsey.com",                   // Contact value
      description: "Best for detailed inquiries",       // When to use
      link: "mailto:elena@elenaramsey.com",             // Clickable link
    },
    {
      icon: "📞",
      title: "Phone",
      value: "(555) 123-4567",
      description: "Available Mon-Fri, 9AM-6PM EST",
      link: "tel:+15551234567",
    },
    {
      icon: "💬",
      title: "Text Message",
      value: "(555) 123-4567",
      description: "Quick questions and booking",
      link: "sms:+15551234567",
    },
    {
      icon: "📍",
      title: "Location",
      value: "Portland, Oregon",
      description: "Available for travel nationwide",
      link: null, // No clickable link for location
    },
  ];

  /**
   * socialLinks - Array of social media links
   * Displayed as icon buttons in the contact section
   */
  const socialLinks = [
    {
      platform: "Instagram",
      url: "https://instagram.com/elenaramseyphotography",
      icon: "instagram", // Icon identifier
    },
    {
      platform: "Facebook",
      url: "https://facebook.com/elenaramseyphotography",
      icon: "facebook",
    },
    {
      platform: "Pinterest",
      url: "https://pinterest.com/elenaramseyphotography",
      icon: "pinterest",
    },
  ];

  /**
   * faqs - Array of frequently asked questions
   * Displayed in accordion-style FAQ section
   */
  const faqs = [
    {
      question: "How far in advance should I book?",
      answer: "For weddings and special events, I recommend booking 6-12 months in advance. For portrait sessions and landscapes, 2-4 weeks notice is typically sufficient. However, I can sometimes accommodate last-minute requests depending on availability.",
    },
    {
      question: "Do you travel for photography sessions?",
      answer: "Yes! I'm based in Portland, Oregon, but I love to travel. I've photographed sessions across the Pacific Northwest, California, and nationwide. Travel fees vary depending on location and duration. Contact me for a custom travel quote.",
    },
    {
      question: "What's included in a typical session?",
      answer: "Every session includes a pre-shoot consultation, professional photography during the session, expert post-processing and editing, and delivery of high-resolution digital images. Specific deliverables vary by package - contact me for detailed pricing and options.",
    },
    {
      question: "How long until I receive my photos?",
      answer: "Standard turnaround time is 2-3 weeks for portrait sessions and 4-6 weeks for weddings and large events. Rush delivery is available for an additional fee. You'll receive a sneak peek of 3-5 edited images within 48 hours.",
    },
    {
      question: "Can I purchase prints directly from you?",
      answer: "Absolutely! I offer professional printing services with various options including canvas prints, framed prints, albums, and more. All prints are produced using archival-quality materials to ensure your memories last for generations.",
    },
    {
      question: "What's your cancellation policy?",
      answer: "I understand that life happens! Cancellations made 30+ days before the scheduled session receive a full refund minus the booking fee. Cancellations within 14-30 days receive a 50% refund. Unfortunately, cancellations within 14 days cannot be refunded, but we can reschedule subject to availability.",
    },
  ];

  // ==================== VALIDATION ====================
  
  /**
   * Validate email format using regex pattern
   * @param {string} email - Email address to validate
   * @returns {boolean} True if valid email format
   */
  const validateEmail = (email) => {
    // Standard email validation regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Validate phone number format (optional but if provided, must be valid)
   * @param {string} phone - Phone number to validate
   * @returns {boolean} True if valid phone format or empty
   */
  const validatePhone = (phone) => {
    // If phone is empty, it's valid (optional field)
    if (!phone) return true;
    // Remove all non-digit characters for validation
    const phoneDigits = phone.replace(/\D/g, "");
    // Must have exactly 10 digits for US phone number
    return phoneDigits.length === 10;
  };

  /**
   * Validate entire form before submission
   * Checks all required fields and formats
   * @returns {boolean} True if form is valid
   */
  const validateForm = () => {
    // Create new errors object
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    };

    // Flag to track if form is valid
    let isValid = true;

    // Validate name (required, minimum 2 characters)
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
      isValid = false;
    }

    // Validate email (required, must be valid format)
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Validate phone (optional, but if provided must be valid)
    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
      isValid = false;
    }

    // Validate service selection (required)
    if (!formData.service) {
      newErrors.service = "Please select a service";
      isValid = false;
    }

    // Validate message (required, minimum 10 characters)
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
      isValid = false;
    }

    // Update errors state with validation results
    setErrors(newErrors);
    return isValid;
  };

  // ==================== EVENT HANDLERS ====================
  
  /**
   * Handler: Update form field value
   * Called when user types in any form input
   * @param {Event} e - Input change event
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Update form data for this field
    setFormData((prev) => ({
      ...prev,           // Keep all other fields
      [name]: value,     // Update only the changed field
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",      // Clear error message
      }));
    }
  };

  /**
   * Handler: Submit contact form
   * Validates form, sends data to backend, and shows result
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission (page reload)

    // Validate form before submitting
    if (!validateForm()) {
      // If validation fails, scroll to first error
      const firstError = document.querySelector(".error-message");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return; // Stop submission
    }

    // Start submission process
    setIsSubmitting(true);
    setSubmitStatus(null); // Clear any previous status

    try {
      // TODO: Replace with actual API endpoint
      // This is a placeholder - implement your backend submission
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Success! Show success message
        setSubmitStatus("success");
        
        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          date: "",
          budget: "",
          message: "",
        });

        // Scroll to success message
        setTimeout(() => {
          const successMessage = document.querySelector(".success-message");
          if (successMessage) {
            successMessage.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 100);
      } else {
        // Server error - show error message
        setSubmitStatus("error");
      }
    } catch (error) {
      // Network error or exception - show error message
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      // Always stop loading indicator
      setIsSubmitting(false);
    }
  };

  /**
   * Handler: Change active tab
   * Called when user clicks tab button (form/info)
   * @param {string} tab - Tab identifier ('form' or 'info')
   */
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // ==================== RENDER ====================
  
  return (
    // Main page container - gets 'loaded' class when ready for animations
    <div className={`contact-page ${isLoaded ? "loaded" : ""}`}>
      
      {/* ==================== HERO SECTION ==================== */}
      {/* Header banner with title and description */}
      <section className="contact-hero">
        <div className="hero-content">
          {/* Small label above main heading */}
          <span className="hero-label">Get In Touch</span>
          
          {/* Main page title */}
          <h1 className="hero-title">Let's Create Together</h1>
          
          {/* Subtitle/description */}
          <p className="hero-subtitle">
            Ready to capture your special moments? I'd love to hear about your vision
            and discuss how we can bring it to life through photography.
          </p>
        </div>
      </section>

      {/* ==================== MAIN CONTENT SECTION ==================== */}
      <section className="contact-content">
        <div className="content-container">
          
          {/* LEFT COLUMN - Contact Form */}
          <div className="form-column">
            {/* Form header with tabs */}
            <div className="form-header">
              <h2 className="form-title">Send a Message</h2>
              <p className="form-description">
                Fill out the form below and I'll get back to you within 24 hours.
              </p>
            </div>

            {/* Contact form */}
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              
              {/* Name field - required */}
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Full Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`form-input ${errors.name ? "error" : ""}`}
                  placeholder="John Doe"
                  required
                />
                {/* Show error message if validation fails */}
                {errors.name && (
                  <span className="error-message">{errors.name}</span>
                )}
              </div>

              {/* Email field - required */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`form-input ${errors.email ? "error" : ""}`}
                  placeholder="john@example.com"
                  required
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>

              {/* Phone field - optional */}
              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Phone Number <span className="optional">(optional)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`form-input ${errors.phone ? "error" : ""}`}
                  placeholder="(555) 123-4567"
                />
                {errors.phone && (
                  <span className="error-message">{errors.phone}</span>
                )}
              </div>

              {/* Two-column layout for service and date */}
              <div className="form-row">
                {/* Service type dropdown - required */}
                <div className="form-group">
                  <label htmlFor="service" className="form-label">
                    Service Type <span className="required">*</span>
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className={`form-select ${errors.service ? "error" : ""}`}
                    required
                  >
                    {/* Map through service options */}
                    {serviceOptions.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <span className="error-message">{errors.service}</span>
                  )}
                </div>

                {/* Preferred date picker - optional */}
                <div className="form-group">
                  <label htmlFor="date" className="form-label">
                    Preferred Date <span className="optional">(optional)</span>
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="form-input"
                    // Set minimum date to today
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>

              {/* Budget range dropdown - optional */}
              <div className="form-group">
                <label htmlFor="budget" className="form-label">
                  Budget Range <span className="optional">(optional)</span>
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  {/* Map through budget options */}
                  {budgetRanges.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message textarea - required */}
              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Your Message <span className="required">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`form-textarea ${errors.message ? "error" : ""}`}
                  placeholder="Tell me about your photography needs, vision, location, and any specific requests..."
                  rows="6"
                  required
                />
                {errors.message && (
                  <span className="error-message">{errors.message}</span>
                )}
                {/* Character counter */}
                <span className="character-count">
                  {formData.message.length} characters
                </span>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="btn-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  // Show loading spinner when submitting
                  <>
                    <span className="spinner"></span>
                    <span>Sending...</span>
                  </>
                ) : (
                  // Show normal submit text
                  <>
                    <span>Send Message</span>
                    {/* Send icon */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </>
                )}
              </button>

              {/* Success message */}
              {submitStatus === "success" && (
                <div className="success-message">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M22 4L12 14.01l-3-3" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <div>
                    <strong>Message sent successfully!</strong>
                    <p>Thank you for reaching out. I'll get back to you within 24 hours.</p>
                  </div>
                </div>
              )}

              {/* Error message */}
              {submitStatus === "error" && (
                <div className="error-message-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                    <path d="M12 8v4M12 16h.01" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <div>
                    <strong>Oops! Something went wrong.</strong>
                    <p>Please try again or contact me directly at elena@elenaramsey.com</p>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* RIGHT COLUMN - Contact Information */}
          <div className="info-column">
            {/* Contact methods cards */}
            <div className="contact-methods">
              <h3 className="info-title">Other Ways to Reach Me</h3>
              
              {/* Map through contact methods */}
              {contactMethods.map((method, index) => (
                <div key={index} className="contact-method-card">
                  {/* Icon */}
                  <div className="method-icon">{method.icon}</div>
                  
                  {/* Content */}
                  <div className="method-content">
                    <h4 className="method-title">{method.title}</h4>
                    
                    {/* Make value clickable if link exists */}
                    {method.link ? (
                      <a href={method.link} className="method-value">
                        {method.value}
                      </a>
                    ) : (
                      <span className="method-value">{method.value}</span>
                    )}
                    
                    <p className="method-description">{method.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social media links */}
            <div className="social-section">
              <h3 className="info-title">Follow My Work</h3>
              <p className="social-description">
                Stay updated with my latest photography and behind-the-scenes content
              </p>
              
              {/* Social media buttons */}
              <div className="social-links">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label={`Follow on ${social.platform}`}
                  >
                    {/* Instagram icon */}
                    {social.icon === "instagram" && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <rect x="2" y="2" width="20" height="20" rx="5" strokeWidth="2"/>
                        <circle cx="12" cy="12" r="4" strokeWidth="2"/>
                        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
                      </svg>
                    )}
                    
                    {/* Facebook icon */}
                    {social.icon === "facebook" && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    )}
                    
                    {/* Pinterest icon */}
                    {social.icon === "pinterest" && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                      </svg>
                    )}
                    
                    <span>{social.platform}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Business hours */}
            <div className="hours-section">
              <h3 className="info-title">Business Hours</h3>
              <div className="hours-list">
                <div className="hours-item">
                  <span className="hours-day">Monday - Friday</span>
                  <span className="hours-time">9:00 AM - 6:00 PM</span>
                </div>
                <div className="hours-item">
                  <span className="hours-day">Saturday</span>
                  <span className="hours-time">10:00 AM - 4:00 PM</span>
                </div>
                <div className="hours-item">
                  <span className="hours-day">Sunday</span>
                  <span className="hours-time">By Appointment</span>
                </div>
              </div>
              <p className="hours-note">
                * Weekend and evening sessions available upon request
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FAQ SECTION ==================== */}
      <section className="faq-section">
        <div className="faq-container">
          {/* Section header */}
          <div className="section-header">
            <span className="section-label">FAQ</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-description">
              Find answers to common questions about my photography services
            </p>
          </div>

          {/* FAQ accordion items */}
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                {/* Question */}
                <h3 className="faq-question">
                  <span className="faq-icon">❓</span>
                  {faq.question}
                </h3>
                {/* Answer */}
                <p className="faq-answer">{faq.answer}</p>
              </div>
            ))}
          </div>

          {/* Still have questions CTA */}
          <div className="faq-cta">
            <p>Still have questions?</p>
            <a href="mailto:elena@elenaramsey.com" className="btn-faq">
              Ask Me Anything
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}