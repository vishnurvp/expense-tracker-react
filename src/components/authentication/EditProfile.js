import React, { Fragment, useContext, useEffect, useRef } from "react";
import AuthContext from "../../context/auth-context";

const EditProfile = (props) => {
  const authCtx = useContext(AuthContext);
  const APIkey = authCtx.APIkey;
  const dispName = useRef();
  const dispImg = useRef();

  useEffect(()=>{
    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${APIkey}`,
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
    .then(response=> response.json()
    .then(data=>{
        console.log(data);
        dispName.current.value = data.users[0].displayName || '';
        dispImg.current.value = data.users[0].photoUrl || '';
    }));
  },[APIkey, authCtx.token]);

  const profileEditSubmitHandler = async (event) => {
    event.preventDefault();
    const name = event.target.elements["nameInp"].value;
    const photoUrl = event.target.elements["photoUrlInp"].value;
    console.log(name, photoUrl);
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${authCtx.APIkey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: authCtx.token,
          displayName: name,
          photoUrl: photoUrl,
          returnSecureToken: true,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    event.target.elements["nameInp"].value = "";
    event.target.elements["photoUrlInp"].value = "";
  };
  return (
    <Fragment>
      <form onSubmit={profileEditSubmitHandler}>
        <h3>Edit Profile</h3>
        <label htmlFor="nameInp">Your Name</label>
        <br />
        <input ref={dispName} id="nameInp"></input>
        <br />
        <label htmlFor="photoUrlInp">Your Photo URL</label>
        <br />
        <input ref={dispImg} id="photoUrlInp"></input>
        <br />
        <button id="submitEditBtn">Edit</button>
      </form>
    </Fragment>
  );
};

export default EditProfile;
