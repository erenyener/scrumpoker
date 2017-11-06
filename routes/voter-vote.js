var express = require('express');
var router = express.Router();


var Sprint = require('../models/sprint');
var Voter = require('../models/voter');

/* GET home page. */
router.get('/:sprintId/:userId/', function(req, res, next) {

    var self = this;
    self.sprintId = req.params.sprintId;
    self.userId = req.params.userId;

    if(!!sprintId && sprintId !== '' && sprintId.length > 0){

        Sprint.findById(sprintId, function (err, sprint) {
            if (err) {
                res.layout('layout', {title:"Sprint Not Exists", centeredTitle:true}, {content:{block:"voter-vote", data:{ sprintId:0,voterId:0, sprintExists: false}}}); 
            } else {
                
                if(!!sprint){
                    var maxNumberOfVotersCount = sprint.numberOfVoters;
                    
                    Voter.count({sprintId: self.sprintId}, function(err, count) {                
                        
                        res.layout('layout', {title:"" , centeredTitle:true}, {content:{block:"voter-vote", data:{ sprintId:self.sprintId, voterId:self.userId, sprintExists: true}}}); 

                    });
                }else{
                    res.layout('layout', {title:"Sprint Not Exists", centeredTitle:true}, {content:{block:"voter-vote", data:{ sprintId:0, voterId:0, sprintExists: true}}}); 
                }
            }
        });
    }

  
});

module.exports = router;
