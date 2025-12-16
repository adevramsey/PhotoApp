import { NavLink } from "react-router-dom";

export default function Navbar({ darkMode, setDarkMode }) {
  const linkStyle = ({ isActive }) => ({
    textDecoration: "none",
    margin: "0 0.75rem",
    fontWeight: isActive ? 700 : 500,
    color: darkMode ? "#ffffff" : "#000000",
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
  });

  return (
    <nav
      style={{
        backgroundColor: darkMode ? "#121212" : "#ffffff",
        borderBottom: darkMode ? "1px solid #333" : "1px solid #ddd",
        padding: "1rem 2rem"
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center"
        }}
      >
        {/* Center navigation links */}
        <div style={{ flex: 1, textAlign: "center" }}>
          <NavLink to="/" style={linkStyle}>
            Home
          </NavLink>
          <NavLink to="/about" style={linkStyle}>
            About
          </NavLink>
          <NavLink to="/projects" style={linkStyle}>
            Projects
          </NavLink>
          <NavLink to="/contact" style={linkStyle}>
            Contact
          </NavLink>
        </div>

        {/* Theme toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            padding: "0.45rem 0.9rem",
            borderRadius: "6px",
            border: darkMode ? "1px solid #555" : "1px solid #ccc",
            backgroundColor: darkMode ? "#1f1f1f" : "#f4f4f4",
            color: darkMode ? "#ffffff" : "#000000",
            fontSize: "0.9rem",
            fontFamily:
              "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            cursor: "pointer"
          }}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </nav>
  );
}

//TODO: add mobile responsive hamburger menu