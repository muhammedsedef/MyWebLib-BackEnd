const jwt = require('jsonwebtoken');

module.exports = (req,res,next) =>{
    const authorization = req.headers.authorization;
    if (!authorization){
        res.status(400).json({
            status: 400,
            message: "You have to logged in"
        });
    }

    const token = authorization.replace('Bearer ','');
    jwt.verify(token, process.env.JWT_KEY, (err,decoded) => {
        if (err){
            res.status(400).json({
                status: 400,
                message: "You cannot enter here!"
            })
        }else{
            req.userData = decoded;
            next();
        }
    });
};