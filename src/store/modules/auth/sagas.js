/*
  Full Docs: https://redux-saga.js.org/docs/api/

  Redux Saga é uma biblioteca que visa criar efeitos colaterais. Ela ficará escutando as Actions que pedirmos para disparar Sagas.

  #takeLatest: executa sempre a última solicitação. Por exemplo, se o usuário clicar 30x em um botão que dispara uma ação. O takeLatest cancela automaticamente
  qualquer saga tarefa iniciada anterior e inicia uma nova saga tarefa em segundo plano.

  #call: cria uma descrição Efeito que instrui o middleware para chamar a função.

  #put: cria uma descrição de efeito que instrui o middleware a colocar uma ação no canal fornecido.

  #all: cria uma descrição de efeito que instrui o middleware a executar vários efeitos em paralelo e aguarde a conclusão de todos eles.

*/

import { takeLatest, call, put, all } from "redux-saga/effects";
import history from "~/services/history";
import api from "~/services/api";
import { signInSucess } from "./actions";

export function* signIn({ payload }) {
  const { email, password } = payload;

  /*
    Call retorna uma promisse, por isso usamos o yield.
    Primeiro parametro é método, segundo a url, terceiro os dados que queremos enviar.

  */
  const response = yield call(api.post, "sessions", { email, password });

  const { token, user } = response.data;

  // Verificando se o usuário é um prestador de servico.
  if (!user.provider) {
    console.tron.error("Usuário não é prestador de serviço!");
    return;
  }

  // Chama a Action signInSucess da action do auth. E usamos o yield para aguardar o retorno.
  yield put(signInSucess(token, user));

  // Redireciona para a página dashboard.
  history.push("/dashboard");
}

export default all([
  // Toda vez que o takeLatest ouvir a informação '@auth/SIGN_IN_REQUEST ele vai chamar a função signIn. Ou seja, definimos a Action e qual ação deverá ser disparada.
  takeLatest("@auth/SIGN_IN_REQUEST", signIn)
]);
