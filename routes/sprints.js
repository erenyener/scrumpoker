var express = require('express');
var router = express.Router();

var Sprint = require('../models/sprint');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.layout('Layout', {title:"Homepage"}, {content:{block:"index", data:{title:"Matthew"}}}); 
});

router.post('/', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ a: 1 }));
});


module.exports = router;
