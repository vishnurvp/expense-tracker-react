import { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import LogIn from "./components/authentication/LogIn";
import AuthContext from "./context/auth-context";
import WelcomePage from "./components/WelcomePage";
import ForgotPassword from "./components/authentication/ForgotPassword";
import EditProfile from "./components/authentication/EditProfile";
function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div className="App">
      <h1>Expense Tracker App</h1>
      {!authCtx.isLoggedIn && <Redirect to="/login" />}
      {authCtx.isLoggedIn && <Redirect to="/welcome" />}
      <Switch>
        <Route path="/welcome" excact>
          <WelcomePage />
        </Route>
        <Route path="/login" exact>
          <LogIn />
        </Route>
        <Route path={"/forgotpassword"}>
          <ForgotPassword />
        </Route>
        <Route path={'/editprofile'}>
          <EditProfile/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
