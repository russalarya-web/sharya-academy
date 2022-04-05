import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from 'styled-components';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import {Title, matchFromDbList} from "../App";
import {currentUrl} from "../currentUrl";

import {Box, Text} from "./Home";

import AdminDashboard from "../components/adminView/Dashboard";
import AdminQuizView from "../components/adminView/AdminQuizView";
import AdminContentView from "../components/adminView/AdminContentView";
import AdminStructureView from "../components/adminView/AdminStructureView";

import {db} from "../firebase/config";

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

export const Profile = styled.button`
    font-size: calc(10px + 0.8vmin);
    border-radius: 5px;
    z-index: 1;
`;

export const Subject = styled.select`
    padding: 10px 15px;
    margin: 10px;
    border: solid 1px;
    color: #FFF;
    background: rgba(30, 81, 40, 0.8);
    font-size: calc(10px + 1.2vmin);
    border-radius: 5px;
    z-index: 1;
    min-width: 210px;
`;

export const Chapter = styled.select`
    padding: 10px 15px;
    margin: 10px;
    border: solid 1px;
    background: #fff;
    font-size: calc(10px + 1.2vmin);
    border-radius: 5px;
    z-index: 1;
    min-width: 320px;
`;

export const Page = styled.div`
    width: 95vw;
    margin: 30px 40px 0 40px;
    overflow: hidden;
    align-items: center;
`;

// get classes from API
function GetClasses() {
    const [content, setContent] = useState([]);

    async function getContent() {
        const response = await axios.get(currentUrl + ":9000/class/all");
        setContent(response.data);
    }

    useEffect(() => {
        getContent();
    }, [])

    return content;
}

// get subjects from API
function GetSubjects() {
    const [subjects, setSubjects] = useState([]);

    async function getContent() {
        const response = await axios.get(currentUrl + ":9000/subject/all");
        setSubjects(response.data);
    }

    useEffect(() => {
        getContent();
    }, [])

    return subjects;
}

// get chapters from API
function GetChapters() {
    const [chapters, setChapters] = useState([]);

    async function getContent() {
        const response = await axios.get(currentUrl + ":9000/chapter/all");
        setChapters(response.data);
    }

    useEffect(() => {
        getContent();
    }, [])

    return chapters;
}

// older data
function DetailsFromAPI(){
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

// redundant
export function ChaptersFromAPI(){
    const [chapters, setChapters] = useState([{}]);

    async function getChapters() {
        const response = await axios.get(currentUrl + ":9000/api/chapters");
        setChapters(response.data);
    }

    useEffect(() => {
        getChapters();
    }, [])

    return chapters;
};


// Landing Page
function AdminView() {
    const FirstName = DetailsFromAPI().firstName;

    const classes = GetClasses();
    const subjects = GetSubjects();
    const chapters = GetChapters();

    classes.sort((a, b) => {
        return b._id - a._id;
    });

    if (classes) {
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
                        <Route path="/admin/" exact>
                            <AdminStructureView classes={classes} subjects={subjects} chapters={chapters} />
                        </Route>
                        <Route path="/admin/content" exact>
                            <AdminContentView classes={classes} subjects={subjects} chapters={chapters} />
                        </Route>
                        <Route path="/admin/structure" exact>
                            <AdminStructureView classes={classes} subjects={subjects} chapters={chapters} />
                        </Route>
                        <Route path="/admin/statistics" component={AdminDashboard} exact />
                        <Route path="/admin/quiz/:quizId" exact>
                            <AdminQuizView 
                                getSubjectName={(subjectId) => matchFromDbList(subjects, subjectId)} 
                                getChapterName={(chapterId) => matchFromDbList(chapters, chapterId)}
                            />
                        </Route>
                    </Switch>
                </Page>

            </>
        );
    }
}

export default AdminView;