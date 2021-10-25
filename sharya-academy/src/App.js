import triangle from './resources/triangle.png';
import textLogo from './resources/text-logo.png';
import './App.css';

import styled, {css} from 'styled-components';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import React, { Component } from "react";

export const Title = styled.h2`
  color: #1E5128;
  font-weight: 600;
  margin: 0.8em 0 0.2em 0;
  z-index: 1;
`;

export const Triangle = styled.img`
  height: 95%;
  width: 100%;
  position: fixed;
  bottom: -10px;
  z-index: 0;
`;

export const Screen = styled.div`
  min-height: 95vh;
  padding: 2.5vh 20px;
  width: 100%;
`;

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Triangle src={triangle} />
        <div className="AppForeground">
          <Screen>
            <img src={textLogo} />
          </Screen>
          <Screen>
            <Title>About</Title>
          </Screen>
          <Screen>
            <Title>Pricing</Title>
          </Screen>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
