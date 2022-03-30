import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from 'styled-components';

import {Title, useTitle} from "../../App";
import {currentUrl} from "../../currentUrl";

import CreateQuestion from "./modals/create/Question";
import { useParams } from "react-router";
import UpdateQuestion from "./modals/update/Question";

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
    margin: auto 10px;
    cursor: pointer;
`;

function GetQuizDetails(quizId) {
    const [quiz, setQuiz] = useState({});

    async function getQuiz() {
        // Used Specific Quiz for Testing
        const link = currentUrl + ":9000/quiz/" + quizId
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
        const link = currentUrl + ":9000/quiz/" + quizId + "/questions";
        const response = await axios.get(link);

        setQuestions(response.data);
    }

    useEffect(() => {
        getQuestions();
    }, [])

    return questions;
}

const Question = ({question, currentInt}) => {
    const [show, setShow] = useState(false);
    return (
        <div className="dashed white box">
            {/* Display Question Details */}
            <div className="row-container">
                <p className="round-label dark-green white-text">Question {currentInt}</p>
                <p className="round-label green white-text">{question.points} points</p>
            </div>
            
            <p className="text align-left" dangerouslySetInnerHTML={{__html: question.question }} />

            {/* Display Options */}
            <div className="row-container">
                {question.options.map((option, index) => {
                    var currentIndex = index + 1;
                    if (currentIndex === question.correctOption) {
                        return <p className="option green white-text" dangerouslySetInnerHTML={{__html: currentIndex + ". " + option }} />
                    }
                    return <p className="option" dangerouslySetInnerHTML={{__html: currentIndex + ". " + option }} />
                })}
            </div>

            <div className="row-container no-grow">
                {/* <button className="question-button green white-text">Remove</button> */}
                <button 
                className="standard-spacing dark-green white-text"
                onClick={() => {
                    setShow(true);
                }}>Edit</button>
            </div>
            <UpdateQuestion onClose={() => setShow(false)} question={{id: question._id, text: question.question, option1: question.options[0], option2: question.options[1], option3: question.options[2], option4: question.options[3], correctOption: question.correctOption, points: question.points}} show={show}/>
        </div>
    );
}

// ChapterView Page
const AdminQuizView = props => {
    let { quizId } = useParams();
    const [show, setShow] = useState(false);

    const [questionId, setQuestionId] = useState(quizId);

    var quiz = GetQuizDetails(quizId);

    var quizQuestions = GetQuestions(quizId);

    useTitle("Editing " + quiz.name + " - Sharya Academy")

    if (quizQuestions) {
        return (
            <Section>
                {/* Quiz View */}
                <div className="top-align">
                    <div className="row-container top-align">
                        <p className="round-label dark-green white-text">Class {quiz.classId}</p>
                        <p className="round-label green white-text">{props.getSubjectName(quiz.subjectId)}</p>
                        <p className="round-label dark-green white-text">{props.getChapterName(quiz.chapterId)}</p>
                    </div>
                    <Title>Creating <u>{quiz.name}</u></Title>
                </div>

                {/* Display Questions */}
                {quizQuestions.map((question, index) => {
                    var currentInt = index + 1;

                    if (question.options) {
                        return (
                            <Question question={question} currentInt={currentInt}/>
                        );
                    }
                })}

                {/* Create Question Modal */}
                <CreateQuestion onClose={() => setShow(false)} quizId={quizId} questionId={questionId} show={show}/>
                
                {/* Bottom Buttons */}
                <div className="row-container no-grow">
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