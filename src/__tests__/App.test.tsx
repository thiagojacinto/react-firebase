import React from "react";
import { render } from "@testing-library/react";

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";

import App from "../App";

test("Deve ser renderizado o nome do autor: Thiago Jacinto", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/thiago jacinto/gis);
  expect(linkElement).toBeInTheDocument();
});
