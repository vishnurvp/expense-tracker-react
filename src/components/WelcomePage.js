import React, { Fragment, useContext, useState } from "react";
import AuthContext from "../context/auth-context";
import EditProfile from "./authentication/EditProfile";

const WelcomePage = (props) => {
  const authCtx = useContext(AuthContext);

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
  return (
    <Fragment>
      <h1>Welcome</h1>
      {!editprofile && <button
        onClick={editProfileClickHandler}
      >{`Your profile is incomplete \nClick hear to edit`}</button>}
      {editprofile && <EditProfile/>}
      <button onClick={emailVerifyClickHandler}>Verify your Email ID</button>
    </Fragment>
  );
};

export default WelcomePage;
