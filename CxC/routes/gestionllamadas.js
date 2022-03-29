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


//PROCEDIMIENTO ALMACENADO DE MOSTRAR GESTION LLAMADA
router.get ('/LLAMADA', (req, res) => {
    mysqlConnection.query('CALL SP_MOS_GESTION_LLAMADA', (err, rows, fields) => {
    if (!err){
    res.json(rows);
 } else {
    console.log(err);
 }
 });

 });

 //PROCEDIMIENTO ALMACENADO DE SELECT GESTION LLAMADA
router.get('/LLAMADA/:COD_LLAMADA', (req, res) => {
    const { COD_LLAMADA } = req.params;
    console.log(COD_LLAMADA);
    mysqlConnection.query('CALL SP_SEL_GESTION_LLAMADA (?)', [COD_LLAMADA], (err, rows, fields) => {

        if (!err){
            res.json(rows);
         } else {
            console.log(err);
         }
    });

});




// PARA EL PROCEDIMIENTO ALMACENADO DE GESTION LLAMADAS INSERT 
router.post('/LLAMADA', (req, res) => {
   const {COD_GESTION ,COLABRADOR ,COD_CLIENTE ,COMENTARIO} = req.body
   console.log(req.body)
   const query =`
   
        CALL SP_INS_GESTION_LLAMADA(?, ?, ?, ?);
`;
  mysqlConnection.query(query, [COD_GESTION ,COLABRADOR ,COD_CLIENTE ,COMENTARIO], (err, rows, fields) => {
   if (!err){
        res.json({Status: 'GESTION DE LLAMADA INSERTADA Y GUARDADA'});
} else {
     console.log(err);
}
});
});

//PARA EL PROCEDIMIENTO ALMACENADO DE GESTION DE LLAMADAS UPDATE

//*******TUVE QUE HACER UN NUEVO PROCEDIMIENTO ALMACENADO PARA QUE FUNCIONARA*************//
router.put('/LLAMADA/:COD_LLAMADA',(req, res)=> {
   const {COD_GESTION  ,COLABRADOR ,COD_CLIENTE ,COMENTARIO} = req.body;
   const {COD_LLAMADA} = req.params;
   const query = 'CALL SP_UPD_GESTION_LLAMADA (?,?,?,?,?)';
   mysqlConnection.query(query, [COD_LLAMADA, COD_GESTION ,COLABRADOR ,COD_CLIENTE ,COMENTARIO],(err, rows, fields) =>{
	if(!err){
	   res.json({status: 'GESTION DE LLAMADA ACTUALIZADO'});
}else {
     console.log(err);
}

});

});

//PARA EL PROCEDIMIENTO ALMACENADO DE GESTION LLAMADAS DELETE
router.delete('/LLAMADA/:COD_LLAMADA', (req, res)=> {
   const {COD_LLAMADA} = req.params;
   mysqlConnection.query('CALL  SP_DEL_GESTION_LLAMADA (?)',[COD_LLAMADA], (err,rows,fields)=>{
      if(!err){
         res.json({status: 'CREDITO ELIMINADO'});
      }else{
         console.log(err);
      }
   });
});

module.exports = router;