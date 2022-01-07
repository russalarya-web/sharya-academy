var db = require('./connect');

// create mongoDB schemas
const userSchema = new db.Schema ({
    _id: {type: String, require: true, unique: true, index: true},
    firstName: String,
    lastName: String,
    class: Number,
    password: String,
    plan: String,
    subjects: Array
  });
  
const classSchema = new db.Schema ({
    _id: Number,
    subjects: Array
});

const subjectSchema = new db.Schema ({
    _id: String,
    classId: Number,
    name: String,
    chapters: Array
});

const chapterSchema = new db.Schema ({
    _id: String,
    subjectId: String,
    term: Number,
    name: String
});

const quizSchema = new db.Schema ({
    _id: String,
    chapterId: String,
    name: String
});

const questionSchema = new db.Schema ({
    _id: String,
    quizId: String,
    question: String,
    options: Array,
    correctOption: Number,
    points: Number
});

module.exports = {
    userSchema, chapterSchema, subjectSchema, classSchema, quizSchema, questionSchema 
}