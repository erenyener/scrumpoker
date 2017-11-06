var express = require('express');
var async = require('async');
var router = express.Router();

var Issue = require('../models/issue');
var Sprint = require('../models/sprint');
var SessionOrder = require('../models/sessionOrder');



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

router.get('/getActive/:sprintId', function(req, res, next) {
    

    SessionOrder.findOne({sprintId: req.params.sprintId} , function (err, activeQuestion) {
        if (err) {
            res.status(404).send();
        } else {
            var activeOrderNumber = activeQuestion.activeOrderNumber;

            Issue.findOne({orderNumber: activeOrderNumber, sprintId:req.params.sprintId}, function (err, issue) {
                if (err) {
                    res.status(404).send();
                } else {
                    res.status(200).send(issue);
                }
            });

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

router.post('/finalizeScore', function(req, res, next) {
    

    Issue.findById(req.body.issueId, function(err, issue) {
        if(!err) {

            issue.finalScore = req.body.finalScore;
            
            issue.save(function(err) {
                if(!err) {

                    if(parseInt(req.body.activeOrderNumber) < parseInt(req.body.issuesLength)){

                        SessionOrder.findOne({sprintId: req.body.sprintId } , function (err, activeQuestion) {
                            if(!err){
                                var newOrder = parseInt(req.body.activeOrderNumber) + 1;
                                activeQuestion.activeOrderNumber = newOrder;

                                activeQuestion.save(function(err){
                                    if(!err){
                                        console.log(err);
                                    }else{
                                        console.log(err);
                                    }
                                });
                            }
                        });
                    }                    

                    res.send({ isError:false});
                }else{
                    res.send({ isError:true});
                }
            });
        }
    });
});


module.exports = router;
