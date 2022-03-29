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



router.get("/CONSERJE", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
      const sql = "CALL SP_MOS_GESTION_CONSERJE";
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


//SELECT DE LA TABLA GESTION CONSERJE CON TOKEN
router.get("/CONSERJE/:COD_CONSERJE", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {

       const { COD_CONSERJE } = req.params;
  
      const sql = 'CALL SP_SEL_GESTION_CONSERJE (?)';
      mysqlConnection.query(sql, [COD_CONSERJE], (error, results)=>{
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





//INSER DE LA TABLA GESTION CONSERJE CON TOKEN
router.post("/MORA/", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
       const {COD_CLIENTE ,COD_COBRO ,COD_FACTURA ,OBSERVACION ,IMAGEN} = req.body
       console.log(req.body)
                         
    
    const query  = "CALL SP_INS_GESTION_CONSERJE(?, ?, ?, ?, ?)";
    mysqlConnection.query(query, [COD_CLIENTE ,COD_COBRO ,COD_FACTURA ,OBSERVACION ,IMAGEN], (err, rows, fields) => {
       if (!err){
            res.json({Status: 'GESTION INSERTADA Y GUARDADA'});
    } else {
         console.log(err);
    

      }
  });
      }
  });      
});

//UPDATE DE LA TABLA GESTION CONSERJE CON TOKEN

router.put("/CONSERJE/:COD_CONSERJE", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
       const {COD_CLIENTE ,COD_COBRO ,COD_FACTURA ,OBSERVACION ,IMAGEN} = req.body;
       const {COD_CONSERJE} = req.params;
       
                         
    
    const query  = 'CALL SP_UPD_GESTION_CONSERJE (?,?,?,?,?,?)';
    mysqlConnection.query(query, [COD_CONSERJE, COD_CLIENTE ,COD_COBRO ,COD_FACTURA ,OBSERVACION ,IMAGEN ], (err, rows, fields) => {
       if (!err){
            res.json({Status: 'GESTION ACTUALIZADA CORRECTAMENTE'});
    } else {
         console.log(err);
    

      }
  });
      }
  });      
});


//DELETE DE LA TABLA GESTION CONSERJE

router.delete("CONSERJE/:COD_CONSERJE", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
       const {COD_CONSERJE} = req.params;
       const sql = 'CALL  SP_DEL_GESTION_CONSERJE (?)';
     
       mysqlConnection.query(sql, [COD_CONSERJE], (err, results)=>{
       if (!err){
           res.json({Status: 'GESTION ELIMINADA CORRECTAMENTE'});
   } else {
        console.log(err);

      }
  });
      }
  });      
});



module.exports = router;