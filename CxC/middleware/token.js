const jwt =requiere("jsonwebtoken");

//validar el token

const verificartoken =(req, res, next) =>{
    const token = req.header('authorizaqtion');

    if(!token) return res.status(401).json({error: 'acceso denegado'});
    try {
        const verificado = jwt.verify(token,process.env.TOKEN_SECRET);

        req.user = verificado;
        //paso verificado
        next();

        
        }catch (error){
            res.status(400).json({error: 'token no es valido'})
    }
}

module.exports = verificartoken;