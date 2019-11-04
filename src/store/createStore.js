import { createStore, compose, applyMiddleware } from "redux";

/*
  compose é um utilitário do redux que permite passar aprimoradores para a Store.
  Neste caso, a constante enhancer é criada para caso esteja em ambiente dev injetamos o console.tron
  Caso não, passamos apenas os middlewares usando operador de sprad (...) uma vez que, recebemos um array de middlewares e assim criamos a store.
*/

export default (reducers, middlewares) => {
  // createEnhancer é a integração do redux com o reactotron
  const enhancer =
    process.env.NODE_ENV === "development"
      ? compose(
          console.tron.createEnhancer(),
          applyMiddleware(...middlewares)
        )
      : applyMiddleware(...middlewares);

  return createStore(reducers, enhancer);
};
