import createSagaMiddleware from "redux-saga";
import createStore from "./createStore";

import rooReducer from "./modules/rootReducer";
import rootSaga from "./modules/rootSaga";

// sagaMonitor, para capturar todas as Actions disparadas em ambiente de desenvolvimento.
const sagaMonitor =
  process.env.NODE_ENV === "development"
    ? console.tron.createSagaMonitor()
    : null;

// Passamos o sagaMonitor como um elemento de configuração para o Middleware.
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
const middlewares = [sagaMiddleware];

const store = createStore(rooReducer, middlewares);

sagaMiddleware.run(rootSaga);
export default store;
