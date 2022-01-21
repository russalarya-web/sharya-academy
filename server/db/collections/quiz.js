var db = require('../connect');
const schema = require('../schema').quizSchema;

const Quiz = db.model("Quiz", schema);

// create quiz
function create(quizId, classId, chapterId, subjectId, quizName) {
    var success = false;

    const quiz = new Quiz ({
        _id: quizId,
        classId: classId,
        chapterId: chapterId,
        subjectId: subjectId,
        name: quizName
    });

    quiz.save()
    .then(success = true)
    .catch(success = false);

    return success;
}

// get all quizzes
async function getAll() {
    const quizzes = await Quiz.find({})
    .then(quizzesList => {
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

// get quizzes by class
async function getByClass(classId) {
    const quizzes = await Quiz.find({classId: classId})
    .then(quizzesList => {
        return quizzesList;
    })
    .catch(err => {
        console.log("Something went wrong... " + err.message);
    });

    return quizzes;
}

// delete quiz

module.exports = {create, getAll, get, getByClass};