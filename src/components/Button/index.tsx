import React from "react";

import styled from "styled-components";

const ButtonWrapper = styled.button`
  margin: 3rem 0;
  padding: 1rem 3rem;
  font-weight: 700;
  font-size: larger;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.theme.highlight};
  color: ${(props) => props.theme.bg};
  opacity: 1;
  transition: opacity 0.3s ease-in-out;

  &:hover,
  &:focus {
    opacity: 0.8;
  }
`;

interface ButtonProps {
  onClick?: (event: React.MouseEvent) => void;
}

export const Button: React.FC<ButtonProps> = (props) => {
  return (
    <ButtonWrapper onClick={props.onClick}>{props.children}</ButtonWrapper>
  );
};

export default Button;
