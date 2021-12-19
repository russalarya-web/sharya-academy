import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from 'styled-components';

import {Title} from "../../App";
import {Box, Text} from "../Home";
import {listMenu} from "../LoggedIn";

export const Section = styled.div`
    padding: 20px 0;
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
`;

export const Container = styled.div`
    display: flex;
    height: 85vh;
    margin-top: 50px;
    flex-direction: column;
    min-width: 380px;
    overflow-y: scroll;
`;

function ContentFromAPI() {
    const [content, setContent] = useState([]);

    async function getContent() {
        const response = await axios.get("http://localhost:9000/api/content");
        setContent(response.data);
    }

    useEffect(() => {
        getContent();
    }, [])

    return content;
}

function returnList(sampleList) {
    return (sampleList.map((object) =>
        <Box className="green dark-click white-text">{object.name}</Box>
    ));
}

function AdminDashboard() {
    const content = ContentFromAPI();

    return (
        <>
            <Section>
                <Container>
                    <Title>Classes</Title>
                    {returnList(content)}
                </Container>
            </Section>
        </>
    );
}

export default AdminDashboard;