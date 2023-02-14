const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.c')

router.get('/', (req, res) => {
    res.redirect('/login')
})
router.post('/login', userController.login)
router.post('/register', userController.register)
router.get('/logout', userController.logout)
router.get('/login',userController.ShowPagelogin)
router.get('/register',userController.ShowPageRegister)

module.exports = router