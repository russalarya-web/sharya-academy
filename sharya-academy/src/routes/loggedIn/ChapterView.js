import React from "react";
import styled from 'styled-components';

import {Title} from "../../App";

export const Section = styled.div`
    padding: 20px 0;
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
`;

export const Container = styled.div`
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
    return (
        <>
            {/* Recently Viewed Section */}
            <Section>
                <Container>
                    <Title>Chapter Notes</Title>
                    {returnList(notesList)}
                </Container>

                <Container>
                    <Title>Worksheets</Title>
                    {returnList(worksheetList)}
                </Container>

                <Container>
                    <Title>Practice Tests</Title>
                    {returnList(testList)}
                </Container>

                <Container>
                    <Title>Online Tests</Title>
                    {returnList(onlineTestList)}
                </Container>

                <Container>
                    <Title>NCERT Solutions</Title>
                    {returnList(solutionsList)}
                </Container>

                <Container>
                    <Title>Exemplar</Title>
                    {returnList(exemplarList)}
                </Container>
            </Section>

        </>
    );
}

export default ChapterView;