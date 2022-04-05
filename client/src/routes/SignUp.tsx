import React, { FormEvent, useState } from "react";
import styled from 'styled-components';

import '../App.css';

import { Link, useTitle } from "../App";
import { db, auth, createUserWithEmailAndPassword } from "../firebase/config";

export const Form = styled.form`
    background: #fff;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.25);
    margin: auto;
    max-width: 400px;
    border-radius: 10px;
    padding: 30px 15px;
    font-size: calc(10px + 1vmin);
    display: flex;
    flex-direction: column;
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

const Container = styled.div`
    margin: 5px 0;
`;

type Props = {className?: string, id?: string, type: string, label: string, placeholder?: string}

export const TextBox = (props: Props) => {
    return (
        <Container>
            <Label>{props.label}</Label>
            <Input id={props.id ? props.id : ""} className={props.className ? props.className : ""} type={props.type} placeholder={props.placeholder ? props.placeholder : ""} />
        </Container>
    )
}

const Input = styled.input`
    width: calc(100% - 20px);
    background: rgba(242, 242, 242, 0.9);
    color: rgba(30, 81, 40, 0.8);
    border: none;
    border-radius: 5px;
    margin: 0.5em 0;
    height: 2em;
    font-size: calc(10px + 1.2vmin);
    padding: 5px 10px;
    font-family: 'Open Sans' !important;
`;

const Label = styled.p`
    margin: 0;
    text-align: left;
`;

export const Submit = styled.button`
    width: 100%;
    background: rgba(78, 159, 61, 0.8);
    color: #fff;
    border: none;
    border-radius: 5px;
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

// const classList = [...Array(13).keys()];

// const listClasses = classList.map((classItem) =>
//     {if (classItem === 0) { 
//         return(<option selected={true} disabled value="default">Choose</option>)
//     } else {
//         return(<option value={classItem}>Class {classItem}</option>)
//     }}
    
// );

// Sign Up Page
function SignUp() {
    useTitle("Sign up - Sharya Academy");
    const sample = {name: "John", email: "john.doe@example.com"};
    const [submitted, setSubmitted] = useState<{name: string, email: string} | undefined>();

    const saveAnswer = async (event: FormEvent) => {
        event.preventDefault();

        // @ts-ignore
        const elementsArray = [...event.target.elements];

        const formData = elementsArray.reduce((acc, element) => {
            if (element.id) {
                acc[element.id] = element.value;
            }

            return acc;
        }, {});

        if (formData.email !== '') {
            if (formData.fname !== '') {
                if (formData.lname !== '') {
                    if (formData.password) {
                        if (formData.passwordConf) {
                            if (formData.password.length >= 8) {
                                if (formData.password === formData.passwordConf) {
                                }
                                else {
                                    alert("Passwords don't match.")
                                }
                            }
                            else {
                                alert("Password should be atleast 8 characters.")
                            }
                        }
                        else {
                            alert("Please confirm your password.")
                        }
                    } else {
                        alert("Please enter a password.")
                    }
                    createUserWithEmailAndPassword(auth, formData.email, formData.password)
                    .then((response) => {
                        db.collection("users").doc(formData.email).set({fname: formData.fname, lname: formData.lname});
                        // @ts-ignore
                        sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
                        console.log("Sign up successful.");
                        setSubmitted({name: formData.fname, email: formData.email});
                    })
                    .catch((error) => {
                        alert(error.message)
                    })
                    
                }
                else {
                    alert("Please enter your last name.")
                }
            }
            else {
                alert("Please enter your first name.")
            }
        }

        else {
            alert("Please enter your email.")
        }
    }

    if (submitted) {
        return (
            <Form>
                <Label>You have successfully signed up, {submitted.name}! A verification email has been sent to {submitted.email}.</Label>
            </Form>
        )
    }
    return (
        <Form onSubmit={saveAnswer}>
            <Title>Create your account</Title>
            <TextBox id="fname" type="text" label="First Name" placeholder="John" />
            <TextBox id="lname" type="text" label="Last Name" placeholder="Doe" />
            <TextBox id="email" type="email" label="Email" placeholder="john.doe@example.com" />
            {/* <Dropdown>{listClasses}</Dropdown> */}
            <TextBox id="password" type="password" label="Password" placeholder="At least 8 characters"></TextBox>
            <TextBox id="passwordConf" type="password" label="Confirm Password" placeholder="Re-type password"></TextBox>
            <Submit>Sign Up</Submit>
            <SmallText>Have an account? <Link href="/login">Sign in</Link></SmallText>
        </Form>
    );
}

export default SignUp;