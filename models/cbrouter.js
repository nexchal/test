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

  var oracledb = require('oracledb');
  var dbConfig = require('../config/dbconfig2.js');
  var bodyParser = require('body-parser');
  var page;

  oracledb.getConnection(dbConfig,function(err, conn,callback)
  {
    page = require('../controls/add.js');
    return page.AREA(req,res);
    });
  });

router.post('/create_process', function(req, res) //index
{
  var post = req.body;
  var area1 = post.subject;
  var area2 = post.contents;
  var area3 = post.components;

  var new_name = post.name;
  var new_tel =  post.tel;
  var emp_no = post.emp_no;
  var re = post.re;

//tmp_seq.NEXTVAL
  oracledb.getConnection(dbConfig,function(err, conn)
  {
    conn.execute(`select EMP_TEL,emp_name from TEST_USERINFO`,function (err, result)
    {
      var count=0;
      var search_tel = [];
      var search_name = [];

      for(var i = 0;  i < result.rows.length; i++)
      {
        for(var j = 0; j < 1; j++)
        {
          search_tel[i] = result.rows[i][j];
          search_name[i] = result.rows[i][j+1];
        }
      }

      for(i=0; i<result.rows.length; i++)
      {
        if(new_tel == search_tel[i] && new_name == search_name[i])
        {
          count = 100;
          break;
        }
        if(new_tel == search_tel[i] && new_name != search_name[i])
        {
            category=`addCategory(category,"NULL", "선택");
            addCategory(category[0], "", "");
            alert("중복");
            `;
            console.log("중복된 tel 입니다");
            count++;
            res.redirect('form');
            break;
        }
      }
      if(count == 100 )
      {
        console.log("존재하는 번호 에러 타입 추가중");
        conn.execute(`insert into TEST_ERR_TYPE VALUES ('${re}',sysdate,(SELECT ID FROM TEST_USERINFO WHERE EMP_TEL='${new_tel}'))`,function (err, qq)
      {
         console.log(qq);
      });
      }
      else if(count == 1)
      {
        console.log("else if 도착 후 실행" + count);
      }
      else
      {
        console.log("신규 유저 삽입중")
        conn.execute(`insert into test_userinfo VALUES ('${emp_no}','${new_name}','${new_tel}','${area1}','${area2}','${area3}',tmp_seq.NEXTVAL)`,function (err, topics)
        {
           console.log(topics);
        });

        conn.execute(`insert into TEST_ERR_TYPE VALUES ('${re}',sysdate,(SELECT ID FROM TEST_USERINFO WHERE EMP_TEL='${new_tel}' and EMP_NAME = '${new_name}'))`,function (err, qq)
        {
          console.log(qq);
        });
      }
    });
    res.writeHead(302, {Location: `/list`});
    res.end();

  });
});


module.exports = router;
