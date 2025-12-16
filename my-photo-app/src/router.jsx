import Home from "./pages/Home.jsx";
import Gallery from "./pages/Gallery.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import Projects from "./components/Projects.jsx";

// Named export — only components, NOT JSX
export const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/gallery", name: "Gallery", component: Gallery },
  { path: "/about", name: "About", component: About },
  { path: "/contact", name: "Contact", component: Contact },
  { path: "/projects", name: "Projects", component: Projects },
  { path: "*", name: "NotFound", component: Home } // Fallback route
];
