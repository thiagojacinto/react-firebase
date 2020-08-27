import React, { useState, useEffect, createContext } from "react";
import firebase from "../../firebase";
import "firebase/auth";

type ContextProps = {
  usuarioLogado: firebase.User | null;
  estaAutenticado: boolean;
  setUsuarioLogado: any;
  loading: boolean;
};

export const AuthUserContext = createContext<Partial<ContextProps>>({});

export const AuthProvider: React.FC = ({ children }) => {
  let [usuarioLogado, setUsuarioLogado] = useState(
    null as firebase.User | null
  );

  let [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUsuarioLogado(user);
      setLoading(false);
    });
  }, []);

  return (
    <AuthUserContext.Provider
      value={{
        usuarioLogado,
        estaAutenticado: usuarioLogado !== null,
        setUsuarioLogado,
        loading,
      }}
    >
      {children}
    </AuthUserContext.Provider>
  );
};

export default AuthProvider;
