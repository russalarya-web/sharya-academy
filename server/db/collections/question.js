const schema = require('../schema').questionSchema;

const Question = db.model("Question", schema);

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

    question.save()
    .then(success = true)
    .catch(success = false);

    return success;
}

module.exports = create;