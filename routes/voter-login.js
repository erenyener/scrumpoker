var express = require('express');
var router = express.Router();


var Sprint = require('../models/sprint');
var Voter = require('../models/voter');

/* GET home page. */
router.get('/:sprintId/', function(req, res, next) {

    var self = this;
    self.sprintId = req.params.sprintId;

    if(!!sprintId && sprintId !== '' && sprintId.length > 0){

        Sprint.findById(sprintId, function (err, sprint) {
            if (err) {
                res.layout('layout', {title:"Sprint Not Exists", centeredTitle:true}, {content:{block:"voter-login", data:{ sprintId:0, sprintExists: false, isVoterCountReached:true }}}); 
            } else {
                
                if(!!sprint){
                    var maxNumberOfVotersCount = sprint.numberOfVoters;
                    
                    Voter.count({sprintId: self.sprintId}, function(err, count) {                

                        var isVoterCountReached = (count<maxNumberOfVotersCount) ? false : true;
                        var pageTitle = isVoterCountReached ? "Voter Count Reached":"Your Name" ;
                        res.layout('layout', {title:pageTitle , centeredTitle:true}, {content:{block:"voter-login", data:{ sprintId:self.sprintId , sprintExists: true, isVoterCountReached: isVoterCountReached }}}); 

                    });
                }else{
                    res.layout('layout', {title:"Sprint Not Exists", centeredTitle:true}, {content:{block:"voter-login", data:{ sprintId:0, sprintExists: true, isVoterCountReached:true }}}); 
                }
                

                
            }
        });
    }

  
});

module.exports = router;
