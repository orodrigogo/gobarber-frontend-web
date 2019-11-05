import React from "react";
// useDispatch é utilizada para disparar uma Action no redux.
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Input } from "@rocketseat/unform";
import * as Yup from "yup";
import logo from "~/assets/logo.svg";

// A função que a tela de login tem que disparar para que o Saga escute/capture ela.
import { signInRequest } from "~/store/modules/auth/actions";

// Criando o schema de validação do Yup.
const schema = Yup.object().shape({
  email: Yup.string()
    .email("Insira um e-mail válido")
    .required("O e-mail é obrigatório"),
  password: Yup.string().required("A senha é obrigatória")
});

export default function SignIn() {
  // Inicializa o useDispatch.
  const dispath = useDispatch();
  // Recuperando o state dentro do reducer auth, na propriedade loading.
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    // Dispara a Action signInRequest passando email e password como parametros.
    dispath(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input name="password" type="password" placeholder="Sua senha" />

        <button type="submit">{loading ? "Carregando..." : "Acessar"}</button>
        <Link to="/register">Criar conta gratuita</Link>
      </Form>
    </>
  );
}
