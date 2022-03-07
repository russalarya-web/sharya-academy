import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from 'styled-components';

import { useParams } from "react-router";
import {currentUrl} from "../../currentUrl";

import { Title, useTitle } from '../../App';

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
    width: 48%;
    border: solid 1px;
    font-size: calc(10px + 1vmin);
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

function GetQuizDetails(quizId) {
    const [quiz, setQuiz] = useState({});

    async function getQuiz() {
        const response = await axios.get(currentUrl + ":9000/quiz/" + quizId);
        setQuiz(response.data);
    }

    useEffect(() => {
        getQuiz();
    }, [])

    return quiz;
}

function GetQuestions(quizId) {
    const [questions, setQuestions] = useState([{}]);

    async function getQuestions() {
        const link = currentUrl + ":9000/quiz/" + quizId + "/questions";
        const response = await axios.get(link);

        setQuestions(response.data);
    }

    useEffect(() => {
        getQuestions();
    }, [])

    return questions;
}

// QuizView Page
const QuizView = props => {
    let { quizId } = useParams();

    var quiz = GetQuizDetails(quizId);
    var questions = GetQuestions(quizId);

    const [currentQuestion, setCurrentQuestion] = useState(0);

    useTitle(quiz.name + " - Sharya Academy")
    
    if (questions) {
        const handlePrevButtonClick = () => {
            if (currentQuestion !== 0) {
                const prevQuestion = currentQuestion - 1;
                setCurrentQuestion(prevQuestion);
            }
        };
    
        const handleNextButtonClick = () => {
            if (currentQuestion !== questions.length - 1) {
                const nextQuestion = currentQuestion + 1;
                setCurrentQuestion(nextQuestion);
            }
        };
        
        if (questions[currentQuestion].options) {
            return (
                <Section>
                    <div className="top-align">
                        <div className="row-container top-align">
                            <span className="round-label dark-green white-text">Class {quiz.classId}</span>
                            <span className="round-label green white-text">{props.getSubjectName(quiz.subjectId)}</span>
                            <span className="round-label dark-green white-text">{props.getChapterName(quiz.chapterId)}</span>
                        </div>
                        <Title>{quiz.name}</Title>
                    </div>
                    <div className="dashed white box">
                        <div className="row-container">
                            <span className="round-label dark-green white-text">Question {currentQuestion + 1} of {questions.length}</span>
                            <span className="round-label green white-text">{questions[currentQuestion].points} points</span>
                        </div>

                        <p className="text align-left" dangerouslySetInnerHTML={{__html: questions[currentQuestion].question }} />

                        <div className="row-container">
                            {questions[currentQuestion].options.map((option, index) =>
                                <p className="option white" dangerouslySetInnerHTML={{__html: (index + 1) + ". " + option }} />
                            )}
                        </div>
                    </div>

                    <div className="row-container no-grow">
                        <div>
                        <button className="dark-green white-text standard-spacing" onClick={(e) => {
                            e.preventDefault();
                            window.location.href="../dashboard";
                        }}>Return to Dashboard</button>
                        <button className="green white-text standard-spacing" onClick={() => handlePrevButtonClick()}>Previous</button>
                        </div>

                        <div>
                            <button className="green white-text standard-spacing" onClick={() => handleNextButtonClick()}>Next</button>;
                            <button className="dark-green white-text standard-spacing">Submit</button>
                        </div>
                    </div>
                </Section>
            );
        } else {
            return null;
        }
    } else {
        return (null);
    }
}

export default QuizView;