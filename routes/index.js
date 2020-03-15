var express = require('express');
var router = express.Router();
var mongo = require('../model/mongo');
var model = require("../model/Model.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function(req, res, next){
  mongo.find(model.user, res, req.body)
});

module.exports = router;
