const schema = require('../schema').classSchema;

const Class = db.model("Class", schema);

function create(classId, subjectList) {
    var success = false;

    const classObject = new Class ({
        _id: classId,
        subjects: subjectList
    });

    classObject.save()
    .then(success = true)
    .catch(success = false);

    return success;
}

module.exports = create;