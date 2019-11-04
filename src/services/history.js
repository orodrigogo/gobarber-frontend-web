/*
  Vamos usar o history para chamar navegacao de tela de todos os lugares da aplicacao, inclussive de dentro do reduxy.
  Assim, não vamos precisar criar sempre o history, só usar esse já criado.
*/
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

export default history;
