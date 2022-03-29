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

router.get("/PERSONA", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
       if (error) {
       res.send("ACCESO RESTRINGIDO)");
       } else {
       const sql = "CALL SP_MOS_PERSONA";
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


//SELECT DE LA TABA PERSONA CON TOKEN
router.get("/PERSONA/:COD_PERSONA", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
       if (error) {
       res.send("ACCESO RESTRINGIDO)");
       } else {

        const { COD_PERSONA } = req.params;
   
       const sql = 'CALL SP_SEL_PERSONA(?)';
       mysqlConnection.query(sql, [COD_PERSONA], (error, results)=>{
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





//INSER DE LA TABLA PERSONA CON TOKEN
router.post("/PERSONA/", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
       if (error) {
       res.send("ACCESO RESTRINGIDO)");
       } else {
        const {IDENTIDAD ,NOMBRE ,APELLIDO ,DIRECCION ,CORREO ,TELEFONO ,CELULAR} = req.body
        console.log(req.body)
                          
     
     const query  = "CALL SP_INS_PERSONA(?, ?, ?, ?, ?, ?, ?);";
     mysqlConnection.query(query, [IDENTIDAD ,NOMBRE ,APELLIDO ,DIRECCION ,CORREO ,TELEFONO ,CELULAR], (err, rows, fields) => {
        if (!err){
             res.json({Status: 'PERSONA INSERTADA Y GUARDADA'});
     } else {
          console.log(err);
     

       }
   });
       }
   });      
});
 
//UPDATE DE LA TABLA PERSONA CON TOKEN

router.put("/PERSONA/:COD_PERSONA", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
       if (error) {
       res.send("ACCESO RESTRINGIDO)");
       } else {
        const {IDENTIDAD ,NOMBRE ,APELLIDO ,DIRECCION ,CORREO ,TELEFONO ,CELULAR} = req.body;
        const {COD_PERSONA} = req.params;
        
                          
     
     const query  = 'CALL SP_UPD_PERSONA (?,?,?,?,?,?,?,?);';
     mysqlConnection.query(query, [COD_PERSONA,IDENTIDAD ,NOMBRE ,APELLIDO ,DIRECCION ,CORREO ,TELEFONO ,CELULAR], (err, rows, fields) => {
        if (!err){
             res.json({Status: 'PERSONA ACTUALIZADO CORRECTAMENTE'});
     } else {
          console.log(err);
     

       }
   });
       }
   });      
});


//DELETE DE LA TABLA PERSONA

router.delete("/PERSONA/:COD_PERSONA", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
       if (error) {
       res.send("ACCESO RESTRINGIDO)");
       } else {
        const {COD_PERSONA} = req.params;
        const sql = 'CALL SP_DEL_PERSONA (?)';
      
        mysqlConnection.query(sql, [COD_PERSONA], (err, results)=>{
        if (!err){
            res.json({Status: 'PERSONA ELIMINADA CORRECTAMENTE'});
    } else {
         console.log(err);

       }
   });
       }
   });      
});




module.exports = router;