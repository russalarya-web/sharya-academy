import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from 'styled-components';

import {useTitle, matchFromDbList} from "../../App";
import {currentUrl} from "../../currentUrl";
import {Search} from "../adminView/AdminContentView";

export const MainView = styled.div`
    padding: 20px 10px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 10px;
    width: 75%;
`;

export const Sidebar = styled.div`
    padding: 0px;
    background: rgba(78, 159, 61, 0.8);
    border-radius: 10px;
    width: 25%;
    border: solid 0.25px #fff;
    display: flex;
    flex-direction: column;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Structure = styled.div`
    display: flex;
    flex-direction: row;
    vertical-align: middle;
`;

export const Listing = styled.div`
    padding: 10px;
    margin: 6px 10px;
    border-radius: 10px;
    background: rgba(78, 159, 61, 0.1);
    color: #4E9F3D;
    text-indent: 10px;
    text-align: left;
    font-size: calc(10px + 0.8vmin);
    cursor: pointer;
`;

// get quizzes by class
function GetQuizzes(classId) {
    const [content, setContent] = useState([]);

    async function getContent() {
        const response = await axios.get(currentUrl + ":9000/quiz/all/" + classId);
        console.log(response.data);
        setContent(response.data);
    }

    useEffect(() => {
        getContent();
    }, [])

    return content;
}

export function sidebarItemClass(id, currentValue) {
    if (id === currentValue) {
        return "sidebar sidebar-current";
    } else {
        return "sidebar";
    }
}

// Landing Page
const Dashboard = ({subjects, chapters}) => {
    useTitle("Dashboard - Sharya Academy");

    var items = [
        {id: "chnt", title: "Chapter Notes", content: []},
        {id: "quiz", title: "Quizzes", content: GetQuizzes(10)},
        {id: "test", title: "Practice Tests", content: []},
        {id: "wkst", title: "Worksheets", content: []},
        {id: "nsol", title: "NCERT Solutions", content: []},
        {id: "xmpl", title: "Exemplar", content: []}
    ];

    const [currentItem, setCurrentItem] = useState(items[0]);

    const [currentSubject, setCurrentSubject] = useState("");
    const [currentChapter, setCurrentChapter] = useState("");

    function listItems() {
        return items.map((item) => {
            return (
            <div 
                class={sidebarItemClass(item.id, currentItem.id)} 
                onClick={() => {
                    setCurrentItem(item);
                }}
            >
                {item.title}
            </div>
            )
        });
    }

    function displayContent(item) {
        if (item.content.length !== 0) {
            return <>
                {item.content.map((contentObject) => {
                    // filter by subject
                    if (currentSubject === "" || contentObject.subjectId === currentSubject) {
                        // filter by chapter
                        if (currentChapter === "" || contentObject.chapterId === currentChapter) {
                            return <Listing
                            onClick={(e) => {
                                e.preventDefault();
                                window.location.href="/app/" + currentItem.id + "/" + contentObject._id;
                            }}>{contentObject.name}
                            <span className="label green white-text">{matchFromDbList(chapters, contentObject.chapterId)}</span>
                            <span className="label dark-green white-text">{matchFromDbList(subjects, contentObject.subjectId)}</span>
                            </Listing>
                        }
                    }
                })}
                <p>If you see nothing, try adjusting Filters.</p>
            </>
        }
        else {
            return <p>{item.title} not yet available.</p>
        }
    }

    function subjectOptions() {
        return (
            subjects.map((item) => {
                return (
                    <option value={item._id}>
                        {item.name}
                    </option>
                )
            })
        )
    }

    function chapterOptions() {
        return (
            chapters.map((item) => {
                if (currentSubject === "" || item.subjectId === currentSubject) {
                    return (
                        <option value={item._id}>
                            {item.name}
                        </option>
                    )
                }
            })
        )
    }

    return (
        <Structure>
            {/* Sidebar */}
            <Sidebar>
                {listItems()}
            </Sidebar>

            {/* Main View */}
            <MainView>
                {/* Top Bar */}
                <div className="row-container">
                    {/* Subject Select */}
                    <select onChange={e => {
                        setCurrentSubject(e.target.value);
                        setCurrentChapter("");
                        }} className="green white-text semi-long standard-spacing">
                        <option value="">Select Subject</option>
                        {subjectOptions()}
                    </select>

                    {/* Chapter Select */}
                    <select
                        onChange={e => setCurrentChapter(e.target.value)} 
                        className="green white-text long standard-spacing">
                        <option value="">Select Chapter</option>
                        {chapterOptions()}
                    </select>

                    {/* Search Box */}
                    <Search className="semi-long standard-spacing" placeholder="Search..."/>
                </div>

                <Container>
                    {displayContent(currentItem)}
                    {/* {listChapters()} */}
                </Container>
            </MainView>
        </Structure>
    );
}

export default Dashboard;