import React, { Fragment, useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import classes from './ForgotPassword.module.css';

const ForgotPassword = (props) => {
   
    const authCtx = useContext(AuthContext);
    const [isSending, setIsSending] = useState(false);
    const history = useHistory();

    const recEmailInp = useRef();

    const resetPasswordClickHandler = async (event) => {
        setIsSending(true);
        event.preventDefault();
        const email = recEmailInp.current.value;
        fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${authCtx.APIkey}`,
        {
            method: 'POST',
            headers: {
                'Content-type':'application/json',
            },
            body: JSON.stringify({
                requestType: "PASSWORD_RESET",
                email: email,
            }),
        })
        .then(res=>res.json())
        .then(data => {
            if (data.error) {
                alert(data.error.message);
            } else {
                alert(`Password Reset Link sent to ${data.email}`)
            }
            setIsSending(false);
            history.replace('/login');
        })
        .catch(err=>{console.log(err)});
    }


    return (
        <Fragment>
            <h3>ForgotPassword</h3>
            <form className={classes.form} onSubmit={resetPasswordClickHandler}>
                <label htmlFor="recEmailInp">Enter your registered email</label><br/>
                <input type='email' ref={recEmailInp} id='recEmailInp'/><br/>
                {isSending ? <p>Sending Email ....</p> : <button>Send Link</button>}<br/>
            </form>
        </Fragment>
    )
}

export default ForgotPassword;