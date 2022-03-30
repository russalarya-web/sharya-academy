import {Container} from '../../AdminQuizView';
import {Modal, postToDb} from '../../AdminStructureView';
import { currentUrl } from '../../../../currentUrl';

const CreateQuestion = props => {
    if (!props.show) {
        return null
    }

    const link = currentUrl + ":9000/quiz/create/question/" + props.quizId;

    const saveAnswer = (event) => {
        event.preventDefault();

        const elementsArray = [...event.target.elements];

        const formData = elementsArray.reduce((acc, element) => {
            if (element.id) {
                acc[element.id] = element.value.trim();
            }

            return acc;
        }, {});

        if (formData.question !== '') {
            if (formData.option1 !== '') {
                if (formData.option2 !== '') {
                    if (formData.option3 !== '') {
                        if (formData.option4 !== '') {
                            if (formData.correctOption !== '') {
                                if (formData.points !== '') {
                                    postToDb(link, formData, props.onClose);
                            
                                    alert("Question added");
                                }
                                else {
                                    alert("Please enter points.")
                                }
                            }
                            else {
                                alert("Please enter correct option.")
                            }
                        }
                        else {
                            alert("Please enter Option 4.")
                        }
                    }
                    else {
                        alert("Please enter Option 3.")
                    }
                }
                else {
                    alert("Please enter Option 2.")
                }
            }
            else {
                alert("Please enter Option 1.")
            }
        }
        else {
            alert("Please enter question.")
        }
    }
    
    return (
        <Modal>
            <form onSubmit={saveAnswer} className="question-box">
                <input id="questionId" type="hidden" value={props.questionId} />
                <textarea id="question" className="input question-input standard-spacing" placeholder="Question"></textarea>
                <Container className="margin-spacing">
                    <input id="option1" className="input option-input standard-spacing" type="text" placeholder="Option 1"/>
                    <input id="option2" className="input option-input standard-spacing" type="text" placeholder="Option 2"/>
                    <input id="option3" className="input option-input standard-spacing" type="text" placeholder="Option 3"/>
                    <input id="option4" className="input option-input standard-spacing" type="text" placeholder="Option 4"/>
                </Container>
                <Container className="margin-spacing">
                    <input id="correctOption" className="input big-input standard-spacing" type="number" placeholder="Correct Option Number" />
                    <input id="points" className="input small-input standard-spacing" type="number" placeholder="Points" />
                </Container>
                <Container className="margin-spacing">
                    <button onClick={props.onClose} className="input submit-input standard-spacing green white-text">Close</button>
                    <button className="input submit-input standard-spacing dark-green white-text">Add question</button>
                </Container>
            </form>
        </Modal>
    );
}

export default CreateQuestion;