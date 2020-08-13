import React, { useContext, useEffect } from "react";
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

export const Mural: React.FC = () => {
  const authContext = useContext(AuthUserContext);
  let usuarioId = authContext.usuarioLogado?.uid;

  let [usuarios, setUsuarios] = React.useState();

  useEffect(() => {
    const getUser = async () => {
      const database = firebase.firestore();
      await database
        .collection("Usuarios")
        .doc(usuarioId)
        .get()
        .then((res) => setUsuarios(res.data()))
        .catch((err) => console.error);

      console.log(usuarios);
    };
    getUser();
  }, []);

  const ipsum = [
    "Mussum Ipsum, cacilds vidis litro abertis. Mé faiz elementum girarzis, nisi eros vermeio. Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis. Admodum accumsan disputationi eu sit. Vide electram sadipscing et per. Si num tem leite então bota uma pinga aí cumpadi!",
    "Aenean aliquam molestie leo, vitae iaculis nisl. Diuretics paradis aliquet nunc non turpis scelerisque, eget. Todo mundo vê os porris num copo é motivis de denguis. Praesent vel viverra nisi. Mauris que eu tomo, mas ninguém vê os tombis que eu levo!",
    "Posuere libero varius. Nullam a nisl ut ante blandit hendrerit.  Aenean sit amet nisi. Nullam volutpat risus nec leo commodo, ut  interdum diam laoreet. Sed non consequat odio. Quem manda na minha  terra sou euzis! Delegadis gente finis, bibendum egestas arcu ut est.",
  ];

  return (
    <MuralWrapper>
      <MainContent>
        <Topbar
          // programa={usuario !== {} ? usuario?.programa : ""}
          // time={usuario?.time}
          // usuario={usuario?.name}
          programa="Negócios 2020"
          time="Databizz"
          usuario={`${usuarioId}`}
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
        <Comment autor="Autor 1" conteudo={ipsum[0]} />
        <Comment autor="Autor 2" conteudo={ipsum[1]} />
        <Comment autor="Autor 3" conteudo={ipsum[2]} />
      </section>
    </MuralWrapper>
  );
};

export default Mural;
