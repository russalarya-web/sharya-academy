import { Page } from "./UserView";

// Landing Page
function NoAccess() {
    return (
        <Page>
            <h1>You do not have access to this page.</h1>
            <button 
                className="green standard-spacing white-text"
                onClick={() =>{window.location.href = "/login"}}>
                Sign in
            </button>
            <button 
                className="dark-green standard-spacing white-text"
                onClick={() =>{window.location.href = "/sign-up"}}>
                Create an account
            </button>
        </Page>
    )
}

export default NoAccess;