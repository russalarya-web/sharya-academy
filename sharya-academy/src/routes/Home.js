import React from "react";
import styled from 'styled-components';

import textLogo from '../resources/text-logo.png';

import { Title, Element, TextLogo } from "../App";

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
    position: absolute;
    right: 150px;
    vertical-align: middle;
`;

export const MenuItem = styled.li`
    padding: 15px;
    font-size: calc(10px + 1.2vmin);
`;

export const SignIn = styled.button`
    position: fixed;
    right: 30px;
    top: 30px;
    padding: 10px 15px;
    border: solid 1px;
    font-size: calc(10px + 1.2vmin);
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
    margin: 15px 0;
`;

export const SmallText = styled.p`
    text-align: justify;
    font-size: calc(10px + 1vmin);
`;

export const BoxButton = styled.button`
    padding: 10px;
    background: transparent;
    border: solid 1px;
    font-size: calc(10px + 1vmin);
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

const About = [
    "Sharya Academy is built around students to help them learn any time, anywhere. It serves you relevant content based on your preferences and uses your progress to serve you better content. It helps you attack your weaknesses by giving detailed feedback around your mistakes and suggests relevant topics to clear your concepts.",
    "This website offers a unique process of learning and enriching to develop new areas of interest in a more interesting manner. It is further developed into multiple sections of materials for students to regularly test themselves by solving problems related to their subjects.",
    "The website contains various Tests and Worksheets, and their solutions are in an easy format so that students get a clear and better understanding.",
    "We have also incorporated NCERT Solutions for which students may need for exam preparation and completing their schoolwork. We have provided explanations of English and Hindi Literature.",
    "We have Online Tests with which students can get to know where they are lacking.",
    "Sharya Academy is available on Facebook and Instagram."
];

const displayAbout = About.map((aboutText) =>
    <Text>{aboutText}</Text>
);

const Pricing = [
    {planName: 'Free', price: 'Always ₹0', classColor: 'white',
    points: ['Chapter Notes', 'NCERT Solutions', 'Exemplar Questions'], button: 'Sign Up'},
    {planName: 'Basic', price: 'From ₹299 a year', classColor: 'green white-text',
    points: ['Everything in Free, plus:', 'Practice Tests', 'Worksheets'], button: 'Sign Up'},
    {planName: 'Premium', price: 'From ₹499 a year', classColor: 'dark-green white-text',
    points: ['Everything in Basic, plus:', 'Auto-Graded Tests', 'Detailed Feedback'], button: 'Sign Up'}
];

const listPricing = Pricing.map((planItem) =>
    <Box className={planItem.classColor}>
        <BoxTitle>{planItem.planName}</BoxTitle>
        <Text>{planItem.points[0]}</Text>
        <Text>{planItem.points[1]}</Text>
        <Text>{planItem.points[2]}</Text>
        <BoxTitle>{planItem.price}</BoxTitle>
        <BoxButton
        onClick={(e) => {
            e.preventDefault();
            window.location.href='/signup';
        }}>
            {planItem.button}
        </BoxButton>
    </Box>
);

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
            <Element>
                <TextLogo src={textLogo} />
            </Element>

            {/* About Screen */}
            <Element>
                <Title>About</Title>
                {displayAbout}
            </Element>
            
            {/* Pricing Screen */}
            <Element>
                <Title>Introductory Pricing</Title>
                <div className="pricing">
                    {listPricing}
                </div>
            </Element>

            <Footer>
                <SmallText>&copy; Sharya Academy.</SmallText>
            </Footer>

        </>
    );
}

export default Home;