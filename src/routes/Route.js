import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import AuthLayout from "~/pages/_layouts/auth"; // Graças ao RootImport, podemos utilizar o sinal de til para que ele parta sempre da pasta src conforme configurado no config.overrides.js na raiz do projeto.
import DefaultLayout from "~/pages/_layouts/default";

import { store } from "~/store";

export default function RouterWrapper({
  component: Component,
  isPrivate,
  ...rest // restante das propriedades de navegacao.
}) {
  /*
    Acessando o estado de signed no store.
    getState retorna o valor do estado, seguido pelo nome do reducer.
  */
  const { signed } = store.getState().auth;

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }

  // Carregando o layout baseado na autenticacao do usuario.
  const Layout = signed ? DefaultLayout : AuthLayout;

  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )} // Caso o usuario esteja logado e tentando acessar um rota privada, então vamos retornar nosso proprio componente de navegacao.
    />
  );
}

// Validações de propriedades.
RouterWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired
};

RouterWrapper.defaultProps = {
  isPrivate: false
};
