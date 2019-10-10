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

oracledb.getConnection(dbConfig,function(err, conn)
{

  router.post('/update',function(req, res)
  {
    page = require('../controls/list.js');
    return page.UPDATE(req, res);
  });

  router.post('/update_process',function(req, res)
  {
    page = require('../controls/list.js');
    return page.UPDATEPROCESS(req, res);
  })



});
module.exports = router;
