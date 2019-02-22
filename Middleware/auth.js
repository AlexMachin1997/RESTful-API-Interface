const jwt = require('jsonwebtoken');
const key = require('../Config/keys');

module.exports = function auth(req,res,next) {
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access dened. No token provided.')

    try {
        const decoded = jwt.verify(token, key.secret);
        req.user = decoded;
        next();
    }
    catch(ex){
        res.status(400).send('Invalid token');
    }
}