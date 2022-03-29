//AQUI EMPIEZA EL TOKEN
app.get("/app", (req , res) => {
    res.json({
        mensaje: "Nodejs OK"
    });
});


app.post("/app/login", (req , res) => {
    const user = {
        id: 1,
        nombre : "kabir",
        email: "liconamorneo@gmail.com"
    }

    jwt.sign({user}, 'secretkey', {expiresIn: '60s'}, (err, token) => {
        res.json({
            token
        });
    });

});

app.post("/app/posts", verifyToken, (req , res) => {

    jwt.verify(req.token, 'secretkey', (error, authData) => {
        if(error){
            res.sendStatus(403);
        }else{
            res.json({
                    mensaje: "Post fue creado",
                    authData
                });
        }
    });
});

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


app.get("/CARTERA", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
       if (error) {
       res.send("ACCESO RESTRINGIDO)");
       } else {
       const sql = "CALL SP_MOS_CARTERA(?, ?, ?, ?, ?, ?, ?, ?, ?";
       sql.query(sql, (error, results)=>{
       if (error) throw error;
       if (results.length > 0) {
       res.json(results);
       } else {
           res.send("SIN RESUTADOS")

       }
   });
       }
   });      
});
//Middlewares
app.use(express.json());