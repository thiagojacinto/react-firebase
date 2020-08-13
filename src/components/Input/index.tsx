import React from "react";

import styled from "styled-components";

const InputWrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 1.2rem 0;

  display: flex;
  flex-direction: column;

  label {
    font-weight: 500;
    font-size: 1.85rem;
    color: ${(props) => props.theme.color};
    padding-bottom: 1.8rem;
  }

  input {
    min-height: 4.2rem;
    border: 1px solid ${(props) => props.theme.highlight};
    border-radius: 5px;
  }
`;

interface InputType {
  labelName: string;
  type: string;
  onchange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputType> = ({
  labelName,
  type,
  onchange = undefined,
  ...rest
}) => {
  return (
    <InputWrapper>
      <label htmlFor={type}>{labelName}</label>
      {type === "password" ? (
        <input
          type={type}
          name={type}
          id={type}
          onChange={onchange}
          autoComplete="current-password"
        />
      ) : (
        <input type={type} name={type} id={type} onChange={onchange} />
      )}
    </InputWrapper>
  );
};

export default Input;
