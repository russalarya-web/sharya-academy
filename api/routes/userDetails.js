var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
    res.send({firstName: "John", lastName: "Doe", class: "X", subjects: ["Science", "Social Science", "Mathematics", "Hindi", "English"]});
});

module.exports = router;