import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import { routes } from "./router.jsx";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />

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
    </>
  );
}
