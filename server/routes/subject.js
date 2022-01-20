var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();

const currentUrl = require("../current-url");

var subject = require("../db/collections/subject");

var app = express();

// configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// create subject in db
router.post("/create", function(req, res, next) {
    if (subject.create(req.body.subjectId, req.body.classId, req.body.subjectName)) {
        console.log(req.body);
    }
    res.redirect(currentUrl + '/admin/structure');
});

// get all subjects from db
router.get("/all", async function(req, res, next) {
    var subjects = await subject.getAll();
    res.send(subjects);
});

module.exports = router;