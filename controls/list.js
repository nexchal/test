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
			var controls=`
			<script>
			function dd() {
				alert("함수동작");
				window.location.reload(true);
			}
			</script>
			<input type="button" class = "button3" onclick="showPopup()" value="추가">
			<input type="button" class = "button3" onclick="check_update()" value="수정">
			<input type="button" class = "button3" onclick="check_delete()" value="삭제">`;
      var data='';
      oracledb.getConnection(dbConfig,
  		  function(err, conn)
  		{
        conn.execute(`SELECT emp_no as 사원번호,emp_name as 사원명,emp_tel as 연락처, area as 지역, area_1 as 구역,
				 area_2 as 변전소, id FROM test_userinfo`, function (err, result)
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
            dbdata: data,
						controls:controls
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
	UPDATE :function(req, res)//체크된 DB데이터 수정페이지
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
		var controls='<center><h5>유형</h5></center><table style=" width:90%; margin: auto;">';
		var i=0, j=0, k=0, r=0;
		oracledb.getConnection(dbConfig,
			function(err, conn)
			{
				conn.execute(`SELECT * FROM test_userinfo`, function (err, result)
				{
					conn.execute(`SELECT LOGICID, LOGICNAME FROM FAULTLOGIC`, function (err, result1)
					{
						for (var i = 0; i < 6; i++)
						{
							var a = result.metaData[i].name;
							name +=
								`
										<th>${result.metaData[i].name}</th>
								`;
						}
						if(checked == 1)//단일 데이터 수정
						{
							for(var j = 0; j < result.rows.length; j++)
							{
								if(check == result.rows[j][2])//체크된 항목의 핸드폰번호가 같으면
								{
									console.log(result.rows[j][6]);
									//데이터에 해당번호의 정보 불러오기
									data += `
											<tr>
											<input type="hidden" name="id" value="${result.rows[j][6]}">
											<td>${result.rows[j][0]}</td>
											<td>${result.rows[j][1]}</td>
											<td>${result.rows[j][2]}</td>
											<td>${result.rows[j][3]}</td>
											<td>${result.rows[j][4]}</td>
											<td>${result.rows[j][5]}</td>
											</tr>`;
								}
							}
						}
						else//다중 데이터수정
						{
							for(k = 0; k < checked; k++)
							{
								for(var j = 0; j < result.rows.length; j++)
								{
									if(check[k] == result.rows[j][2])//체크된 항목의 번호가 같으면
									{
										console.log(result.rows[j][6]);
										//데이터에 해당번호의 정보 불러오기
										data += `
												<tr>
												<input type="hidden" name="id" value="${result.rows[j][6]}">
												<td>${result.rows[j][0]}</td>
												<td>${result.rows[j][1]}</td>
												<td>${result.rows[j][2]}</td>
												<td>${result.rows[j][3]}</td>
												<td>${result.rows[j][4]}</td>
												<td>${result.rows[j][5]}</td>
												</tr>`;
									}
								}
							}
						}
						for(r=0; r<result1.rows.length; r++)
						{
							if(r%5==0)
							{
								controls+=`<tr><td><input type="checkbox" name="check" value="${result1.rows[r][0]}">${result1.rows[r][1]}</td>`;
							}
							else
							{
								controls+=`<td><input type="checkbox" name="check" value="${result1.rows[r][0]}">${result1.rows[r][1]}</td>`;
							}
						}
						controls+=`</table><div><input type="button" class = "button3" onclick="location.href='/list'" value="목록">
						<input type="button" class = "button3" onclick="update_process()" value="수정"><input type="hidden" name="xchecked" value="${checked}">`;
						var first_data = ejs.render(src_body,
						{
							dbname: name,
							dbdata: data,
							controls:controls
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
			});
		},
		UPDATEPROCESS :function(req, res)//DB수정 실행
		{
			var oracledb = require('oracledb');
			var dbConfig = require('./../config/dbconfig2.js');
			var post = req.body;
			var check = post.check;
			var checked=post.checked;//checked type count
			console.log(checked);
			var xchecked=post.xchecked;//checked user count
			console.log(xchecked);
			var id = post.id;
			var i=0, j=0;
			var count=0;
			var sql='';
			var n=0;
			oracledb.getConnection(dbConfig,
				function(err, conn)
			{
				conn.execute(`select * from TEST_ERR_TYPE`, function (err, result1)
				{
					if(checked == 1 && xchecked == 1)
					{
						for(i = 0; i < result1.rows.length; i++)
						{ n++;
							if(result1.rows[i][0] == check && result1.rows[i][2] == id)
							{
								console.log("중복");
								count++;
							}
						}
						if(count==0 && n>0)
						{
							conn.execute(`insert into TEST_ERR_TYPE values('${check}',sysdate,'${id}')`, function (err, result)
							{
								console.log(result);
							});
						}
					}
					else if(checked == 1 && xchecked != 1)
					{
						for(i = 0; i < result1.rows.length; i++)
						{ n++;
							if(result1.rows[i][0] == check && result1.rows[i][2] == id)
							{
								console.log("중복");
								count++;
							}
						}
						if(count==0&& n>0)
						{
							for(i=0; i < xchecked; i++)
							{
								conn.execute(`insert into TEST_ERR_TYPE values('${check}',sysdate,'${id[i]}')`, function (err, result)
								{
									console.log(result);
								});
							}
						}
					}
					else
					{
						for(i = 0; i < result1.rows.length; i++)
						{ n++;
							if(result1.rows[i][0] == check && result1.rows[i][2] == id)
							{
								console.log("중복");
								count++;
							}
						}
						if(count==0&& n>0)
						{
							for(i=0; i < xchecked; i++)
							{
								for(j=0; j < checked; j++)
								{
									conn.execute(`insert into TEST_ERR_TYPE values('${check[j]}',sysdate,'${id[i]}')`, function (err, result)
									{
										console.log(result);
									});
								}
							}
						}
					}
				});
				res.writeHead(302, {Location: `/list`});
		   	res.end();
			});
		}
  }
