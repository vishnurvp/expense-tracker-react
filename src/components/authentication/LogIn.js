import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import classes from "./LogIn.module.css";

const LogIn = () => {
  const loginHandler = async (event) => {
    event.preventDefault();
    const email = event.target.elements["logInEmail"].value;
    const password = event.target.elements["password"].value;

    if (password === "" || password.length < 8) {
      alert(
        `Password cannot be empty \nPassword should be atleast 8 charecters long`
      );
    } else {
      try {
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCDH1TbzmhnXSFIsJYaiixXeP03MX4rw0Q`,
          {
            method: "POST",
            body: JSON.stringify({
              email: email,
              password: password,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log(data);
        if(data.error.code===400) {
          alert(data.error.message);
        }
      } catch (err) {
        alert(err.error.message);
      }
      //   console.log(email, password1, password2);
      event.target.elements["logInEmail"].value = "";
      event.target.elements["password"].value = "";
    }
  };
  return (
    <Fragment>
      <form className={classes.form} onSubmit={loginHandler}>
        <label htmlFor="email">Email</label>
        <br />
        <input id="logInEmail" type="email"></input>
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input id="password" type="password"></input>
        <br />
        <button id="logInBtn" type="submit">
          Log In
        </button>
        <br />
      </form>
      <Link to="/signup">
        Don't have an account?
        <br />
        Click heare to Sign Up
      </Link>      
    </Fragment>
  );
};

export default LogIn;
