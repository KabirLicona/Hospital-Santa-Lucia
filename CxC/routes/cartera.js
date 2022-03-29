//********************************************************************* */
//*****************************KABIR MORENO *************************** */
//********************************************************************* */

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


//PROCEDIMIENTO ALMACENADO DE MOSTRAR CARTERA
//MOSTRAR DE LA TABLA CARTERA

router.get("/CARTERA", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
      const sql = "CALL SP_MOS_CARTERA";
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


//SELECT DE LA TABA CARTERA CON TOKEN
router.get("/CARTERA/:COD_CARTERA", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {

       const { COD_CARTERA } = req.params;
  
      const sql = 'CALL SP_SEL_CARTERA (?)';
      mysqlConnection.query(sql, [COD_CARTERA], (error, results)=>{
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





//INSER DE LA TABLA CARTERA CON TOKEN
router.post("/CARTERA", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
       const {COD_EMPRESA ,COD_CLIENTE ,COD_FACTURA ,COD_CREDITO ,MONTO_FACTURA ,VALOR_ACUMULADO ,SALDO  ,ESTADO ,OBSERVACIONES} = req.body
       console.log(req.body)
                         
    
    const query  = "CALL SP_INS_CARTERA(?, ?, ?, ?, ?, ?, ?, ?, ?);";
    mysqlConnection.query(query, [COD_EMPRESA ,COD_CLIENTE ,COD_FACTURA ,COD_CREDITO ,MONTO_FACTURA ,VALOR_ACUMULADO ,SALDO  ,ESTADO ,OBSERVACIONES], (err, rows, fields) => {
       if (!err){
            res.json({Status: 'CARTERA INSERTADA Y GUARDADA'});
    } else {
         console.log(err);
    

      }
  });
      }
  });      
});

//UPDATE DE LA TABLA CARTERA CON TOKEN

router.put("/CARTERA/:COD_CARTERA", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
       const {COD_EMPRESA ,COD_CLIENTE ,COD_FACTURA ,COD_CREDITO ,MONTO_FACTURA ,VALOR_ACUMULADO ,SALDO  ,ESTADO ,OBSERVACIONES} = req.body;
       const {COD_CARTERA} = req.params;
       
                         
    
    const query  = 'CALL SP_UPD_CARTERA (?,?,?,?,?,?,?,?,?,?)';
    mysqlConnection.query(query, [COD_CARTERA,COD_EMPRESA ,COD_CLIENTE ,COD_FACTURA ,COD_CREDITO ,MONTO_FACTURA ,VALOR_ACUMULADO ,SALDO  ,ESTADO ,OBSERVACIONES], (err, rows, fields) => {
       if (!err){
            res.json({Status: 'CARTERA ACTUALIZADA CORRECTAMENTE'});
    } else {
         console.log(err);
    

      }
  });
      }
  });      
});


//DELETE DE LA TABLA CARTERA

router.delete("/CARTERA/:COD_CARTERA", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
       const {COD_CARTERA} = req.params;
       const sql = 'CALL SP_DEL_CARTERA  (?)';
     
       mysqlConnection.query(sql, [COD_CARTERA], (err, results)=>{
       if (!err){
           res.json({Status: 'CARTERA ELIMINADA CORRECTAMENTE'});
   } else {
        console.log(err);

      }
  });
      }
  });      
});



module.exports = router;
