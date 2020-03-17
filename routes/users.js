var express = require("express");
var router = express.Router();
var mongo = require("../model/mongo.js");
var model = require("../model/Model.js");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/navList", function (req, res, next) {
  console.log("navlist");
  res.json({ token: req.get("Authorization") });
});

router.get("/baseInfo", function (req, res, next) {
  mongo.find(model.baseInfo, res, {}, false);
});

router.get("/schoolExpInfo", function (req, res, next) {
  mongo.find(model.schoolExpInfo, res, {}, false);
});

router.post("/blog", function (req, res, next) {
  mongo.save(model.blog, req.body, res);
});

router.get("/blog", function (req, res, next) {
  mongo.find(model.blog, res, {}, false);
});

router.get("/readFile", function (req, res, next) {
  mongo.readFile(res);
});

router.get('/tags', function (req, res, next) {
  mongo.find(model.skill, res, {label: "new" }, false); //找到最新的标签对象
});

// router.get('/oldTags', function (req, res, next) {
//   res.json({status: 200})
//   // mongo.find(model.skill, res, {label: "old" }, false); //找到最新的标签对象
// });

router.put('/tags', function (req, res, next) {
  mongo.put(model.skill)
  mongo.save(model.skill, {
    label: "new",
    tags: req.body
  }, res)
})

module.exports = router;
