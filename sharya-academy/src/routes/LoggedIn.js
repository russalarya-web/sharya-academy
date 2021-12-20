import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';

import Dashboard from "./loggedIn/Dashboard";
import ChapterView from "./loggedIn/ChapterView";
import QuizView from "./loggedIn/QuizView";

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
    padding: 10px 15px;
    margin: 10px;
    border: solid 1px;
    color: #FFF;
    background: rgba(78, 159, 61, 0.8);
    font-size: calc(10px + 1.2vmin);
    border-radius: 5px;
    z-index: 1;
    min-width: 150px;
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

export function listMenu(list, disabledValue) {
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

export const Page = styled.div`
    width: 95vw;
    margin: 30px 40px 0 40px;
    overflow: hidden;
`;

// API Handling
function DetailsFromAPI(){
    const [details, setDetails] = useState([{}]);

    async function getDetails() {
        const response = await axios.get("http://localhost:9000/api/details");
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
        const response = await axios.get("http://localhost:9000/api/chapters");
        setChapters(response.data);
    }

    useEffect(() => {
        getChapters();
    }, [])

    return chapters;
};

function chapterProcessing() {
    const chapters = ChaptersFromAPI();
    var chapterNames = [];

    chapters.forEach(chapter => {
        chapterNames.push(chapter.name);
    });

    return chapterNames;
}

// Landing Page
function LoggedIn() {
    const FirstName = DetailsFromAPI().firstName;
    const Subjects = DetailsFromAPI().subjects;
    const Chapters = chapterProcessing();

    return (
        <>
            {/* Header */}
            <Header>
                <Menu>
                    <Subject>
                        {listMenu(Subjects, "Select Subject")}
                    </Subject>

                    <Chapter>
                        {listMenu(Chapters, "Select Chapter")}
                    </Chapter>

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
                    <Route path="/user/" component={Dashboard} exact />
                    <Route path="/user/chapter" component={ChapterView} />
                    <Route path="/user/quiz" component={QuizView} />
                </Switch>
            </Page>

        </>
    );
}

export default LoggedIn;