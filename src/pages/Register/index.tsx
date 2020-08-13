import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { AuthUserContext } from "../../context/AuthProvider";
import firebase from "../../firebase";
import "firebase/auth";
import "firebase/firestore";

import { LoginWrapper as Wrapper } from "../Login";
import MainContent from "../../components/MainContent";
import Aside from "../../components/Aside";
import Input from "../../components/Input";
import Button from "../../components/Button";

const RegisterWrapper = Wrapper;

interface dadosCadastro {
  name: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const authContext = useContext(AuthUserContext);
  let history = useHistory();
  let [novoUsuario, setNovoUsuario] = useState({
    name: "",
    email: "",
    password: "",
  } as dadosCadastro);

  // function handleClick() {
  //   history.push("/");
  // }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const { name, value } = event.target;

    setNovoUsuario({
      ...novoUsuario,
      [name]: value,
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    firebase
      .auth()
      .createUserWithEmailAndPassword(novoUsuario.email, novoUsuario.password)
      .then((credencial: firebase.auth.UserCredential) => {
        authContext.setUsuarioLogado(credencial.user);
        const store = firebase.firestore();

        store
          .collection("Usuarios")
          .doc(credencial.user!.uid)
          .set({
            email: novoUsuario.email,
            name: novoUsuario.name,
            programa: "Negócios 2020",
            time: "Databizz",
            createdAt: firebase.firestore.Timestamp.now(),
          })
          .then(() => {
            console.log("- - Usuário criado - -");

            setNovoUsuario({
              name: "",
              email: "",
              password: "",
            });

            history.push(`/comentarios/${credencial.user?.uid}`);
          })
          .catch((error) => {
            console.error(error); // DEBUG
            alert(error.code);
          });
      });
  }

  return (
    <RegisterWrapper>
      <MainContent>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Cadastro</legend>
            <span>
              Já possui conta? <Link to="/">Entrar</Link>
            </span>

            <Input onchange={handleChange} type="name" labelName="Nome" />
            <Input onchange={handleChange} type="email" labelName="E-mail" />
            <Input onchange={handleChange} type="password" labelName="Senha" />
            <Button>Cadastrar</Button>
          </fieldset>
        </form>
      </MainContent>
      <Aside />
    </RegisterWrapper>
  );
};

export default Register;
