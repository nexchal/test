var fs = require('fs');
var ejs = require('ejs');
const __root = require('app-root-path').path;

var j=0, k=0,r=0;
var count=0;
var temp;

module.exports = {
AREA:function(req, res){
  var category=`addCategory(category,"NULL", "선택");
  addCategory(category[0], "", "");`;

  var db = require(__root+'/models/select_id.js');

  db.info(5009999,
    function(err, result)
    {
      if(err)
      {
        console.log("조회 실패");
        throw err;
      }
        db.info168(5009998,function(err, result168)
        {
          if(err)
          {
            console.log("조회 실패");
            throw err;
          }

          for(var i=0; i<result.rows.length; i++)
            {
              k=-1;
              category+=`addCategory(category, "${result.rows[i]}", "${result.rows[i]}");`
            }

            category+=`addCategory(category[1], "${result168.rows[0]}", "${result168.rows[0]}");`;
            category+=`addCategory(category[1], "${result168.rows[1]}", "${result168.rows[1]}");`;

            db.info_stname(5009997,function(err, result_stname)
            {

              if(err)
              {
                console.log("조회 실패");
                throw err;
              }
              for(var i=0; i<result_stname.rows.length; i++)
              {
              category+=`addCategory(category[1][0], "${result_stname.rows[i]}", "${result_stname.rows[i]}");`;
              }

              var db2 = require(__root+'/models/fault_list.js');
              db2.fault(5009996,function(err, result_fault)
              {
                if(err)
                {
                  console.log("조회 실패");
                  throw err;
                }
                var fault_name = '';
                console.log(result_fault.rows);

                for(r=0; r<result_fault.rows.length; r++)
    						{
    							if(r%3==0)
    							{
    								fault_name+=`<tr><td><input type="checkbox" name="check" value="${result_fault.rows[r][0]}">${result_fault.rows[r][1]}</td>`;
    							}
    							else
    							{
    								fault_name+=`<td><input type="checkbox" name="check" value="${result_fault.rows[r][0]}">${result_fault.rows[r][1]}</td>`;
    							}
    						}




            res.render('form',
            {
              categorys:category, fault_name : fault_name
            });
            }); //st꺼
          }); //168꺼
        }); //fault_list꺼
      });
    }
  }
