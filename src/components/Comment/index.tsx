import React from "react";
import styled from "styled-components";

export const CommentWrapper = styled.article`
  width: 100%;
  color: ${(props) => props.theme.color};

  footer {
    font-weight: 500;
  }
`;

interface CommentProps {
  autor: string;
  conteudo: string;
}

export const Comment: React.FC<CommentProps> = ({ autor, conteudo }) => {
  return (
    <CommentWrapper>
      <p>{conteudo}</p>
      <footer>{autor}</footer>
    </CommentWrapper>
  );
};

export default Comment;
