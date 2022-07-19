import React, { Fragment, useEffect, useRef, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { authActions } from "../../context/authReducer";
import apiKey from "../../context/apiKeyStore";

const EditProfile = (props) => {
  const [exit, setExit] = useState(false);

  const dispatch = useDispatch();
  const userIdToken = useSelector(state=>state.auth.idToken);
  const dispName = useRef();
  const dispImg = useRef();

  useEffect(()=>{
    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            idToken: userIdToken,
        }),
    }
    )
    .then(response=> response.json())
    .then(data=>{
        dispName.current.value = data.users[0].displayName || '';
        dispImg.current.value = data.users[0].photoUrl || '';
        dispatch(authActions.setEmail(data.users[0].email || ''))
        dispatch(authActions.setIsEmailVerified(data.users[0].emailVerified))

    });
  },[userIdToken, dispatch]);

  const profileEditSubmitHandler = async (event) => {
    event.preventDefault();
    const name = event.target.elements["nameInp"].value;
    const photoUrl = event.target.elements["photoUrlInp"].value;
    console.log(name, photoUrl);
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: userIdToken,
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

  const closeClickHandler = () => {
    setExit(true);
  }
  return (
    <Fragment>
      {exit && <Redirect to='/welcome'/>}
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
      <button onClick={closeClickHandler}>Close</button>
    </Fragment>
  );
};

export default EditProfile;
