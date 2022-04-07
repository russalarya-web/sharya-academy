import randomString from 'randomstring';
import { FormEvent } from 'react';

import {Container} from '../../pages/QuizView';
import {Modal, postToDb} from '../../pages/StructureView';
import { api as currentUrl } from '../../url';

const CreateSubject = (props: {show: boolean; classId: number; onClose: () => any;}) => {
    if (!props.show) {
        return null
    }
    const link = currentUrl + ":9000/subject/create";

    const saveAnswer = (event: FormEvent) => {
        event.preventDefault();

        // @ts-ignore
        const elementsArray = [...event.target.elements];

        const formData = elementsArray.reduce((acc, element) => {
            if (element.id) {
                acc[element.id] = element.value;
            }

            return acc;
        }, {});

        if (formData.subjectName !== '') {
            postToDb(link, formData, props.onClose);
            
            console.log(formData.subjectName + " being added to subjects for class " + formData.classId + ".");
        }

        else {
            alert("Please enter the subject name.")
        }
    }
    
    return (
        <Modal>
            <form onSubmit={saveAnswer} className="question-box">
                <input id="classId" className="input standard-spacing" type="hidden" value={props.classId} />
                <input id="subjectId" className="input standard-spacing" type="hidden" value={randomString.generate(5)} />
                <input id="subjectName" className="input standard-spacing" type="text" placeholder="Enter Subject Name" />
                <Container>
                    <button onClick={props.onClose} className="input submit-input standard-spacing green white-text">Close</button>
                    <button className="input submit-input standard-spacing dark-green white-text">Create</button>
                </Container>
            </form>
        </Modal>
    );
}

export default CreateSubject;