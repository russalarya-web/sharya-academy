var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
    res.send({firstName: "John", lastName: "Doe", class: "X", plan: "Basic", subjects: [
        {name: "Science"}, {name: "Social Science"}, {name: "Mathematics"}, {name: "Hindi"}, {name: "English"}]});
});

module.exports = router;