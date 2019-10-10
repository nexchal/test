var express = require('express')
var fs = require('fs');
var ejs = require('ejs');
var oracledb = require('oracledb');
var dbConfig = require('../config/dbconfig2.js');
var bodyParser = require('body-parser');
oracledb.autoCommit = true;

var qs = require('querystring');
router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
var page;

oracledb.getConnection(dbConfig,function(err, conn,callback)
{
  router.get('/add_fault', function(req, res) //index
  {
    conn.execute(`SELECT LOGICID, LOGICNAME FROM FAULTLOGIC`,function(err,result_fault)
    {
      var fault_name = '';
      console.log(result_fault.rows);

      for(r=0; r<result_fault.rows.length; r++)
      {
        if(r%3==0)
        {
          fault_name+=`<tr><td><input type="checkbox" name="check" value="${result_fault.rows[r][0]}">${result_fault.rows[r][1]}</td>`;
        }
        else
        {
          fault_name+=`<td><input type="checkbox" name="check" value="${result_fault.rows[r][0]}">${result_fault.rows[r][1]}</td>`;
        }
      }


      res.render('add_fault',
      {
        fault_name : fault_name
      });

      });
    });
  });


module.exports = router;
