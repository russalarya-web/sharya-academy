import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from 'styled-components';

import {Title} from "../../App";
import {Box, Text} from "../Home";

export const Section = styled.div`
    padding: 20px 0;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: row;
`;

export const Search = styled.input`
    background: rgba(242, 242, 242, 0.9);
    color: rgba(30, 81, 40, 0.8);
    border: none;
    border-radius: 10px;
    margin: 1.25em 0;
    height: 2em;
    font-size: calc(10px + 1.2vmin);
    position: absolute;
    right: 30px;
    padding: 0.25em 20px;
`;

export const Sort = styled.select`
    background: rgba(78, 159, 61, 0.8);
    color: #fff;
    border: none;
    border-radius: 10px;
    margin: 1.25em;
    height: 2.5em;
    font-size: calc(10px + 1.2vmin);
    position: absolute;
    right: 290px;
    padding: 0.5em 20px;
`;

const sortOptions = [
    "disabled",
    "No Sort",
    "Most to Least",
    "Least to Most",
    "A to Z",
    "Z to A"
];

const listSortOptions = sortOptions.map((option) =>
    { if (option === "disabled") { 
        return(<option selected="true" disabled value="default">Sort</option>)
    } else {
        return(<option value={option}>{option}</option>)
    }}
);

// Pulled from API
const recentChapters = [
    "Metals and Non Metals",
    "Life Processes"
];

// Pulled from API
const recommendedChapters = [
    "Acids, Bases, and Salts",
    "Control and Coordination"
];

function display(itemList) {
    const boxes = itemList.map((item) =>
        <Box className="dark-green white-text">{item}</Box>
    );

    return boxes;
}

// Landing Page
function Dashboard() {
    return (
        <>
            {/* Recently Viewed Section */}
            <Section>
                <Container>
                    <Title>Recently Viewed</Title>
                </Container>
                
                <Container>
                    {display(recentChapters)}
                </Container>
            </Section>

            {/* Recommended Section */}
            <Section>
                <Container>
                    <Title>Recommended</Title>
                    <Sort>
                        {listSortOptions}
                    </Sort>

                    <Search placeholder="Search" />
                </Container>
                <Container>
                    {display(recommendedChapters)}
                </Container>
            </Section>
        </>
    );
}

export default Dashboard;