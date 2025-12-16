import Sunset from "../assets/about/Sunset.png";

export default function About() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem" }}>
      
      {/* Hero Section */}
      <img
        src={Sunset}
        alt="Hero"
        style={{
          width: "100%",
          height: "260px",
          objectFit: "cover",
          borderRadius: "10px",
          marginBottom: "2rem"
        }}
      />

      {/* Profile + Bio */}
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        
        {/* Portrait */}
        <img
          src="/src/assets/about/Elena Ramsey.jpg"
          alt="Photographer portrait"
          style={{
            width: "180px",
            height: "180px",
            objectFit: "cover",
            borderRadius: "100px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
          }}
        />

        {/* Text */}
        <div>
          <h1 style={{ marginBottom: "0.5rem" }}>Hi, I’m Elena!</h1>
          <p style={{ lineHeight: 1.6 }}>
            I’m a new up and coming photographer based in Colorado. I specialize in 
            weddings, couples, and lifestyle portrait sessions. Photography lets 
            me capture moments that tell stories — the real, the candid, and the 
            meaningful. I capture God's beauty the best I can in my photos.
          </p>

          <p style={{ marginTop: "1rem", lineHeight: 1.6 }}>
            When I'm not behind the camera, you can find me spending time with my husband
            and my family. We enjoy hiking, traveling, trying new foods, and exploring
            life together. Every day is an adventure.
          </p>

          <button
            style={{
              marginTop: "1.2rem",
              padding: "0.8rem 1.5rem",
              background: "black",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "1rem"
            }}
            onClick={() => (window.location.href = "/contact")}
          >
            Book a Session
          </button>
        </div>
      </div>
    </div>
  );
}
