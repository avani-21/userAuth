const express=require('express');
const router=express.Router();
const adminController=require('../controller/admincontroller')
const adminAuth=require('../middleware/adminAuth');


router.get('/login',adminAuth.isLogin,adminController.loadLogin)
router.post('/login',adminController.adminLogin)
router.get('/dashboard',adminAuth.checkSession,adminController.loadDashbord)
router.post('/edit-user',adminController.editUser)
router.get('/delete-user/:id',adminAuth.checkSession,adminController.deleteUser)
router.post('/add-user',adminAuth.checkSession,adminController.addUser)
router.get('/logout',adminController.logOut)
router.post('/logout',adminAuth.checkSession,adminController.logOut)
router.get('/search',adminAuth.checkSession,adminController.search)


module.exports=router;