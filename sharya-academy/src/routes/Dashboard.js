import React from "react";
import styled from 'styled-components';

import {Title} from "../App";
import {Box} from "./Home";


export const HeaderContainer = styled.div`
    position: fixed;
    width: 100%;
    top: 30px;
    right: 30px;
`;

export const Header = styled.header`
    background: transparent;
    display: flex;
    flex-direction: row;
    position: absolute;
    right: 0;
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
    margin: 30px 0 0 0;
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
    margin: 1.25em 10px;
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

const recentChapters = [
    "Metals and Non Metals",
    "Life Processes"
];

const displayRecent = recentChapters.map((chapter) =>
    <Box className="dark-green white-text">{chapter}</Box>
);

const recommendedChapters = [
    "Acids, Bases, and Salts",
    "Control and Coordination"
];

const displayRecommended = recommendedChapters.map((chapter) =>
    <Box className="dark-green white-text">{chapter}</Box>
);

// Landing Page
function Dashboard() {
    return (
        <>
            {/* Header */}
            <HeaderContainer>
                <Header>
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
                        John Doe
                    </Profile>
                </Header>
            </HeaderContainer>

            {/* Page */}
            <Page>
                {/* Recently Viewed Section */}
                <Section>
                    <Container>
                        <Title>Recently Viewed</Title>
                    </Container>
                    
                    <Container>
                        {displayRecent}
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
                        {displayRecommended}
                    </Container>
                </Section>
            </Page>

        </>
    );
}

export default Dashboard;