//******************************************************* */
//********************RONAL AVILEZ********************* */
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

//PROCEDIMIENTO ALMACENADO DE MOSTRAR EMPRESA
router.get("/EMPRESA", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
      const sql = "CALL SP_MOS_EMPRESA";
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


//SELECT DE LA TABA EMPRESA CON TOKEN
router.get("/EMPRESA/:COD_EMPRESA", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {

       const { COD_EMPRESA } = req.params;
  
      const sql = 'CALL SP_SEL_EMPRESA (?)';
      mysqlConnection.query(sql, [COD_EMPRESA], (error, results)=>{
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





//INSER DE LA TABLA EMPRESA CON TOKEN
router.post("/PERSONA/", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
       const {NOM_EMPRESA ,TEL_EMPRESA ,DIR_EMPRESA ,CONTACTO_EMPRESA} = req.body
       console.log(req.body)
                         
    
    const query  = "CALL SP_INS_EMPRESA(?, ?, ?, ?);";
    mysqlConnection.query(query, [NOM_EMPRESA ,TEL_EMPRESA ,DIR_EMPRESA ,CONTACTO_EMPRESA], (err, rows, fields) => {
       if (!err){
            res.json({Status: 'EMPRESA INSERTADA Y GUARDADA'});
    } else {
         console.log(err);
    

      }
  });
      }
  });      
});

//UPDATE DE LA TABLA EMPRESA CON TOKEN

router.put("/EMPRESA/:COD_EMPRESA", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
       const {NOM_EMPRESA ,TEL_EMPRESA ,DIR_EMPRESA ,CONTACTO_EMPRESA} = req.body;
       const {COD_EMPRESA} = req.params;
       
                         
    
    const query  = 'CALL SP_UPD_EMPRESA (?,?,?,?,?)';
    mysqlConnection.query(query, [COD_EMPRESA,NOM_EMPRESA ,TEL_EMPRESA ,DIR_EMPRESA ,CONTACTO_EMPRESA], (err, rows, fields) => {
       if (!err){
            res.json({Status: 'EMPRESA ACTUALIZADA CORRECTAMENTE'});
    } else {
         console.log(err);
    

      }
  });
      }
  });      
});


//DELETE DE LA TABLA EMPRESA

router.delete("/EMPRESA/:COD_EMPRESA", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
       const {COD_EMPRESA} = req.params;
       const sql = 'CALL SP_DEL_EMPRESA(?)';
     
       mysqlConnection.query(sql, [COD_EMPRESA], (err, results)=>{
       if (!err){
           res.json({Status: 'EMPRESA ELIMINADA CORRECTAMENTE'});
   } else {
        console.log(err);

      }
  });
      }
  });      
});


module.exports = router;