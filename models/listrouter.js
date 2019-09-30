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

  conn.execute(`SELECT * FROM test_userinfo where emp_no = '${title}'`, function (err, result)
  {
    console.log(result);
    res.render('title',
    {
      good: result.rows
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
