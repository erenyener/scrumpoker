var express = require('express');
var async = require('async');
var router = express.Router();

var Issue = require('../models/issue');


/* GET home page. */
router.get('/', function(req, res, next) {
  Issue.find({}, function (err, issues) {
        if (err) {
            res.status(404).send();
        } else {
            res.status(200).send(issues);
        }
    });
});


router.get('/:id', function(req, res, next) {

    Issue.findById(req.params.id, function (err, issue) {
        if (err) {
            res.status(404).send();
        } else {
            res.status(200).send(JSON.stringify(issue));
        }
    });
});


router.post('/', function(req, res, next) {

    res.setHeader('Content-Type', 'application/json');
    async.each(req.body.issues, function(issue) {

        var newIssue = new Issue({
            title: issue.title,
            sprintId: req.body.sprintId,
            finalScore: 0,
            orderNumber: issue.orderNumber
        });

        newIssue.save(function (err, data) { });      

        }, function(err) {
    });       

    res.send(JSON.stringify({ isError:false, response:req.body.issues }));
});


module.exports = router;
