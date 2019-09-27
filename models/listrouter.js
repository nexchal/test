var express = require('express')
var fs = require('fs');
var ejs = require('ejs');
var oracledb = require('oracledb');
var dbConfig = require('../config/dbconfig2.js');
oracledb.autoCommit = true;
var router = express.Router();
var page;
router.get('/list',function(req, res) //index
{
  page = require('../controls/list.js');
  return page.HTML(req,res);
});

module.exports = router;
