var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
    res.send([{name: "disabled"},
    {name: "Acids, Bases, and Salts", recent: false, recommended: true},
    {name: "Metals and Non Metals", recent: true, recommended: false},
    {name: "Life Processes", recent: true, recommended: false},
    {name: "Control and Coordination", recent: false, recommended: true}]);
});

module.exports = router;