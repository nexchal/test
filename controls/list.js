var fs = require('fs');
var ejs = require('ejs');

module.exports = {
	HTML:function(req, res){

			var oracledb = require('oracledb');
			var dbConfig = require('./../config/dbconfig2.js');
			var src = fs.readFileSync(__dirname+'/../views/frame_main.ejs', 'utf8');
			var src_top = fs.readFileSync(__dirname+'/../views/frame_top.ejs', 'utf8');
			//var src_left = fs.readFileSync(__dirname+'/../views/frame_left.ejs', 'utf8');
			var src_body = fs.readFileSync(__dirname+'/../views/phonelist.ejs', 'utf8');
      var src_bottom = fs.readFileSync(__dirname+'/../views/frame_bottom.ejs', 'utf8');
      var list;
      var page;
      var name = '<th>AREA</th><th>TYPE</th><th>PHONE</th><th>NAME</th><th>TIME</th><th>ID</th>';
      var data;
      var i, j;
      oracledb.getConnection(dbConfig,
  		  function(err, conn)
  		{
        conn.execute(`SELECT * FROM TEST_JUNGWOOK2`, function (err, result)
        {
          if (err)
          {
            console.error(err.message);
            return;
          }
          list = result.rows;
          console.log(list.length);
          for(i=0; i < list.length; i++)
          {
            data = `<tr>
                  <td>${list[i][0]}</td>
                  <td>${list[i][1]}</td>
                  <td>${list[i][2]}</td>
                  <td>${list[i][3]}</td>
                  <td>${list[i][4]}</td>
                  <td>${list[i][5]}</td>
                  </tr>`;
          }
          var first_data = ejs.render(src_body,
          {
            dbname: name,
            dbdata: data
          });
           page = ejs.render(src,
          {
            frame_top: src_top,
            //frame_left: src_left,
            frame_body: first_data,
            frame_bottom: src_bottom
          });
					res.writeHead(200);
					res.end(page);
        });
		  });
    }
  }
