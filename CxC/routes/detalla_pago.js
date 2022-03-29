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



router.get("/DETALLE", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
      const sql = "CALL SP_MOS_DET_PAGOS";
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


//SELECT DE LA TABLA DETALLES DE PAGO CON TOKEN
router.get("/DETALLE/:COD_DET_PAGO", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {

       const { COD_DET_PAGO } = req.params;
  
      const sql = 'CALL SP_SEL_DET_PAGO (?)';
      mysqlConnection.query(sql, [COD_DET_PAGO], (error, results)=>{
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





//INSER DE LA TABLA DETALLES DE PAGO CON TOKEN
router.post("/DETALLE", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
       const {COD_PAGO ,COD_FACTURA ,COD_CLIENTE ,SALDO_FACTURA ,VALOR_PAGAR ,NUEVO_SALDO} = req.body
       console.log(req.body)
                         
    
    const query  = "CALL SP_INS_DETALLE_PAGO(?, ?, ?, ?, ?, ?)";
    mysqlConnection.query(query, [COD_PAGO ,COD_FACTURA ,COD_CLIENTE ,SALDO_FACTURA ,VALOR_PAGAR ,NUEVO_SALDO], (err, rows, fields) => {
       if (!err){
            res.json({Status: 'DETALLE INSERTADO Y GUARDADO'});
    } else {
         console.log(err);
    

      }
  });
      }
  });      
});

//UPDATE DE LA TABLA DETALLES DE PAGO CON TOKEN

router.put("/DETALLE/:COD_DET_PAGO", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
       const {COD_PAGO ,COD_FACTURA ,COD_CLIENTE ,SALDO_FACTURA ,VALOR_PAGAR ,NUEVO_SALDO} = req.body;
       const {COD_DET_PAGO} = req.params;
       
                         
    
    const query  = 'CALL SP_UPD_DETALLE_PAGO (?,?,?,?,?,?,?)';
    mysqlConnection.query(query, [COD_DET_PAGO,COD_PAGO ,COD_FACTURA ,COD_CLIENTE ,SALDO_FACTURA ,VALOR_PAGAR ,NUEVO_SALDO], (err, rows, fields) => {
       if (!err){
            res.json({Status: 'DETALLE ACTUALIZADO CORRECTAMENTE'});
    } else {
         console.log(err);
    

      }
  });
      }
  });      
});


//DELETE DE LA TABLA DETALLES DE PAGO

router.delete("/DETALLE/:COD_DET_PAGO", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
       const {COD_DET_PAGO} = req.params;
       const sql = 'CALL  SP_DEL_DET_PAGO (?)';
     
       mysqlConnection.query(sql, [COD_DET_PAGO], (err, results)=>{
       if (!err){
           res.json({Status: 'DETALLE ELIMINADO CORRECTAMENTE'});
   } else {
        console.log(err);

      }
  });
      }
  });      
});

module.exports = router;