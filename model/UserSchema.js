/**
 * 用户数据库模型骨架
 */
const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    username: {type: String, min: 3, max: 10}, //可使用match字段来加入正则表达式检测
    password: {type: String, min: 6, max: 15}
})
module.exports = mongoose.model('user', schema)