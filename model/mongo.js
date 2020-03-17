const mongoose = require("mongoose");
// 引入token模块
var settoken = require("../users/token_verify.js");
// 引入gridfs模块
var gridfs = require("gridfs-stream");
// var fs = require("fs");
gridfs.mongo = mongoose.mongo;
var gfs;

module.exports = {
  connect(
    res,
    myMongo,
    config = { ip: "127.0.0.1", port: "27017", dbName: "symbolMe" }
  ) {
    const dbUrl = `mongodb://${config.ip}:${config.port}/${config.dbName}`;
    const db = mongoose.connect(dbUrl);
    mongoose.connection.on("error", error => {
      res.status(401).end("mongo connect error");
      myMongo.status = false;
    });
    mongoose.connection.on("open", function() {
      console.log("connect mongo success");
      myMongo.status = true;
      gfs = gridfs(mongoose.connection.db);
    });
  },
  find(model, res, findConfig = {}, isLogin = true) {
    model.find(findConfig, (err, docs) => {
      if (err) {
        console.warn(err);
        return res.status(401).end();
      }
      if (docs.length >= 1) {
        if (isLogin) {
          settoken
            .setToken(findConfig.username, findConfig.password)
            .then(data => {
              return res.json({ status: 200, token: data });
            });
        } else {
          return res.json({ status: 200, docs: docs });
        }
      } else {
        return res.json({ status: 404 });
      }
    });
  },
  save(model, data, res) {
    const doc = new model(data); // data是存入数据库的对象，要满足schema的格式
    doc.save(err => {
      if (err) {
        console.log("入库失败");
        return res.json({ status: 401 });
      }
      console.log("入库成功");
      return res.json({ status: 200 });
    });
  },
  // 使用grid-fs读取大文件
  readFile(res) {
    // console.log(gfs)
    gfs.exist({ filename: "deepEarth.mp4" }, function(err, file) {
      if (err || !file) {
        res.send("File Not Found");
      } else {
        res.set({
          'Content-Type' : 'video/mp4', 
          'Accept-Ranges' : 'bytes', 
          'Server' : 'Microsoft-IIS/7.5', 
          'X-Powered-By' : 'ASP.NET'
        })
        var readstream = gfs.createReadStream({ filename: "deepEarth.mp4" });
        readstream.pipe(res);
      }
    });
  },
  put(model){
    model.updateMany({
      "label": "new"
    },{
      "label": "old"
    }, function (err,ret) {
      if(err) {
        console.log('更新失败')
      } else {
       console.log(ret)
       console.log('更新成功')
      }
    })
  }
};
