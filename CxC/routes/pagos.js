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

//PROCEDIMIENTO ALMACENADO DE MOSTRAR PAGOS
router.get("/PAGO", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO");
      } else {
      const sql = "CALL SP_MOS_PAGOS";
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



 //PROCEDIMIENTO ALMACENADO DE SELECT PAGOS

router.get("/PAGO/:COD_PAGO", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO");
      } else {

       const { COD_PAGO } = req.params;
  
      const sql = 'CALL SP_SEL_PAGOS (?)';
      mysqlConnection.query(sql, [COD_PAGO], (error, results)=>{
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



// PARA EL PROCEDIMIENTO ALMACENADO DE PAGOS INSERT 

router.post("/PAGO", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO");
      } else {
       const {COD_EMPRESA ,COD_TIPO_PAGO ,VAL_IMPORTE} = req.body
       console.log(req.body)
                         
    
    const query  = "CALL SP_INS_PAGO( ?, ?, ?);";
    mysqlConnection.query(query, [COD_EMPRESA ,COD_TIPO_PAGO ,VAL_IMPORTE], (err, rows, fields) => {
       if (!err){
            res.json({Status: 'PAGO INSERTADO Y GUARDADO'});
    } else {
         console.log(err);
    

      }
  });
      }
  });      
});

//PARA EL PROCEDIMIENTO ALMACENADO DE PAGOS UPDATE

router.put("/PAGO/:COD_PAGO", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO");
      } else {
       const {COD_EMPRESA ,COD_TIPO_PAGO ,VAL_IMPORTE} = req.body;
       const {COD_PAGO} = req.params;
       
                         
    
    const query  = 'CALL SP_UPD_PAGO (?,?,?,?)';
    mysqlConnection.query(query, [COD_PAGO,COD_EMPRESA ,COD_TIPO_PAGO ,VAL_IMPORTE], (err, rows, fields) => {
       if (!err){
            res.json({Status: 'PAGO ACTUALIZADO'});
    } else {
         console.log(err);
    

      }
  });
      }
  });      
});
//PARA EL PROCEDIMIENTO ALMACENADO DE PAGOS DELETE

router.delete("/PAGO/:COD_PAGO", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO");
      } else {
       const {COD_PAGO} = req.params;
       const sql = 'CALL SP_DEL_PAGO  (?)';
     
      mysqlConnection.query(sql, [COD_PAGO], (err, results)=>{
       if (!err){
           res.json({Status: 'PAGO ELIMINADO CORRECTAMENTE'});
   } else {
        console.log(err);

      }
  });
      }
  });      
});

module.exports = router;