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

//PROCEDIMIENTO ALMACENADO DE MOSTRAR FACTURA
router.get("/FACTURA", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
      const sql = "CALL SP_MOS_FACTURA";
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


//SELECT DE LA TABA FACTURA CON TOKEN
router.get("/FACTURA/:COD_FACTURA", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {

       const { COD_FACTURA } = req.params;
  
      const sql = 'CALL SP_SEL_FACTURA (?)';
      mysqlConnection.query(sql, [COD_FACTURA], (error, results)=>{
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





//INSER DE LA TABLA FACTURA CON TOKEN
router.post("/FACTURA/", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
       const {NUMERO_FACTURA ,COD_CLIENTE ,COD_CREDITO, VALOR ,INTERES_CREDITICIO ,PAG_ACUMULADO ,SALDO ,COD_ESTADO} = req.body
       console.log(req.body)
                         
    
    const query  = "SP_INS_FACTURA(?, ?, ?, ?, ?, ?, ?, ? );";
    mysqlConnection.query(query, [NUMERO_FACTURA ,COD_CLIENTE ,COD_CREDITO, VALOR ,INTERES_CREDITICIO ,PAG_ACUMULADO ,SALDO ,COD_ESTADO], (err, rows, fields) => {
       if (!err){
            res.json({Status: 'FACTURA INSERTADA Y GUARDADA'});
    } else {
         console.log(err);
    

      }
  });
      }
  });      
});

//UPDATE DE LA TABLA FACTURA CON TOKEN

router.put("/FACTURA/:COD_FACTURA", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
       const {NUMERO_FACTURA,COD_CLIENTE,COD_CREDITO,VALOR,INTERES_CREDITICIO,PAG_ACUMULADO,SALDO,COD_ESTADO} = req.body;
       const {COD_FACTURA} = req.params;
       
                         
    
    const query  = 'CALL SP_UPD_FACTURA (?, ?, ?, ?, ?, ?, ?, ?,?);';
    mysqlConnection.query(query, [COD_FACTURA,NUMERO_FACTURA,COD_CLIENTE,COD_CREDITO,VALOR,INTERES_CREDITICIO,PAG_ACUMULADO,SALDO,COD_ESTADO], (err, rows, fields) => {
       if (!err){
            res.json({Status: 'FACTURA ACTUALIZADA CORRECTAMENTE'});
    } else {
         console.log(err);
    

      }
  });
      }
  });      
});


//DELETE DE LA TABLA FACTURA

router.delete("/FACTURA/:COD_FACTURA", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
       const {COD_FACTURA} = req.params;
       const sql = 'CALL SP_DEL_FACTURA (?)';
     
       mysqlConnection.query(sql, [COD_FACTURA], (err, results)=>{
       if (!err){
           res.json({Status: 'FACTURA ELIMINADA CORRECTAMENTE'});
   } else {
        console.log(err);

      }
  });
      }
  });      
});



module.exports = router;