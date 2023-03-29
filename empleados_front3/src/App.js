//import logo from './logo.svg';
import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Menu from "./components/navbar/navbar";

import AppRouter from "./components/router/router";

function App() {
  return (
    <div className="App">
      <Menu />
      <AppRouter />
    </div>
  );
}

export default App;
