import React, { Fragment, useState } from "react";
import EditProfile from "./authentication/EditProfile";

const WelcomePage = (props) => {
  const [editprofile, setEditProfile]=useState(false);
  const editProfileClickHandler = () => {
    setEditProfile(true);
  };
  return (
    <Fragment>
      <h1>Welcome</h1>
      {!editprofile && <button
        onClick={editProfileClickHandler}
      >{`Your profile is incomplete \nClick hear to edit`}</button>}
      {editprofile && <EditProfile/>}
    </Fragment>
  );
};

export default WelcomePage;
