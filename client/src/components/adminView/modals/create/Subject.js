import randomString from 'randomstring';

import {Container} from '../../AdminQuizView';
import {Modal, postToDb, postToFirestore} from '../../AdminStructureView';
import { currentUrl } from '../../../../currentUrl';

const CreateSubject = props => {
    if (!props.show) {
        return null
    }
    const link = currentUrl + ":9000/subject/create";

    const saveAnswer = (event) => {
        event.preventDefault();

        const elementsArray = [...event.target.elements];

        const formData = elementsArray.reduce((acc, element) => {
            if (element.id) {
                if (Number(element.value))
                    acc[element.id] = Number(element.value);
                else {
                    acc[element.id] = element.value;
                }
            }

            return acc;
        }, {});

        if (formData.name !== '') {
            postToFirestore("subjects", formData)
            .then(() => {
                alert("Subject " + formData.name + " created.");
                window.location.reload(false);
            })
            .catch(err => {
                alert("Something went wrong...")
                console.log(err)
            })
        }

        else {
            alert("Please enter the subject name.")
        }
    }
    
    return (
        <Modal>
            <form onSubmit={saveAnswer} className="question-box">
                <input id="classId" className="input standard-spacing" type="hidden" value={props.classId} />
                {/* <input id="subjectId" className="input standard-spacing" type="hidden" value={randomString.generate(5)} /> */}
                <input id="name" className="input standard-spacing" type="text" placeholder="Enter Subject Name" />
                <Container>
                    <button onClick={props.onClose} className="input submit-input standard-spacing green white-text">Close</button>
                    <button className="input submit-input standard-spacing dark-green white-text">Create</button>
                </Container>
            </form>
        </Modal>
    );
}

export default CreateSubject;