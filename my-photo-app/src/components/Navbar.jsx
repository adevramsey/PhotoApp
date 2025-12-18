import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "../styles/navbar.css";

export default function Navbar() {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/gallery">Gallery</NavLink>
          <NavLink to="/upload">Upload</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="theme-toggle"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </nav>
  );
}
