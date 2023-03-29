import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "../auth/privateRoute";
import Login from "../login/login";
import Empleados from "../empleados/inicioe";

//import Empleados from "../empleados/crud/buscar";

export default function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path={["/", "/login"]} component={Login} />    {/*  este codigo es para que al gargar pagina lo haga dede login */}
        <PrivateRoute exact path={["/empleados"]} component={Empleados} />

        <Route
          path={"*"}
          component={() => (
            <h1 style={{ marginTop: 300 }}>
              404 <br /> pagina no encontrada
            </h1>
          )}
        />
      </Switch>
    </Router>
  );
}
