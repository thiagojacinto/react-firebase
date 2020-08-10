import React from "react";

import styled from "styled-components";

const ButtonWrapper = styled.button`
  margin: 3rem 0;
  padding: 1rem 3rem;
  font-weight: 500;
  font-size: larger;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.theme.highlight};
  color: ${(props) => props.theme.bg};
  opacity: 1;
  transition: opacity 0.3s;

  &:hover,
  &:focus {
    opacity: 0.8;
  }
`;

export const Button: React.FC = ({ children }) => {
  return <ButtonWrapper>{children}</ButtonWrapper>;
};

export default Button;
