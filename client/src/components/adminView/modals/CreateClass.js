import {Container} from '../AdminQuizView';

import { currentUrl } from '../../../currentUrl';

const CreateClass = props => {
    if (!props.show) {
        return null
    }
    const link = currentUrl + ":9000/class/create";
    
    return (
        <div className="modal">
            <form action={link} method="post" className="question-box">
                <input name="classId" className="input standard-spacing" type="number" placeholder="Enter Class" />
                <Container>
                    <button onClick={props.onClose} className="input submit-input standard-spacing green white-text">Close</button>
                    <input type="submit" className="input submit-input standard-spacing dark-green white-text" value="Create" />
                </Container>
            </form>
        </div>
    );
}

export default CreateClass;