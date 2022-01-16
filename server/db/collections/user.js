var db = require('../connect');
const schema = require('../schema').userSchema;

const User = db.model("User", schema);

function create(email, fName, lName, classId, pass, planName, subjectList) {
    var success = false;

    const user = new User ({
        _id: email,
        firstName: fName,
        lastName: lName,
        class: classId,
        password: pass,
        plan: planName,
        subjects: subjectList
    });

    user.save()
    .then(success = true)
    .catch(success = false);

    return success;
}

module.exports = create;