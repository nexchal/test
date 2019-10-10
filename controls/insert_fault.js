var fs = require('fs');
var ejs = require('ejs');
var qs = require('querystring');
var oracledb=require('oracledb');
var express=require('express');
var dbConfig = require('./../config/dbconfig2.js');
oracledb.autoCommit = true;

module.exports = {
	insert:function(req, res,check,new_tel){
			var oracledb = require('oracledb');
			var dbConfig = require('./../config/dbconfig2.js');
      oracledb.getConnection(dbConfig,function(err, conn)

      {
        console.log(new);

          for(var n=0; n< check.length; n++)
          {
            console.log(check[n]);

            conn.execute(`insert into TEST_ERR_TYPE VALUES ('${check[n]}',sysdate,(SELECT ID FROM TEST_USERINFO WHERE EMP_TEL='${new_tel}')`,function (err, qq)
            {
              console.log("에러타입 삽입부"+qq);
            });
          }
      });
    }
  }
module.exports = router;
