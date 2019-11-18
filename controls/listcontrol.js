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


router.get('/',function(req, res) //메인 페이지 유저 리스트 출력
{
  page = require('../models/userinfo.js');
  return page.alluser(req,res);

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
