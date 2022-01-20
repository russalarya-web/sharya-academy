import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from 'styled-components';

import { currentUrl, useTitle } from "../../App";
import { Structure, Sidebar, sidebarItemClass, MainView, Container, Listing } from "../userView/Dashboard";
import { Button } from "./AdminQuizView";

import CreateContent from "./modals/CreateContent";

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

const Select = styled.select`
    background: rgba(78, 159, 61, 0.8);
    color: #fff;
    border: 1px solid rgba(78, 159, 61, 0.5);
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


const AdminContentView = ({classes, subjects}) => {
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
            return item.content.map((contentObject) => {
                // filter by class
                if (contentObject.classId == currentClass) {
                    // filter by subject
                    if (currentSubject === "" || contentObject.subjectId === currentSubject) {
                        return <Listing
                        onClick={(e) => {
                            e.preventDefault();
                            window.location.href="./" + currentItem.id + "/" + contentObject._id;
                        }}>{contentObject.name}</Listing>
                    }
                }
            })
        }
        else {
            return <p>No {item.title} to display.</p>
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
                    <Select onChange={e => {
                        setCurrentClass(e.target.value);
                        setCurrentSubject("");
                        }} className="standard standard-spacing">
                        {classOptions()}
                    </Select>

                    {/* Subject Select */}
                    <Select onChange={e => setCurrentSubject(e.target.value)} className="semi-long standard-spacing">
                        <option value="">Select</option>
                        {subjectOptions()}
                    </Select>

                    {/* Chapter Select */}
                    <Select className="long standard-spacing">
                        <option>Kinematics</option>
                        <option>Metals and Non Metals</option>
                    </Select>

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
                    <CreateContent onClose={() => setShow(false)} contentType={currentItem.id} show={show}/>
                    {displayContent(currentItem)}
                </Container>
            </MainView>
        </Structure>
    );
}

export default AdminContentView;