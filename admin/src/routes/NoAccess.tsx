import { Page } from "./Main";

// Landing Page
function NoAccess() {
    return (
        <Page>
            <h1>You do not have access to this page.</h1>
            <button 
                className="green standard-spacing white-text"
                onClick={() =>{window.location.href = "/"}}>
                Sign in
            </button>
        </Page>
    )
}

export default NoAccess;