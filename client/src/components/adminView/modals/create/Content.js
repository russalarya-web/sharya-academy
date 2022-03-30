import randomString from 'randomstring';

import {Container} from '../../AdminQuizView';
import {Modal, postToDb} from '../../AdminStructureView';
import { currentUrl } from '../../../../currentUrl';

const CreateContent = props => {
    const link = currentUrl + ":9000/" + props.contentType + "/create";

    if (!props.show) {
        return null
    }

    const saveAnswer = (event) => {
        event.preventDefault();

        const elementsArray = [...event.target.elements];

        const formData = elementsArray.reduce((acc, element) => {
            if (element.id) {
                acc[element.id] = element.value.trim();
            }

            return acc;
        }, {});

        if (formData.quizName !== '') {
            postToDb(link, formData, props.onClose);
            
            console.log("Quiz being added to subject " + props.subjectId + ".");
        }

        else {
            alert("Please enter the quiz name.")
        }
    }

    if (props.contentType === "quiz") {
        if (props.subjectId === "") {
            return (
                <Modal>
                    <div className="question-box">
                        <p>Select a Subject</p>
                        <button onClick={props.onClose} className="input submit-input auto-margin standard-spacing green white-text">Close</button>
                    </div>
                </Modal>
            );
        }

        if (props.chapterId === "") {
            return (
                <Modal>
                    <div className="question-box">
                        <p>Select a Chapter</p>
                        <button onClick={props.onClose} className="input submit-input auto-margin standard-spacing green white-text">Close</button>
                    </div>
                </Modal>
            );
        }
        
        return (
            <Modal>
                <form onSubmit={saveAnswer} className="question-box">
                    <input id="quizId" className="input standard-spacing" type="hidden" value={randomString.generate(6)} />
                    <input id="classId" className="input standard-spacing" type="hidden" value={props.classId} />
                    <input id="subjectId" className="input standard-spacing" type="hidden" value={props.subjectId} />
                    <input id="chapterId" className="input standard-spacing" type="hidden" value={props.chapterId} />
                    <input id="quizName" className="input standard-spacing" type="text" placeholder="Enter Quiz Name" />
                    <Container>
                        <button onClick={props.onClose} className="input submit-input standard-spacing green white-text">Close</button>
                        <button className="input submit-input standard-spacing dark-green white-text">Create</button>
                    </Container>
                </form>
            </Modal>
        );
    } else {
        return (
            <Modal>
                <div className="question-box">
                    <p className="text">Content Type Not Supported</p>
                    <button onClick={props.onClose} className="input submit-input standard-spacing green white-text">Close</button>
                </div>
            </Modal>
        );
    }
}

export default CreateContent;