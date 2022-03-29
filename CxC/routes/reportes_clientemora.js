
const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const jwt = require("jsonwebtoken");




//ESTO ES PARA CONECTARME A LA BASE DE DATOS QUE ESTA DABASE.JS
const mysqlConnection = require('../database');

// Authorization: Bearer <token>
function verifyToken(req, res, next){
   const bearerHeader =  req.headers['authorization'];

   if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(" ")[1];
        req.token  = bearerToken;
        next();
   }else{
       res.sendStatus(403);
   }
}

//PROCEDIMIENTO ALMACENADO MOSTRAR PERSONAS
router.get ('/Reportes_clientemora', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
       if (error) {
       res.send("ACCESO RESTRINGIDO)");
       } else {
        const sql = 'CALL SEL_REPORTESCLIENTE_MORA'
        mysqlConnection.query(sql, (error, results)=>{
            if (error) throw error;
            if (results.length > 0) {
            res.json(results);
            } else {
                res.send("SIN RESULTADOS")
        
            }
        });
            }
        });      
        });

module.exports = router;