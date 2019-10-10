var fs = require('fs');
var ejs = require('ejs');
var qs = require('querystring');
var oracledb=require('oracledb');
var express=require('express');
var dbConfig = require('./../config/dbconfig2.js');
module.exports = {
	HTML:function(req, res,title){
      var arr = new Array(" ");
			var oracledb = require('oracledb');
			var dbConfig = require('./../config/dbconfig2.js');
      oracledb.getConnection(dbConfig,function(err, conn)

      {
        conn.execute(`SELECT emp_name,area,area_1,area_2,id,emp_tel,emp_no FROM test_userinfo where emp_no = '${title}'`, function (err, result)
        {
          var name = result.rows[0][0];
          var area = result.rows[0][1];
          var area1 = result.rows[0][2];
          var area2 = result.rows[0][3];
          var id = result.rows[0][4];
          var tel = result.rows[0][5];
          var title = result.rows[0][6];

          conn.execute(`SELECT LOGICNAME FROM FAULTLOGIC WHERE LOGICID IN(SELECT fault_logicid FROM TEST_ERR_TYPE where id = '${id}')`, function (err, logic)
          {
            var logic_name_val = logic.rows;
            var logic_name_len = logic.rows.length;


            res.render('title',
            {
              id: id, name : name, area : area, area1: area1, area2: area2,
              two: logic_name_val, length: logic_name_len, tel : tel , title: title
            });
          });
        });
      });
    }
  }
