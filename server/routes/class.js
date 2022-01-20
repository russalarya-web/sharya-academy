var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();

const currentUrl = require("../current-url");

var classDb = require("../db/collections/class");

var app = express();

// configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// create class in db
router.post("/create", function(req, res, next) {
    if (classDb.create(req.body.classId)) {
        console.log(req.body);
    }
    res.redirect(currentUrl + '/admin/structure');
});

// get all classes from db
router.get("/all", async function(req, res, next) {
    var classes = await classDb.getAll();
    res.send(classes);
});

module.exports = router;