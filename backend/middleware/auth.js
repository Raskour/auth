const jwt = require('jsonwebtoken');

function authMiddleware(req,res,next){
    const authHeader = req.headers['authorization'];// Bearer token
    const token = authHeader && authHeader.split('')[1];
    if(!token) return res.status(401).json({error:'Unauthorized'});

    jwt.verify(token,process.env.JWT_ACCESS_SECRET, (err, user) => {
        if(err) return res.status(403).json({error: 'Invalid or expired token'});
        req.user = user; //attach decode payload
        next();
    });
};

module.exports = authMiddleware;