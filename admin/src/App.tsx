import React, { FormEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import { Link } from './Components';
import { auth, signInWithEmailAndPassword } from './firebase/config';
import Main from './routes/Main';

const size = 'calc(10px + 0.7vmin)';

export const Form = styled.form`
    background: #fff;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.25);
    margin: auto;
    max-width: 400px;
    border-radius: 10px;
    padding: 30px 15px;
    font-size: ${size};
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
    font-size: calc(8px + 0.8vmin);
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
    font-size: ${size};
    padding: 5px 10px;
    font-family: 'Open Sans' !important;
`;

const Label = styled.p`
    margin: 0;
    text-align: left;
    font-size: ${size};
`;

export const Submit = styled.button`
    background: rgba(78, 159, 61, 0.8);
    color: #fff;
    border: none;
    border-radius: 5px;
    margin: 0.5em 0;
    height: 2.5em;
    font-size: ${size};
    padding: 0.25em 2%;
    font-family: 'Open Sans' !important;
`;

// set page title
export function useTitle(title: string) {
	useEffect(() => {
		const prevTitle = document.title;

		document.title = title;
		
		return () => {
			document.title = prevTitle
		}
	})
}

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
				sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);
				console.log("Log in successful.");
				window.location.href = '/structure';
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
		</Form>
	);
}

function App() {
	return (
		<div className="App">
			{/* <Logo
			src={logo}
			onClick={(e) => {
				e.preventDefault();
				window.location.href='/';
			}}/>
			<Triangle src={triangle} /> */}

			<Routes>
				<Route path="/" element={<SignIn />} />
				<Route path="/*" element={<Main />} />
			</Routes>

		</div>
	);
}


export default App;
