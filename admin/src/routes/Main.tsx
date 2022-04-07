import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';

import {api} from "../url";

import QuizView from "../pages/QuizView";
import ContentView from "../pages/ContentView";
import StructureView from "../pages/StructureView";

import {db} from "../firebase/config";
import NoAccess from "./NoAccess";

// match id from given db list
export function matchFromDbList(list: { _id: string | number; name: string;}[], id: string | number) {
	var name: any;
	list.forEach((listObject) => {
		if (listObject._id === id) {
			name = listObject.name;
		}
	});

	return name;
}

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

export const Button = styled.button`
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
    const [content, setContent] = useState([{_id: 10}]);

    async function getContent() {
        const response = await axios.get(api + "/class/all");
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
        const response = await axios.get(api + "/subject/all");
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
        const response = await axios.get(api + "/chapter/all");
        setChapters(response.data);
    }

    useEffect(() => {
        getContent();
    }, [])

    return chapters;
}


// Landing Page
function AdminView() {
    let authToken = sessionStorage.getItem('Auth Token')

    if (!authToken) {
        return <NoAccess />
    }
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
                        <Button
                            className="dark-green white-text standard-spacing"
                            onClick={(e) => {
                                e.preventDefault();
                                window.location.href='/structure';
                            }}>
                            Structure
                        </Button>
                        <Button
                            className="dark-green white-text standard-spacing"
                            onClick={(e) => {
                                e.preventDefault();
                                window.location.href='/content';
                            }}>
                            Content
                        </Button>
                        <Button
                            className="green white-text standard-spacing"
                            onClick={(e) => {
                                e.preventDefault();
                                window.location.href='/';
                            }}>
                            Sign out
                        </Button>
                    </Menu>
                </Header>

                {/* Page */}
                <Page>
                    <Routes>
                        <Route path="/content" element={<ContentView classes={classes} subjects={subjects} chapters={chapters} />}
                        />
                        <Route path="/structure" element={<StructureView classes={classes} subjects={subjects} chapters={chapters} />}
                        />
                        <Route path="/quiz/:quizId" element={<QuizView 
                                getSubjectName={(subjectId: string) => matchFromDbList(subjects, subjectId)} 
                                getChapterName={(chapterId: string) => matchFromDbList(chapters, chapterId)}
                            />}
                        />
                    </Routes>
                </Page>
            </>
        );
    } else {
        return (<></>);
    }
}

export default AdminView;