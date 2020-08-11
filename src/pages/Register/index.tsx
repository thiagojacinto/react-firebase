import React from "react";
import { Link } from "react-router-dom";

import { LoginWrapper as Wrapper } from "../Login";
import MainContent from "../../components/MainContent";
import Aside from "../../components/Aside";
import Input from "../../components/Input";
import Button from "../../components/Button";

const RegisterWrapper = Wrapper;

const Register: React.FC = () => {
  return (
    <RegisterWrapper>
      <MainContent>
        <form>
          <fieldset>
            <legend>Cadastro</legend>
            <span>
              Já possui conta? <Link to="/">Entrar</Link>
            </span>

            <Input type="name" labelName="Nome" />
            <Input type="email" labelName="E-mail" />
            <Input type="password" labelName="Senha" />
            <Button>Cadastrar</Button>
          </fieldset>
        </form>
      </MainContent>
      <Aside />
    </RegisterWrapper>
  );
};

export default Register;
