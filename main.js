var express = require('express')
var app = express()
var fs = require('fs');
var ejs = require('ejs');

var listrouter = require('./models/listrouter.js');
var cbrouter = require('./models/cbrouter.js');
var page;

app.set('view engine','ejs'); // ejs사용
app.use('/',cbrouter);
app.use('/',listrouter);
app.use(express.static('public'));  // 정적파일 사용하기






app.listen(3001, function() {
  console.log('Example app listening on port 3001!')
});
module.exports = app;
