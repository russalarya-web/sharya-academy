import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from 'styled-components';

import {Title} from "../App";
import {Box, Text} from "./Home";

export const Header = styled.header`
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 2;
    background: #fff;
`;

export const Menu = styled.div`
    display: flex;
    flex-direction: row;
    position: absolute;
    top: 30px;
    right: 30px;
    background: #D8E9A8;
    // background: #fff;
    // border: dashed 1px;
    border-radius: 10px;
    z-index: 2;

`;

export const Profile = styled.button`
    padding: 10px 15px;
    margin: 10px;
    border: solid 1px;
    color: #FFF;
    background: rgba(78, 159, 61, 0.8);
    font-size: calc(10px + 1.2vmin);
    border-radius: 5px;
    z-index: 1;
    min-width: 150px;
`;

export const Subject = styled.select`
    padding: 10px 15px;
    margin: 10px;
    border: solid 1px;
    color: #FFF;
    background: rgba(30, 81, 40, 0.8);
    font-size: calc(10px + 1.2vmin);
    border-radius: 5px;
    z-index: 1;
    min-width: 210px;
`;

const Subjects = [
    "Science",
    "Social Science",
    "Mathematics",
    "Hindi",
    "English"
];

export const listSubjects = Subjects.map((subject) =>
    <option>{subject}</option>
);

export const Chapter = styled.select`
    padding: 10px 15px;
    margin: 10px;
    border: solid 1px;
    background: #fff;
    font-size: calc(10px + 1.2vmin);
    border-radius: 5px;
    z-index: 1;
    min-width: 320px;
`;

const Chapters = [
    "disabled",
    "Acids, Bases, and Salts",
    "Metals and Non Metals",
    "Life Processes",
    "Control and Coordination"
];

export const listChapters = Chapters.map((chapter) =>
    { if (chapter === "disabled") { 
        return(<option selected="true" disabled value="default">Select Chapter</option>)
    } else {
        return(<option value={chapter}>{chapter}</option>)
    }}
);

export const Page = styled.div`
    width: 95vw;
    margin: 30px 40px 0 40px;
    overflow: hidden;
`;

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
    // API Handling
    const [name, setName] = useState([]);

    async function getName() {
        const response = await axios.get("http://localhost:9000/name");
        setName(response.data);
    }

    useEffect(() => {
        getName();
    }, [])

    return (
        <>
            {/* Header */}
            <Header>
                <Menu>
                    <Subject>
                        {listSubjects}
                    </Subject>

                    <Chapter>
                        {listChapters}
                    </Chapter>

                    <Profile
                    onClick={(e) => {
                        e.preventDefault();
                        window.location.href='/login';
                    }}>
                        {name}
                    </Profile>
                </Menu>
            </Header>

            {/* Page */}
            <Page>
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
            </Page>

        </>
    );
}

export default Dashboard;