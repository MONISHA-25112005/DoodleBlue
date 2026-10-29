const express = require('express');
const userController = require('../controllers/user.controller');
const router=express.Router();
const authMiddleware=require('../middleware/auth.middleware');

router.post('/signup',userController.signup);
router.post('/login',userController.login);
router.get('/getAllUsers',authMiddleware,userController.getAllUsers);
router.put('/update',authMiddleware,userController.updateUser);
router.delete('/delet/:userId',authMiddleware,userController.deleteUser);
router.post("/profile",authMiddleware,userController.addUserProfile);

module.exports =router;
