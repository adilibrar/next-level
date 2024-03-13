import React, { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoute from "./route/AppRoute";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <AppRoute></AppRoute>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
