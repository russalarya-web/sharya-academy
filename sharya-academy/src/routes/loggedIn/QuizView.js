import React, { useEffect, useState } from "react";
import axios from "axios";
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

function QuizFromAPI() {
    const [sort, setSort] = useState([]);

    async function getSort() {
        const response = await axios.get("http://localhost:9000/api/quiz/quiz-1");
        setSort(response.data);
    }

    useEffect(() => {
        getSort();
    }, [])

    return sort;
}

// QuizView Page
function QuizView() {
    const quiz = QuizFromAPI();

    let questions;
    const [currentQuestion, setCurrentQuestion] = useState(0);

    if (quiz.questions) {
        questions = quiz.questions;

        const handlePrevButtonClick = (answerOption) => {
            if (currentQuestion !== 0) {
                const prevQuestion = currentQuestion - 1;
                setCurrentQuestion(prevQuestion);
            }
        };
    
        const handleNextButtonClick = (answerOption) => {
            if (currentQuestion !== questions.length - 1) {
                const nextQuestion = currentQuestion + 1;
                setCurrentQuestion(nextQuestion);
            }
        };

        return (
            <>
                {/* Quiz Section */}
                <Section>
                    {/* {displayQuestions(quiz.questions)} */}
                    <Container>
                        <RoundLabel className="dark-green white-text">Question {currentQuestion + 1} of {questions.length}</RoundLabel>
                        <RoundLabel className="green white-text right">{questions[currentQuestion].points} points</RoundLabel>
                    </Container>

                    <BigText>{questions[currentQuestion].question}</BigText>

                    <Container>
                        {questions[currentQuestion].options.map((option) =>
                            <Option className="white">{option}</Option>
                        )}
                    </Container>

                    <Container>
                        {/* {PrevButton([currentQuestion, setCurrentQuestion])} */}
                        <Button className="green white-text" onClick={() => handlePrevButtonClick()}>Previous</Button>
                        <div className="right">
                            {/* {NextButton([currentQuestion, setCurrentQuestion])} */}
                            <Button className="green white-text" onClick={() => handleNextButtonClick()}>Next</Button>;
                            <Button className="dark-green white-text">Submit</Button>
                        </div>
                    </Container>
                </Section>
            </>
        );
    } else {
        return (null);
    }
}

export default QuizView;