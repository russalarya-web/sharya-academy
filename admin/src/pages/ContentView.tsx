import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from 'styled-components';

import { useTitle } from "../App";
import {api as currentUrl} from "../url";
import { Structure, Sidebar, sidebarItemClass, MainView, Container, Listing } from "../Components";
import { Button } from "./QuizView";

import CreateContent from "../modals/create/Content";
import { matchFromDbList } from "../routes/Main";

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
        const response = await axios.get(currentUrl + "/quiz/all");
        setContent(response.data);
    }

    useEffect(() => {
        getContent();
    }, [])

    return content;
}

type Props = {
    classes: any[],
    subjects: any[],
    chapters: any[]
}

const ContentView = ({classes, subjects, chapters}: Props) => {
    useTitle("Admin Content View - Sharya Academy");

    var items = [
        {id: "chapter-notes", title: "Chapter Notes", content: []},
        {id: "quiz", title: "Quizzes", content: GetQuizzes()},
        {id: "test", title: "Practice Tests", content: []},
        {id: "worksheet", title: "Worksheets", content: []},
        {id: "ncert-solutions", title: "NCERT Solutions", content: []},
        {id: "exemplar", title: "Exemplar", content: []}
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
                className={sidebarItemClass(item.id, currentItem.id)} 
                onClick={() => {
                    setCurrentItem(item);
                }}
            >
                {item.title}
            </div>
            )
        });
    }

    function displayContent(item: { id?: string; title: any; content: any; }) {
        if (item.content.length !== 0) {
            return <>
                {item.content.map((contentObject: { classId: number; subjectId: string; chapterId: string; _id: string; name: any; }) => {
                    // filter by class
                    if (contentObject.classId === currentClass) {
                        // filter by subject
                        if (currentSubject === "" || contentObject.subjectId === currentSubject) {
                            if (currentChapter === "" || contentObject.chapterId === currentChapter) {
                                return (
                                    <Listing
                                    onClick={(e: { preventDefault: () => void; }) => {
                                        e.preventDefault();
                                        window.location.href="./" + currentItem.id + "/" + contentObject._id;
                                    }}>
                                        {contentObject.name}
                                        <span className="label green white-text">{matchFromDbList(chapters, contentObject.chapterId)}</span>
                                        <span className="label dark-green white-text">{matchFromDbList(subjects, contentObject.subjectId)}</span>
                                    </Listing>
                                )
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
        return classes.map((item: { _id: number }) => {
            return (
            <option value={item._id}>
                Class {item._id}
            </option>
            )
        });
    }

    function subjectOptions() {
        return (
            subjects.map((item: { classId: number; _id: string | number | readonly string[] | undefined; name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
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
            chapters.map((item: { classId: number; subjectId: string; _id: string | number; name: string; }) => {
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
                        setCurrentClass(Number(e.target.value));
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
                <CreateContent onClose={() => setShow(false)} contentType={currentItem.id} classId={currentClass} subjectId={currentSubject} chapterId={currentChapter} show={show}/>
                {/* Content View */}
                <Container>
                    {displayContent(currentItem)}
                </Container>
            </MainView>
        </Structure>
    );
}

export default ContentView;