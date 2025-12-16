import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import { routes } from "./router.jsx";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  return (
    <div
      style={{
        backgroundColor: darkMode ? "#121212" : "#ffffff",
        color: darkMode ? "#ffffff" : "#000000",
        minHeight: "100vh"
      }}
    >
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main style={{ padding: "2rem" }}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {routes.map((r) => {
              const Component = r.component;
              return (
                <Route
                  key={r.path}
                  path={r.path}
                  element={
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Component />
                    </motion.div>
                  }
                />
              );
            })}
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}
