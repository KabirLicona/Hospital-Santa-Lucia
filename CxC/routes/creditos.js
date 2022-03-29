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

//PROCEDIMIENTO ALMACENADO DE MOSTRAR CREDITO
router.get("/CREDITO", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
      const sql = "CALL SP_MOS_CREDITO";
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


//SELECT DE LA TABA CREDITO CON TOKEN
router.get("/CREDITO/:COD_CREDITO", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {

       const { COD_CREDITO } = req.params;
  
      const sql = 'CALL SP_SEL_CREDITO (?)';
      mysqlConnection.query(sql, [COD_CREDITO], (error, results)=>{
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





//INSER DE LA TABLA CREDITO CON TOKEN
router.post("/CREDITO", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
       const {TIPO_CREDITO, DIAS_CREDITO, DESCRIPCION} = req.body
       console.log(req.body)
                         
    
    const query  = "CALL SP_INS_CREDITO(?, ?, ?);";
    mysqlConnection.query(query, [TIPO_CREDITO, DIAS_CREDITO, DESCRIPCION], (err, rows, fields) => {
       if (!err){
            res.json({Status: 'CREDITO INSERTADO Y GUARDADO'});
    } else {
         console.log(err);
    

      }
  });
      }
  });      
});

//UPDATE DE LA TABLA CREDITO CON TOKEN

router.put("/CREDITO/:COD_CREDITO", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
       const {TIPO_CREDITO,DIAS_CREDITO,DESCRIPCION} = req.body;
       const {COD_CREDITO} = req.params;
       
                         
    
    const query  = 'CALL SP_UPD_CREDITO (?,?,?,?)';
    mysqlConnection.query(query, [COD_CREDITO,TIPO_CREDITO,DIAS_CREDITO,DESCRIPCION], (err, rows, fields) => {
       if (!err){
            res.json({Status: 'CREDITO ACTUALIZADO CORRECTAMENTE'});
    } else {
         console.log(err);
    

      }
  });
      }
  });      
});


//DELETE DE LA TABLA CREDITO

router.delete("/CREDITO/:COD_CREDITO", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
       const {COD_CREDITO} = req.params;
       const sql = 'CALL SP_DEL_CREDITO (?)';
     
       mysqlConnection.query(sql, [COD_CREDITO], (err, results)=>{
       if (!err){
           res.json({Status: 'CREDITO ELIMINADA CORRECTAMENTE'});
   } else {
        console.log(err);

      }
  });
      }
  });      
});


module.exports = router;