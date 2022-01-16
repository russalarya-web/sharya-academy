var db = require('../connect');
const schema = require('../schema').subjectSchema;

const Subject = db.model("Subject", schema);

function create(subjectId, classId, subjectName, chapterList) {
    var success = false;

    const subject = new Subject ({
        _id: subjectId,
        classId: classId,
        name: subjectName
    });

    subject.save()
    .then(success = true)
    .catch(success = false);

    return success;
}

module.exports = create;