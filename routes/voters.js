var express = require('express');
var async = require('async');
var router = express.Router();

var Voter = require('../models/voter');


router.get('/:sprintId', function(req, res, next) {

    Voter.find({ 'sprintId': req.params.sprintId }, function (err, voters) {
        if (err) {
            res.status(404).send();
        } else {
            res.status(200).send(voters);
        }
    });
});



router.post('/', function(req, res, next) {

     var newVoter = new Voter({
            name: req.body.voterName,
            sprintId: req.body.sprintId
        });

    newVoter.save(function (err, data) {       
        if (err) {
            res.send({ isError:true, response:null });
        } else {
            res.send({ isError:false, response:newVoter });
        }
    }); 
        
});


module.exports = router;
