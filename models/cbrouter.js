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

router.get('/', function(req, res) //index
{
  return res.render('main');
});

router.get('/create', function(req, res) //index
{
  return res.render('form');
});

router.post('/create_process', function(req, res) //index
{
  var post = req.body;


  var area1 = post.subject;
  var area2 = post.contents;
  var area3 = post.components;

  var name = post.name;
  var tel =  post.tel;
  var emp_no = post.emp_no;
  var re = post.re;

//tmp_seq.NEXTVAL

  console.log(area1,area2,area3,name,tel,emp_no,re);

    oracledb.getConnection(dbConfig,function(err, conn)
    {
      conn.execute(`select EMP_TEL from TEST_USERINFO`,function (err, result)
      {
        var i;
        var count=0;
        var a;
        console.log(result);
        a = result.rows;

        for(i=0; i<result.rows.length; i++)
        {
          if(tel == a[i])
          {
            count++;
          }
        }
        console.log(count);
        if(count > 0 )
        {
          console.log("이미있는 번호");
        }
        else
        {
          console.log("삽입중")
          conn.execute(`insert into test_userinfo VALUES ('${emp_no}','${name}','${tel}','${area1}','${area2}','${area3}',tmp_seq.NEXTVAL)`,function (err, topics)
          {
             console.log(topics);
          });
          conn.execute(`insert into TEST_ERR_TYPE VALUES ('${re}',sysdate,(SELECT ID FROM TEST_USERINFO WHERE EMP_TEL='${tel}'))`,function (err, qq)
          {
             console.log(qq);
          });
        }
      });

    res.writeHead(302, {Location: `/`});
    res.end();

  });
});


module.exports = router;
