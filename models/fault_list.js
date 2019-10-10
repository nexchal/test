var oracledb = require('oracledb');
var dbConfig = require('../config/dbconfig2.js');

module.exports = {
	fault: function(pid, callback)
	{
		oracledb.getConnection(dbConfig,
			function(err, conn)
			{
		        if (err)
		        {
		              console.error(err.message);
		              throw err;
		        }
		        conn.execute(`SELECT LOGICID, LOGICNAME FROM FAULTLOGIC `, callback);
			}
		);
	}
}
