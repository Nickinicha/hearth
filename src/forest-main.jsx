import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ForestScene } from "./components/forest/ForestScene.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ForestScene
      onComplete={(data) => {
        console.info("Forest scene complete", data);
      }}
    />
  </React.StrictMode>
);
