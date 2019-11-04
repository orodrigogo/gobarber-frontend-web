import React from "react";
import { Router } from "react-router-dom";

// Importante o reactron para capturar os logs para fazer o debug quando necessário.
import "./config/ReactotronConfig";

import Routes from "./routes";
import history from "./services/history";

import GlobalStyle from "./styles/global";

function App() {
  return (
    <Router history={history}>
      <Routes />;
      <GlobalStyle />
    </Router>
  );
}

export default App;
