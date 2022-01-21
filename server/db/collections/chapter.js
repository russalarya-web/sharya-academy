var db = require('../connect');
const schema = require('../schema').chapterSchema;

const Chapter = db.model("Chapter", schema);

function create(chId, classId, subject, chTerm, chName) {
    var success = false;

    const chapter = new Chapter ({
        _id: chId,
        classId: classId,
        subjectId: subject,
        term: chTerm,
        name: chName
    });

    chapter.save()
    .then(success = true)
    .catch(success = false);

    return success;
}

// get all chapters
async function getAll() {
    const chapters = await Chapter.find({})
    .then(chapterList => {
        return chapterList;
    })
    .catch(err => {
        console.log("Something went wrong... " + err.message);
    });

    return chapters;
}

// get chapters by class
async function getByClass(classId) {
    const chapters = await Chapter.find({classId: classId})
    .then(chapterList => {
        return chapterList;
    })
    .catch(err => {
        console.log("Something went wrong... " + err.message);
    });

    return chapters;
}

module.exports = {create, getAll, getByClass};