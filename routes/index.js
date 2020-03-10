var express = require('express');
var router = express.Router();
var mongo = require('../model/mongo')
var userSchema = require ('../model/UserSchema')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function(req, res, next){
  mongo.find(userSchema, res, req.body)
});

module.exports = router;
