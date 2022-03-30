import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from 'styled-components';

import {useTitle} from "../../App";
import {currentUrl} from "../../currentUrl";

import { Structure, Sidebar, sidebarItemClass, MainView, Container, Listing } from "../userView/Dashboard";
import { Button } from "./AdminQuizView";
import { Search } from "./AdminContentView";

import CreateClass from "./modals/create/Class";
import CreateSubject from "./modals/create/Subject";
import CreateChapter from "./modals/create/Chapter";

export const Modal = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
`;

// post to db
export function postToDb (link, formData, callback) {
	// post request
	axios.post(link, formData)

	// get response
	.then(function (response) {
		console.log(response.data);
        callback();
        window.location.reload(false);
	})

	// error handling
	.catch(function (error) {
		console.log(error);
        callback();
        window.location.reload(false);
	});
}

function GetSubjects() {
    const [content, setContent] = useState([]);

    async function getContent() {
        const response = await axios.get(currentUrl + ":9000/subjects/all");
        setContent(response.data);
    }

    useEffect(() => {
        getContent();
    }, [])

    return content;
}

const AdminStructureView = ({classes, subjects, chapters}) => {
    useTitle("Admin Structure View - Sharya Academy");

    const [showClassModal, setShowClassModal] = useState(false);
    const [showSubjectModal, setShowSubjectModal] = useState(false);
    const [showChapterModal, setShowChapterModal] = useState(false);

    const [currentClass, setCurrentClass] = useState(12);
    const [currentSubject, setCurrentSubject] = useState("");

    function displayContent() {
        if (chapters.length !== 0) {
            return chapters.map((contentObject) => {
                if (contentObject.classId == currentClass) {
                    if (currentSubject === "" || currentSubject === contentObject.subjectId) {
                        return <Listing>{contentObject.name}</Listing>
                    }
                }
            })
        }
        else {
            return <p>No chapters to display.</p>
        }
    }

    function listClasses() {
        return classes.map((item) => {
            return (
            <div 
                class={sidebarItemClass(item._id, currentClass)} 
                onClick={() => {
                    setCurrentClass(item._id);
                    setCurrentSubject("");
                }}
            >
                Class {item._id}
            </div>
            )
        });
    }

    // filters subjects
    function filterSubjects(classId) {
        var finalSubjects = [];
        subjects.forEach((subject) => {
            if (subject.classId === classId) {
                finalSubjects.push(subject);
            }
        });

        if (finalSubjects.length === 0) {
            return [];
        }

        return finalSubjects;
    }

    function listSubjects(classId) {
        var finalSubjects = filterSubjects(classId);

        if (finalSubjects.length !== 0) {
            return filterSubjects(classId).map((item) => {
                return (
                <div 
                    class={sidebarItemClass(item._id, currentSubject)} 
                    onClick={() => {
                        setCurrentSubject(item._id);
                    }}
                >
                    {item.name}
                </div>
                )
            });
        }
    }

    if (classes) {
        return (
            <Structure>
                {/* Classes Sidebar */}
                <Sidebar>
                    {listClasses()}
                    <Button 
                        className="white green-text bottom standard-spacing"
                        onClick={() => {
                            setShowClassModal(true);
                        }}
                    >
                        New Class
                    </Button>
                    <CreateClass onClose={() => setShowClassModal(false)} show={showClassModal}/>
                </Sidebar>

                {/* Subjects Sidebar */}
                <Sidebar>
                    {listSubjects(currentClass)}
                    <Button 
                        className="white green-text bottom standard-spacing"
                        onClick={() => {
                            setShowSubjectModal(true);
                        }}
                    >
                        New Subject
                    </Button>
                    <CreateSubject classId={currentClass} onClose={() => setShowSubjectModal(false)} show={showSubjectModal}/>
                </Sidebar>


                {/* Main View */}
                <MainView>
                    {/* Top Bar */}
                    <div className="row-container">
                        {/* Search Box */}
                        <Search className="semi-long standard-spacing" placeholder="Search..."/>

                        {/* Add Button */}
                        <Button 
                            className="green white-text standard-spacing"
                            onClick={() => {
                                setShowChapterModal(true);
                            }}>
                            New Chapter
                        </Button>
                    </div>

                    {/* Content View */}
                    <Container>
                        <CreateChapter classId={currentClass} subjectId={currentSubject} onClose={() => setShowChapterModal(false)} show={showChapterModal}/>
                        {displayContent()}
                    </Container>
                </MainView>
            </Structure>
        );
    }
}

export default AdminStructureView;