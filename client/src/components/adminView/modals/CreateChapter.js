import randomString from 'randomstring';

import {Container} from '../AdminQuizView';

import { currentUrl } from '../../../currentUrl';

const CreateChapter = props => {
    if (!props.show) {
        return null
    }
    const link = currentUrl + ":9000/chapter/create";

    function SubjectBox() {
        if (props.subjectId === "") {
          return <input name="subjectId" className="input standard-spacing" type="text" placeholder="Enter Subject ID" />;

        }
        return <input name="subjectId" className="input standard-spacing" type="hidden" value={props.subjectId} />
    }
    
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

    return (
        <div className="modal">
            <form action={link} method="post" className="question-box">
                <input name="classId" className="input standard-spacing" type="hidden" value={props.classId} />
                <SubjectBox />
                <input name="chapterId" className="input standard-spacing" type="hidden" value={randomString.generate(7)} />
                <input name="chapterName" className="input standard-spacing" type="text" placeholder="Enter Chapter Name" />
                <input name="term" className="input standard-spacing" type="number" placeholder="Enter Term" />

                <Container>
                    <button onClick={props.onClose} className="input submit-input standard-spacing green white-text">Close</button>
                    <input type="submit" className="input submit-input standard-spacing dark-green white-text" value="Create" />
                </Container>
            </form>
        </div>
    );
}

export default CreateChapter;