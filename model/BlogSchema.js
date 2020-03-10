/**
 * 博客的schema
 */
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: { type: String, default: "随笔" },
  tags: { type: Array, default: ["未分类"] },
  html: { type: String },
  description: { type: String, max: 30 }
});
module.exports = mongoose.model("blog", schema);
