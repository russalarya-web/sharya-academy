var express = require("express");
var router = express.Router();

var content = require("./content/struct.json")

router.get("/", function(req, res, next) {
    res.json(content);
});

// Acceptable format: /class?id=x
router.get("/class", function(req, res, next) {
    res.json(content[req.query.id]);
});

// Acceptable format: /subject?class=x&id=sci
router.get("/subject", function(req, res, next) {
    res.json(content[req.query.class][req.query.id]);
});

module.exports = router;