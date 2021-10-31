import React from "react";
import styled from 'styled-components';

import textLogo from '../resources/text-logo.png';

import { Title, Screen, TextLogo } from "../App";

export const Header = styled.header`
    background: transparent;
    position: absolute;
    width: 100%;
`;

export const Menu = styled.ul`
    list-style-type: none;
    display: flex;
    flex-direction: row;
    float: right;
    padding: 5px;
    position: absolute;
    right: 150px;
`;

export const MenuItem = styled.li`
    padding: 5px 15px;
`;

export const SignIn = styled.button`
    position: fixed;
    right: 30px;
    top: 30px;
    padding: 10px 15px;
    border: solid 1px;
    font-size: calc(10px + 1.5vmin);
    font-family: 'Noto Sans', sans-serif;
    border-radius: 5px;
    z-index: 1;
`;

export const Box = styled.div`
    border-radius: 10px;
    padding: 1.2em;
    min-width: 200px;
    margin: 15px;
    box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
`;

export const BoxTitle = styled.h2`
    font-weight: 400;
    z-index: 1;
`;

export const Text = styled.p`
    text-align: justify;
`;

export const SmallText = styled.p`
    text-align: justify;
    font-size: calc(10px + 1vmin);
`;

export const BoxButton = styled.button`
    padding: 10px;
    background: transparent;
    border: solid 1px;
    font-size: calc(10px + 2vmin);
    font-family: 'Noto Sans', sans-serif;
    z-index: 1;
    border-radius: 5px;
`;

export const Footer = styled.footer`
    background: #1E5128;
    color: #fff;
    position: relative;
    margin: 0;
    bottom: 0;
    padding: 10px;
`;

// Landing Page
function Home() {
    return (
        <>
            {/* Header */}
            <Header>
                <Menu>
                    <MenuItem>About</MenuItem>
                    <MenuItem>Pricing</MenuItem>
                </Menu>
                <SignIn
                className="dark-green white-text"
                onClick={(e) => {
                    e.preventDefault();
                    window.location.href='/login';
                }}>
                    Sign In
                </SignIn>
            </Header>

            {/* Start Screen */}
            <Screen>
                <TextLogo src={textLogo} />
            </Screen>

            {/* About Screen */}
            <Screen>
                <Title>About</Title>
                <Text>Sharya Academy is built around students to help them learn any time, anywhere. It serves you relevant content based on your preferences and uses your progress to serve you better content. It helps you attack your weaknesses by giving detailed feedback around your mistakes and suggests relevant topics to clear your concepts.</Text>
                <Text>This website offers a unique process of learning and enriching to develop new areas of interest in a more interesting manner. It is further developed into multiple sections of materials for students to regularly test themselves by solving problems related to their subjects.</Text>
                <Text>The website contains various Tests and Worksheets, and their solutions are in an easy format so that students get a clear and better understanding.</Text>
                <Text>We have also incorporated NCERT Solutions for which students may need for exam preparation and completing their schoolwork. We have provided explanations of English and Hindi Literature.</Text>
                <Text>We have Online Tests with which students can get to know where they are lacking.</Text>
                <Text>Sharya Academy is available on Facebook and Instagram.</Text>
            </Screen>
            
            {/* Pricing Screen */}
            <Screen>
                <Title>Introductory Pricing</Title>
                <div className="pricing">
                    <Box className="white">
                        <BoxTitle>Free</BoxTitle>
                        <Text>Chapter Notes</Text>
                        <Text>NCERT Solutions</Text>
                        <Text>Exemplar Questions</Text>
                        <BoxTitle>Always ₹0</BoxTitle>
                        <BoxButton>Sign Up</BoxButton>
                    </Box>

                    <Box className="green white-text">
                        <BoxTitle>Basic</BoxTitle>
                        <Text>Everything in Free, plus:</Text>
                        <Text>Practice Tests</Text>
                        <Text>Worksheets</Text>
                        <BoxTitle>From ₹299 a year</BoxTitle>
                        <BoxButton>Sign Up</BoxButton>
                    </Box>

                    <Box className="dark-green white-text">
                        <BoxTitle>Premium</BoxTitle>
                        <Text>Everything in Basic, plus:</Text>
                        <Text>Auto-Graded Tests</Text>
                        <Text>Detailed Feedback</Text>
                        <BoxTitle>From ₹499 a year</BoxTitle>
                        <BoxButton>Sign Up</BoxButton>
                    </Box>
                </div>
            </Screen>

            <Footer>
                <SmallText>&copy; Sharya Academy.</SmallText>
            </Footer>

        </>
    );
}

export default Home;