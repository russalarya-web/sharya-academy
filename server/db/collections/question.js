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

// get questions by id
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

// delete question by id
async function remove(questionId) {
    var success = false;

    const question = await Question.remove({_id: questionId})
    .then(success = true)
    .catch(success = false);

    return success;
}

// update question by id
async function update(questionId, questionText, optionList, correctIndex, pointsInt) {
    var success = false;

    const question = await Question.updateOne({_id: questionId}, {
        question: questionText,
        options: optionList,
        correctOption: correctIndex,
        points: pointsInt
    }, function(error) {
        if (error) {
            console.log(error);
            success = false;
        } else {
            console.log("Updated " + questionId + " successfully...")
            success = true;
        }
    });

    return success;
};

// update question text by id
async function updateQuestionText(questionId, questionText) {
    var success = false;

    const question = await Question.updateOne({_id: questionId}, {
        question: questionText
    }, function(error) {
        if (error) {
            console.log(error);
            success = false;
        } else {
            console.log("Updated " + questionId + " successfully...")
            success = true;
        }
    });

    return success;
};

// update points by id
async function updatePoints(questionId, points) {
    var success = false;

    const question = await Question.updateOne({_id: questionId}, {
        points: points
    }, function(error) {
        if (error) {
            console.log(error);
            success = false;
        } else {
            console.log("Updated " + questionId + " successfully...")
            success = true;
        }
    });

    return success;
};

module.exports = {create, getByQuizId, get, remove, update, updateQuestionText, updatePoints};