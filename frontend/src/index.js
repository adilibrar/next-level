import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "../src/assets/css/body-custom.css";
import axios from "axios";
//import "../src/assets/css/fontawesome.css";
//import "../src/assets/css/animate.min.css";
//import "../src/assets/css/placeholder-loading.min.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
axios.defaults.headers.get["Authorization"] =
  "Token " + sessionStorage.getItem("token");
axios.defaults.headers.delete["Authorization"] =
  "Token " + sessionStorage.getItem("token");
root.render(
  //<React.StrictMode>
    <App />
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
