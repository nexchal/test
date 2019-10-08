var oracledb = require('oracledb');
var dbConfig = require('./../config/dbconfig2.js');

module.exports = {
	info: function(pid, callback) { //pid?
		oracledb.getConnection(dbConfig,
			function(err, conn)
			{
		   conn.execute(`insert into TEST_JUNGWOOK2 VALUES ('${area}','${tl}','${tel}','${name}',sysdate,tmp_seq.NEXTVAL)`, callback);
			}
		);
	}
}
