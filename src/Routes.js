import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthForm from "./components/AuthForm";
import SecretPage from "./components/SecretPage";
import AppBar from "./components/commons/AppBar";

const Home = () => <center><h1>Bienvenidos</h1></center>;

function Routes() {
  return (
    <BrowserRouter>
      <AppBar />
      <center>
        <Switch>
          <Route exact component={Home} path="/" />
          <Route
            exact
            component={() => <AuthForm type="login" />}
            path="/login"
          />
          <Route
            exact
            component={() => <AuthForm type="signup" />}
            path="/signup"
          />
          <ProtectedRoute exact component={SecretPage} path="/secret" />
        </Switch>
      </center>
    </BrowserRouter>
  );
}

export default Routes;
