app.post("/CARTERA", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
       if (error) {
       res.send("ACCESO RESTRINGIDO)");
       } else {
        const {COD_EMPRESA ,COD_CLIENTE ,COD_FACTURA ,COD_CREDITO ,MONTO_FACTURA ,VALOR_ACUMULADO ,SALDO  ,ESTADO ,OBSERVACIONES} = req.body
        console.log(req.body)
                          
     
     const query  = "CALL SP_INS_CARTERA(?, ?, ?, ?, ?, ?, ?, ?, ?);";
     mysqlConnection.query(query, [COD_EMPRESA ,COD_CLIENTE ,COD_FACTURA ,COD_CREDITO ,MONTO_FACTURA ,VALOR_ACUMULADO ,SALDO  ,ESTADO ,OBSERVACIONES], (err, rows, fields) => {
        if (!err){
             res.json({Status: 'CARTERA INSERTADA Y GUARDADA'});
     } else {
          console.log(err);
     

       }
   });
       }
   });      
});







app.post("/CARTERA", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
       
             
    const sql  = "CALL SP_INS_CARTERA('${req.body.COD_EMPRESA}','${req.body.COD_CLIENTE}','${req.body.COD_FACTURA}','${req.body.COD_CREDITO}','${req.body.MONTO_FACTURA}','${req.body.VALOR_ACUMULADO}','${req.body.SALDO}','${req.body.ESTADO}','${req.body.OBSERVACIONES}','I',null);";
    const customerobj = {
       COD_EMPRESA: req.body.COD_EMPRESA,
       COD_CLIENTE : req.body.COD_CLIENTE,
       COD_FACTURA : req.body.COD_FACTURA,
       COD_CREDITO : req.body.COD_CREDITO,
       MONTO_FACTURA : req.body.MONTO_FACTURA,
       VALOR_ACUMULADO : req.body.VALOR_ACUMULADO,
       SALDO : req.body.SALDO,
       ESTADO : req.body.ESTADO,
       OBSERVACIONES : req.body.OBSERVACIONES,
       };
    mysql.query(sql, customerobj, (err, rows, fields) => {
       if (!err){
            res.json({Status: 'CARTERA INSERTADA Y GUARDADA'});
    } else {
         console.log(err);
    

      }
  });
      }
  });      
});















app.post("/CARTERA", verifyToken, (req, res) => {
   jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
       
             
    const sql  = "CALL SP_INS_CARTERA('${req.body.COD_EMPRESA}','${req.body.COD_CLIENTE}','${req.body.COD_FACTURA}','${req.body.COD_CREDITO}','${req.body.MONTO_FACTURA}','${req.body.VALOR_ACUMULADO}','${req.body.SALDO}','${req.body.ESTADO}','${req.body.OBSERVACIONES}');";
    const customerobj = {
       COD_EMPRESA: req.body.COD_EMPRESA,
       COD_CLIENTE : req.body.COD_CLIENTE,
       COD_FACTURA : req.body.COD_FACTURA,
       COD_CREDITO : req.body.COD_CREDITO,
       MONTO_FACTURA : req.body.MONTO_FACTURA,
       VALOR_ACUMULADO : req.body.VALOR_ACUMULADO,
       SALDO : req.body.SALDO,
       ESTADO : req.body.ESTADO,
       OBSERVACIONES : req.body.OBSERVACIONES,
       };
    mysql.query(sql, customerobj, (err) => {
       if (!err){
            res.json({Status: 'CARTERA INSERTADA Y GUARDADA'});
    } else {
         console.log(err);
    

      }
  });
      }
  });      
});