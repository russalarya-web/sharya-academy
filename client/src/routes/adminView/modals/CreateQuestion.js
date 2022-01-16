import {Container} from '../AdminQuizView';

const CreateQuestion = props => {
    if (!props.show) {
        return null
    }

    const link = "http://localhost:9000/quiz/create/question/" + props.quizId;
    return (
        <div className="modal">
            <form action={link} method="post" className="question-box">
                <input name="questionId" type="hidden" value={props.questionId} />
                <input name="points" className="input standard-spacing" type="number" placeholder="Enter Points" />
                <textarea name="question" className="input question-input standard-spacing" placeholder="Enter Question"></textarea>
                <Container>
                    <input name="option1" className="input option-input standard-spacing" type="text" placeholder="Enter Option 1"/>
                    <input name="option2" className="input option-input standard-spacing" type="text" placeholder="Enter Option 2"/>
                    <input name="option3" className="input option-input standard-spacing" type="text" placeholder="Enter Option 3"/>
                    <input name="option4" className="input option-input standard-spacing" type="text" placeholder="Enter Option 4"/>
                </Container>
                <input name="correctOption" className="input standard-spacing" type="number" placeholder="Correct Option Number" />
                <Container>
                    <button onClick={props.onClose} className="input submit-input standard-spacing green white-text">Close</button>
                    <input type="submit" className="input submit-input standard-spacing dark-green white-text" value="Save Question" />
                </Container>
            </form>
        </div>
    );
}

export default CreateQuestion;