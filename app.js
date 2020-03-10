var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
// 导入token-verify
var vertoken = require('./users/token_verify')
var expressJwt = require('express-jwt')

var app = express();

var Mongo = require("./model/mongo")
var myMongo = {
  status: false
}
// 设置允许跨域访问该服务.
app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  if(req.method=="OPTIONS") res.sendStatus(200);/*让options请求快速返回*/
  else  next();
});
// 链接数据库
app.all("*", function(req, res, next) {
  if(!myMongo.status) {
    Mongo.connect(res, myMongo)
    myMongo.status = true //FIXME:修改
  }
  next();
})
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// 解析token获取用户信息
app.use(function(req, res, next) {
  var token = req.get('Authorization')
  if( token == null) {
    return next()
  }else {
    // vertoken.verToken(token).then((data) => {
    //   req.data = data
    //   return next()
    // }).catch(err => {
    //   console.warn('error')
    //   return next()
    // })
    return next()
  }
})

//验证token是否过期并规定哪些路由不用验证
// app.use(expressJwt({
// 	secret: 'mes_qdhd_mobile_xhykjyxgs'
// }).unless({
// 	path: ['/login']//除了这个地址，其他的URL都需要验证
// }));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/index", indexRouter);
app.use("/users", usersRouter);

// 验证token是否过期并规定哪些路由不用验证
// app.use(expressJwt({
//   secret:'mes_qdhd_mobile_xhykjyxgs'
// }).unless({
//   path: ['/login'] //除了这个地址，其他URL都需要验证
// }))
app.use(function(err, req, res, next) {
  if(err.status == 401) {
    return res.status(401).send('token失效')
  }
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
