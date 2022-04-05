import React from "react";

import '../App.css';

import { Link, useTitle } from "../App";

import { Title, Form, TextBox, SmallText, Submit } from "./SignUp";

// Sign In Page
function SignIn() {
    useTitle("Sign in - Sharya Academy");
    
    return (
        <Form>
            <Title>Sign in to your account</Title>
            <TextBox type="email" label="Email"></TextBox>
            <TextBox type="password" label="Password"></TextBox>
            <SmallText><Link>Forgot Password?</Link></SmallText>
            <Submit>Sign In</Submit>
            <SmallText>New here? <Link href="/sign-up">Sign up</Link></SmallText>
        </Form>
    );
}

export default SignIn;