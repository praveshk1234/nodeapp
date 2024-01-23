const router = require('express').Router();
const validate = require('./../middlewares/validate')
const authValidation = require('./../validations/auth.validations');
const usersController = require('./../controller/usersController');
const authController = require('./../controller/authController');

// router.get('/:id', products.getSingleProduct);
// router.get('/', products.findAll);

router.post('/signup', validate(),authController.signup);
router.post('/login', authController.login);

router
    .route('/users')
    .get(usersController.getAllUsers)
    .post(usersController.createUser);

router
    .route('/users/:id')
    .get(usersController.getUser)
    .put(usersController.updateUser)
    .delete(usersController.deleteUser);


module.exports = router;