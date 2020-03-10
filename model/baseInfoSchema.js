/**
 * 用户基本信息数据库模型骨架
 */
const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  name: { type: String }, //可使用match字段来加入正则表达式检测
  age: { type: Number },
  tel: {
    type: String,
    match: /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/
  },
  email: {
    type: String,
    match: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
  },
  education: {
    type: String
  },
  home: {
    type: String
  },
  school: {
    type: String
  }
});
module.exports = mongoose.model("baseInfo", schema);
