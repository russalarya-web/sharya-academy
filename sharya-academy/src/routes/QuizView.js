import React from "react";
import styled from 'styled-components';

import {Text} from "./Home";
import {Title} from "../App";
import {Page, Header, HeaderContainer, Profile, Subject, Chapter, listSubjects, listChapters} from "./Dashboard";

export const Section = styled.div`
    padding: 20px 50px;
    display: flex;
    flex-direction: column;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: row;
`;

const options = [
    "Sulphur",
    "Oxygen",
    "Nitrogen",
    "Iodine"
];

export const RoundLabel = styled.p`
    border-radius: 20px;
    padding: 5px 15px;
    border: solid 1px;
`;

export const BigText = styled.h2`
  color: #1E5128;
  font-weight: 400;
  margin: 0.2em 0 0.2em 0;
  z-index: 1;
  text-align: justify;
`;

export const Box = styled.div`
    border-radius: 10px;
    padding: 1.2em;
    min-width: 200px;
    margin: 15px;
    box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
`;

export const Option = styled.button`
    border-radius: 10px;
    padding: 1em;
    opacity: 0.9;
    width: 50%;
    border: solid 1px;
    font-size: calc(10px + 1.2vmin);
    margin: 10px;
    text-align: left;
`;

export const Button = styled.button`
    border-radius: 10px;
    padding: 0.8em 1.2em;
    border: solid 1px;
    font-size: calc(10px + 1.2vmin);
    margin: 10px;
`;

function returnList(sampleList) {
    return (sampleList.map((topic) =>
        <Option className="white">{topic}</Option>
    ));
}

// ChapterView Page
function QuizView() {
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
                        <RoundLabel className="dark-green white-text">Question 1 of 15</RoundLabel>
                        <RoundLabel className="green white-text right">2 points</RoundLabel>
                    </Container>

                    <BigText>Generally, non-metals are not lustrous. Which of the following nonmetal is lustrous?</BigText>

                    <Container>
                        {returnList(options)}
                    </Container>

                    <Container>
                        <Button className="green white-text">Previous</Button>
                        <div className="right">
                            <Button className="green white-text">Next</Button>
                            <Button className="dark-green white-text">Submit</Button>
                        </div>
                    </Container>
                </Section>
            </Page>

        </>
    );
}

export default QuizView;