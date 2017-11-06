var express = require('express');
var router = express.Router();
var async = require('async');

var Sprint = require('../models/sprint');
var Issue = require('../models/issue');
var Voter = require('../models/voter');
var Vote = require('../models/vote');
var SessionOrder = require('../models/sessionOrder');


/* GET home page. */
router.get('/:sprintId/', function(req, res, next) {
    var self = this;
    self.sprintId = req.params.sprintId;

    if(!!sprintId && sprintId !== '' && sprintId.length > 0){

        Sprint.findById(sprintId, function (err, sprint) {
            if (err) {
                res.layout('Layout', {title:"Scrum Master Panel"}, {content: {block:"scrum-master-panel", data:{isSucess:false, sprint: sprint, sprintId:req.params.sprintId}}}); 
                res.status(404).send();
            } else {

                Issue.find({sprintId : self.sprintId}, null, {sort: {'orderNumber': 'ascending'}} , function (err, issues) {
                    if (err) {
                        res.status(404).send();
                    } else {


                        SessionOrder.findOne({ 'sprintId': self.sprintId }, function (err, sessionOrder) {                        

                            res.layout('Layout', {title:"Scrum Master Panel", centeredTitle:false}, {content: {
                                block:"scrum-master-panel", data:{
                                        sprint: sprint,
                                        issues:issues,
                                        activeQuestionOrder: sessionOrder
                                    }
                            }}); 
                        });

                        
                    }
                });

                
            }
        });
    }  
});

var getIssues = function(sprintId, cb){

    var self = this;
    var result = [];

    self.callBack = function(){
        return cb(result);
    }

    Issue.find({sprintId : sprintId}, function (err, issues) {
        
   
        async.each(issues, function(issue, cb) {
            
            var issueToPush = {
                finalScore:issue.finalScore,
                orderNumber:issue.orderNumber,
                sprintId:issue.sprintId,
                _id:issue._id,
                title:issue.title
            }

            Vote.find({ 'issueId': issue._id }, function (err, votes) {
                issueToPush.votes = votes;   
                result.push(issueToPush);             
            });

            
        }, function(err, result) {  });         
    });
};

router.get('/detail/:sprintId/', function(req, res, next) {
    var self = this;
    self.sprintId = req.params.sprintId;
    self.issuesWithVotes = [];
    var response = {};

    response.sprintId = self.sprintId;

    if(!!sprintId && sprintId !== '' && sprintId.length > 0){

        Sprint.findById(sprintId, function (err, sprint) {
            if (err) {
                
                res.layout('Layout', {title:"Scrum Master Panel"}, {content: {block:"scrum-master-panel", data:{isSucess:false, sprint: sprint, sprintId:req.params.sprintId}}}); 
                res.status(404).send();
            } else {
                response.sprint = sprint;
                
                Issue.find({sprintId : sprintId}, function (err, issues) {           
                    response.issues = issues;
                    Voter.find({ 'sprintId': self.sprintId }, function (err, voters) {
                        response.voters = voters;

                        SessionOrder.findOne({ 'sprintId': self.sprintId }, function (err, sessionOrder) {                        

                            response.activeQuestionOrder = sessionOrder;
                            res.send({ isError:false, response:response });
                        });

                    });

                });
                       
                
            }
        });
    }  
});

module.exports = router;
