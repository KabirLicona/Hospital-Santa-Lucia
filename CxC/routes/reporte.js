const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();



//ESTO ES PARA CONECTARME A LA BASE DE DATOS QUE ESTA DABASE.JS
const mysqlConnection = require('../database');

//PROCEDIMIENTO ALMACENADO DE MOSTRAR FACTURA
router.get ('/REPORTE', (req, res) => {
       
    mysqlConnection.query('CALL SE_REPORTES ', (err, rows, fields) => {
    if (!err){
    res.json(rows);
 } else {
    console.log(err);
 }
 });

 });

  //PROCEDIMIENTO ALMACENADO DE SELECT FACTURA 
router.get('/:$nReportType', (req, res) => {
    const { $nReportType } = req.params;
    console.log($nReportType);
    mysqlConnection.query('CALL SELE_REPORTES (?)', [$nReportType], (err, rows, fields) => {

        if (!err){
            res.json(rows);
         } else {
            console.log(err);
         }
    });

});

 module.exports = router;