import React, { FormEvent, useState } from "react";

import '../App.css';

import { Link, useTitle } from "../App";
import { Title, Form, TextBox, SmallText, Submit } from "./SignUp";

import { db, auth, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, createUserWithEmailAndPassword } from "../firebase/config";

export const sendPasswordReset = async (email: string) => {
    await sendPasswordResetEmail(auth, email)
    .then (() => {
        alert("Password reset link sent!");
    })
    .catch(err => {
        console.log(err);
        alert(err.message);
    })
};

export const logout = () => {
    signOut(auth);
    console.log("User signed out...")
};

// Sign In Page
function SignIn() {
    const [errorMessage, setErrorMessage] = useState("");

    const sendDetails = async (event: FormEvent) => {
        event.preventDefault();

        // @ts-ignore
        const elementsArray = [...event.target.elements];

        const formData = elementsArray.reduce((acc, element) => {
            if (element.id) {
                acc[element.id] = element.value;
            }

            return acc;
        }, {});

        try {
            if (formData.email === '') throw("Please enter an email")
            if (formData.password === '') throw("Please enter a password")

            signInWithEmailAndPassword(auth, formData.email, formData.password)
            .then((response) => {
                // @ts-ignore
                sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
                console.log("Log in successful.");
                window.location.href = '/app/dashboard';
            })
            .catch((error) => {
                if (error.message === "Firebase: Error (auth/wrong-password).") {
                    setErrorMessage("Incorrect password");
                } else if (error.message === "Firebase: Error (auth/user-not-found).") {
                    setErrorMessage("User does not exist.");
                } else {
                    setErrorMessage(error.message);
                }
            })
        }
        catch (error) {
            // @ts-ignore
            setErrorMessage(error);
        }
    }
    
    useTitle("Sign in - Sharya Academy");
    
    return (
        <Form onSubmit={sendDetails}>
            <Title>Sign in to your account</Title>
            <SmallText>{errorMessage}</SmallText>
            <TextBox id="email" type="email" label="Email" placeholder="john.doe@example.com"></TextBox>
            <TextBox id="password" type="password" label="Password" placeholder="Your password..."></TextBox>
            <SmallText><Link>Forgot Password?</Link></SmallText>
            <Submit>Sign In</Submit>
            <SmallText>New here? <Link href="/sign-up">Sign up</Link></SmallText>
        </Form>
    );
}

export default SignIn;