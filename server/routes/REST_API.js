var express = require('express');
var mongoose = require('mongoose');
var doc = mongoose.model('Documentation');
var router = express.Router();
var errorHandler = require("../services/errorHandler");

router.get('/documentation', function (req, res) {
    doc.findOne({title: "doc1"}, function (err, entity) {
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
