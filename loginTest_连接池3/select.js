var db = require("./db");
db.select("abcd","123456","name").then(result=>{
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
})