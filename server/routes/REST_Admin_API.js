var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Stuff = mongoose.model('Stuff');
var user = mongoose.model('User');
var doc = mongoose.model('Documentation');
var errorHandler = require("../services/errorHandler");

/* GET A User From The DataBase */
router.get('/user', function (req, res) {
    if (typeof global.mongo_error !== "undefined") {
        res.status(500);
        res.end("Error: " + global.mongo_error + " To see a list of users here, make sure you have started the database and set up some test users (see model-->db.js for instructions)");
        return;
    }
    user.find({}, function (err, users) {
        if (err) {
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(users));
    });
});

router.post('/stuff', function (req, res) {
    var stuff = new Stuff(req.body);
    stuff.save(function (err) {
        if (errorHandler.errorHandle(err, res, 404, 'not found')) {
            return;
        }
        res.end();
    })
});

router.put('/documentation', function (req, res) {
    doc.findOneAndUpdate({title: "doc1"}, {text: req.body.text}, function (err, entity) {
        if (errorHandler.errorHandle(err, res, 500, 'iternal')) {
            return;
        }
        if (errorHandler.errorHandle(!entity, res, 404, 'not found')) {
            return;
        }

        res.header("Content-type", "application/json");
        res.end(JSON.stringify(entity));
    });
});

module.exports = router;
