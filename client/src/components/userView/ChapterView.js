import React, { useState } from "react";
import styled from 'styled-components';

import {Title, currentUrl} from "../../App";
import { listMenu, ContentFromAPI, GetSubjectState } from "../../routes/UserView";
import { Sidebar, MainView, sidebarItemClass } from "./Dashboard";

export const Section = styled.div`
    padding: 20px 0;
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
`;

export const OldContainer = styled.div`
    display: flex;
    height: 85vh;
    margin-top: 50px;
    flex-direction: column;
    min-width: 380px;
    overflow-y: scroll;
`;

const Box = styled.div`
    border-radius: 5px;
    padding: 1em;
    min-width: 100px;
    margin: 15px;
    display: flex;
    flex-direction: column;
`;

// Temp Data
const notesList = [
    "Topic 1",
    "Topic 2",
    "Topic 3"
];

const worksheetList = [
    "Worksheet 1",
    "Worksheet 2",
    "Worksheet 3"
];

const testList = [
    "Test 1",
    "Test 2",
    "Test 3"
];

const onlineTestList = [
    "Test 1",
    "Test 2",
    "Test 3",
    "Test 4",
    "Test 5",
    "Test 6"
];

const solutionsList = [
    "Exercise 1",
    "Exercise 2",
    "Exercise 3"
];

const exemplarList = [
    "Set 1",
    "Set 2",
    "Set 3"
];

function returnList(sampleList) {
    return (sampleList.map((topic) =>
        <Box className="dark-green white-text">{topic}</Box>
    ));
}

// ChapterView Page
function ChapterView() {
    // const [currentItem, setCurrentItem] = useState([]);'

    // const content = ContentFromAPI("x");

    // Fix up before Decommenting
    // function listSubjects() {
    //     var subjects = content["subIds"];

    //     if (subjects) {
    //         return subjects.map((id) => {
    //             return (<div class={sidebarItemClass(id, currentSubject)} onClick={() => setCurrentSubject(id)}>{content[id]["name"]}</div>)
    //         });
    //     }
    // }
    return (
        <>
            {/* Recently Viewed Section */}
            <Section>
                <OldContainer>
                    <Title>Chapter Notes</Title>
                    {returnList(notesList)}
                </OldContainer>

                <OldContainer>
                    <Title>Worksheets</Title>
                    {returnList(worksheetList)}
                </OldContainer>

                <OldContainer>
                    <Title>Practice Tests</Title>
                    {returnList(testList)}
                </OldContainer>

                <OldContainer>
                    <Title>Online Tests</Title>
                    {returnList(onlineTestList)}
                </OldContainer>

                <OldContainer>
                    <Title>NCERT Solutions</Title>
                    {returnList(solutionsList)}
                </OldContainer>

                <OldContainer>
                    <Title>Exemplar</Title>
                    {returnList(exemplarList)}
                </OldContainer>
            </Section>

        </>
    );
}

export default ChapterView;