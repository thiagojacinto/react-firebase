import React from "react";
import styled from "styled-components";

export const FooterWrapper = styled.footer`
  width: 90%;

  span {
    color: ${(props) => props.theme.bg};
  }
`;
/**
 * This Footer component will be visually hidden, with same color as background.
 */
export const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <span>
        Created by{" "}
        <a
          href="https://github.com/thiagojacinto"
          target="_blank"
          rel="noopener noreferrer"
        >
          Thiago Jacinto
        </a>{" "}
        @ 2020
      </span>
    </FooterWrapper>
  );
};

export default Footer;
