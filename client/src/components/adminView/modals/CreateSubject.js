import randomString from 'randomstring';

import {Container} from '../AdminQuizView';

import { currentUrl } from '../../../App';

const CreateSubject = props => {
    if (!props.show) {
        return null
    }
    const link = currentUrl + ":9000/subject/create";
    
    return (
        <div className="modal">
            <form action={link} method="post" className="question-box">
                <input name="classId" className="input standard-spacing" type="hidden" value={props.classId} />
                <input name="subjectId" className="input standard-spacing" type="hidden" value={randomString.generate(5)} />
                <input name="subjectName" className="input standard-spacing" type="text" placeholder="Enter Subject Name" />
                <Container>
                    <button onClick={props.onClose} className="input submit-input standard-spacing green white-text">Close</button>
                    <input type="submit" className="input submit-input standard-spacing dark-green white-text" value="Create" />
                </Container>
            </form>
        </div>
    );
}

export default CreateSubject;