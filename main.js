var express = require('express')
var app = express()
var fs = require('fs');
var ejs = require('ejs');
var page;


app.use(express.static('public'));  // 정적파일 사용하기
app.set('view engine','ejs'); // ejs사용

app.get('/', function(req, res) //index.js
{
  res.render('form');
});

app.post('/create_process', function(req, res) //index.js
{

});


app.listen(3001, function()
{
  console.log('Example app listening on port 3001!')
});
