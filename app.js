/**
 * Created by lebovo on 2018/1/8.
 */
var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var user = express.Router();

app.use(bodyParser.urlencoded({}));
app.use('/user',user);
var pool = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'123woaini',
    database:'cococ',
    port:3306
})
user.post('/lu',function(req,res){
    var user = req.body.user;
    var textname = req.body.textname
    var text = req.body.text

    pool.getConnection(function(err,connection){
        if(err){
            console.log('connection::'+err)
            return
        }
        connection.query('select * from text where name=?',[user],function(err,data){
            if(err){
                console.log('mysql::'+err)
                return
            }
            if(data == ''){
                    connection.query('insert into text(name,textname,text) values(?,?,?)',[user,textname,text],function(err,data){
                        if(err){
                            console.log('mysql::'+err);
                            return
                        }
                        res.send('ok')
                    })

            }else{
                res.send('no ok')
            }

        })
    })

})
//ÁÐ±í
user.post('/list',function(req,res){
    pool.getConnection(function(err,connection){
        if(err){
            console.log('connection£º£º'+err);
            return
        }
        var sql = 'select * from text'
        connection.query(sql,function(err,data){
            if(err){
                console.log('mysql£º£º'+err)
                return
            }


            res.send(data)
            connection.end()
        })
    })
})

//É½É¾³ý
user.post('/shan', function(req, res, next) {
    pool.getConnection(function(err,connection) {
        if (err) {
            console.log('connection£º£º' + err);
            return
        }
        connection.query('DELETE FROM text WHERE id=' + req.body.id, function (err, rows, fields) {
            res.header('Access-Control-Allow-Origin', "*");
            res.send(rows)
        })
    })
});
app.use(express.static('./'));
app.listen(8000,function(){
    console.log('ok')
})