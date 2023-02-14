const jwt = require('jsonwebtoken')

function isNotAuthenticated(req, res, next){
    const token = req.cookies.jwt;
    if (!token) {
        return res.redirect('http://localhost:3113/login')
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if (err) {
            return res.redirect('http://localhost:3113/login')
        }
        req.userId = data.id;
        next();
    });
}

module.exports = { isNotAuthenticated }