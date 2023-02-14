const express = require('express');
const router = express.Router();

const siteController = require('../controllers/site.c')

const {  isNotAuthenticated } = require('../middlewares/auth')

router.get('/', isNotAuthenticated, siteController.showHome)
router.get('/chat', isNotAuthenticated, siteController.showChat)

module.exports = router