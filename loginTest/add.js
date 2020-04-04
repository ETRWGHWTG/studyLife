function add(connection,name,pwd){
	var addSql = "insert into fl_user(fl_id,fl_name,fl_pwd) values(0,?,?)";
	var addParames = [name,pwd];
	connection.query(addSql,addParames,function (err, result) {

	        if(err){

	         console.log('[INSERT ERROR] - ',err.message);

	         return;

	        }       

	       console.log('-------INSERT----------');

	       //console.log('INSERT ID:',result.insertId);       

	       console.log('INSERT ID:',result);       

	       console.log('#######################'); 

	});
}
module.exports = {
	add
}