//conexion a la base de datos
const mysql = require ('mysql');

const mysqlConnection = mysql.createConnection ({
    host:'localhost',
    user:'root',
    password:'',
    database:'santa_lucia',
    port: 3306


});

mysqlConnection.connect(function (err){
    if (err){
        console.log(err);
          return;
     
     }else {
        console.log ('DB is connected');
     }


     
});


module.exports = mysqlConnection;