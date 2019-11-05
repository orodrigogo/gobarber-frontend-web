/*
  Full Docs: https://redux-saga.js.org/docs/api/

  Redux Saga é uma biblioteca que visa criar efeitos colaterais. Ela ficará escutando as Actions que pedirmos para disparar Sagas.

  #takeLatest: executa sempre a última solicitação. Por exemplo, se o usuário clicar 30x em um botão que dispara uma ação. O takeLatest cancela automaticamente
  qualquer saga tarefa iniciada anterior e inicia uma nova saga tarefa em segundo plano.

  #call: cria uma descrição Efeito que instrui o middleware para chamar a função.

  #put: dispara uma Action.

  #all: cria uma descrição de efeito que instrui o middleware a executar vários efeitos em paralelo e aguarde a conclusão de todos eles.

*/
import { toast } from "react-toastify";
import { takeLatest, call, put, all } from "redux-saga/effects";
import history from "~/services/history";
import api from "~/services/api";
import { signInSucess, signFailure } from "./actions";

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    /*
      Call retorna uma promisse, por isso usamos o yield.
      Primeiro parametro é método, segundo a url, terceiro os dados que queremos enviar.

    */
    const response = yield call(api.post, "sessions", { email, password });

    const { token, user } = response.data;

    // Verificando se o usuário é um prestador de servico.
    if (!user.provider) {
      toast.error("Usuário não é prestador de serviço!");
      return;
    }

    // Armazenando no axios, no cabecalho das requisicoes o token do usuário.
    api.defaults.headers.Authorization = `Bearer ${token}`;

    // Chama a Action signInSucess da action do auth. E usamos o yield para aguardar o retorno.
    yield put(signInSucess(token, user));

    // Redireciona para a página dashboard.
    history.push("/dashboard");
  } catch (error) {
    // Chama a Action signFailure
    toast.error("Falha na autenticação, verifique seus dados");
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, "users", {
      name,
      email,
      password,
      provider: true
    });

    history.push("/");
  } catch (error) {
    toast.error("Falha no cadastro, verifique seu dados!");

    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    // Caso o usuário dê F5 ou atualize a pagina, recuperamos o token e Armazenando no axios, no cabecalho das requisicoes o token do usuário.
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  // Toda vez que o takeLatest ouvir a informação '@auth/SIGN_IN_REQUEST ele vai chamar a função signIn. Ou seja, definimos a Action e qual ação deverá ser disparada.
  takeLatest("@auth/SIGN_IN_REQUEST", signIn),
  takeLatest("@auth/SIGN_UP_REQUEST", signUp),
  /* A Action persist/REHYDRATE é disparada automaticamente pelo Persist Redux quando os dados do localstoraged são recuperados */
  takeLatest("persist/REHYDRATE", setToken)
]);
