import { useNavigate } from "react-router-dom";
import Sunset from "../assets/about/sunset.png";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "2rem",
        textAlign: "center"
      }}
    >
      {/* Hero Image */}
      <img
        src={Sunset}
        alt="Photography hero"
        style={{
          width: "100%",
          maxHeight: "420px",
          objectFit: "cover",
          borderRadius: "12px",
          marginBottom: "2rem"
        }}
      />

      {/* Title */}
      <h1
        style={{
          fontSize: "2.5rem",
          marginBottom: "0.5rem",
          fontWeight: 600
        }}
      >
        Elena Photography
      </h1>

      {/* Tagline */}
      <p
        style={{
          fontSize: "1.2rem",
          maxWidth: "700px",
          margin: "0 auto 2rem",
          lineHeight: 1.6,
          opacity: 0.85
        }}
      >
        I take photos of God's beautiful creation and natural moments of life.
      </p>

      {/* Actions */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          flexWrap: "wrap"
        }}
      >
        <button
          onClick={() => navigate("/gallery")}
          style={{
            padding: "0.8rem 1.6rem",
            fontSize: "1rem",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer"
          }}
        >
          View Gallery
        </button>

        <button
          onClick={() => navigate("/contact")}
          style={{
            padding: "0.8rem 1.6rem",
            fontSize: "1rem",
            borderRadius: "8px",
            border: "1px solid #000",
            background: "transparent",
            cursor: "pointer"
          }}
        >
          Contact Me
        </button>
      </div>
    </div>
  );
}
