/*
 O all de effects, ermite passar uma lista de objeto de efeitos com rótulos, assim como corrida.
*/
import { all } from "redux-saga/effects";

import auth from "./auth/sagas";

export default function* rootSaga() {
  // Dentro vamos ter todos os Sagas, em que, os Sagas capturam todas as Actions que definirmos.
  return yield all([auth]);
}
