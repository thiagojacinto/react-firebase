import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Link, useHistory, Redirect } from "react-router-dom";

import { MainContent } from "../../components/MainContent";
import { Aside } from "../../components/Aside";
import Input from "../../components/Input";
import Button from "../../components/Button";

import { auth } from "../../firebase";
import { AuthUserContext } from "../../context/AuthProvider";

export const LoginWrapper = styled.main`
  width: 100%;
  height: 100%;

  font-size: large;
  font-weight: 500;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 65% 1fr;
  grid-template-areas: "main" "aside";

  section {
    grid-area: main;

    overflow-y: scroll;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    & form {
      width: 60%;
    }
  }

  section fieldset {
    border: none;
    padding: 0;

    & legend {
      color: ${(props) => props.theme.highlight};
      font-weight: 500;
      font-size: 4.75rem;
      padding: 10% 0;
    }

    & span {
      color: ${(props) => props.theme.color};
      display: block;
      margin-bottom: 10%;
    }

    & span a {
      color: ${(props) => props.theme.highlight};
    }

    & button {
      width: 100%;
    }
  }

  aside {
    grid-area: aside;
  }

  @media (min-width: 700px) {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 60% 1fr;
    grid-template-areas: "main aside";

    section fieldset button {
      width: auto;
      float: right;
    }
  }
`;

interface dadosUsuario {
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const authContext = useContext(AuthUserContext);
  let history = useHistory();

  let [credenciais, setCredenciais] = useState({
    email: "",
    password: "",
  } as dadosUsuario);

  if (authContext.usuarioLogado) {
    return <Redirect to={`/comentarios/${authContext.usuarioLogado?.uid}`} />;
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const { name, value } = event.target;

    setCredenciais({
      ...credenciais,
      [name]: value,
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(credenciais.email, credenciais.password)
      .then((result) => {
        authContext.setUsuarioLogado(result);
        // console.table(result.user?.providerData); // DEBUG
        history.push(`/comentarios/${result.user?.uid}`);
      })
      .catch((error) => {
        console.error(error); // DEBUG
        alert(error.code);
      });

    setCredenciais({
      email: "",
      password: "",
    } as dadosUsuario);
  }

  return (
    <LoginWrapper>
      <MainContent>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Login</legend>
            <span>
              Não possui conta? <Link to="/cadastro">Cadastre-se</Link>
            </span>

            <Input onchange={handleChange} type="email" labelName="E-mail" />
            <Input onchange={handleChange} type="password" labelName="Senha" />
            <Button>Entrar</Button>
          </fieldset>
        </form>
      </MainContent>
      <Aside quote="Inovação orientada por dados." />
    </LoginWrapper>
  );
};

export default Login;
