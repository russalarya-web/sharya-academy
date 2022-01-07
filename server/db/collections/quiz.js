const schema = require('../schema').quizSchema;

const Quiz = db.model("Quiz", schema);

function create(quizId, chapterId, quizName) {
    var success = false;

    const user = new Quiz ({
        _id: quizId,
        chapterId: chapterId,
        name: quizName
    });

    user.save()
    .then(success = true)
    .catch(success = false);

    return success;
}

module.exports = create;