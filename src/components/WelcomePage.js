import React, { Fragment, useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import AuthContext from "../context/auth-context";

const WelcomePage = (props) => {
  const authCtx = useContext(AuthContext);

  useEffect(()=>{
    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${authCtx.APIkey}`,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            idToken: authCtx.token,
        }),
    }
    )
    .then(response=> response.json())
    .then(data=>{
        authCtx.setEmail(data.users[0].email || '');
        authCtx.setIsEmailVerified(data.users[0].emailVerified);
    });
  },[authCtx])

  const [editprofile, setEditProfile]=useState(false);
  const editProfileClickHandler = () => {
    setEditProfile(true);
  };

  const emailVerifyClickHandler = () => {
    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${authCtx.APIkey}`,
    {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json',
      },
      body: JSON.stringify({
        requestType: "VERIFY_EMAIL",
        idToken: authCtx.token,
      }),
    })
    .then(res=>res.json())
    .then(data=>{alert(`verification email is sent to ${data.email}`)})
    .catch(err=>console.log(err));

  }

  const logoutClickHandler = () => {
    authCtx.logout();
  }
  

  return (
    <Fragment>
      <h1>Welcome</h1>
      <button onClick={logoutClickHandler}>Log Out</button>
      {!editprofile && <button
        onClick={editProfileClickHandler}
      >{`Your profile is incomplete \nClick hear to edit`}</button>}
      {editprofile && <Redirect to={'/editprofile'}/>}
      <br/>
      {!authCtx.isEmailVerified ? <button onClick={emailVerifyClickHandler}>Verify your Email ID</button> : <p>Email Verified</p>}
    </Fragment>
  );
};

export default WelcomePage;
