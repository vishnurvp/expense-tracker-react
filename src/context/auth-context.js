import React, { useState } from "react";

const AuthContext = React.createContext({
  APIkey: 'AIzaSyCDH1TbzmhnXSFIsJYaiixXeP03MX4rw0Q',
  isLoggedIn: false,
  token: "",
  login: () => {},
  logout: () => {},
  editProfile: ()=>{},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState('');
  const isLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
  };

  const editProfileHandler = () => {

  }

  const authContextValue = {
    APIkey: 'AIzaSyCDH1TbzmhnXSFIsJYaiixXeP03MX4rw0Q',
    isLoggedIn: isLoggedIn,
    token: token,
    login: loginHandler,
    editProfile: editProfileHandler,

  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
