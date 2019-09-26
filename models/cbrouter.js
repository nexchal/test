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
  return res.render('form');
});

router.post('/create_process', function(req, res) //index
{
  var post = req.body;


  var tl = post.tl;
  var area = post.area;
  var tel = post.tel;
  var name = post.name;

  console.log(area,tl,tel,name);
  oracledb.getConnection(dbConfig,function(err, conn)
  {
    conn.execute(`insert into TEST_JUNGWOOK2 VALUES ('${area}','${tl}','${tel}','${name}'
    ,sysdate,tmp_seq.NEXTVAL)`,function (err, topics)
    {
       console.log(topics);
       res.writeHead(302, {Location: `/`});
    });
  });
});


module.exports = router;
