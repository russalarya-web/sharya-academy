var express = require("express");
var router = express.Router();

const quizzes = require('./content/quizzes.json');

router.get("/", function(req, res, next) {
    res.json(quizzes[req.query.class][req.query.sub][req.query.ch][req.query.quiz]);
});

module.exports = router;