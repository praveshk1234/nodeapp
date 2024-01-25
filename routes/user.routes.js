const router = require('express').Router();
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate')
const userValidation = require('../validations/user.validation')
const usersController = require('../controller/usersController');


router
    .route('/:userId')
    .patch(auth('manageUsers'),validate(userValidation.updateUser),usersController.updateUser)

module.exports = router;