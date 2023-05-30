import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import "./Css/header.css";
import "./Css/nav.css";
import "./Css/home.css";
import "./Css/postpage.css";
import "./Css/newpost.css";
import "./Css/about.css";
import "./Css/footer.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
  </Router>
);
