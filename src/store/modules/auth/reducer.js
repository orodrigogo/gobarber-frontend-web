/*
  Reducer é quem possui um switch para decidir qual action deverá ser executada
  de acordo com o type.
*/

/*
  Docs full: https://www.infoq.com/news/2019/09/immer-v4-released-oss-award/
  O immer é uma lib para simplificar a manipulação dos estados.
*/
import produce from "immer";

// State inicial do reducer com os valores default/iniciais.
const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    // Manipulação quando a Action @auth/SIGN_IN_SUCCESS for disparada.
    case "@auth/SIGN_IN_SUCCESS":
      return produce(state, draft => {
        draft.token = action.payload.token;
        draft.signed = true;
      });
    default:
      return state;
  }
}
