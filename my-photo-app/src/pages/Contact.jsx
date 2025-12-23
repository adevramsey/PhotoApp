import { useState, useEffect } from 'react';
import '../styles/Contact.css';

/**
 * Contact Component - Contact form and business information
 * Features: Form validation, email integration ready, contact info, social links
 */
export default function Contact({ showSuccessToast, showErrorToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Validation rules
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';

      case 'email':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email';
        return '';

      case 'phone':
        if (!value.trim()) return '';
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(value)) return 'Please enter a valid phone number';
        return '';

      case 'subject':
        if (!value.trim()) return 'Subject is required';
        if (value.trim().length < 3) return 'Subject must be at least 3 characters';
        return '';

      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        return '';

      default:
        return '';
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  // Handle input blur
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    // Validate form
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      showErrorToast?.('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Integrate with EmailJS or backend API
      // For now, simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log('Form submitted:', formData);

      // Show success message
      showSuccessToast?.(
        'Message sent successfully! I\'ll get back to you within 24 hours.'
      );

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      setErrors({});
      setTouched({});
    } catch (error) {
      console.error('Form submission error:', error);
      showErrorToast?.(
        'Failed to send message. Please try again or email me directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <p className="contact-hero-subtitle">Get in Touch</p>
          <h1 className="contact-hero-title">Let's Work Together</h1>
          <p className="contact-hero-description">
            Have a project in mind or want to book a session? I'd love to hear from you. 
            Fill out the form below or reach out directly via email or phone.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content">
        <div className="contact-container">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-section">
              <h2 className="section-title">Send a Message</h2>
              <p className="section-description">
                Fill out the form and I'll get back to you within 24 hours.
              </p>

              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                {/* Name Field */}
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={`form-input ${errors.name && touched.name ? 'error' : ''}`}
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                  />
                  {errors.name && touched.name && (
                    <span className="form-error">{errors.name}</span>
                  )}
                </div>

                {/* Email Field */}
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-input ${errors.email && touched.email ? 'error' : ''}`}
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                  />
                  {errors.email && touched.email && (
                    <span className="form-error">{errors.email}</span>
                  )}
                </div>

                {/* Phone Field */}
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Phone <span className="optional">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className={`form-input ${errors.phone && touched.phone ? 'error' : ''}`}
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                  />
                  {errors.phone && touched.phone && (
                    <span className="form-error">{errors.phone}</span>
                  )}
                </div>

                {/* Subject Field */}
                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    Subject <span className="required">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className={`form-input ${errors.subject && touched.subject ? 'error' : ''}`}
                    value={formData.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                  >
                    <option value="">Select a subject</option>
                    <option value="wedding">Wedding Photography</option>
                    <option value="portrait">Portrait Session</option>
                    <option value="event">Event Coverage</option>
                    <option value="landscape">Landscape Prints</option>
                    <option value="other">General Inquiry</option>
                  </select>
                  {errors.subject && touched.subject && (
                    <span className="form-error">{errors.subject}</span>
                  )}
                </div>

                {/* Message Field */}
                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Message <span className="required">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className={`form-input form-textarea ${errors.message && touched.message ? 'error' : ''}`}
                    placeholder="Tell me about your project or inquiry..."
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                  ></textarea>
                  {errors.message && touched.message && (
                    <span className="form-error">{errors.message}</span>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="form-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="contact-info-section">
              <h2 className="section-title">Contact Information</h2>
              <p className="section-description">
                Prefer to reach out directly? Here's how you can contact me.
              </p>

              <div className="contact-info-list">
                {/* Email */}
                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 6l-10 7L2 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="contact-info-content">
                    <h3 className="contact-info-title">Email</h3>
                    <a href="mailto:elena@elenaramseyphoto.com" className="contact-info-link">
                      elena@elenaramseyphoto.com
                    </a>
                    <p className="contact-info-text">Response within 24 hours</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="contact-info-content">
                    <h3 className="contact-info-title">Phone</h3>
                    <a href="tel:+15551234567" className="contact-info-link">
                      (555) 123-4567
                    </a>
                    <p className="contact-info-text">Mon-Fri, 9am-6pm PST</p>
                  </div>
                </div>

                {/* Location */}
                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="10" r="3" strokeWidth="2"/>
                    </svg>
                  </div>
                  <div className="contact-info-content">
                    <h3 className="contact-info-title">Location</h3>
                    <p className="contact-info-link">Seattle, Washington</p>
                    <p className="contact-info-text">Available for travel</p>
                  </div>
                </div>

                {/* Social Media */}
                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M17.5 6.5h.01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="contact-info-content">
                    <h3 className="contact-info-title">Follow Me</h3>
                    <div className="social-links">
                      <a href="https://instagram.com/elenaramseyphoto" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5z" strokeWidth="2"/>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" strokeWidth="2"/>
                          <path d="M17.5 6.5h.01" strokeWidth="2"/>
                        </svg>
                      </a>
                      <a href="https://facebook.com/elenaramseyphoto" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </a>
                      <a href="https://pinterest.com/elenaramseyphoto" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Pinterest">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M12 2C6.5 2 2 6.5 2 12c0 4.2 2.6 7.8 6.3 9.3-.1-.8-.1-2.1 0-3 .1-.8.8-3.5.8-3.5s-.2-.4-.2-1c0-1 .6-1.7 1.3-1.7.6 0 .9.5.9 1 0 .6-.4 1.6-.6 2.4-.2.8.4 1.4 1.2 1.4 1.4 0 2.5-1.5 2.5-3.6 0-1.9-1.4-3.2-3.3-3.2-2.3 0-3.6 1.7-3.6 3.5 0 .7.3 1.4.6 1.8.1.1.1.2.1.3-.1.3-.2.8-.2 1-.1.2-.2.3-.4.2-1-.5-1.6-2-1.6-3.2 0-2.6 1.9-5 5.4-5 2.8 0 5 2 5 4.7 0 2.8-1.8 5.1-4.2 5.1-.8 0-1.6-.4-1.8-.9 0 0-.4 1.5-.5 1.9-.2.7-.7 1.5-1 2 .8.2 1.6.4 2.4.4 5.5 0 10-4.5 10-10S17.5 2 12 2z" strokeWidth="2"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="business-hours">
                <h3 className="business-hours-title">Business Hours</h3>
                <div className="business-hours-list">
                  <div className="business-hours-item">
                    <span className="day">Monday - Friday</span>
                    <span className="time">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="business-hours-item">
                    <span className="day">Saturday</span>
                    <span className="time">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="business-hours-item">
                    <span className="day">Sunday</span>
                    <span className="time">By Appointment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="contact-faq">
        <div className="contact-faq-container">
          <div className="section-header">
            <p className="section-subtitle">FAQ</p>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>

          <div className="faq-grid">
            <div className="faq-item">
              <h3 className="faq-question">How far in advance should I book?</h3>
              <p className="faq-answer">
                For weddings, I recommend booking 6-12 months in advance. Portrait and event 
                sessions can typically be scheduled 2-4 weeks out, depending on availability.
              </p>
            </div>

            <div className="faq-item">
              <h3 className="faq-question">What's your pricing structure?</h3>
              <p className="faq-answer">
                Pricing varies based on the type of session, location, and package selected. 
                Contact me for a detailed quote tailored to your specific needs.
              </p>
            </div>

            <div className="faq-item">
              <h3 className="faq-question">Do you travel for sessions?</h3>
              <p className="faq-answer">
                Yes! I'm based in Seattle but available for travel throughout the Pacific 
                Northwest and beyond. Travel fees may apply for locations outside the metro area.
              </p>
            </div>

            <div className="faq-item">
              <h3 className="faq-question">How long until I receive my photos?</h3>
              <p className="faq-answer">
                Most sessions are delivered within 2-3 weeks. Wedding galleries typically take 
                4-6 weeks due to the extensive editing process. Rush delivery is available.
              </p>
            </div>

            <div className="faq-item">
              <h3 className="faq-question">What happens if it rains?</h3>
              <p className="faq-answer">
                We'll monitor the weather closely and have a backup plan. For outdoor sessions, 
                we can reschedule at no charge. I also embrace moody weather for unique shots!
              </p>
            </div>

            <div className="faq-item">
              <h3 className="faq-question">Can I request specific editing styles?</h3>
              <p className="faq-answer">
                Absolutely! During our consultation, we'll discuss your vision and preferences. 
                I'm happy to accommodate specific editing requests while maintaining my signature style.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}