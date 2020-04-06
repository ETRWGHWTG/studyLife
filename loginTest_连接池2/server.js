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

app.get('/login.html', function (req, res) {
   res.sendFile( __dirname + "/" + "login.html" );
})

app.post('/login.html', urlencodedParser, function (req, res) {
  res.sendFile( __dirname + "/" + "login.html" );
    // 输出 JSON 格式
    var response = {
         "first_name":req.body.user_name,
         "last_name":req.body.user_pwd
    };
    console.log(response);
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
      //document.getElementById("p1").innerHTML=print;

      //res.writeHead(200,{'Context-Type':'text/html'});
      //res.write('<head><meta charset="utf-8"/></head>');
      //res.end(print);
  })
   //res.end(JSON.stringify(response));
})
 
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})