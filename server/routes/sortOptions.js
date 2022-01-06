var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
    res.send(["disabled",
    "No Sort",
    "Most to Least",
    "Least to Most",
    "Ascending",
    "Descending"]);
});

module.exports = router;