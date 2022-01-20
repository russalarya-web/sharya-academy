var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();

const currentUrl = require("../current-url");

var chapter = require("../db/collections/chapter");

var app = express();

// configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// create quiz in db
router.post("/create", function(req, res, next) {
    if (chapter.create(req.body.chapterId, req.body.classId, req.body.subjectId, req.body.term, req.body.chapterName)) {
        console.log(req.body);
    }
    res.redirect(currentUrl + '/admin/structure');
});

// get all quizzes from db
router.get("/all", async function(req, res, next) {
    var chapters = await chapter.getAll();
    res.send(chapters);
});

module.exports = router;