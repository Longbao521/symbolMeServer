/**
 * 用户就学信息数据库模型骨架
 */
const mongoose = require("mongoose");
const schema = new mongoose.Schema({
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
module.exports = mongoose.model("schoolExpInfo", schema);
