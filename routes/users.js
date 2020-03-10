var express = require("express");
var router = express.Router();
var mongo = require("../model/mongo.js");
var baseInfoSchema = require("../model/baseInfoSchema.js");
var schoolExpInfoSchema = require("../model/schoolExprienceSchema.js");
var blogSchema = require("../model/BlogSchema.js")

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.get("/navList", function(req, res, next) {
  console.log("navlist");
  res.json({ token: req.get("Authorization") });
});

// router.get("/loadData", function(req, res, next) {
//   mongo.save(schoolExpInfoSchema, {
//     id: "master",
//     name: "南京师范大学 地图学与地理信息系统",
//     info: "南京师范大学是首批国家“211工程”重点建设高校、世界一流学科建设高校",
//     src: "http://a2.att.hudong.com/40/44/01300000025823121005441497827.jpg",
//     enterTime: new Date(2018, 9, 1),
//     mclass: [],
//     method: "nnuSwitch",
//     isShowInfo: false,
//     moreInfos: [
//       { name: "硕士初试考察科目", value: "数据结构，数据库原理" },
//       { name: "研究方向", value: "全球离散格网的数据组织与可视化" },
//       { name: "导师", value: "周良辰" }
//     ]
//   });
// });

router.get("/baseInfo", function(req, res, next) {
  mongo.find(baseInfoSchema, res, {}, false);
});

router.get("/schoolExpInfo", function(req, res, next) {
  mongo.find(schoolExpInfoSchema, res, {}, false)
})

router.post("/uploadBlog", function(req, res, next) {
  mongo.save(blogSchema, req.body, res)
})

router.get("/getBlogs", function(req, res, next) {
  mongo.find(blogSchema, res, {}, false)
})

router.get("/readFile", function(req, res, next) {
  mongo.readFile(res)
})

module.exports = router;
