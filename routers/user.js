const express=require('express');
const router=express.Router();
const userController=require('../controller/usercontroller')
const auth=require('../middleware/auth')


router.get('/login',auth.isLogin,userController.loadLogin)
router.get('/register',auth.isLogin,userController.loadRegister)

router.post('/register',userController.registerUser)
router.post('/login',userController.login)
router.get('/home',auth.checkSession,userController.loadHome)
router.get('/logout',userController.logOut)


module.exports=router;