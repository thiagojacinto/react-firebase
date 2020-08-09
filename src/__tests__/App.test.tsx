import React from "react";
import { render } from "@testing-library/react";
import App from "../App";

test("Deve ser renderizado o nome do autor: Thiago Jacinto", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/thiago jacinto/i);
  expect(linkElement).toBeInTheDocument();
});
