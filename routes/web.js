// Initialize express router;
const express = require('express');
const router = express.Router();
 
const UserController = require('./../app/Controllers/UserController');
const AuthMiddleware = require('./../app/Middleware/auth');

router.post('/register', UserController.register.bind(UserController));
router.post('/login', UserController.login.bind(UserController));

router.get('/', AuthMiddleware.auth.bind(AuthMiddleware), AuthMiddleware.admin.bind(AuthMiddleware), (req, res) => {
	res.send('Protected route'); 
})

module.exports = router;