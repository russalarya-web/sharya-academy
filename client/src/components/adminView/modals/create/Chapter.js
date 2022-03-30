import randomString from 'randomstring';

import {Container} from '../../AdminQuizView';
import {Modal, postToDb} from '../../AdminStructureView';
import { currentUrl } from '../../../../currentUrl';

const CreateChapter = props => {
    if (!props.show) {
        return null
    }
    const link = currentUrl + ":9000/chapter/create";
    
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

    const saveAnswer = (event) => {
        event.preventDefault();

        const elementsArray = [...event.target.elements];

        const formData = elementsArray.reduce((acc, element) => {
            if (element.id) {
                acc[element.id] = element.value.trim();
            }

            return acc;
        }, {});

        if (formData.chapterName !== '') {
            if (formData.term !== '') {
                postToDb(link, formData, props.onClose);
                
                alert("Chapter " + formData.chapterName + " created.");
            }
            else {
                alert("Please enter the term.")
            }
        }

        else {
            alert("Please enter a chapter name.")
        }
    }

    return (
        <Modal>
            <form onSubmit={saveAnswer} className="question-box">
                <input name="classId" className="input standard-spacing" type="hidden" value={props.classId} />
                <input name="subjectId" className="input standard-spacing" type="hidden" value={props.subjectId} />
                <input name="chapterId" className="input standard-spacing" type="hidden" value={randomString.generate(7)} />
                <input name="chapterName" className="input standard-spacing" type="text" placeholder="Enter Chapter Name" />
                <input name="term" className="input standard-spacing" type="number" placeholder="Enter Term" />

                <Container>
                    <button onClick={props.onClose} className="input submit-input standard-spacing green white-text">Close</button>
                    <button className="input submit-input standard-spacing dark-green white-text">Create</button>
                </Container>
            </form>
        </Modal>
    );
}

export default CreateChapter;