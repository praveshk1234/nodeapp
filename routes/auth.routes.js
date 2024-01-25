const router = require('express').Router();
const validate = require('../middlewares/validate')
const authValidation = require('../validations/auth.validations');
const authController = require('../controller/authController');

// router.get('/:id', products.getSingleProduct);
// router.get('/', products.findAll);

router.post('/signup', validate(authValidation.register),authController.signup);
router.post('/login', validate(authValidation.login),authController.login);



module.exports = router;