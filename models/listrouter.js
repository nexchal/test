var express = require('express')
var fs = require('fs');
var ejs = require('ejs');
var oracledb = require('oracledb');
var dbConfig = require('../config/dbconfig2.js');
var bodyParser = require('body-parser');

oracledb.autoCommit = true;
var router = express.Router();
var page;
var arr = '';
router.use(bodyParser.urlencoded({ extended: false }));


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
  page = require('../controls/page_read.js');
  return page.HTML(req,res,title);
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
router.post('/delete',function(req, res)
{
  var post = req.body;
  var checked_len = post.checked;
  var checked_val = post.check;

  var checked_val2 = new Array(" ");
  checked_val2.push(post.check);


  console.log("[길이]: "+checked_len);
  console.log("[길이]: "+ checked_len++);




  for(var i = 0; i <= checked_len-1; ++i )
  {
    console.log("[1]: "+checked_val[i]);
    console.log("[2]: "+checked_val2[i]);
    conn.execute(`delete from test_userinfo where emp_tel = '${checked_val[i]}' OR emp_tel =  '${checked_val2[i]}' `, function (err, result)
    { });
    conn.execute(`DELETE FROM TEST_ERR_TYPE WHERE FAULT_LOGICID = (select LOGICID from FAULTLOGIC where LOGICNAME = '${checked_val[i]}' OR LOGICNAME = '${checked_val2[i]}' )`, function (err, se)
    { });
  }

  res.writeHead(302, {Location: `/list`});
  res.end();
});

  //res.writeHead(200);
  //res.write("delete");
}); //ddd


module.exports = router;
