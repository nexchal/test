var fs = require('fs');
var ejs = require('ejs');
var qs = require('querystring');
var oracledb=require('oracledb');
var express=require('express');
var dbConfig = require('./../config/dbconfig2.js');
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
        conn.execute(`SELECT * FROM test_userinfo`, function (err, result)
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
                  <td><a href = '/page/${list[i][0]}'>  ${list[i][0]}</a></td>
                  <td>${list[i][1]}</td>
                  <td>${list[i][2]}</td>
                  <td>${list[i][3]}</td>
                  <td>${list[i][4]}</td>
                  <td>${list[i][5]}</td>
									<td>${list[i][6]}</td>
									<td><input type ="checkbox" name="check" value = "${list[i][2]}" > </td>
            </tr>`;
          }

					var name = '';
					for (var i = 0; i < result.metaData.length; ++i)
					{
						var a = result.metaData[i].name;
						name +=
								`
										<th>${result.metaData[i].name}</th>
								`
					}
					name = name + `<th>box</th>`;
          var first_data = ejs.render(src_body,
          {
            dbname: name,
            dbdata: data
          });

           page = ejs.render(src,
          {
            frame_top: src_top,
            frame_body: first_data,
            frame_bottom: ''
          });
					res.writeHead(200);
					res.end(page);
        });
		  });
    },
		UPDATE :function(req, res)
	{
		var oracledb = require('oracledb');
		var dbConfig = require('./../config/dbconfig2.js');
		var post = req.body;
		var check = post.check;
		var checked=post.checked;
		console.log(checked);
		var src = fs.readFileSync(__dirname+'/../views/frame_main.ejs', 'utf8');
		var src_top = fs.readFileSync(__dirname+'/../views/frame_top.ejs', 'utf8');
		var src_body = fs.readFileSync(__dirname+'/../views/frame_body.ejs', 'utf8');
		var name='';
		var data='';
		var i=0, j=0, k=0;
		oracledb.getConnection(dbConfig,
			function(err, conn)
			{
				conn.execute(`SELECT * FROM test_userinfo`, function (err, result)
				{
					for (var i = 0; i < 6; i++)
					{
						var a = result.metaData[i].name;
						name +=
								`
										<th>${result.metaData[i].name}</th>
								`;
					}
					for(k = 0; k < checked; k++)
					{
						for(var j = 0; j < result.rows.length; j++)
						{
							if(check[k] == result.rows[j][2])//체크된 항목의 번호가 같으면
							{
								console.log(check[k]);
								console.log(result.rows[j][2]);
								//데이터에 해당번호의 정보 불러오기
								data += `
								<tr>
											<td><input type="text" name="EMP_NO" value="${result.rows[j][0]}"></td>
											<td><input type="text" name="EMP_NAME" value="${result.rows[j][1]}"></td>
											<td><input type="text" name="EMP_TEL" value="${result.rows[j][2]}"></td>
											<td><input type="text" name="AREA" value="${result.rows[j][3]}"></td>
											<td><input type="text" name="AREA_1" value="${result.rows[j][4]}"></td>
											<td><input type="text" name="AREA_2" value="${result.rows[j][5]}"></td>
								</tr>`;
							}
						}
					}
					var first_data = ejs.render(src_body,
					{
						dbname: name,
						dbdata: data
					});
					page = ejs.render(src,
				 {
					 frame_top: src_top,
					 frame_body: first_data,
					 frame_bottom: ''
				 });
				 res.writeHead(200);
				 res.end(page);
				});
			});
		}
  }
