import {Container} from '../AdminQuizView';

import { currentUrl } from '../../../App';

const CreateQuestion = props => {
    if (!props.show) {
        return null
    }

    const link = currentUrl + ":9000/quiz/create/question/" + props.quizId;
    
    return (
        <div className="modal">
            <form action={link} method="post" className="question-box">
                <input name="questionId" type="hidden" value={props.questionId} />
                <textarea name="question" className="input question-input standard-spacing" placeholder="Question"></textarea>
                <Container className="margin-spacing">
                    <input name="option1" className="input option-input standard-spacing" type="text" placeholder="Option 1"/>
                    <input name="option2" className="input option-input standard-spacing" type="text" placeholder="Option 2"/>
                    <input name="option3" className="input option-input standard-spacing" type="text" placeholder="Option 3"/>
                    <input name="option4" className="input option-input standard-spacing" type="text" placeholder="Option 4"/>
                </Container>
                <Container className="margin-spacing">
                    <input name="correctOption" className="input big-input standard-spacing" type="number" placeholder="Correct Option Number" />
                    <input name="points" className="input small-input standard-spacing" type="number" placeholder="Points" />
                </Container>
                <Container className="margin-spacing">
                    <button onClick={props.onClose} className="input submit-input standard-spacing green white-text">Close</button>
                    <input type="submit" className="input submit-input standard-spacing dark-green white-text" value="Save Question" />
                </Container>
            </form>
        </div>
    );
}

export default CreateQuestion;