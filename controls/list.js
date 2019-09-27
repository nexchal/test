var fs = require('fs');
var ejs = require('ejs');

module.exports = {
	HTML:function(req, res){

			var oracledb = require('oracledb');
			var dbConfig = require('./../config/dbconfig2.js');

			var src = fs.readFileSync(__dirname+'/../views/frame_main.ejs', 'utf8');
			var src_top = fs.readFileSync(__dirname+'/../views/frame_top.ejs', 'utf8');
			var src_body = fs.readFileSync(__dirname+'/../views/frame_body.ejs', 'utf8');
      var src_bottom = fs.readFileSync(__dirname+'/../views/frame_bottom.ejs', 'utf8');
      var list;
      var page;

      var data='';
      oracledb.getConnection(dbConfig,
  		  function(err, conn)
  		{
        conn.execute(`SELECT area,tl,tel,name,TO_CHAR(time,'YY/MM/DD hh:mi'),id FROM TEST_JUNGWOOK2`, function (err, result)
        {

          if (err)
          {
            console.error(err.message);
            return;
          }
          list = result.rows;


          for(var i=0; i < list.length; ++i)
          {
            data += `

						<tr>
                  <td>${list[i][0]}</td>
                  <td>${list[i][1]}</td>
                  <td>${list[i][2]}</td>
                  <td>${list[i][3]}</td>
                  <td>${list[i][4]}</td>
                  <td>${list[i][5]}</td>
									<td><input type ="checkbox"> </td>
            </tr>`;
          }

					var name = '';
					for (var i = 0; i < result.metaData.length; ++i)
					{
						var a = result.metaData[i].name;
						console.log(a);
						name +=
								`
										<th>${result.metaData[i].name}</th>
								`
					}
					console.log(name);
					name = name + `<th>box</th>`;
          var first_data = ejs.render(src_body,
          {
            dbname: name,
            dbdata: data,
						type:''
          });

           page = ejs.render(src,
          {
            frame_top: src_top,
            frame_body: first_data,
            frame_bottom: src_bottom
          });
					res.writeHead(200);
					res.end(page);
        });
		  });
    }
  }
