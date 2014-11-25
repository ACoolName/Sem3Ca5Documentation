var express = require('express')
var mongoose = require('mongoose');
var doc = mongoose.model('Documentation');

var router = express.Router();
router.get('/test', function (req, res) {
    res.header("Content-type", "application/json");
    res.end('{"msg" : "Test Message, You are logged on as a User since you could fetch this data"}');
});

module.exports = router;
