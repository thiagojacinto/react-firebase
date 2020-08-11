import React from "react";

import { MainContent } from "../../components/MainContent";
import { Aside } from "../../components/Aside";

import styled from "styled-components";
import { Link } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";

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

export const Login: React.FC = () => {
  return (
    <LoginWrapper>
      <MainContent>
        <form>
          <fieldset>
            <legend>Login</legend>
            <span>
              Não possui conta? <Link to="/cadastro">Cadastre-se</Link>
            </span>

            <Input type="email" labelName="E-mail" />
            <Input type="password" labelName="Senha" />
            <Button>Entrar</Button>
          </fieldset>
        </form>
      </MainContent>
      <Aside quote="Inovação orientada por dados." />
    </LoginWrapper>
  );
};

export default Login;
