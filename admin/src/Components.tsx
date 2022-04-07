import styled from 'styled-components';

export const Title = styled.h1`
	font-weight: 400;
	margin: 0.2em 0 0.2em 0;
	z-index: 1;
`;

export const Link = styled.a`
	color: #4e9f3d;
`;

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
    max-height: 70vh;
    overflow: scroll;
`;

export const Structure = styled.div`
    display: flex;
    flex-direction: row;
    vertical-align: middle;
`;

export const Listing = styled.div`
    padding: 8px;
    margin: 6px 10px;
    border-radius: 10px;
    background: rgba(78, 159, 61, 0.1);
    color: #4E9F3D;
    text-indent: 10px;
    text-align: left;
    font-size: calc(12px + 0.8vmin);
    cursor: pointer;
`;


export function sidebarItemClass(id: string | number, currentValue: string | number) {
    if (id === currentValue) {
        return "sidebar sidebar-current";
    } else {
        return "sidebar";
    }
}