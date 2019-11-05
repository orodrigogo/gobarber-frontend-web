import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";

// Importante o reactron para capturar os logs para fazer o debug quando necessário.
import "./config/ReactotronConfig";

// A importação do store, tem que ser depois da importação do Reactotron para que funciona o SagaMonitor.
import { store, persistor } from "./store";

import Routes from "./routes";
import history from "./services/history";

import GlobalStyle from "./styles/global";

function App() {
  return (
    /* Provider faz com que o Stored do Redux esteja disponíveis para quaisquer componentes */
    <Provider store={store}>
      {/* PersistGate renderiza os conteudos de nossas rotas somente depois de ter buscado as informações no storaged na nossa aplicação.  */}
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Routes />;
          <GlobalStyle />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
