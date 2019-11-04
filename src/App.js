import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";

// Importante o reactron para capturar os logs para fazer o debug quando necessário.
import "./config/ReactotronConfig";

// A importação do store, tem que ser depois da importação do Reactotron para que funciona o SagaMonitor.
import store from "./store";

import Routes from "./routes";
import history from "./services/history";

import GlobalStyle from "./styles/global";

function App() {
  return (
    /* Provider faz com que o Stored do Redux esteja disponíveis para quaisquer componentes */
    <Provider store={store}>
      <Router history={history}>
        <Routes />;
        <GlobalStyle />
      </Router>
    </Provider>
  );
}

export default App;
