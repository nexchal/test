var express = require('express')
var fs = require('fs');
var ejs = require('ejs');
router = express.Router();
var page;


router.get('/cbinfo/1', function(req, res)  // 차단기 동장분석
{
  page = require('../controls/cb_info.js');
  return page.HTML(req,res);
});
module.exports = router;
