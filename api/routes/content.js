var express = require("express");
var router = express.Router();

var content = require("./content/struct.json")

router.get("/", function(req, res, next) {
    res.json(content[req.query.class]);
    // res.sendFile(__dirname + "/content/struct.json");
});

module.exports = router;