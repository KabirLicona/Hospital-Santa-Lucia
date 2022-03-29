//******************************************************* */
//********************RONAL AVILEZ********************* */
//******************************************************* */


const { Router } = require('express');
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

//PROCEDIMIENTO ALMACENADO MOSTRAR CLIENTE
router.get("/CLIENTE", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
      const sql = "CALL SP_MOS_CLIENTE";
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


//SELECT DE LA TABA CLEINTE CON TOKEN
router.get("/CLIENTE/:COD_CLIENTE", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {

       const { COD_CLIENTE } = req.params;
  
      const sql = 'CALL SP_SEL_CLIENTE (?)';
      mysqlConnection.query(sql, [COD_CLIENTE], (error, results)=>{
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





//INSER DE LA TABLA CLEINTE CON TOKEN
router.post("/PERSONA/", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
       const {COD_EMPRESA ,COD_PERSONA ,IDENTIDAD} = req.body
       console.log(req.body)
                         
    
    const query  = "CALL SP_INS_CLIENTE(?, ?, ?);";
    mysqlConnection.query(query, [COD_EMPRESA ,COD_PERSONA ,IDENTIDAD], (err, rows, fields) => {
       if (!err){
            res.json({Status: 'CLIENTE INSERTADA Y GUARDADA'});
    } else {
         console.log(err);
    

      }
  });
      }
  });      
});

//UPDATE DE LA TABLA CLIENTE CON TOKEN

router.put("/CLIENTE/:COD_CLIENTE", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
       const {COD_EMPRESA, COD_PERSONA, IDENTIDAD } = req.body;
       const {COD_CLIENTE} = req.params;
       
                         
    
    const query  = 'CALL SP_UPD_CLIENTE (?,?,?,?)';
    mysqlConnection.query(query, [COD_CLIENTE,COD_EMPRESA, COD_PERSONA, IDENTIDAD ], (err, rows, fields) => {
       if (!err){
            res.json({Status: 'CLIENTE ACTUALIZADO CORRECTAMENTE'});
    } else {
         console.log(err);
    

      }
  });
      }
  });      
});


//DELETE DE LA TABLA CLIENTE 

router.delete("/CLIENTE/:COD_CLIENTE", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
       const {COD_CLIENTE} = req.params;
       const sql = 'CALL SP_DEL_CLIENTE (?)';
     
       mysqlConnection.query(sql, [COD_CLIENTE], (err, results)=>{
       if (!err){
           res.json({Status: 'CLIENTE ELIMINADA CORRECTAMENTE'});
   } else {
        console.log(err);

      }
  });
      }
  });      
});

module.exports = router;