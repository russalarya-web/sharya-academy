import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';

import { Link, matchFromDbList } from "../App";
import {currentUrl} from "../currentUrl";

import { Profile } from "./AdminView";

import Dashboard from "../components/userView/Dashboard";
import QuizView from "../components/userView/QuizView";

import { db, auth } from "../firebase/config";
import { logout } from "./SignIn";


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

export function ContentFromAPI(classId: string){
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

function GetSubjects(classId: string | number) {
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

function GetChapters(classId: string | number) {
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
    const user = auth.currentUser;
    const [firstName, setFirstName] = useState("");

    const getName = async () => {
        if (user) {
            return await db.collection("users").doc(user.uid).get()
            .then(snapshot => {
                const data = snapshot.data()

                if (data) {
                    return data.fname;
                }
            })
        }
        else {
            return ""
        }
    }

    const subjects = GetSubjects(10);
    const chapters = GetChapters(10);

    useEffect(() => {
        getName()
        .then(data => setFirstName(data))
    })

    if (user) {
        return (
            <>
                {/* Header */}
                <Header>
                    <Menu>
                        <Profile
                        className="dark-green white-text standard-spacing"
                        onClick={(e) => {
                            e.preventDefault();
                            window.location.href='/login';
                        }}>
                            Hi, {firstName}!
                        </Profile>

                        <Profile
                        className="green white-text standard-spacing"
                        onClick={(e) => {
                            e.preventDefault();
                            logout();
                            window.location.href='/login';
                        }}>
                            Sign out
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
                                getSubjectName={(subjectId: string) => matchFromDbList(subjects, subjectId)} 
                                getChapterName={(chapterId: string) => matchFromDbList(chapters, chapterId)} 
                            />
                        </Route>
                    </Switch>
                </Page>
            </>
        );
    } else {
        return (
            <Page>
                <h1>You do not have access to this page. <Link href="/login">Sign in</Link> now.</h1>
            </Page>
        )
    }
}

export default UserView;