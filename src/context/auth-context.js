import React, { useState } from "react";

const AuthContext = React.createContext({
  APIkey: "AIzaSyCDH1TbzmhnXSFIsJYaiixXeP03MX4rw0Q",
  isLoggedIn: false,
  email: "",
  isEmailVerified: false,
  token: "",
  login: () => {},
  logout: () => {},
  editProfile: () => {},
  setEmail: () => {},
  setIsEmailVerified: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailVerified, setEmailVerified]=useState(false);
  const isLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
  };

  const logoutHandler = () => {
    setToken("");
  };

  const editProfileHandler = () => {};
  const setEmailHandler = (email) => {
    setEmail(email);
  };
  const setEmailVerifiedHandler = (bool) => {
    setEmailVerified(bool);
  };

  const authContextValue = {
    APIkey: "AIzaSyCDH1TbzmhnXSFIsJYaiixXeP03MX4rw0Q",
    isLoggedIn: isLoggedIn,
    token: token,
    login: loginHandler,
    logout: logoutHandler,
    editProfile: editProfileHandler,
    email: email,
    isEmailVerified: isEmailVerified,
    setEmail: setEmailHandler,
    setIsEmailVerified: setEmailVerifiedHandler,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
