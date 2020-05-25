var db = require("./db");
db.insert("abcd","123456").then(result=>{
	var print;
	if(result=="error"){
		print="注册失败！"
	}else{
		console.log(result);
	}
})