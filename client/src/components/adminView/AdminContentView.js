import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from 'styled-components';

import { useTitle, matchFromDbList } from "../../App";
import {currentUrl} from "../../currentUrl";
import { Structure, Sidebar, sidebarItemClass, MainView, Container, Listing } from "../userView/Dashboard";
import { Button } from "./AdminQuizView";

import CreateContent from "./modals/create/Content";

export const Section = styled.div`
    padding: 20px 0;
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
`;

export const Search = styled.input`
    background: rgba(216, 233, 168, 0.1);
    border: 1px solid rgba(78, 159, 61, 0.5);
    color: rgba(30, 81, 40, 0.8);
    border-radius: 10px;
`;

function GetQuizzes() {
    const [content, setContent] = useState([]);

    async function getContent() {
        const response = await axios.get(currentUrl + ":9000/quiz/all");
        setContent(response.data);
    }

    useEffect(() => {
        getContent();
    }, [])

    return content;
}

const AdminContentView = ({classes, subjects, chapters}) => {
    useTitle("Admin Content View - Sharya Academy");

    var items = [
        {id: "chnt", title: "Chapter Notes", content: []},
        {id: "quiz", title: "Quizzes", content: GetQuizzes()},
        {id: "test", title: "Practice Tests", content: []},
        {id: "wkst", title: "Worksheets", content: []},
        {id: "nsol", title: "NCERT Solutions", content: []},
        {id: "xmpl", title: "Exemplar", content: []}
    ];

    const [show, setShow] = useState(false);
    
    const [currentItem, setCurrentItem] = useState(items[0]);

    const [currentClass, setCurrentClass] = useState(12);
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
                    // filter by class
                    if (contentObject.classId == currentClass) {
                        // filter by subject
                        if (currentSubject === "" || contentObject.subjectId === currentSubject) {
                            if (currentChapter === "" || contentObject.chapterId === currentChapter) {
                                return <Listing
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.location.href="./" + currentItem.id + "/" + contentObject._id;
                                }}>{contentObject.name}
                                <span className="label green white-text">{matchFromDbList(chapters, contentObject.chapterId)}</span>
                                <span className="label dark-green white-text">{matchFromDbList(subjects, contentObject.subjectId)}</span>
                                </Listing>
                            }
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

    function classOptions() {
        return classes.map((item) => {
            return (
            <option value={item._id}>
                Class {item._id}
            </option>
            )
        });
    }

    function subjectOptions() {
        return (
            subjects.map((item) => {
                if (item.classId == currentClass) {
                    return (
                        <option value={item._id}>
                            {item.name}
                        </option>
                    )
                }
            })
        )
    }

    function chapterOptions() {
        return (
            chapters.map((item) => {
                if (item.classId == currentClass) {
                    if (currentSubject === "" || item.subjectId === currentSubject) {
                        return (
                            <option value={item._id}>
                                {item.name}
                            </option>
                        )
                    }
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
                    {/* Class Select */}
                    <select onChange={e => {
                        setCurrentClass(e.target.value);
                        setCurrentSubject("");
                        setCurrentChapter("");
                        }} className="green white-text standard standard-spacing">
                        {classOptions()}
                    </select>

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

                    {/* Add Button */}
                    <Button 
                        className="green white-text standard-spacing"
                        onClick={() => {
                            setShow(true);
                        }}>
                        Add New
                    </Button>
                </div>

                {/* Content View */}
                <Container>
                    <CreateContent onClose={() => setShow(false)} contentType={currentItem.id} classId={currentClass} subjectId={currentSubject} chapterId={currentChapter} show={show}/>
                    {displayContent(currentItem)}
                </Container>
            </MainView>
        </Structure>
    );
}

export default AdminContentView;