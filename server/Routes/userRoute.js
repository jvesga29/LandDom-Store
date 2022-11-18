const express = require('express');
const userController = require('../Controllers/userController');
const verifyJWT = require('../Middleware/verifyJWT');

const router = express.Router();

router.use(verifyJWT)

router.route('/')
    .get(userController.getAllUsers)
    .post(userController.postUser)
    .patch(userController.patchUser)
    .delete(userController.deleteUser)

module.exports = router;