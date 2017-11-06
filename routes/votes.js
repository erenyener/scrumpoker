var express = require('express');
var async = require('async');
var router = express.Router();

var Vote = require('../models/vote');


/* GET home page. */
router.get('/', function(req, res, next) {
  Vote.find({}, function (err, votes) {
        if (err) {
            res.status(404).send();
        } else {
            res.status(200).send(votes);
        }
    });
});


router.get('/:issueId', function(req, res, next) {

    Vote.find({ 'issueId': req.params.issueId }, function (err, votes) {
        if (err) {
            res.status(404).send();
        } else {
            res.status(200).send(votes);
        }
    });
});


router.post('/', function(req, res, next) {

     var newVote = new Vote({
            value: req.body.value,
            sprintId: req.body.sprintId,
            issueId:req.body.issueId,
            voterId: req.body.voterId
        });

    newVote.save(function (err, data) {       
        if (err) {
            res.send(JSON.stringify({ isError:true, response:null }));
        } else {
            res.send(JSON.stringify({ isError:false, response:newVote }));
        }
    }); 
        
});


module.exports = router;
