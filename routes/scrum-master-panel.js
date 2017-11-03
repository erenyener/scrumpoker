var express = require('express');
var router = express.Router();




/* GET home page. */
router.get('/', function(req, res, next) {
  res.layout('Layout', {title:"Scrum Master Panel"}, {content: {block:"scrum-master-panel", data:{title:"Matthew"}}}); 
});

module.exports = router;
