import React, { useContext } from "react";
import styled from "styled-components";

import firebase from "../../firebase";
import "firebase/firestore";

import MainContent from "../../components/MainContent";
import Aside from "../../components/Aside";
import Button from "../../components/Button";
import { Topbar } from "../../components/Topbar";
import { Comment } from "../../components/Comment";
import { AuthUserContext } from "../../context/AuthProvider";
export const MuralWrapper = styled.main`
  width: 92%;
  height: 150vh;
  margin-left: 5%;
  margin-right: 3%;

  font-size: large;
  font-weight: 500;

  display: grid;
  grid-template-rows: 10% 35% 55%;
  grid-template-columns: 1fr;
  grid-template-areas:
    "aside"
    "main"
    "comments";

  & aside {
    grid-area: aside;
    & img {
      max-height: 100%;
    }
  }

  & > section {
    grid-area: main;
    min-height: 100%;
    width: 100%;

    overflow-y: scroll;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-evenly;

    & fieldset {
      border: none;
      padding: 0;

      & legend {
        color: ${(props) => props.theme.highlight};
        font-weight: 500;
        font-size: 4.75rem;
        padding-bottom: 2.6rem;
      }

      & textarea {
        max-width: 42rem;
        max-height: 10rem;
        display: block;

        border: 1px solid ${(props) => props.theme.highlight};
        border-radius: 5px;
      }
    }
  }

  & .mural__comments {
    grid-area: comments;
    height: 100%;
    overflow-y: scroll;
    /* padding-right: 10rem; */
    font-weight: 300;

    & h1 {
      color: ${(props) => props.theme.highlight};
      font-weight: 500;
      font-size: 4.75rem;
    }
  }

  @media (min-width: 700px) {
    grid-template-rows: 2fr 3fr;
    grid-template-columns: 2fr 1fr;
    grid-template-areas: "main  aside" "comments comments";
  }
`;

type Usuario = {
  name: string;
  programa: string;
  time: string;
};

type Autor = {
  id: string;
  nome: string;
};

type Comentario = {
  conteúdo: string;
  autor: Autor;
  createdAt: number;
};

export const Mural: React.FC = () => {
  const authContext = useContext(AuthUserContext);
  let [comments, setComments] = React.useState<Array<Comentario | undefined>>(
    []
  );
  let [usuario, setUsuario] = React.useState({} as Usuario);

  const handleComments = (usuario: any) => {
    if (usuario?.programa === undefined) return;

    const store = firebase.firestore();
    store
      .collection("Programas")
      .doc("negocios-2020")
      .collection("Times")
      .doc(usuario?.time)
      .collection("Comentários")
      .orderBy("createdAt", "desc")
      .limit(5)
      .get()
      .then((comentarios) => {
        setComments([]);
        comentarios.forEach((comentario) => {
          const novoComentario = comentario.data();
          // console.log(novoComentario);  // DEBUG
          setComments((prev) => [...prev, novoComentario as Comentario]);
        });
      });
  };

  React.useEffect(() => {
    let idUsuario = authContext.usuarioLogado?.uid;
    if (idUsuario === undefined) return;

    const store = firebase.firestore();
    store
      .collection("Usuarios")
      .doc(idUsuario)
      .get()
      .then((res) => {
        const userData = res.data();

        setUsuario(userData as Usuario);
        handleComments(userData as Usuario);
      });
  }, [authContext]);

  return (
    <MuralWrapper>
      <MainContent>
        <Topbar
          nome={usuario?.name}
          time={usuario?.time}
          programa={usuario?.programa}
        />
        <form>
          <fieldset>
            <legend>Comentários</legend>
            <label htmlFor="textarea">Mensagem</label>
            <textarea cols={35} rows={3} name="textarea"></textarea>

            <Button>Adicionar</Button>
          </fieldset>
        </form>
      </MainContent>
      <Aside quote="" />

      <section className="mural__comments">
        <h1>Últimos comentários</h1>

        {comments.length > 1 &&
          comments.map((comment) => {
            return (
              <Comment
                key={comments.indexOf(comment)}
                autor={comment?.autor.nome}
                conteudo={comment?.conteúdo}
              />
            );
          })}
      </section>
    </MuralWrapper>
  );
};

export default Mural;
