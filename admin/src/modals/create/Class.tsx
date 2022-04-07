import { FormEvent } from 'react';
import {Container} from '../../pages/QuizView';
import {Modal, postToDb} from '../../pages/StructureView';
import { api as currentUrl } from '../../url';

const CreateClass = (props: {show: boolean; onClose: () => any;}) => {
    if (!props.show) {
        return null
    }
    const link = currentUrl + "/class/create";

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

        if (formData.classId !== '') {
            postToDb(link, formData, props.onClose);
            
            alert("Class " + formData.classId + " created.");
        }

        else {
            alert("Please enter the class.")
        }
    }
    
    return (
        <Modal>
            <form onSubmit={saveAnswer} className="question-box">
                <input id="classId" className="input standard-spacing" type="number" placeholder="Enter Class" />
                <Container>
                    <button onClick={props.onClose} className="input submit-input standard-spacing green white-text">Close</button>
                    <button className="input submit-input standard-spacing dark-green white-text">Create</button>
                </Container>
            </form>
        </Modal>
    );
}

export default CreateClass;