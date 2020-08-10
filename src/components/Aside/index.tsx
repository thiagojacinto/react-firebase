import React from "react";
import styled from "styled-components";

import DataBizzBackground from "../../assets/images/bg.svg";
import Logo from "../../assets/images/logo.svg";

const AsideWrapper = styled.aside`
  width: 100%;
  height: 100%;

  background: url(${DataBizzBackground}) no-repeat;
  background-color: var(--purple-darker);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  img {
    max-width: 16.875rem;
  }

  p {
    word-wrap: normal;
    font-weight: 500;
    font-size: 3.063rem;
    color: var(--white);
    padding: 0 4rem;
  }
`;

interface QuoteAside {
  quote?: string;
}

export const Aside: React.FC<QuoteAside> = ({ quote }) => {
  return (
    <AsideWrapper>
      <img src={Logo} alt="DATABIZZ LOGO" />

      <p>{quote}</p>
    </AsideWrapper>
  );
};

export default Aside;
