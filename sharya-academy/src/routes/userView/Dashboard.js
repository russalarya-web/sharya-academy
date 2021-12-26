import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from 'styled-components';

import {Title} from "../../App";
import { listMenu, ContentFromAPI, GetSubjectState } from "../LoggedIn";

const MainView = styled.div`
    padding: 20px 10px;
    background: #fff;
    border-radius: 10px;
    width: 75%;
`;

const Sidebar = styled.div`
    padding: 0px;
    background: linear-gradient(160.41deg, rgba(78, 159, 61, 0.6) 0%, rgba(78, 159, 61, 0.9) 100%);
    border-radius: 10px;
    width: 25%;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const Structure = styled.div`
    display: flex;
    flex-direction: row;
    vertical-align: middle;
`;

const Search = styled.input`
    background: rgba(216, 233, 168, 0.1);
    border: 1px solid rgba(78, 159, 61, 0.5);
    color: rgba(30, 81, 40, 0.8);
    border-radius: 10px;
    margin: 1em 0;
    height: 2em;
    font-size: calc(10px + 1.2vmin);
    right: 30px;
    padding: 0.25em 20px;
`;

const Sort = styled.select`
    background: rgba(78, 159, 61, 0.8);
    color: #fff;
    border: none;
    border-radius: 10px;
    margin: 1em;
    height: 2.5em;
    font-size: calc(10px + 1.2vmin);
    right: 290px;
    padding: 0.5em 20px;
`;

const SidebarItem = styled.div`
    padding: 20px 10px;
    margin: 0px;
    border-radius: 10px;
    background: transparent;
    color: #fff;
`;

const Listing = styled.div`
    padding: 10px;
    margin: 10px;
    border-radius: 10px;
    background: rgba(78, 159, 61, 0.1);
    color: #4E9F3D;
    text-indent: 10px;
    text-align: left;
`;

const Filter = styled.span`
    height: 30px;
    padding: 5px 20px;
    margin: 1em;
    border: solid 1px rgba(30, 81, 40, 0.9);
    color: rgba(30, 81, 40, 0.9);
    border-radius: 30px;
    vertical-align: middle;
`;

const Label = styled.span`
    height: 24px;
    padding: 5px 15px;
    float: right;
    margin: 0;
    font-size: calc(8px + 1.2vmin);
    background: rgba(30, 81, 40, 0.9);
    color: #fff;
    border-radius: 30px;
    text-indent: 0px;
    vertical-align: middle;
`;

function SortFromAPI() {
    const [sort, setSort] = useState([]);

    async function getSort() {
        const response = await axios.get("http://localhost:9000/api/sorting");
        setSort(response.data);
    }

    useEffect(() => {
        getSort();
    }, [])

    return sort;
}

// Landing Page
function Dashboard() {
    const [currentSubject, setCurrentSubject] = GetSubjectState();

    const sortOptions = SortFromAPI();

    const content = ContentFromAPI("x");
    var chapters = content[currentSubject];

    function checkForCurrent(subjectId) {
        if (subjectId === currentSubject) {
            return "sidebar sidebar-current";
        } else {
            return "sidebar";
        }
    }

    function listSubjects() {
        var subjects = content["subIds"];

        if (subjects) {
            return subjects.map((id) => {
                return (<SidebarItem class={checkForCurrent(id)} onClick={() => setCurrentSubject(id)}>{content[id]["name"]}</SidebarItem>)
            });
        }
    }

    function listChapters() {
        if (chapters) {
            var idList = chapters["chIds"];

            return idList.map((id) => {
                return (<Listing>{chapters[id]["name"]} <Label>Term {chapters[id]["term"]}</Label></Listing>)
            });
        }
    }

    return (
        <Structure>
            {/* Sidebar */}
            <Sidebar>
                <Container>
                    {listSubjects()}
                </Container>
            </Sidebar>

            {/* Main View */}
            <MainView>
                {/* Top Bar */}
                <Structure>
                    <Filter>Term 1</Filter>
                    <Sort>
                        {listMenu(sortOptions, "Sort by")}
                    </Sort>
                    <Search placeholder="Search" />
                </Structure>

                <Container>
                    {listChapters()}
                </Container>
            </MainView>
        </Structure>
    );
}

export default Dashboard;