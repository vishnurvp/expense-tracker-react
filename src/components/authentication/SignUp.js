import React, { Fragment, useContext } from "react";
import AuthContext from "../../context/auth-context";
import classes from "./SignUp.module.css";

const SignUp = (props) => {
  const authCtx = useContext(AuthContext);

  const signuphandler = async (event) => {
    event.preventDefault();
    const email = event.target.elements["email"].value;
    const password1 = event.target.elements["password1"].value;
    const password2 = event.target.elements["password2"].value;
    if (password1 === "" || password1.length < 8 || password1 !== password2) {
      alert(
        `Password cannot be empty \nPassword should be atleast 8 charecters long \nBoth Passwords should match`
      );
    } else {
      try {
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${authCtx.APIkey}`,
          {
            method: "POST",
            body: JSON.stringify({
              email: email,
              password: password1,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        //   console.log(data);
        props.onSignUp(false);
        alert(`Signup Successfull \nYour Email: ${data.email}`);
      } catch (err) {
        alert(err.error.message);
      }
      //   console.log(email, password1, password2);
      event.target.elements["email"].value = "";
      event.target.elements["password1"].value = "";
      event.target.elements["password2"].value = "";
    }
  };

  return (
    <Fragment>
      <form className={classes.form} onSubmit={signuphandler}>
        <label htmlFor="email">Email</label>
        <br />
        <input id="email" type="email"></input>
        <br />
        <label htmlFor="password1">Password</label>
        <br />
        <input id="password1" type="password"></input>
        <br />
        <label htmlFor="password2">Confirm Password</label>
        <br />
        <input id="password2" type="password"></input>
        <br />
        <button id="signUpBtn" type="submit">
          Sign Up
        </button>
        <br />
      </form>
    </Fragment>
  );
};

export default SignUp;
