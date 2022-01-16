var db = require('../connect');
const schema = require('../schema').quizSchema;

const Quiz = db.model("Quiz", schema);

// create quiz
function create(quizId, classId, chapterId, quizName) {
    var success = false;

    const quiz = new Quiz ({
        _id: quizId,
        classId: classId,
        chapterId: chapterId,
        name: quizName
    });

    quiz.save()
    .then(success = true)
    .catch(success = false);

    return success;
}

// returns questions from a quiz
async function getQuestions(quizId) {
    var currentQuiz = await get(quizId);

    if (currentQuiz) {
        console.log("running getQuestions in quiz.js");
        console.log(currentQuiz.questions);
        return currentQuiz.questions;
    }
}

// get all quizzes
async function getAll() {
    const quizzes = await Quiz.find({})
    .then(quizzesList => {
        console.log("quizzesList");
        console.log(quizzesList);
        return quizzesList;
    })
    .catch(err => {
        console.log("Something went wrong... " + err.message);
    });

    return quizzes;
}

// get quiz by id
async function get(quizId) {
    const quiz = await Quiz.findById(quizId)
    .then(quiz => {
        return quiz;
    })
    .catch(err => {
        console.log("Something went wrong... " + err.message);
        return null;
    });

    return quiz;
}

module.exports = {create, getAll, get, getQuestions};