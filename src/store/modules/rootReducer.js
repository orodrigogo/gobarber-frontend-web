/*
  A função auxiliar combineReducers junta todos os
  reducing em uma única função para passar para createStore.
*/
import { combineReducers } from "redux";

// Importando todos os Reducers.
import auth from "./auth/reducer";

// Passando como objeto todos os reducer para unificar.
export default combineReducers({ auth });
