import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from 'styled-components';

import {Title, currentUrl} from "../../App";
import { listMenu, ContentFromAPI, GetSubjectState } from "../LoggedIn";

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

export const Search = styled.input`
    background: rgba(216, 233, 168, 0.1);
    border: 1px solid rgba(78, 159, 61, 0.5);
    color: rgba(30, 81, 40, 0.8);
    border-radius: 10px;
    margin: 0.5em;
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
    margin: 0.5em;
    height: 2.5em;
    font-size: calc(10px + 1.2vmin);
    right: 290px;
    padding: 0.5em 20px;
`;

export const Listing = styled.div`
    padding: 10px;
    margin: 6px 10px;
    border-radius: 10px;
    background: rgba(78, 159, 61, 0.1);
    color: #4E9F3D;
    text-indent: 10px;
    text-align: left;
    font-size: calc(10px + 1vmin);
    cursor: pointer;
`;

const Filter = styled.span`
    height: 30px;
    padding: 5px 20px;
    margin: 0.5em;
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
        const response = await axios.get(currentUrl + ":9000/sorting");
        setSort(response.data);
    }

    useEffect(() => {
        getSort();
    }, [])

    return sort;
}

export function sidebarItemClass(id, currentValue) {
    if (id === currentValue) {
        return "sidebar sidebar-current";
    } else {
        return "sidebar";
    }
}

// Landing Page
function Dashboard() {
    const [currentSubject, setCurrentSubject] = GetSubjectState();

    const sortOptions = SortFromAPI();

    const content = ContentFromAPI("x");
    var chapters = content[currentSubject];

    function listSubjects() {
        var subjects = content["subIds"];

        if (subjects) {
            return subjects.map((id) => {
                return (<div class={sidebarItemClass(id, currentSubject)} onClick={() => setCurrentSubject(id)}>{content[id]["name"]}</div>)
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
                {listSubjects()}
            </Sidebar>

            {/* Main View */}
            <MainView>
                {/* Top Bar */}
                {/* <Structure>
                    <Filter>Term 1</Filter>
                    <Filter>Term 2</Filter>
                    <Sort>
                        {listMenu(sortOptions, "Sort by")}
                    </Sort>
                    <Search placeholder="Search" />
                </Structure> */}

                <Container>
                    {listChapters()}
                </Container>
            </MainView>
        </Structure>
    );
}

export default Dashboard;