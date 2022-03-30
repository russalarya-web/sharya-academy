var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();

const currentUrl = require("../current-url");

var quiz = require("../db/collections/quiz");
var question = require("../db/collections/question");

var app = express();

// configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// importing temp json file
const quizzes = require('./content/quizzes.json');

// send quiz from json for GET request
router.get("/", function(req, res, next) {
    res.json(quizzes[req.query.class][req.query.sub][req.query.ch][req.query.quiz]);
});

// create quiz in db
router.post("/create", function(req, res, next) {
    if (quiz.create(req.body.quizId, req.body.classId, req.body.chapterId, req.body.subjectId, req.body.quizName)) {
        console.log(req.body);
    }
    res.redirect(currentUrl + '/admin/content');
});

// create quiz questions in db
router.post("/create/question/:quizId", function(req, res, next) {
    if (question.create(req.body.questionId, req.params.quizId, req.body.question, [req.body.option1, req.body.option2, req.body.option3, req.body.option4], req.body.correctOption, req.body.points)) {
        console.log(req.body);
    }
    res.redirect(currentUrl + '/admin/quiz/' + req.params.quizId);
});

// update quiz questions in db
router.post("/update/question/:questionId", function(req, res, next) {
    if (question.update(req.params.questionId, req.body.question, [req.body.option1, req.body.option2, req.body.option3, req.body.option4], req.body.correctOption, req.body.points)) {
        res.send(true);
    }
    else {
        res.send(false);
    }
});


// get all quizzes from db
router.get("/all", async function(req, res, next) {
    var quizzes = await quiz.getAll();
    res.send(quizzes);
});

// get quiz from db
router.get("/:quizId", async function(req, res, next) {
    var currentQuiz = await quiz.get(req.params.quizId);
    res.send(currentQuiz);
});


// get quiz question from db
router.get("/question/:questionId", async function(req, res, next) {
    var current = await question.get(req.params.questionId);
    res.send(current);
});

// get all questions from db
router.get("/:quizId/questions", async function(req, res, next) {
    var current = await question.getByQuizId(req.params.quizId);
    res.send(current);
});

// get quizzes by class from db
router.get("/all/:classId", async function(req, res, next) {
    var quizzes = await quiz.getByClass(Number.parseInt(req.params.classId));
    res.send(quizzes);
});

module.exports = router;