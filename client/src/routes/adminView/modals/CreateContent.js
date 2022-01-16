import {Container} from '../AdminQuizView';

const CreateContent = props => {
    if (!props.show) {
        return null
    }

    const link = "http://localhost:9000/quiz/create/question/" + props.quizId;
    if (props.contentType === "quiz") {
        return (
            <div className="modal">
                <form action={link} method="post" className="question-box">
                    <input name="quizId" className="input standard-spacing" type="text" placeholder="Enter Quiz Id" />
                    <input name="classId" className="input standard-spacing" type="number" placeholder="Enter Class" />
                    <input name="subjectId" className="input standard-spacing" type="text" placeholder="Enter Subject" />
                    <input name="chapterId" className="input standard-spacing" type="text" placeholder="Enter Chapter" />
                    <input name="quizName" className="input standard-spacing" type="text" placeholder="Enter Quiz Name" />
                    <Container>
                        <button onClick={props.onClose} className="input submit-input standard-spacing green white-text">Close</button>
                        <input type="submit" className="input submit-input standard-spacing dark-green white-text" value="Create" />
                    </Container>
                </form>
            </div>
        );
    } else {
        return (
            <div className="modal">
                <div className="question-box">
                    <p className="text">Content Type Not Supported</p>
                    <button onClick={props.onClose} className="input submit-input standard-spacing green white-text">Close</button>
                </div>
            </div>
        );
    }
}

export default CreateContent;