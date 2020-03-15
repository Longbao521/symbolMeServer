var express = require("express");
var router = express.Router();
var mongo = require("../model/mongo.js");
var model = require("../model/Model.js");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.get("/navList", function(req, res, next) {
  console.log("navlist");
  res.json({ token: req.get("Authorization") });
});

router.get("/baseInfo", function(req, res, next) {
  mongo.find(model.baseInfo, res, {}, false);
});

router.get("/schoolExpInfo", function(req, res, next) {
  mongo.find(model.schoolExpInfo, res, {}, false);
});

router.post("/uploadBlog", function(req, res, next) {
  mongo.save(model.blog, req.body, res);
});

router.get("/getBlogs", function(req, res, next) {
  mongo.find(model.blog, res, {}, false);
});

router.get("/readFile", function(req, res, next) {
  mongo.readFile(res);
});

router.get('/getTags', function(req, res, next) {
  mongo.find(model.skill, res, {}, false);
})

module.exports = router;
