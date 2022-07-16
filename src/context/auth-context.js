import React, { useState } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  token: "",
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState('');
  const isLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
  };
  const authContextValue = {
    isLoggedIn: isLoggedIn,
    token: "",
    login: loginHandler,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
