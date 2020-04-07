var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require("./db");

 
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })
 
app.use('/public', express.static('public'));
 
app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

app.get('/register.html', function (req, res) {
   res.sendFile( __dirname + "/" + "register.html" );
})

app.get('/login.html', function (req, res) {
   res.sendFile( __dirname + "/" + "login.html" );
})

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
})

app.post('/login_post', urlencodedParser, function (req, res) {
  //res.sendFile( __dirname + "/" + "login.html" );
    // 输出 JSON 格式
    var response = {
         "first_name":req.body.user_name,
         "last_name":req.body.user_pwd
    };
    console.log(response);
    //console.log(req);
    db.select(req.body.user_name,req.body.user_pwd,"name").then(result=>{
      var print;
      if(result=="unknow"){
        print="用户不存在";
      }else if(result=="error"){
        print="密码错误";
      }else if(result=="success"){
        print="登录成功";
      }else{
        print="出现未知错误";
      }
      console.log(print);
      var account ={
        "status":print
      };
      res.send(JSON.stringify(account)); 
  })
   //res.end(JSON.stringify(response));
})

app.post('/register_post', urlencodedParser, function (req, res) {
  //res.sendFile( __dirname + "/" + "login.html" );
    // 输出 JSON 格式
    /*var response = {
         "first_name":req.body.user_name,
         "last_name":req.body.user_pwd
    };*/

    //console.log(response);
    console.log(req);
    var name = req.body.user_name;
    var password = req.body.pwd1;
    console.log("name:"+name);
    console.log("pwd:"+password);
    db.select(name,password,"name").then(result=>{
      var print;
      var uid;
      if(result=="unknow"){
        console.log("用户名未重复");
        db.insert(name,password).then(insertresult=>{
          if(insertresult.affectedRows==1){
            print="注册成功";
            uid=insertresult.insertId;
          }else{
            print="注册失败";
            uid=0;
          }
          console.log(print+"用户编号："+uid);
          var account ={
            "status":print,
            "uid":uid
          }
          res.send(JSON.stringify(account));
        })
      }else{
        print="用户名已存在";
        var account ={
        "status":print
      };
        res.send(JSON.stringify(account)); 
      }
      console.log(print);
  })
   //res.end(JSON.stringify(response));
})
 
var server = app.listen(8081,"localhost",function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})