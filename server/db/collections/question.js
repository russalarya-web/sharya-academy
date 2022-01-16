var db = require('../connect');
var quiz = require('./quiz');
const schema = require('../schema').questionSchema;

const Question = db.model("Question", schema);

// create question
function create(questionId, quizId, questionText, optionList, correctIndex, pointsInt) {
    var success = false;

    const question = new Question ({
        _id: questionId,
        quizId: quizId,
        question: questionText,
        options: optionList,
        correctOption: correctIndex,
        points: pointsInt
    });

    if (quiz.get(quizId)) {
        question.save()
        .then(success = true)
        .catch(success = false);
    }

    return success;
}

// get questions by quiz id
async function get(questionId) {
    const question = await Question.findById(questionId)
    .then(question => {
        return question;
    })
    .catch(err => {
        console.log("Something went wrong... " + err.message);
    });

    return question;
}

// get questions by quiz id
async function getByQuizId(quizId) {
    const questions = await Question.find({quizId: quizId})
    .then(quizQuestions => {
        return quizQuestions;
    })
    .catch(err => {
        console.log("Something went wrong... " + err.message);
        return null;
    });

    return questions;
}

module.exports = {create, getByQuizId, get};