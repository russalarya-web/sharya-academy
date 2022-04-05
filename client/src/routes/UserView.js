import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';

import { matchFromDbList } from "../App";
import {currentUrl} from "../currentUrl";

import { Profile } from "./AdminView";

import Dashboard from "../components/userView/Dashboard";
import ChapterView from "../components/userView/ChapterView";
import QuizView from "../components/userView/QuizView";

export const Header = styled.header`
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 2;
    background: #fff;
`;

export const Menu = styled.div`
    display: flex;
    flex-direction: row;
    position: absolute;
    top: 30px;
    right: 30px;
    background: #D8E9A8;
    // background: #fff;
    // border: dashed 1px;
    border-radius: 10px;
    z-index: 2;

`;

export const Page = styled.div`
    width: 95vw;
    margin: 30px 40px 0 40px;
    overflow: hidden;
`;

// API Handling
export function DetailsFromAPI(){
    const [details, setDetails] = useState([{}]);

    async function getDetails() {
        const response = await axios.get(currentUrl + ":9000/details");
        setDetails(response.data);
    }

    useEffect(() => {
        getDetails();
    }, [])

    return details;
};

export function ContentFromAPI(classId){
    const [content, setContent] = useState([{}]);

    async function getContent() {
        const link = currentUrl + ":9000/content/" + classId;
        const response = await axios.get(link);
        setContent(response.data);
    }

    useEffect(() => {
        getContent();
    }, [])

    return content;
};

function GetSubjects(classId) {
    const [subjects, setSubjects] = useState([]);

    async function getContent() {
        const link = currentUrl + ":9000/subject/" + classId;
        const response = await axios.get(link);
        setSubjects(response.data);
    }

    useEffect(() => {
        getContent();
    }, [])

    return subjects;
}

function GetChapters(classId) {
    const [chapters, setChapters] = useState([]);

    async function getContent() {
        const link = currentUrl + ":9000/chapter/" + classId;
        const response = await axios.get(link);
        setChapters(response.data);
    }

    useEffect(() => {
        getContent();
    }, [])

    return chapters;
}

// Landing Page
function UserView() {
    const subjects = GetSubjects(10);
    const chapters = GetChapters(10);

    const details = DetailsFromAPI();

    const FirstName = details.firstName;

    return (
        <>
            {/* Header */}
            <Header>
                <Menu>
                    <Profile
                    className="green white-text standard-spacing"
                    onClick={(e) => {
                        e.preventDefault();
                        window.location.href='/login';
                    }}>
                        Hi, {FirstName}!
                    </Profile>
                </Menu>
            </Header>

            {/* Page */}
            <Page>
                <Switch>
                    <Route path="/app/dashboard" exact>
                        <Dashboard subjects={subjects} chapters={chapters} />
                    </Route>
                    <Route path="/app/quiz/:quizId">
                        <QuizView 
                            getSubjectName={(subjectId) => matchFromDbList(subjects, subjectId)} 
                            getChapterName={(chapterId) => matchFromDbList(chapters, chapterId)} 
                        />
                    </Route>
                </Switch>
            </Page>
        </>
    );
}

export default UserView;