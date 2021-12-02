import React from "react";
import styled from 'styled-components';

import {Box} from "./Home";
import {Title} from "../App";
import {Page, Section, Container, Header, HeaderContainer, Profile, Subject, Chapter, listSubjects, listChapters} from "./Dashboard";

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

// ChapterView Page
function ChapterView() {
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
            </Page>

        </>
    );
}

export default ChapterView;