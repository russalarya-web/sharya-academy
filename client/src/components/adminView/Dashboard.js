import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from 'styled-components';

import {Title} from "../../App";
import {currentUrl} from "../../currentUrl";
import {Box, Text} from "../../routes/Home";
import {listMenu} from "../../routes/UserView";

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
        const response = await axios.get(currentUrl + ":9000/content");
        setContent(response.data);
    }

    useEffect(() => {
        getContent();
    }, [])

    return content;
}

function returnContent(content, listName, prefix, capitalize) {
    if (content[listName]) {
        if (capitalize) {
            return (content[listName].map((object) =>
                <Box className="green dark-click white-text">{prefix + " " + object.toUpperCase()}</Box>
            ));
        
        } else {
            return (content[listName].map((object) =>
                <Box className="green dark-click white-text">{prefix + " " + object}</Box>
            ));
        }
    }
}

function AdminDashboard() {
    const content = ContentFromAPI();

    return (
        <>
            <Section>
                <Container>
                    <Title>Classes</Title>
                    {returnContent(content, "classIdList", "Class", true)}
                </Container>
            </Section>
        </>
    );
}

export default AdminDashboard;