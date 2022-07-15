import React from "react";
import * as ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import SceneGallery from "./components/sceneGallery/sceneGallery";

const container: HTMLElement | null = document.getElementById("root");

if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <CssBaseline>
      <SceneGallery />
    </CssBaseline>
  );
}
