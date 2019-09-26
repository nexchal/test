var express = require('express')
var app = express()
var fs = require('fs');
var ejs = require('ejs');
var cbrouter = require('./models/cbrouter.js');
var frrouter = require('./models/frrouter.js');
var page;

app.use(express.static('public'));  // 정적파일 사용하기
app.set('view engine','ejs'); // ejs사용

app.use('/',cbrouter);
app.use('/',frrouter);

app.get('/', function(req, res) //index
{
  page = require('./controls/index.js');
  return page.HTML(req,res);
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});

module.exports = app;
