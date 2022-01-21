var db = require('../connect');
const schema = require('../schema').subjectSchema;

const Subject = db.model("Subject", schema);

function create(subjectId, classId, subjectName) {
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

// get all subjects
async function getAll() {
    const subjects = await Subject.find({})
    .then(subjectList => {
        return subjectList;
    })
    .catch(err => {
        console.log("Something went wrong... " + err.message);
    });

    return subjects;
}

// get subjects by class
async function getByClass(classId) {
    const subjects = await Subject.find({classId: classId})
    .then(subjectList => {
        return subjectList;
    })
    .catch(err => {
        console.log("Something went wrong... " + err.message);
    });

    return subjects;
}

module.exports = {create, getAll, getByClass};