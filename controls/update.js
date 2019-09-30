var fs = require('fs');
var qs = require('querystring');
var ejs = require('ejs');

module.exports =
{
	 UPDATE: function(req,res)
   {
     var body='';
     req.on('data',function(data)
     {
       body = body + data;
     });
     req.on('end',function()
     {
       var post = qs.parse(body);
     });
   }
}
