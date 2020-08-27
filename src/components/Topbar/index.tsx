import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import firebase from "../../firebase";

export const Header = styled.header`
  color: ${(props) => props.theme.color};
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  font-weight: 500;

  h1 {
    font-size: 3.5rem;
  }

  h4 {
    font-size: 2rem;
    font-weight: 300;
  }
  .commands {
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    margin-right: 8rem;

    & h3 {
      font-size: 2rem;
      font-weight: 500;
    }
    & a {
      color: ${(props) => props.theme.color};
      font-weight: 300;
      font-size: 1.9rem;
    }
  }
`;

type HeaderProps = {
  time: string;
  programa: string;
  nome: string;
};

export const Topbar: React.FC<HeaderProps> = ({ nome, time, programa }) => {
  const handleLogout = ():
    | ((event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => void)
    | undefined => {
    return () => firebase.auth().signOut();
  };

  return (
    <Header>
      <section>
        <h4>{programa}</h4>
        <h1>{time}</h1>
      </section>

      <div className="commands">
        <h3>{nome}</h3>
        <Link to="/">
          <p onClick={handleLogout()}>Sair</p>
        </Link>
      </div>
    </Header>
  );
};

export default Topbar;
