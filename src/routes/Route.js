import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

export default function RouterWrapper({
  component: Component,
  isPrivate,
  ...rest // restante das propriedades de navegacao.
}) {
  const signed = false;

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Route
      {...rest}
      component={Component} // Caso o usuario esteja logado e tentando acessar um rota privada, então vamos retornar nosso proprio componente de navegacao.
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
