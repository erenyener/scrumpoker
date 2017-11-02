var express = require('express');
var router = express.Router();

var Sprint = require('../models/sprint');
var SessionOrder = require('../models/sessionOrder');


/* GET home page. */
router.get('/', function(req, res, next) {
  Sprint.find({}, function (err, sprint) {
        if (err) {
            res.status(404).send();
        } else {
            res.status(200).send(JSON.stringify(sprint));
        }
    });
});

router.get('/:id', function(req, res, next) {

    Sprint.findById(req.params.id, function (err, sprint) {
        if (err) {
            res.status(404).send();
        } else {
            res.status(200).send(JSON.stringify(sprint));
        }
    });
});

router.post('/', function(req, res, next) {

    res.setHeader('Content-Type', 'application/json');
    
    var newSprint = new Sprint({
        title: req.body.title,
        beautifiedUrl: encodeURIComponent(req.body.title),
        numberOfVoters: parseInt(req.body.numberOfVoters)
    });

    newSprint.save(function (err, data) {       

        if (err) {
            res.send(JSON.stringify({ isError:true, response:null }));
        } else {

            var newSessionOrder = new SessionOrder({
                sprintId: newSprint._id,
                activeOrderNumber: 1
            });

            newSessionOrder.save(function (err, data) {       
                if (err) {
                    res.send(JSON.stringify({ isError:true, response:null }));
                } else {
                    res.send(JSON.stringify({ isError:false, response:newSprint }));
                }
            });                        
           
        }
    });    
    
});


module.exports = router;
