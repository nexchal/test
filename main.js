var express = require('express');
var app = express();
var fs = require('fs');
var ejs = require('ejs');
var bodyParser= require('body-parser');

var listrouter = require('./models/listrouter.js');
var cbrouter = require('./models/cbrouter.js');
var update_router = require('./models/update.js');
//var delete_router = require('./models/delete.js');
var page;

app.set('view engine','ejs'); // ejs사용

//app.use('/',delete_router);
app.use('/',update_router);
app.use('/',cbrouter);
app.use('/',listrouter);
app.use(express.static('public'));  // 정적파일 사용하기




app.listen(3001, function() {
  console.log('Example app listening on port 3001!')
});
module.exports = app;
