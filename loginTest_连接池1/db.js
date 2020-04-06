var mysql =  require('mysql');                  
  var pool =  mysql.createPool({
	host 			: "localhost",
	user 			: "root",
	password		: "",
	database		: "shopTest",
	connectionLimit : 10
  });
  function select(id){
	  var selectSql = "select * from fl_user where fl_id=?";
	  var selectParames = [id];
	  pool.getConnection(function(err, connection){
	  	if(err){
	  		console.log(err);
	  	}else{
		  	connection.query(selectSql,selectParames,function(err, rows){
		  	if(err)	{
		  		throw err;
		  	}else{
		  		console.log( rows[0].fl_name );
		  	}
		  });
		}
	  pool.releaseConnection(connection);
	});
}
select("1");