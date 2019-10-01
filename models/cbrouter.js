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
  var category=`addCategory(category,"NULL", "선택");
  addCategory(category[0], "", "");`;
  oracledb.getConnection(dbConfig,function(err, conn,callback)
  {
    var i=0, j=0, k=0,r=0;
    var count=0;
    var temp;
    conn.execute(`select distinct AREA from TEST_AREA`,function (err, result)//AREA 광주,대구등
    {
      conn.execute(`select * from TEST_AREA`,function (err, result1)//TEST_AREA 테이블
      {
        conn.execute(`select distinct AREA_1 from TEST_AREA`,function (err, result2)//TEST_AREA 테이블
        {
          for(i=0; i<result.rows.length;i++)
          {
            k=-1;
            category+=`addCategory(category, "${result.rows[i]}", "${result.rows[i]}");`;
            for(j=0; j < result2.rows.length; j++)
            {
              temp=result2.rows[j];//지역 1 저장
              count=0; // 카운트 초기화
              for(r=0; r < result1.rows.length; r++)
              {
                if(result1.rows[r][0] == result.rows[i])//AREA가 같고
                {
                  if(temp == result1.rows[r][1])//저장된 지역이 같으면
                  {
                    if(count>0) //중복되는 카테고리는하위에 추가
                    {
                      category+=`addCategory(category[${i+1}][${k}], "${result1.rows[r][2]}", "${result1.rows[r][2]}");`;
                      result1.rows[r][0]='';//추가한 데이터는 삭제
                      result1.rows[r][1]='';
                      result1.rows[r][2]='';
                    }
                    else//중복되는게 없으면 새로 카테고리 추가
                    {
                      k++;
                      category+=`addCategory(category[${i+1}], "${result1.rows[r][1]}", "${result1.rows[r][1]}");`;
                      category+=`addCategory(category[${i+1}][${k}], "${result1.rows[r][2]}", "${result1.rows[r][2]}");`;
                      result1.rows[j][1]
                      count++;
                      result1.rows[r][0]='';
                      result1.rows[r][1]='';
                      result1.rows[r][2]='';
                    }
                  }
                }
              }
            }
          }
          res.render('form',
          {
            categorys:category
          });
        });
      });
    });
  });
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
            break;
          }
        }
        console.log(count);
        if(count > 0 )
        {
          console.log("존재하는 번호 에러 타입 추가중");
          conn.execute(`insert into TEST_ERR_TYPE VALUES ('${re}',sysdate,(SELECT ID FROM TEST_USERINFO WHERE EMP_TEL='${tel}'))`,function (err, qq)
          {
             console.log(qq);
          });
        }
        else
        {
          console.log("신규 유저 삽입중")
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
