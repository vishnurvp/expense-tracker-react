import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import "./App.css";
import LogIn from './components/authentication/LogIn';
import AuthContext from "./context/auth-context";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div className="App">
      <h1>Expense Tracker App</h1>
      {!authCtx.isLoggedIn && <Redirect to="/login" />}
      <Route path="/login" exact>
        <LogIn/>
      </Route>
    </div>
  );
}

export default App;
