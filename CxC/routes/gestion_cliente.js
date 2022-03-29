//******************************************************* */
//********************ROSSMERY AVILEZ****************** */
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



router.get("/GESTION", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
      const sql = "CALL SP_MOS_GESTION_CLIENTE";
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


//SELECT DE LA TABLA GESTION CLIENTE CON TOKEN
router.get("/GESTION/:COD_GESTION", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {

       const { COD_GESTION } = req.params;
  
      const sql = 'CALL SP_SEL_GESTION_CLIENTE (?)';
      mysqlConnection.query(sql, [COD_GESTION], (error, results)=>{
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





//INSER DE LA TABLA GESTION CLIENTE CON TOKEN
router.post("/GESTION", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
       const {COD_EMPRESA ,COD_CLIENTE ,COD_FACTURA ,CUOTAS_PENDIENTE_CL ,CUOTAS_PENDIENTE_LPS ,COD_CREDITO ,COLABORADOR_1 ,COLABORADOR_2} = req.body
       console.log(req.body)
                         
    
    const query  = "CALL SP_INS_GESTION_CLIENTE(?, ?, ?, ?, ?, ?, ?, ?)";
    mysqlConnection.query(query, [COD_EMPRESA ,COD_CLIENTE ,COD_FACTURA ,CUOTAS_PENDIENTE_CL ,CUOTAS_PENDIENTE_LPS ,COD_CREDITO ,COLABORADOR_1 ,COLABORADOR_2], (err, rows, fields) => {
       if (!err){
            res.json({Status: 'GESTION CLIENTE INSERTADA Y GUARDADA'});
    } else {
         console.log(err);
    

      }
  });
      }
  });      
});

//UPDATE DE LA TABLA GESTION CLIENTE CON TOKEN

router.put("/GESTION/:COD_GESTION", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
       const {COD_EMPRESA ,COD_CLIENTE ,COD_FACTURA ,CUOTAS_PENDIENTE_CL ,CUOTAS_PENDIENTE_LPS ,COD_CREDITO ,COLABORADOR_1 ,COLABORADOR_2} = req.body;
       const {COD_GESTION} = req.params;
       
                         
    
    const query  = 'CALL SP_UPD_GESTION_CLIENTE (?,?,?,?,?,?,?,?,?)';
    mysqlConnection.query(query, [COD_GESTION, COD_EMPRESA ,COD_CLIENTE ,COD_FACTURA ,CUOTAS_PENDIENTE_CL ,CUOTAS_PENDIENTE_LPS ,COD_CREDITO ,COLABORADOR_1 ,COLABORADOR_2 ], (err, rows, fields) => {
       if (!err){
            res.json({Status: 'GESTION CLIENTE ACTUALIZADA CORRECTAMENTE'});
    } else {
         console.log(err);
    

      }
  });
      }
  });      
});


//DELETE DE LA TABLA GESTION CLIENTE

router.delete("/GESTION/:COD_GESTION", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
       const {COD_GESTION} = req.params;
       const sql = 'CALL  SP_DEL_GESTION (?)';
     
       mysqlConnection.query(sql, [COD_GESTION], (err, results)=>{
       if (!err){
           res.json({Status: 'GESTION CLIENTE ELIMINADA CORRECTAMENTE'});
   } else {
        console.log(err);

      }
  });
      }
  });      
});

module.exports = router;