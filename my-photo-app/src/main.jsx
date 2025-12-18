import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { PhotoStoreProvider } from "./hooks/usePhotoStore.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <ThemeProvider>
        <PhotoStoreProvider>
          <App />
        </PhotoStoreProvider>
      </ThemeProvider>
    </BrowserRouter>
);
