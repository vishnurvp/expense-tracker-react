import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import ExpenseForm from "./ExpenseTracker/ExpenseForm";
import { authActions } from "../context/authReducer";
import { premActions } from "../context/premiumReducer";
import classes from "./WelcomePage.module.css";

const WelcomePage = (props) => {
  const isPremium = useSelector((state) => state.prem.isPremium);
  const theamToggle = useRef();
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.exp.expenses);
  const userIdToken = useSelector((state) => state.auth.idToken);
  const isEmailVerified = useSelector((state) => state.auth.isEmailVerified);
  const APIkey = useSelector((state) => state.auth.apiKey);
  const totalExpense = Object.keys(expenses).reduce((p, key) => {
    return p + Number(expenses[key].cost);
  }, 0);
  const userEmail = useSelector((state)=>state.auth.email);
  const cleanUserEmail = userEmail.replace(/[^a-zA-Z0-9 ]/g, '');

  useEffect(() => {
    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${APIkey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: userIdToken,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch(authActions.setEmail(data ? data.users[0].email : ""));
        dispatch(
          authActions.setIsEmailVerified(
            data ? data.users[0].emailVerified : false
          )
        );
      });
  }, [APIkey, userIdToken, dispatch]);

  const [editprofile, setEditProfile] = useState(false);
  const editProfileClickHandler = () => {
    setEditProfile(true);
  };

  const emailVerifyClickHandler = () => {
    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${APIkey}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: userIdToken,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        alert(`verification email is sent to ${data.email}`);
      })
      .catch((err) => console.log(err));
  };

  const logoutClickHandler = () => {
    dispatch(authActions.logout());
  };

  const activatePremiumClickHandler = () => {
    dispatch(premActions.setPremium(true));
  };

  const theamToggleHandler = (event) => {
    if (event.target.checked) {
      dispatch(premActions.setDarkTheam(true));
    } else {
      dispatch(premActions.setDarkTheam(false));
    }
  };

  const downlodExpClickHandler = () => {

    let csv = "id,cost,catagory,description\n";
    Object.keys(expenses).forEach((item) => {
      csv += `${item},${expenses[item].cost},${expenses[item].catagory},${expenses[item].description}\n`;
    });

    const downloadLink = document.createElement("a");
    const blob = new Blob(["\ufeff", csv]);
    const url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = `${cleanUserEmail}-Expenses.csv`;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <Fragment>
      <Fragment>
        <h1>Welcome</h1>
        {totalExpense > 10000 && (
          <button onClick={activatePremiumClickHandler}>
            Activate Premium
          </button>
        )}
        <button onClick={logoutClickHandler}>Log Out</button>
        {!editprofile && (
          <button
            onClick={editProfileClickHandler}
          >{`Your profile is incomplete \nClick hear to edit`}</button>
        )}
        {editprofile && <Redirect to={"/editprofile"} />}
        <br />
        {!isEmailVerified ? (
          <button onClick={emailVerifyClickHandler}>
            Verify your Email ID
          </button>
        ) : (
          <p>Email Verified</p>
        )}
      </Fragment>
      <div>
        {isPremium && (
          <div>
            <label>Toggle Theam</label>
            <label className={classes.switch}>
              <input
                ref={theamToggle}
                type="checkbox"
                onClick={theamToggleHandler}
              />
              <span className={`${classes.slider} ${classes.round}`}></span>
            </label>
          </div>
        )}
        <button onClick={downlodExpClickHandler}>
          Download Expenses as CSV
        </button>
      </div>
      <br />
      <div>
        <ExpenseForm />
      </div>
    </Fragment>
  );
};

export default WelcomePage;
