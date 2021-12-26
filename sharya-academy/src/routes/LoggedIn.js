import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';

import Dashboard from "./userView/Dashboard";
import ChapterView from "./userView/ChapterView";
import QuizView from "./userView/QuizView";

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
export function DetailsFromAPI(){
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

export function ContentFromAPI(classId){
    const [content, setContent] = useState([{}]);

    async function getContent() {
        const link = "http://localhost:9000/api/content/class?id=" + classId;
        const response = await axios.get(link);
        setContent(response.data);
    }

    useEffect(() => {
        getContent();
    }, [])

    return content;
};

export function ChaptersFromAPI(classId, currentSubject){
    const [chapters, setChapters] = useState([{}]);

    async function getChapters() {
        const link = "http://localhost:9000/api/content/subject?class=" + classId + "&id=" + currentSubject;
        const response = await axios.get(link);
        setChapters(response.data);
    }

    useEffect(() => {
        getChapters();
    }, [])

    return chapters;
};

export function GetSubjectState() {
    return useState("sci");
}

// Landing Page
function LoggedIn() {
    const [currentSubject, setCurrentSubject] = GetSubjectState();
    const [currentChapter, setCurrentChapter] = useState();

    const details = DetailsFromAPI();

    const FirstName = details.firstName;
    var classId = details.class;
    const SubjectsFromDetails = details.subjects;

    const handleSubjectSelection = (disabledValue) => {
        if (SubjectsFromDetails) {
            return SubjectsFromDetails.map((listObject) =>
                { if (listObject.name === "disabled") { 
                    return(<option selected="true" disabled value="">{disabledValue}</option>)
                } else {
                    return(<option value={listObject.id}>{listObject.name}</option>)
                }}
            );
        }
    }

    function displayChapters () {
        const chapters = ChaptersFromAPI("x", currentSubject);
        var chIds = chapters["chIds"];

        if (chIds) {
            return chIds.map((chId) => {
                return (<option>{chapters[chId]["name"]}</option>)
            });
        }
    }

    const SubjectDropdown = ({
        options
    }) => {
        const [selectedOption, setSelectedOption] = useState(options[0].value);
        return (
            <select
              value={selectedOption}
              onChange={e => setSelectedOption(e.target.value)}>
              {options.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
        );
    };


    return (
        <>
            {/* Header */}
            <Header>
                <Menu>
                    {/* <Subject> */}
                    <Subject value={currentSubject}
                        onChange={e => setCurrentSubject(e.target.value)}>
                        {handleSubjectSelection("Select Subject")}
                    </Subject>
                    
                    <Chapter>
                        <option selected="true" disabled value="">Select Chapter</option>
                        {displayChapters()}
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

            {/* <p>{ChaptersOfSubject.totalChapters}</p>
            <p>{currentSubject}</p> */}
        </>
    );
}

export default LoggedIn;