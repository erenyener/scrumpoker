var express = require('express');
var router = express.Router();

var Sprint = require('../models/sprint');
var SessionOrder = require('../models/sessionOrders');


/* GET home page. */
router.get('getActive/:sprintId/', function(req, res, next) {

    var self = this;
    self.sprintId = req.params.sprintId;
    
    
    Sprint.findById(sprintId, function (err, sprint) {
        if (err) {
            res.layout('Layout', {title:"Scrum Master Panel"}, {content: {block:"scrum-master-panel", data:{isSucess:false, sprint: sprint, sprintId:req.params.sprintId}}}); 
            res.status(404).send();
        } 
        else {
            Issue.find({sprintId : self.sprintId}, function (err, issues) {
                if (err) {
                    res.status(404).send();
                } else {

                    res.layout('Layout', {title:"Scrum Master Panel", centeredTitle:false}, {content: {
                        block:"scrum-master-panel", data:{
                                sprint: sprint,
                                issues:issues
                        }
                    }}); 
                }
            });                
        }
    });
  
});

module.exports = router;
