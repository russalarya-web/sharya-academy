var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
    res.send({name: "Admin", email: "admin@sharya.academy"});
});

module.exports = router;