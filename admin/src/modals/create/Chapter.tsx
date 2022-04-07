import randomString from 'randomstring';

import {Container} from '../../pages/QuizView';
import {Modal, postToDb} from '../../pages/StructureView';
import { api as currentUrl } from '../../url';
import { FormEvent, MouseEventHandler } from 'react';

const CreateChapter = (props: { show: boolean; subjectId: string; onClose: () => any; classId: number }) => {
    if (!props.show) {
        return null
    }
    const link = currentUrl + "/chapter/create";
    
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

    const saveAnswer = (event: FormEvent) => {
        event.preventDefault();

        // @ts-ignore
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
                <input id="classId" className="input standard-spacing" type="hidden" value={props.classId} />
                <input id="subjectId" className="input standard-spacing" type="hidden" value={props.subjectId} />
                <input id="chapterId" className="input standard-spacing" type="hidden" value={randomString.generate(7)} />
                <input id="chapterName" className="input standard-spacing" type="text" placeholder="Enter Chapter Name" />
                <input id="term" className="input standard-spacing" type="number" placeholder="Enter Term" />

                <Container>
                    <button onClick={props.onClose} className="input submit-input standard-spacing green white-text">Close</button>
                    <button className="input submit-input standard-spacing dark-green white-text">Create</button>
                </Container>
            </form>
        </Modal>
    );
}

export default CreateChapter;