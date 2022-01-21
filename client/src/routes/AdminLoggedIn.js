import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from 'styled-components';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import {Title, currentUrl} from "../App";
import {Box, Text} from "./Home";

import AdminDashboard from "./adminView/AdminDashboard";
import AdminQuizView from "./adminView/AdminQuizView";
import AdminContentView from "./adminView/AdminContentView";
import AdminStructureView from "./adminView/AdminStructureView";

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
    padding: 10px 20px;
    margin: 10px;
    border: solid 1px;
    color: #FFF;
    background: rgba(78, 159, 61, 0.8);
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

function listMenu(list, disabledValue) {
    if (list) {
        return list.map((listObject) =>
            { if (listObject === "disabled") { 
                return(<option selected="true" disabled value="default">{disabledValue}</option>)
            } else {
                return(<option value={listObject}>{listObject}</option>)
            }}
        );
    }
}

function listSubjects(list, disabledValue) {
    if (list) {
        return list.map((listObject) =>
            { if (listObject.name === "disabled") { 
                return(<option selected="true" disabled value="default">{disabledValue}</option>)
            } else {
                return(<option value={listObject.id}>{listObject.name}</option>)
            }}
        );
    }
}

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

// API Handling
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
function AdminLoggedIn() {
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
                            <AdminQuizView />
                        </Route>
                    </Switch>
                </Page>

            </>
        );
    }
}

export default AdminLoggedIn;