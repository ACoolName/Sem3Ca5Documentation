var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var pass = require('pwd');
var errorHandler = require("../services/errorHandler");

/* GET home page. */
router.get('/', function (req, res) {
    res.redirect("app/index.html")
});


router.post('/authenticate', function (req, res) {
    //TODO: Go and get UserName Password from "somewhere"
    //if is invalid, return 401

    User.findOne({username: req.body.username}, function (err, entity) {
        if (errorHandler.errorHandle(err, res, 500, 'iternal')) {
            return;
        }
        if (!entity) {
            res.status(401).send('Wrong user or password');
            return;
        }
        pass.hash(req.body.password, entity.salt, function (err, hash) {
            if (hash === entity.pw) {
                var profile = {
                    username: 'Admin',
                    role: "admin",
                    id: 123423
                };
                var token = jwt.sign(profile, require("../security/secrets").secretTokenAdmin, { expiresInMinutes: 60 * 5 });
                res.json({ token: token });
            }
        });
    });
});


//Get Partials made as Views
router.get('/partials/:partialName', function (req, res) {
    var name = req.params.partialName;
    res.render('partials/' + name);
});

module.exports = router;
