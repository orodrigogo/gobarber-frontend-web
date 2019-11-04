/*
  Reducer é quem possui um switch para decidir qual action deverá ser executada
  de acordo com o type.
  */

const INITIAL_STATE = {}; // State inicial do reducer.

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    default:
      return state;
  }
}
