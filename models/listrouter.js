var express = require('express')
var fs = require('fs');
var ejs = require('ejs');
var oracledb = require('oracledb');
var dbConfig = require('../config/dbconfig2.js');
oracledb.autoCommit = true;
var router = express.Router();
var page;

oracledb.getConnection(dbConfig,function(err, conn)
{


router.get('/list',function(req, res) //index
{
  page = require('../controls/list.js');
  return page.HTML(req,res);
});

router.get('/page/:pageId',function(req, res)
{
  var title = req.params.pageId;

  conn.execute(`SELECT emp_name,area,area_1,area_2,id FROM test_userinfo where emp_no = '${title}'`, function (err, result)
  {

    var id = result.rows[0][4];
    var name = result.rows[0][0];
    var area = result.rows[0][1];
    var area1 = result.rows[0][2];
    var area2 = result.rows[0][3];

    conn.execute(`SELECT err_name,TO_CHAR(time,'YY/MM/DD hh:mi')  FROM TEST_ERR_TYPE where id = '${id}'`, function (err, ertable)
    {
      console.log(ertable.rows.length);
      console.log(ertable.rows)
      res.render('title',
      {
        id: id, name : name, area : area, area1: area1, area2: area2,
        two: ertable.rows, length: ertable.rows.length
      });
    });
  });
});

router.post('/update',function(req, res)
{
  page = require('../controls/update.js');
  return page.UPDATE(req,res);
});

});

module.exports = router;
