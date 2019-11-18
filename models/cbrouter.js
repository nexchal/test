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

  console.log(area1);
  console.log(area2);
  console.log(area3);

  var new_name = post.name;
  var new_tel =  post.tel;
  var emp_no = post.emp_no;

  var post = req.body;

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
          count = 404;
        }
        if(new_tel == search_tel[i] && new_name != search_name[i])
        {
            category=`addCategory(category,"NULL", "선택");
            addCategory(category[0], "", "");
            alert("중복");
            `;
            console.log("중복된 tel 입니다");
            count = 1;
        }
        if(new_tel != search_tel[i] && new_name != search_name[i])
        {
            count = "newbie";
        }
      }

      if(count == 404)
      {
        console.log("중복데이터" + count);
      }

      if(count = "newbie")
      {
        console.log("신규 유저 삽입중  " + count);
        console.log(emp_no,new_name,new_tel);
        console.log(area1,area2,area3);

        var add_userinfo = require('../controls/insert_userinfo.js');
        add_userinfo.insert(req,res,emp_no,new_name,new_tel,area1,area2,area3);

        //var ads = require('../controls/insert_fault.js');
        //ads.insert(req,res,check,new_tel);
      }

    });

  });
  page = require('../controls/list.js');
  return page.HTML(req,res);

});


module.exports = router;
