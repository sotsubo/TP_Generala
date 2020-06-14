const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    console.log("verificar token");
    // console.log("req headers",req.headers );
    // console.log("req headers",req.headers.json() );
    // console.log("req headers",req.headers );
    
    const authorization  = req.headers['authorization']
    console.log("authorization", authorization);
    const token = authorization && authorization.split(' ')[1]
    console.log("token", token);
    
    if(!token) return res.status(401).send('Access Denied');
    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();

    }catch (err){
        res.status(400).send('Invalid Token')
    }
}