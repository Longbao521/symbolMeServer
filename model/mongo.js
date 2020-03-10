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
      console.log(err);
      if (err) {
        console.log("入库失败");
        return res.json({ status: 401 });
      }
      console.log("入库成功");
      return res.json({ status: 200 });
    });
  },
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
  }
};

// module.exports = class Mongo {
//     constructor(res, config = { ip: '127.0.0.1', port: '27017', dbName: 'symbolMe' }) {
//         this.dbUrl = `mongodb://${config.ip}:${config.port}/${config.dbName}`
//         this.db = mongoose.connect(this.dbUrl)
//         mongoose.connection.on('error', (error) => {
//             res.status(401).end('mongo connect error')
//             return
//         })
//         mongoose.connection.on('open', function() {
//             console.log('connect mongo success')
//         })
//         // model存储集
//         this.modelMap = new Map()
//         this.model = null
//     }
//     /**
//      * 创建model，并返回
//      * @param {}} modelName 模型名称
//      * @param {*} schema 模型schema对象
//      */
//     createModel(modelName, schema) {
//         return this.db.model(modelName, schema)
//     }
//     /**
//      * 将this.model切换到指定的model, 若没有需要创建相对应的model，并保存且切换
//      * @param {*} modelName 要使用的model名称
//      */
//     switchModel(modelName, schema) {
//         let model = this.modelMap.get(modelName)
//         if(model === undefined) {
//             let newModel = this.createModel(modelName,schema)
//             this.modelMap.set(modelName, newModel)
//             return newModel
//         }else {
//             return model
//         }
//     }
//     /**
//      * 查找相关数据
//      * @param {*} modelName
//      * @param {*} schema
//      * @param {*} findConfig
//      * @param {*} res
//      */
//     find(modelName, schema, findConfig, res){
//         // 切换到相对应的model
//         this.model = this.switchModel(modelName, schema)
//         this.find(findConfig, { _id: 0 }, (err, docs) => {
//             if(err) {
//                 res.status(404).end('find error')
//             }else {
//                 console.log(docs)
//                 res.send(success)
//             }
//         })
//     }
// }
