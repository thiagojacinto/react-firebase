import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthUserContext } from "../AuthProvider";

interface routeProps {
  path?: string;
}

const PrivateRoute: React.FC<routeProps> = ({ children, path, ...rest }) => {
  const { usuarioLogado } = useContext(AuthUserContext);

  return (
    <Route
      path={path}
      {...rest}
      render={() => (!!usuarioLogado ? children : <Redirect to="/" />)}
    />
  );
};

export default PrivateRoute;
