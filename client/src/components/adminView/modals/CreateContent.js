import randomString from 'randomstring';

import {Container} from '../AdminQuizView';

import { currentUrl } from '../../../App';

const CreateContent = props => {
    if (!props.show) {
        return null
    }

    function SubjectBox() {
        if (props.subjectId === "") {
          return <input name="subjectId" className="input standard-spacing" type="text" value={props.subjectId} placeholder="Enter Subject" />;

        }
        return <input name="subjectId" className="input standard-spacing" type="hidden" value={props.subjectId} />
    }

    if (props.contentType === "quiz") {
        const link = currentUrl + ":9000/quiz/create";

        if (props.subjectId === "") {
            return (
                <div className="modal">
                    <div className="question-box">
                        <p>Select a Subject</p>
                        <button onClick={props.onClose} className="input submit-input auto-margin standard-spacing green white-text">Close</button>
                    </div>
                </div>
            );
        }

        if (props.chapterId === "") {
            return (
                <div className="modal">
                    <div className="question-box">
                        <p>Select a Chapter</p>
                        <button onClick={props.onClose} className="input submit-input auto-margin standard-spacing green white-text">Close</button>
                    </div>
                </div>
            );
        }
        
        return (
            <div className="modal">
                <form action={link} method="post" className="question-box">
                    <input name="quizId" className="input standard-spacing" type="hidden" value={randomString.generate(6)} />
                    <input name="classId" className="input standard-spacing" type="hidden" value={props.classId} />
                    <SubjectBox />
                    <input name="chapterId" className="input standard-spacing" type="hidden" value={props.chapterId} />
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