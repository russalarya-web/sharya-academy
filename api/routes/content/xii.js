var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
    res.sendFile(__dirname + "/xii.json");
});

module.exports = router;