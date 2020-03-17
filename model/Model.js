/**
 * 技能数据库模型
 */
const mongoose = require('mongoose')
const skillSchema = new mongoose.Schema({
  label: {
    type: String,
    default: 'new',
  },  
  tags: [{
        name: String,
        tagType: {
            type: String,
            default: 'success'
        }
    }]
})

/**
 * 用户基本信息数据库模型骨架
 */
const baseInfoSchema = new mongoose.Schema({
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

/**
 * 用户就学信息数据库模型骨架
 */
const schoolInfoSchema = new mongoose.Schema({
  id: { type: String }, //可使用match字段来加入正则表达式检测
  name: { type: String },
  info: {
    type: String
  },
  src: {
    type: String
  },
  enterTime: {
    type: Date,
    default: Date.now
  },
  mClass:[], // 动画类，一般为空
  method: {  // 点击方法，FIXME:这两个需要改善，将其与业务逻辑解耦合
    type: String
  },
  isShowInfo: {
    type: Boolean
  },
  moreInfos: {
    type: Array,
    default: []
  }
});

/**
 * 用户数据库模型骨架
 */
const userSchema = new mongoose.Schema({
    username: {type: String, min: 3, max: 10}, //可使用match字段来加入正则表达式检测
    password: {type: String, min: 6, max: 15}
})

/**
 * 博客的schema
 */
const schema = new mongoose.Schema({
  title: { type: String, default: "随笔" },
  tags: { type: Array, default: ["未分类"] },
  html: { type: String },
  description: { type: String, max: 30 }
});

module.exports = {
    skill: mongoose.model('skill', skillSchema),
    baseInfo: mongoose.model("baseInfo", baseInfoSchema),
    schoolExpInfo: mongoose.model("schoolExpInfo", schoolInfoSchema),
    user: mongoose.model('user', userSchema),
    blog: mongoose.model("blog", schema)
}
