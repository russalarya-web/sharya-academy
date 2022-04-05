import {Container} from '../../AdminQuizView';
import {Modal, postToDb, postToFirestore} from '../../AdminStructureView';
import { currentUrl } from '../../../../currentUrl';

import {db} from "../../../../firebase/config"

const CreateClass = props => {
    if (!props.show) {
        return null
    }
    const link = currentUrl + ":9000/class/create";

    const saveAnswer = (event) => {
        event.preventDefault();

        const elementsArray = [...event.target.elements];

        const formData = elementsArray.reduce((acc, element) => {
            if (element.id) {
                acc[element.id] = element.value.trim();
            }

            return acc;
        }, {});

        if (formData.classId !== '') {
            postToFirestore("classes", {}, formData.classId)
            .then(() => {
                alert("Class " + formData.classId + " created.");
            })
            .catch(err => {
                alert("Something went wrong...")
                console.log(err)
            })
            // postToDb(link, formData, props.onClose);            
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