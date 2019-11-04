import React from "react";
import { Router } from "react-router-dom";

// Importante o reactron para capturar os logs para fazer o debug quando necessário.
import "./config/ReactotronConfig";

import Routes from "./routes";
import history from "./services/history";

function App() {
  return (
    <Router history={history}>
      <Routes />;
    </Router>
  );
}

export default App;
