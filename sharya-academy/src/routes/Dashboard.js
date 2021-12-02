import React from "react";
import styled from 'styled-components';

import {Box} from "./Home";

export const Title = styled.h1`
    color: #1E5128;
    font-weight: 400;
    margin: 0.5em 0 0.5em 0;
    z-index: 1;
`;

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

const listSubjects = Subjects.map((subject) =>
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

const listChapters = Chapters.map((chapter) =>
    { if (chapter === "disabled") { 
        return(<option selected="true" disabled value="default">Select Chapter</option>)
    } else {
        return(<option value={chapter}>{chapter}</option>)
    }}
);

export const Page = styled.div`
    width: 100%;
    margin: 30px 0;
`;

export const Section = styled.div`
    width: 100%;
    padding: 20px 0;
`;

export const Items = styled.div`
    display: flex;
    flex-direction: row;
`;

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
    <Box className="green white-text">{chapter}</Box>
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
                    <Title>Recently Viewed</Title>
                    <Items>
                    {displayRecent}
                    </Items>
                </Section>

                {/* Recommended Section */}
                <Section>
                    <Title>Recommended</Title>
                    <Items>
                    {displayRecommended}
                    </Items>
                </Section>
            </Page>

        </>
    );
}

export default Dashboard;