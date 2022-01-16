var express = require("express");
var router = express.Router();

var content = require("./content/struct.json")

router.get("/", function(req, res, next) {
    res.json(content);
});

// Acceptable format: /x
router.get("/:classId", function(req, res, next) {
    res.json(content[req.params.classId]);
});

// Acceptable format: /x/sci
router.get("/:classId/:subjectId", function(req, res, next) {
    res.json(content[req.params.classId][req.params.subjectId]);
});

module.exports = router;