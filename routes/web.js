// Initialize express router;
const express = require('express');
const router = express.Router();
 
const AuthController = require('./../app/Controllers/AuthController');
const UserController = require('./../app/Controllers/UserController');
const AuthMiddleware = require('./../app/Middleware/auth');
const EcwidController = require('./../app/Controllers/EcwidPaymentController');

router.post('/register', AuthController.register.bind(AuthController));
router.post('/login', AuthController.login.bind(AuthController));

router.get('/', AuthMiddleware.auth.bind(AuthMiddleware), AuthMiddleware.admin.bind(AuthMiddleware), (req, res) => {
	res.send('Protected route'); 
});


router.post('/user/list', 
		AuthMiddleware.auth.bind(AuthMiddleware), 
		UserController.getAll.bind(UserController)
	);

router.post('/user/create', 
		AuthMiddleware.auth.bind(AuthMiddleware), 
		AuthMiddleware.admin.bind(AuthMiddleware), 
		UserController.create.bind(UserController)
	);

router.put('/user/edit/:id', 
		AuthMiddleware.auth.bind(AuthMiddleware), 
		AuthMiddleware.admin.bind(AuthMiddleware), 
		UserController.edit.bind(UserController)
	);
router.delete('/user/delete/:id', 
		AuthMiddleware.auth.bind(AuthMiddleware), 
		AuthMiddleware.admin.bind(AuthMiddleware), 
		UserController.delete.bind(UserController)
	);

router.post('/user/changepassword', 
		AuthMiddleware.auth.bind(AuthMiddleware), 
		UserController.changePassword.bind(UserController)
	);

router.post('/yandex',
		EcwidController.YandexRequest.bind(EcwidController)
);

module.exports = router;