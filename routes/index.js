var express = require('express');
var router = express.Router();

var User = require('../models/user');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.layout('Layout', {title:"Scrum Poker Planning"}, {content:{block:"index", data:{title:"Matthew"}}}); 
});

module.exports = router;
