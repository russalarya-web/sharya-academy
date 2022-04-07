import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";

import {Container} from '../../pages/QuizView';
import {Modal, postToDb} from '../../pages/StructureView';
import { api as currentUrl } from '../../url';

type Props = {
    show: boolean; 
    question: {
        id: string;
        text: string;
        option1: string;
        option2: string;
        option3: string;
        option4: string;
        correctOption: number;
        points: number;
    }; 
    onClose: () => any;
}

const UpdateQuestion = ({show, question, onClose}: Props) => {
    const [questionText, setQuestionText] = useState(question.text);
    const [option1, setOption1] = useState(question.option1);
    const [option2, setOption2] = useState(question.option2);
    const [option3, setOption3] = useState(question.option3);
    const [option4, setOption4] = useState(question.option4);
    const [correctOption, setCorrectOption] = useState(question.correctOption);
    const [points, setPoints] = useState(question.points);

    if (!show) {
        return null
    }

    const link = currentUrl + "/quiz/update/question/" + question.id;

    const updateAnswer = (event: FormEvent) => {
        event.preventDefault();

        // @ts-ignore
        const elementsArray = [...event.target.elements];

        const formData = elementsArray.reduce((acc, element) => {
            if (element.id) {
                acc[element.id] = element.value.trim();
            }

            return acc;
        }, {});

        try {
            if (formData.question === '') throw("Please enter question")
            if (formData.option1 === '') throw("Please enter Option 1")
            if (formData.option2 === '') throw("Please enter Option 2")
            if (formData.option3 === '') throw("Please enter Option 3")
            if (formData.option4 === '') throw("Please enter Option 4")
            if (formData.correctOption === '') throw("Please enter correct option")
            if (formData.points === '') throw("Please enter points")
            postToDb(link, formData, onClose);
    
            alert("Successfully updated");
        }
        catch (error) {
            alert(error)
        }
    }

    const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>, setData: Dispatch<SetStateAction<string>> | Dispatch<SetStateAction<number>>) => {
        // @ts-ignore
        setData(e.target.value);
    }
    
    return (
        <Modal>
            <form onSubmit={updateAnswer} className="question-box">
                <input id="question.id" type="hidden" value={question.id} />
                <textarea id="question" className="input question-input standard-spacing" placeholder="Question" onChange={(e) => onChangeHandler(e, setQuestionText)} value={questionText}></textarea>
                <Container className="margin-spacing">
                    <input id="option1" className="input option-input standard-spacing" type="text" placeholder="Option 1" onChange={(e) => onChangeHandler(e, setOption1)} value={option1}/>
                    <input id="option2" className="input option-input standard-spacing" type="text" placeholder="Option 2" onChange={(e) => onChangeHandler(e, setOption2)} value={option2}/>
                    <input id="option3" className="input option-input standard-spacing" type="text" placeholder="Option 3" onChange={(e) => onChangeHandler(e, setOption3)} value={option3}/>
                    <input id="option4" className="input option-input standard-spacing" type="text" placeholder="Option 4" onChange={(e) => onChangeHandler(e, setOption4)} value={option4}/>
                </Container>
                <Container className="margin-spacing">
                    <input id="correctOption" className="input big-input standard-spacing" type="number" placeholder="Correct Option Number" onChange={(e) => onChangeHandler(e, setCorrectOption)} value={correctOption} />
                    <input id="points" className="input small-input standard-spacing" type="number" placeholder="Points" onChange={(e) => onChangeHandler(e, setPoints)} value={points} />
                </Container>
                <Container className="margin-spacing">
                    <button onClick={onClose} className="input submit-input standard-spacing green white-text">Close</button>
                    <button className="input submit-input standard-spacing dark-green white-text">Update</button>
                </Container>
            </form>
        </Modal>
    );
}

export default UpdateQuestion;