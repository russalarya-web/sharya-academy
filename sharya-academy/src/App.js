import triangle from './resources/triangle.png';
import './App.css';

import logo from './resources/logo.png';

import styled from 'styled-components';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from "react";

import Home from "./routes/Home";
import SignUp from "./routes/SignUp";
import SignIn from "./routes/SignIn";

export const Title = styled.h1`
  color: #1E5128;
  font-weight: 400;
  margin: 0.2em 0 0.2em 0;
  z-index: 1;
`;

export const Logo = styled.img`
  height: 70px;
  position: fixed;
  left: 30px;
  top: 30px;
`;

export const Triangle = styled.img`
  height: 95%;
  width: 100%;
  position: fixed;
  bottom: -10px;
  z-index: 0;
  pointer-events: none;
`;

export const Screen = styled.div`
  min-height: 95vh;
  padding: 2.5vh 10%;
  width: 80%;
`;

export const TextLogo = styled.img`
  height: 100vh;
`;

export const Link = styled.a`
  color: #4e9f3d;
`;

// Users list
export const Users = [
  {firstName: 'John', lastName: 'Doe', email: 'johndoe@example.com', password: 'johndoe123', classNumber: "X"}
];

function App() {
  return (
    <BrowserRouter>
      <link rel="preconnect" href="https://fonts.googleapis.com" /> 
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /> 
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans&family=Open+Sans&display=swap" rel="stylesheet" />
      
      <div className="App">
        <Logo
          src={logo}
          onClick={(e) => {
            e.preventDefault();
            window.location.href='/';
            }}/>
        <Triangle src={triangle} />

        <div className="AppForeground">
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={SignIn} />
          </Switch>
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;
