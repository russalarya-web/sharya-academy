import React from "react";
import styled from 'styled-components';

export const Section = styled.div`
    padding: 20px 50px;
    display: flex;
    flex-direction: column;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

var questions = [
    {question: "Generally, non-metals are not lustrous. Which of the following nonmetal is lustrous?", options: ["Sulphur", "Oxygen", "Nitrogen", "Iodine"], points: 2, number: 1},
    {question: "Generally, non-metals are not lustrous. Which of the following nonmetal is lustrous?", options: ["Sulphur", "Oxygen", "Nitrogen", "Iodine"], points: 2, number: 2},
    {question: "Generally, non-metals are not lustrous. Which of the following nonmetal is lustrous?", options: ["Sulphur", "Oxygen", "Nitrogen", "Iodine"], points: 2, number: 3},
    {question: "Generally, non-metals are not lustrous. Which of the following nonmetal is lustrous?", options: ["Sulphur", "Oxygen", "Nitrogen", "Iodine"], points: 2, number: 4},
];

export const RoundLabel = styled.p`
    border-radius: 20px;
    padding: 5px 15px;
    margin: 0;
    margin-top: 50px;
    border: solid 1px;
`;

export const BigText = styled.h2`
    color: #1E5128;
    font-weight: 400;
    margin: 0.2em 0 0.2em 0;
    z-index: 1;
    text-align: justify;W
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
    width: 48%;
    border: solid 1px;
    font-size: calc(10px + 1.2vmin);
    margin: 10px 1%;
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
    return (sampleList.map((option) =>
        <Option className="white">{option}</Option>
    ));
}

function displayQuestions(listQuestions) {
    return (listQuestions.map((questionItem) =>
    <>
        <Container>
            <RoundLabel className="dark-green white-text">Question {questionItem.number} of {listQuestions.length}</RoundLabel>
            <RoundLabel className="green white-text right">{questionItem.points} points</RoundLabel>
        </Container>

        <BigText>{questionItem.question}</BigText>

        <Container>
            {returnList(questionItem.options)}
        </Container>
    </>
    ));
}

// ChapterView Page
function QuizView() {
    return (
        <>
            {/* Quiz Section */}
            <Section>
                {displayQuestions(questions)}

                <Container>
                    {/* <Button className="green white-text">Previous</Button> */}
                    <div className="right">
                        {/* <Button className="green white-text">Next</Button> */}
                        <Button className="dark-green white-text">Submit</Button>
                    </div>
                </Container>
            </Section>
        </>
    );
}

export default QuizView;