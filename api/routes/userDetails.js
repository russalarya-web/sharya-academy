var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
    res.send({firstName: "John", lastName: "Doe", class: "x", plan: "Basic", subjects: [
        {name: "Science", id: "sci"},
        {name: "Social Science", id: "ssc"},
        {name: "Mathematics", id: "mat"},
        {name: "Hindi", id: "hin"},
        {name: "English", id: "eng"}]});
});

module.exports = router;