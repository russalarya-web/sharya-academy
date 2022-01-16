import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from 'styled-components';

import {Title, subjectCodes} from "../../App";
import CreateQuestion from "./modals/CreateQuestion";
import { useParams } from "react-router";

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

export const Button = styled.button`
    padding: 10px 20px;
    border: none;
    margin: auto;
    cursor: pointer;
`;

function GetQuizDetails(quizId) {
    const [quiz, setQuiz] = useState({});

    async function getQuiz() {
        // Used Specific Quiz for Testing
        const link = "http://localhost:9000/quiz/" + quizId
        const response = await axios.get(link);

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
        // Used Specific Quiz for Testing
        const link = "http://localhost:9000/quiz/" + quizId + "/questions";
        const response = await axios.get(link);

        setQuestions(response.data);
    }

    useEffect(() => {
        getQuestions();
    }, [])

    return questions;
}

function getSubjectName(id) {
    var name = "";

    subjectCodes.forEach(code => {
        if (code.id === id) {
            name = code.name;
        }
    });

    return name;
}

// ChapterView Page
const AdminQuizView = props => {
    let { quizId } = useParams();
    const [show, setShow] = useState(false);

    const [questionId, setQuestionId] = useState(quizId);

    var quiz = GetQuizDetails(quizId);

    var quizQuestions = GetQuestions(quizId);

    if (quizQuestions) {
        return (
            <Section>
                {/* Quiz View */}
                <div className="top-align">
                    <div className="row-container top-align">
                        <p className="round-label dark-green white-text">Class {quiz.classId}</p>
                        <p className="round-label green white-text">{getSubjectName(quiz.subjectId)}</p>
                        <p className="round-label dark-green white-text">{quiz.chapterId}</p>
                    </div>
                    <Title>Creating <u>{quiz.name}</u></Title>
                </div>

                {/* Display Questions */}
                {quizQuestions.map((question, index) => {
                    var currentInt = index + 1;

                    if (question.options) {
                        return (
                            <div className="dashed white box">
                                {/* Display Question Details */}
                                <div className="row-container">
                                    <p className="round-label dark-green white-text">Question {currentInt}</p>
                                    <p className="round-label green white-text">{question.points} points</p>
                                </div>
                                <p className="text align-left">{question.question}</p>

                                {/* Display Options */}
                                <div className="row-container">
                                    {question.options.map((option, index) => {
                                        var currentIndex = index + 1;
                                        if (currentIndex === question.correctOption) {
                                            return <p className="option green white-text">{currentIndex}. {option}</p>
                                        }
                                        return <p className="option">{currentIndex}. {option}</p>
                                    })}
                                </div>
                            </div>
                        );
                    }
                })}

                {/* Create Question Modal */}
                <CreateQuestion onClose={() => setShow(false)} quizId={quizId} questionId={questionId} show={show}/>
                
                {/* Bottom Buttons */}
                <div className="row-container">
                    {/* Add Button */}
                    <Button 
                        className="green white-text standard-spacing"
                        onClick={() => {
                            const newIdNumber = quizQuestions.length + 1;
                            setQuestionId(quizId + "-" + newIdNumber.toString());
                            setShow(true);
                        }}>
                        Add Question
                    </Button>

                    {/* Back Button */}
                    <Button
                        className="dark-green white-text standard-spacing"
                        onClick={(e) => {
                            e.preventDefault();
                            window.location.href="../content";
                        }}>
                        Return to Dashboard
                    </Button>
                </div>
            </Section>
        );
    }
}

export default AdminQuizView;