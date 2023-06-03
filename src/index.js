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
// import { StoreProvider } from "easy-peasy";
// import { store } from "./store";
// import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <StoreProvider value={store}> */}
    {/* <Provider value={store}> */}
    <Router>
      <App />
    </Router>
    {/* </Provider> */}
    {/* </StoreProvider> */}
  </React.StrictMode>
);
