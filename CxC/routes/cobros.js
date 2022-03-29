//******************************************************* */
//********************DEYBI LAINEZ*********************** */
//******************************************************* */

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


//PROCEDIMIENTO ALMACENADO MOSTRAR COBROS
router.get ('/COBROS', (req, res) => {
    mysqlConnection.query('CALL SP_MOS_COBRO', (err, rows, fields) => {
    if (!err){
    res.json(rows);
 } else {
    console.log(err);
 }
 });

 });

 router.get("/COBROS", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
      const sql = "CALL SP_MOS_COBRO";
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


//SELECT DE LA TABLA COBRO CON TOKEN
router.get("/COBROS/:COD_COBRO", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {

       const { COD_COBRO } = req.params;
  
      const sql = 'CALL SP_SEL_COBRO (?)';
      mysqlConnection.query(sql, [COD_COBRO], (error, results)=>{
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





//INSER DE LA TABLA COBRO CON TOKEN
router.post("/GESTION", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
       const {NUMERO_FACTURA ,NUM_CUOTAS ,VALOR ,CUOTA_PAGADA ,SALDO} = req.body
       console.log(req.body)
                         
    
    const query  = "CALL SP_INS_COBRO(?, ?, ?, ?, ?)";
    mysqlConnection.query(query, [NUMERO_FACTURA ,NUM_CUOTAS ,VALOR ,CUOTA_PAGADA ,SALDO], (err, rows, fields) => {
       if (!err){
            res.json({Status: 'COBROS INSERTADO Y GUARDADO'});
    } else {
         console.log(err);
    

      }
  });
      }
  });      
});

//UPDATE DE LA TABLA COBRO CON TOKEN

router.put("/COBROS/:COD_COBRO", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
       const {NUMERO_FACTURA ,NUM_CUOTAS ,VALOR ,CUOTA_PAGADA ,SALDO} = req.body;
       const {COD_COBRO} = req.params;
       
                         
    
    const query  = 'CALL SP_UPD_COBRO (?,?,?,?,?,?)';
    mysqlConnection.query(query, [COD_COBRO ,NUMERO_FACTURA ,NUM_CUOTAS ,VALOR ,CUOTA_PAGADA ,SALDO  ], (err, rows, fields) => {
       if (!err){
            res.json({Status: 'COBRO ACTUALIZADO CORRECTAMENTE'});
    } else {
         console.log(err);
    

      }
  });
      }
  });      
});


//DELETE DE LA TABLA COBRO

router.delete("/COBROS/:COD_COBRO", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
       const {COD_COBRO} = req.params;
       const sql = 'CALL  SP_DEL_COBRO (?)';
     
       mysqlConnection.query(sql, [COD_COBRO], (err, results)=>{
       if (!err){
           res.json({Status: 'COBRO ELIMINADO CORRECTAMENTE'});
   } else {
        console.log(err);

      }
  });
      }
  });      
});

module.exports = router;