import React from "react";

import '../App.css';

import { Link } from "../App";

import { Title, Box, TextBox, SmallText, Submit } from "./SignUp";

// Sign In Page
function SignIn() {
    return (
        <Box>
            <Title>Sign in to your account</Title>
            <TextBox type="email" placeholder="Email"></TextBox>
            <TextBox type="password" placeholder="Password"></TextBox>
            <SmallText><Link>Forgot Password?</Link></SmallText>
            <Submit type="submit" value="Sign In"></Submit>
            <SmallText>New here? <Link href="/signup">Sign up</Link></SmallText>
        </Box>
    );
}

export default SignIn;