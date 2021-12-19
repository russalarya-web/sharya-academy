var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
    res.sendFile(__dirname + "/content.json");
});

module.exports = router;