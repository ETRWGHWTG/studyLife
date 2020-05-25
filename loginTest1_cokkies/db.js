 var mysql =  require('mysql');                  
  var pool =  mysql.createPool({
	host 			: "localhost",
	user 			: "root",
	password		: "",
	database		: "shopTest",
	connectionLimit : 10
  });
  //查询
async  function select(id,pwd,type){
  	if(type=="id"){
	  	var selectSql = "select fl_pwd from fl_user where fl_id=?";
	}else if(type=="name"){
		var selectSql = "select fl_pwd from fl_user where fl_name=?";
	}
	var selectParames = [id];
	var result = await new Promise((resolve,reject)=>{
		pool.getConnection(function(err, connection){
	  	if(err){
	  		console.log(err);
	  	}else{
		  	connection.query(selectSql,selectParames,function(err, rows){
		  	if(err)	{
		  		throw err;
		  	}else{
		  		//console.log( rows );
		  		if(rows.length == 0){
		  			//console.log("用户不存在!");
		  			resolve ("unknow");
		  		}else if(rows[0].fl_pwd!=pwd){
		  			//console.log("密码错误");
		  			resolve ("error");
		  		}else{
		  			//console.log(rows[0].fl_pwd);
		  			//console.log("登录成功");
		  			resolve ("success");
		  		}
		  	}
		  });
		}
	  pool.releaseConnection(connection);
	});
	})
	  return result;
}
async  function insert(id,pwd){
	var insertSql = "insert into fl_user(fl_id,fl_name,fl_pwd) value(0,?,?)";
	var insertParames = [id,pwd];
	var result = await new Promise((resolve,reject)=>{
		pool.getConnection(function(err, connection){
	  	if(err){
	  		console.log(err);
	  	}else{
		  	connection.query(insertSql,insertParames,function(err, rows){
		  	if(err)	{
		  		throw err;
		  	}else{
		  		console.log(rows);
		  		console.log(rows.affectedRows);
		  		if(rows.affectedRows==0){
		  			resolve("error");
		  		}else{
		  			resolve(rows);
		  		}
		  	}
		  });
		}
	  pool.releaseConnection(connection);
	});
	})
	return result;
}
module.exports = {
	select,
	insert
}