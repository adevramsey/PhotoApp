import React, { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "2rem" }}>
      <h1>Contact Me</h1>
      <p>Fill out the form below to book a session or ask a question.</p>

      {submitted ? (
        <p style={{ marginTop: "2rem", color: "green" }}>
          Thank you! Your message has been sent.
        </p>
      ) : (
        <form
          action="https://formspree.io/f/xeoyvbay"
          method="POST"
          onSubmit={() => setSubmitted(true)}
          style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            style={{ padding: "0.8rem", fontSize: "1rem" }}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            style={{ padding: "0.8rem", fontSize: "1rem" }}
          />
          <select
            name="sessionType"
            style={{ padding: "0.8rem", fontSize: "1rem" }}
          >
            <option value="">Select Session Type (optional)</option>
            <option value="wedding">Wedding</option>
            <option value="portrait">Portrait</option>
            <option value="couple">Couple</option>
            <option value="family">Family</option>
            <option value="other">Other</option>
          </select>
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            required
            style={{ padding: "0.8rem", fontSize: "1rem" }}
          />
          <button
            type="submit"
            style={{
              padding: "0.8rem 1.5rem",
              fontSize: "1rem",
              background: "black",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
}
