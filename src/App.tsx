import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Mural from "./pages/Mural";

const defaultTheme = {
  color: "var(--primary-color)",
  bg: "var(--primary-bg)",
  highlight: "var(--primary-highlight)",
};

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>

          <Route path="/cadastro">
            <Register />
          </Route>

          <Route path="/comentarios/:usuario">
            <Mural />
          </Route>

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
