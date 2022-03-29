//funcionalidad para usar express
const express = require('express');
//funcionalidad para usar jsonwebtoken
const jwt = require("jsonwebtoken");

//ESTO ES PARA CONECTARME A LA BASE DE DATOS QUE ESTA DABASE.JS


const mysql = require('./database');

//para crear el servidor
const app = express();
//Middlewares
app.use(express.json());

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

    jwt.sign({user}, 'secretkey', {expiresIn: '1h'}, (err, token) => {
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








app.listen(3000, function(){
   console.log("nodejs app servicio Activo...");
});

//AQUI TERMINA EL TOKEN




//Settings o Ajustes
//app.set('port', process.env.PORT|| 4000);



//Routes O Rutas
 
app.use(require('./routes/creditos'));                    
app.use(require('./routes/Factura'));
app.use(require('./routes/cartera'));
app.use(require('./routes/personas'));
app.use(require('./routes/gestionconseje'));
app.use(require('./routes/gestionllamadas'));
app.use(require('./routes/gestion_cliente'));
app.use(require('./routes/clientes_mora'));
app.use(require('./routes/clientes'));
app.use(require('./routes/cobros'));
app.use(require('./routes/pagos'));
app.use(require('./routes/detalla_pago'));  
app.use(require('./routes/empresa'));
//app.use(require('./routes/reporte'));

//Starting the serve O Iniciando el servidor
app.listen(app.get('port'), () => {
    console.log ('el server esta en el', app.get('Port'));
});
