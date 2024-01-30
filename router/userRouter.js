const express= require("express");
const userController=require("../controller/userController.js")
const router=express.Router();

router.get('/getuser', userController.getUser);
router.post('/update/:id', userController.updateUser);
router.post('/delete/:id', userController.deleteUser);

module.exports=router;