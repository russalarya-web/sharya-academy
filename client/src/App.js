import MetaTags from 'react-meta-tags';

import triangle from './resources/triangle.png';
import './App.css';

import logo from './resources/logo.png';

import styled from 'styled-components';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { useEffect } from "react";

import Home from "./routes/Home";
import SignUp from "./routes/SignUp";
import SignIn from "./routes/SignIn";
import UserView from "./routes/UserView";
import AdminView from "./routes/AdminView";

export const currentUrl = "http://34.239.101.57";

export const subjectCodes = [
  {id: "sci", name: "Science"}, 
  {id: "ssc", name: "Social Science"}, 
  {id: "mat", name: "Mathematics"}, 
  {id: "hin", name: "Hindi"}, 
  {id: "eng", name: "English"},
  {id: "phy", name: "Physics"},
  {id: "chem", name: "Chemistry"},
  {id: "bio", name: "Biology"},
];

// set page title
export function useTitle(title) {
	useEffect(() => {
		const prevTitle = document.title;

		document.title = title;
		
		return () => {
			document.title = prevTitle
		}
	})
}

// match id from given db list
export function matchFromDbList(list, id) {
  var name;
  list.forEach(listObject => {
      if (listObject._id === id) {
          name = listObject.name;
      }
  });

  return name;
}

export const Title = styled.h1`
  font-weight: 400;
  margin: 0.2em 0 0.2em 0;
  z-index: 1;
`;

export const Logo = styled.img`
  height: 50px;
  position: fixed;
  left: 30px;
  top: 25px;
  z-index: 2;
`;

export const Triangle = styled.img`
  height: 125%;
  width: 110%;
  position: fixed;
  bottom: -330px;
  z-index: 0;
  pointer-events: none;
`;

export const Element = styled.div`
  min-height: 80vh;
  vertical-align: middle;
  padding: 10vh 10%;
  width: 80%;
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
      <MetaTags>
        <meta name="theme-color" content="#1E5128" />
      </MetaTags>
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
            <Route path="/app" component={UserView} />
            <Route path="/admin" component={AdminView} />
          </Switch>
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;
