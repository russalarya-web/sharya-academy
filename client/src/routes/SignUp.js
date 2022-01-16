import React from "react";
import styled from 'styled-components';

import '../App.css';

import { Link } from "../App";

export const Box = styled.form`
    background: #fff;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.25);
    max-width: 400px;
    border-radius: 10px;
    padding: 40px 30px;
    font-size: calc(10px + 1vmin);
`;

export const Title = styled.h2`
  color: #1E5128;
  font-weight: 400;
  margin: 0.4em 0;
  z-index: 1;
  text-align: left;
`;

export const SmallText = styled.p`
    font-size: calc(8px + 1.2vmin);
    margin: 0;
`;

export const TextBox = styled.input`
    width: 95%;
    background: rgba(242, 242, 242, 0.9);
    color: rgba(30, 81, 40, 0.8);
    border: none;
    border-radius: 10px;
    margin: 0.5em 0;
    height: 2em;
    font-size: calc(10px + 1.2vmin);
    padding: 0.25em 2.5%;
    font-family: 'Open Sans' !important;
    // text-align: center;
`;

export const Submit = styled.input`
    width: 100%;
    background: rgba(78, 159, 61, 0.8);
    color: #fff;
    border: none;
    border-radius: 10px;
    margin: 0.5em 0;
    height: 2.5em;
    font-size: calc(10px + 1.2vmin);
    padding: 0.25em 2%;
    font-family: 'Open Sans' !important;

`;

export const Dropdown = styled.select`
    width: 100%;
    background: rgba(242, 242, 242, 0.9);
    border: none;
    border-radius: 10px;
    font-size: calc(10px + 1.2vmin);
    margin: 0.5em 0;
    height: 2.5em;
    padding: 0 2.5%;
    font-family: 'Open Sans' !important;
    // text-align: center;

`;

const classList = [
    "disabled", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"
];

const listClasses = classList.map((classItem) =>
    {if (classItem === "disabled") { 
        return(<option selected="true" disabled value="default">Choose</option>)
    } else {
        return(<option value={classItem}>Class {classItem}</option>)
    }}
    
);

// Sign Up Page
function SignUp() {
    return (
        <Box>
            <Title>Create your account</Title>
            <TextBox className="half" type="text" placeholder="First Name"></TextBox>
            <TextBox className="half" type="text" placeholder="Last Name"></TextBox>
            <TextBox type="email" placeholder="Email"></TextBox>
            <Dropdown>{listClasses}</Dropdown>
            <TextBox type="password" placeholder="Password"></TextBox>
            <TextBox type="password" placeholder="Confirm Password"></TextBox>
            <Submit type="submit" value="Sign Up"></Submit>
            <SmallText>Have an account? <Link href="/login">Sign in</Link></SmallText>
        </Box>
    );
}

export default SignUp;