var fs = require('fs');
var ejs = require('ejs');
var qs = require('querystring');
var oracledb=require('oracledb');
var express=require('express');
var dbConfig = require('./../config/dbconfig2.js');
oracledb.autoCommit = true;

module.exports = {
	insert:function(req, res,emp_no,new_name,new_tel,area1,area2,area3){
			var oracledb = require('oracledb');
			var dbConfig = require('./../config/dbconfig2.js');
      oracledb.getConnection(dbConfig,function(err, conn)
      {
        conn.execute(`insert into test_userinfo VALUES ('${emp_no}','${new_name}','${new_tel}','${area1}','${area2}','${area3}',tmp_seq.NEXTVAL)`,function (err, topics)
        {
           console.log("유저인포 삽입부"+topics);
        });
      });
    }
  }
