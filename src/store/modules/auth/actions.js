export function signInRequest(email, password) {
  return {
    type: "@auth/SIGN_IN_REQUEST",
    payload: { email, password } // payload são as informações que recebemos por parâmetro.
  };
}

export function signInSucess(token, user) {
  return {
    type: "@auth/SIGN_IN_SUCCESS",
    payload: { token, user } // payload são as informações que recebemos por parâmetro.
  };
}

export function signFailure() {
  return {
    type: "@auth/SIGN_FAILURE"
  };
}
