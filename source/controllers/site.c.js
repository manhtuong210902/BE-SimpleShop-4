const User = require('../models/user.m')

class siteController{
    showHome(req, res, next){
        res.redirect('/products/all')
    }

    async showChat(req, res, next){
        const user = await User.getUserByID(req.userId)
        res.render('chat', {user})
    }
}

module.exports = new siteController();