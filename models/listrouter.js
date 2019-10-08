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

  conn.execute(`SELECT emp_name,area,area_1,area_2,id,emp_tel,emp_no FROM test_userinfo where emp_no = '${title}'`, function (err, result)
  {
    var name = result.rows[0][0];
    var area = result.rows[0][1];
    var area1 = result.rows[0][2];
    var area2 = result.rows[0][3];
    var id = result.rows[0][4];
    var tel = result.rows[0][5];
    var title = result.rows[0][6];

    conn.execute(`SELECT logicname FROM FAULTLOGIC where LOGICID = '${id}'`, function (err, ertable)
    {
      console.log(ertable.rows.length);
      console.log(ertable.rows)
      res.render('title',
      {
        id: id, name : name, area : area, area1: area1, area2: area2,
        two: ertable.rows, length: ertable.rows.length, tel : tel , title: title
      });
    });
  });
});


router.post('/save',function(req, res)
{
  var post = req.body;
  var description = post.tt;
  var title = post.title;
  fs.writeFile('public/assets/data/' + title,description,(err) => {
    if(err) {
      console.log('err');
    }
    res.writeHead(302, {Location: `/list`});
    res.end();
});
});


  //res.writeHead(200);
  //res.write("delete");
}); //ddd


module.exports = router;
