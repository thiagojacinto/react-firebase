import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { LoginWrapper as Wrapper } from "../Login";
import MainContent from "../../components/MainContent";
import Aside from "../../components/Aside";
import Button from "../../components/Button";

const NotFoundWrapper = styled(Wrapper)`
  section > div {
    width: 80%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    & h1 {
      color: ${(props) => props.theme.highlight};
      font-weight: 500;
      font-size: 4.75rem;
      padding: 8% 0;
    }

    & p {
      color: ${(props) => props.theme.color};
      font-weight: 400;
    }

    & button {
      width: 100%;
    }
  }

  @media (min-width: 700px) {
    section > div button {
      width: auto;
    }
  }
`;

interface ErrorPage {
  error?: string;
}

const NotFound: React.FC<ErrorPage> = ({ error = "404" }) => {
  let history = useHistory();

  function handleBack() {
    history.push("/");
  }

  return (
    <NotFoundWrapper>
      <MainContent>
        <div>
          <h1>Erro {error}</h1>

          <p>
            Verifique se a URL está correta ou entre em contato conosco para
            identificarmos o que aconteceu. :(
          </p>
          <Button onClick={handleBack}>Voltar</Button>
        </div>
      </MainContent>
      <Aside />
    </NotFoundWrapper>
  );
};

export default NotFound;
